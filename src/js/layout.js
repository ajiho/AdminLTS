import Scrollbar from 'smooth-scrollbar';
import Quicktab from 'bootstrap-quicktab';
import $ from 'jquery'


const NAME = 'Layout'
const DATA_KEY = 'bsa.layout'
const JQUERY_NO_CONFLICT = $.fn[NAME]

//用于实现密码点击显示/隐藏
const SELECTOR_LOGIN_PASSWORD = '.bsa-show_hide_password span'

const Default = {
    //滚动条自动隐藏
    scrollbarAutoHide: true,
    //加载器持续时间
    preloadDuration: 800,
    //子页面是否适配主题
    themeOnTabPage: true
}


class Layout {
    constructor(element, config) {


        this._config = config
        this._element = element


    }


    // Public
    fullscreen() {
        if ($('.bsa-header').length !== 0) {
            document.documentElement.requestFullscreen();
        }
    }

    exitFullscreen() {
        if ($('.bsa-header').length !== 0) {
            if (document.fullscreenElement !== null) {
                document.exitFullscreen();
            }
        }
    }


    // Private

    _init() {

        let _this = this;

        //禁止所有的input框记忆
        $('input').each(function (index, element) {
            $(element).attr('AutoComplete', 'off');
        });


        //禁止action为#的无效表单提交
        $(document).on('submit', 'form[action="#"]', function (e) {
            e.preventDefault();
        })


        //滚动条自动隐藏
        if (_this._config.scrollbarAutoHide === true) {

            let style = `
                  [data-scrollbar] .scrollbar-track {
                        visibility: hidden;
                    }
            
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
            
                        to {
                            opacity: 1;
                        }
                    }
            
            
                    [data-scrollbar]:hover .scrollbar-track {
                        visibility: unset;
                        animation: fadeIn 3s !important;
                    }
            `;
            let styleEl = document.createElement('style');
            styleEl.textContent = style;
            document.head.appendChild(styleEl);
        }


        if ($(SELECTOR_LOGIN_PASSWORD).length !== 0) {
            console.log('的撒大');
            //登录页面密码框的显示和隐藏
            $(SELECTOR_LOGIN_PASSWORD).on('click', function (event) {
                event.preventDefault();
                let $input = $('.bsa-show_hide_password input');
                let $i = $('.bsa-show_hide_password i');
                if ($input.attr('type') === 'text') {
                    $input.attr('type', 'password');
                    $i.removeClass('bi-eye');
                    $i.addClass('bi-eye-slash');
                } else if ($input.attr('type') === 'password') {
                    $input.attr('type', 'text');
                    $i.addClass('bi-eye');
                    $i.removeClass('bi-eye-slash');
                }
            });
        }


        //导航菜单滚动条插件
        if ($('.bsa-sidebar-body').length !== 0) {
            Scrollbar.init(document.querySelector('.bsa-sidebar-body'));
        }


        //有头部,说明是index.html
        if ($('.bsa-header').length !== 0) {

            //头部下拉菜单滚动条
            $('.bsa-header .card-body').each(function (index, element) {
                Scrollbar.init(element);
            })

            // 监听全屏事件
            $(document).on('fullscreenchange', function () {
                if (document.fullscreenElement == null) {//退出全屏
                    $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-fullscreen-exit').addClass('bi-arrows-fullscreen');
                } else {
                    $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-arrows-fullscreen').addClass('bi-fullscreen-exit');
                }
            })

            //全屏
            $('.bsa-fullscreen-toggler').on('click', function () {
                if ($(this).find('.bi-arrows-fullscreen').length > 0) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen()
                }
            })


            //主题切换
            $(document).on('click', 'div[class^=bsa-theme-color]', function (e) {
                e.preventDefault();

                let themeVal = Array.from(this.classList).at(-1);

                //存入缓存
                localStorage.setItem('theme', String(themeVal));

                //修改主题
                $('html').attr('data-bs-theme', themeVal);


                //tab内部也需要修改主题
                if ($('.qtab').length !== 0 && _this._config.themeOnTabPage === true) {

                    Quicktab.get('.qtab').setTab(function (tabs) {
                        for (let tab of tabs) {
                            if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {

                                $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', themeVal);
                            }
                        }
                    });

                }
            });

        }


        //tab插件初始化
        if ($('.qtab').length !== 0) {

            new Quicktab({
                selector: '.qtab',
                minHeight: '',
                //不设置默认自适应容器高度
                height: '100%',
                //不设置默认自适应容器宽度
                width: '',
                //"sessionStorage","localStorage",null:不缓存每次刷新都会只展示选项tabs里面的tab
                cache: 'localStorage',
                //初始化的tab
                tabs: [],
                toolbar: {
                    refresh: {
                        enable: true,
                    },
                    //全屏功能
                    fullscreen: {
                        //true:开启全屏 false:关闭全屏
                        enable: true,
                        fullscreen: function () {
                            $('.bsa-content').addClass('fullscreen');
                        },
                        exitFullscreen: function () {
                            $('.bsa-content').removeClass('fullscreen');
                        },
                    },
                },
                tabConfig: {
                    dragSort: true,
                    clickRollback: true,
                    contextmenu: {
                        enable: true
                    }
                },
                //实例初始化完毕回调，只会执行一次
                onInit: function (e) {

                    $('.bsa-menu a').each(function (index, a) {

                        if ($(a).attr('href') === Quicktab.getTabUrl(e.target.getActiveTab())) {
                            _this._scrollToA(a);
                        }
                    });

                },
                //tab被单击事件
                onTabClick: function (e) {
                    let $allA = $('.bsa-menu a');
                    //移除所有的展开和激活状态
                    $allA.each(function (index, a) {
                        $(a).removeClass('open active');
                    });

                    $allA.each(function (index, a) {

                        if ($(a).attr('href') === e.tabUrl) {
                            _this._scrollToA(a);
                        }
                    });
                },
                //tab加载完毕事件
                onTabLoaded: function (tab) {
                    let themeVal = localStorage.getItem('theme');
                    $('html').attr('data-bs-theme', themeVal);


                    if (_this._config.themeOnTabPage === true) {//是否启用主题适配子页面
                        if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                            $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', themeVal);
                        }
                    }


                },
                //tab遮罩层加载完毕的事件
                onTabMaskTransitionend: function () {
                    $('.bsa-preloader').fadeOut(_this._config.preloadDuration);
                },
            });
        }


    }

    _openMenu(a) {
        let $ul = $(a).parent().parent();
        let $canOpen = $ul.siblings(a);
        if (!($canOpen.length > 0)) {
            return;
        }
        $canOpen.addClass('open');
        return this._openMenu($canOpen);
    }

    _scrollToA(a) {
        let $a = $(a);

        $a.addClass('active');

        this._openMenu(a);

        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).update();
        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).scrollTo(0, $a.position().top, 500);

    }


    // Static
    static _jQueryInterface(config) {


        return this.each(function () {


            let data = $(this).data(DATA_KEY);

            const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data());


            if (!data) {

                //没有就new
                data = new Layout($(this), _config)

                //赋值给$(this);
                $(this).data(DATA_KEY, data)

                //调用内部的私有方法
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

$(window).on('load', () => {
    Layout._jQueryInterface.call($('body'));
})

//code


/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Layout._jQueryInterface
$.fn[NAME].Constructor = Layout
$.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
}

export default Layout
