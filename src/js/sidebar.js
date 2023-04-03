import $ from 'jquery'
import Quicktab from 'bootstrap-quicktab';


const NAME = 'Sidebar'
const DATA_KEY = 'bsa.sidebar'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]


const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`


const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="sidebar"]'


const Default = {
    //动画速度,单位毫秒
    animationSpeed: 150,
    //是否启用手风琴模式
    accordion: true
}


class Sidebar {
    constructor(element, config) {
        this._config = config
        this._element = element
    }

    // Public


    expand($menuLink) {


        //得到兄弟节点ul
        let $siblingsUl = $menuLink.siblings('ul');

        $siblingsUl.data('isOpen', true);
        $siblingsUl.css({'transition': `height ${this._config.animationSpeed}ms linear`});
        $siblingsUl.css({'height': 0});
        $siblingsUl.prop('scrollHeight');
        $siblingsUl.css({'height': $siblingsUl.prop('scrollHeight')});


    }


    collapse($menuLink) {
        // const collapsedEvent = $.Event(EVENT_COLLAPSED)

        //得到兄弟节点ul
        let $siblingsUl = $menuLink.siblings('ul');

        $siblingsUl.data('isOpen', false);
        $siblingsUl.css({'transition': `height ${this._config.animationSpeed}ms linear`});
        $siblingsUl.css({'height': $siblingsUl.prop('scrollHeight')});
        $siblingsUl.prop('scrollHeight');
        $siblingsUl.css({'height': 0, 'display': 'block'});

    }

    // Private

    _init() {


        let _this = this;


        //左侧导航过度结束事件
        $(document).on('transitionend', '.bsa-menu ul', function (e) {

            if (e.target === e.currentTarget) {
                const expandedEvent = $.Event(EVENT_EXPANDED);
                const collapsedEvent = $.Event(EVENT_COLLAPSED);
                $(e.target).removeAttr('style');
                //判断是展开还是折叠
                if ($(e.target).data('isOpen')) {


                    $(_this._element).trigger(expandedEvent)
                } else {
                    $(_this._element).trigger(collapsedEvent)
                }
            }

        });

        //侧边栏点击事件,有子集的且没有target属性
        $(document).on('click', '.bsa-menu a.has-children:not([target])', function (e) {
            e.preventDefault();
            let $a = $(this);


            // console.log($a);


            //是否开启手风琴模式
            if (_this._config.accordion) {


                let $pSiblingsLi = $a.parent().siblings('li');
                let $pSiblingsOpenA = $pSiblingsLi.children('a.has-children.open');

                //调用折叠类
                _this.collapse($pSiblingsOpenA)

                $pSiblingsOpenA.removeClass('open');

                //同时给折叠的ul下面的子集中a链接有激活的给移除激活效果
                $pSiblingsLi.children('a.active').removeClass('active');

            }


            if (!$a.hasClass('open')) {

                $a.addClass('open');
                _this.expand($a);

            } else {

                _this.collapse($a);
                $a.removeClass('open');
            }
        });


        //侧边栏，没有子集的链接
        $(document).on('click', '.bsa-menu a:not(.has-children):not([target])', function (e) {
            e.preventDefault();
            let $a = $(this);

            //移除所有的激活类
            $('.bsa-menu a').each(function (index, a) {
                $(a).removeClass('active');
            });

            //给当前的a添加激活类
            $a.addClass('active');

            //添加tab处理
            Quicktab.get('.qtab').addTab({
                title: this.innerText,
                url: this.getAttribute('href'),
                close: true,
            });
        });


    }


    // Static
    static _jQueryInterface(config) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)
            const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

            // console.log(_config);

            if (!data) {
                data = new Sidebar($(this), _config)
                $(this).data(DATA_KEY, data)
                data._init()
            } else if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`)
                }
                data[config]()
            } else if (typeof config === 'undefined') {
                data._init()
            }
        })
    }
}

/**
 * Data API
 * ====================================================
 */


if ($('.bsa-sidebar').length !== 0) {
    $(window).on('load', () => {
        $(SELECTOR_DATA_TOGGLE).each(function () {
            Sidebar._jQueryInterface.call($(this), 'init')
        })
    })
}


/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Sidebar._jQueryInterface
$.fn[NAME].Constructor = Sidebar
$.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Sidebar._jQueryInterface
}

export default Sidebar
