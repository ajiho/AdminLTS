import $ from 'jquery'
import Quicktab from 'bootstrap-quicktab';
import Helper from './util/helper'

const NAME = 'Sidebar'
const DATA_KEY = 'bsa.sidebar'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]


const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`


const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="sidebar"]'


const Default = {
    //点击是否自动关闭侧边栏
    clickClose: false,
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

        let _this = this;

        $menuLink.siblings('ul').each(function (index, element) {

            //变成jquery对象
            let $element = $(element);

            //获取真实的滚动高度
            let scrollHeight = _this._getRealHeight(element);

            //设置一个展开标志属性,用于监听过渡结束时判断是展开还是折叠
            $element.data('isOpen', true);

            $element.css({'height': 0});

            //触发重绘
            void element.scrollHeight;

            $element.css({
                'transition-timing-function': 'ease',
                'transition-duration': `${_this._config.animationSpeed}ms`,
                'transition-property': 'height',
                'display': 'block',
                'height': scrollHeight
            })

        })
    }


    collapse($menuLink) {
        let _this = this;

        $menuLink.siblings('ul').each(function (index, element) {

            let $element = $(element);

            let scrollHeight = _this._getRealHeight(element);

            $element.data('isOpen', false);

            $element.css({
                'transition-timing-function': 'ease',
                'transition-duration': `${_this._config.animationSpeed}ms`,
                'transition-property': 'height',
                'display': 'block',
                'height': scrollHeight
            })
            void element.scrollHeight;
            $element.css({'height': 0});

        })
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

            //是否开启手风琴模式
            if (_this._config.accordion) {

                let $pSiblingsLi = $a.parent().siblings('li');
                let $pSiblingsOpenA = $pSiblingsLi.children('a.has-children.open');


                //调用折叠类
                _this.collapse($pSiblingsOpenA)


                $pSiblingsOpenA.removeClass('open');
                //
                // //同时给折叠的ul下面的子集中a链接有激活的给移除激活效果
                $pSiblingsLi.children('a.active').removeClass('active');

            }

            if (!$a.hasClass('open')) {
                $a.addClass('open');
                _this.expand($a);

            } else {
                $a.removeClass('open');
                _this.collapse($a);
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

            if (_this._config.clickClose === true) {
                $('[data-bsa-toggle="pushmenu"]').PushMenu('collapse')
            }

            //添加tab处理
            Quicktab.get('.qtab').addTab({
                title: this.innerText,
                url: this.getAttribute('href'),
                close: true,
            });

        });
    }


    //获取display:none元素的真实高度
    _getRealHeight(element) {
        let $element = $(element);
        let $clone = $element.clone();
        $clone.css({
            visibility: 'hidden',
            display: 'block',
            position: 'absolute',
            zIndex: '-999'
        })
        $element.after($clone);
        let nx = $element.next();
        //获取滚动高度
        let nxsh = nx.prop('scrollHeight');
        nx.remove();
        return nxsh;
    }


    // Static
    static _jQueryInterface(config) {

        for (const element of this) {


            let $element = $(element);

            let data = $element.data(DATA_KEY);

            let _config = $.extend({}, Default, typeof config === 'object' ? config : $element.data());


            if (_config.animationSpeed < 150) {
                _config.animationSpeed = 150;
            }

            if (!data) {
                //没有就new
                data = new Sidebar($element, _config)

                //赋值给data,供给下次调用
                $element.data(DATA_KEY, data)

                //调用内部的私有方法,初始化，执行必须执行的方法
                data._init()
            }

            if (typeof config === 'string') {

                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`方法 "${config}" 不存在`)
                }

                let execRt = data[config]();
                if (typeof execRt !== 'undefined') {
                    return execRt;
                }
            }
        }
        return this;
    }
}

/**
 * Data API
 * ====================================================
 */

$(window).on('load', () => {
    if (Helper.isIndex()) {
        $(SELECTOR_DATA_TOGGLE).each(function () {
            Sidebar._jQueryInterface.call($(this))
        })
    }
})


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
