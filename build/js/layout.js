/* global bootstrap OverlayScrollbarsGlobal  */
import $ from 'jquery'

import Helper from './util/helper'
import Storage from './util/storage'

import Quicktab from 'bootstrap-quicktab';


const NAME = 'Layout'
const DATA_KEY = 'bsa.layout'
const THEME_CACHE_KEY = 'theme'
const SELECTOR_QUICKTAB = '.qtab'
const JQUERY_NO_CONFLICT = $.fn[NAME]

//用于实现密码点击显示/隐藏
const SELECTOR_LOGIN_PASSWORD = '.bsa-show_hide_password span'
//装载器
const SELECTOR_PRELOADER = '.bsa-preloader'

const Default = {
    //滚动条自动隐藏 never scroll leave move  #https://kingsora.github.io/OverlayScrollbars/
    scrollbarAutoHide: 'leave',
    //滚动条隐藏时间
    scrollbarAutoHideDelay: 1300,
    //加载器持续时间
    preloadDuration: 800,
    //tab页面是否适配主题
    tabPageEnableTheme: true,
    //主题的保存方式  sessionStorage,localStorage
    themeCacheType: 'localStorage'
}


//滚动条插件对象
let OverlayScrollbars = null

//侧边栏滚动条插件的示例对象
let sidebarOsInstance = null

class Layout {
    constructor(element, config) {
        this._config = config
        this._element = element
    }


    // Public
    fullscreen() {
        if (Helper.isIndex()) {
            document.documentElement.requestFullscreen();
        }

    }

    exitFullscreen() {

        if (Helper.isIndex()) {
            if (document.fullscreenElement !== null) {
                document.exitFullscreen();
            }
        }

    }


    getTheme() {
        return this.Storge.get(THEME_CACHE_KEY);
    }


    // Private
    _init() {


        this._common();

        if (Helper.isIndex()) {
            this._index();
        }

    }


    // 所有页面都要执行的
    _common() {

        this._cacheInit();


        //启用提示
        $('[data-bs-toggle="tooltip"]').each(function (i, el) {
            new bootstrap.Tooltip(el)
        })

        //启用弹出层工具
        $('[data-bs-toggle="popover"]').each(function (i, el) {
            new bootstrap.Popover(el)
        })


        //禁止所有的input框记忆,优化体验，否则会有烦人提示
        $('input').attr('AutoComplete', 'off');

        //禁止action为#的无效表单提交
        $(document).on('submit', 'form[action="#"]', function (e) {
            e.preventDefault();
        })

        //登录页面的密码切换
        if ($(SELECTOR_LOGIN_PASSWORD).length !== 0) {
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

    }


    _cacheInit() {

        let cacheType = 1;
        //换成实例化
        if (this._config.themeCacheType === 'localStorage') {
            cacheType = 2
        } else if (this._config.themeCacheType === 'sessionStorage') {
            cacheType = 1
        }

        this.Storge = new Storage(cacheType)
    }

    // 首页需要执行的方法
    _index() {

        let _this = this;


        //给滚动条注册插件
        if (typeof OverlayScrollbarsGlobal !== 'undefined') {
            OverlayScrollbars = OverlayScrollbarsGlobal.OverlayScrollbars;

            //给滚动条对象注册插件
            OverlayScrollbars.plugin([
                OverlayScrollbarsGlobal.ScrollbarsHidingPlugin,
                OverlayScrollbarsGlobal.SizeObserverPlugin,
                OverlayScrollbarsGlobal.ClickScrollPlugin
            ]);

        }


        //导航菜单滚动条插件
        sidebarOsInstance = OverlayScrollbars(document.querySelector('.bsa-sidebar-body'), {
            overflow: {
                x: 'hidden',
                y: 'scroll',
            },
            scrollbars: {
                //never scroll leave move
                autoHide: _this._config.scrollbarAutoHide,
                //是否可以点击轨道滚动
                clickScroll: true,
                //隐藏滚动条的时间
                autoHideDelay: _this._config.scrollbarAutoHideDelay,
            }
        });

        // console.log(sidebarOsInstance)


        //头部下拉菜单滚动条
        $('.bsa-header .card-body').each(function (index, element) {
            OverlayScrollbars(element, {
                overflow: {
                    x: 'hidden',
                    y: 'scroll',
                },
                scrollbars: {
                    //never scroll leave move
                    autoHide: 'leave',
                    clickScroll: true,
                    //隐藏滚动条的时间
                    autoHideDelay: 1300,
                }
            });
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
            _this.Storge.set(THEME_CACHE_KEY, String(themeVal))

            //修改主题
            $('html').attr('data-bs-theme', themeVal);


            //tab内部也需要修改主题
            if ($(SELECTOR_QUICKTAB).length !== 0 && _this._config.tabPageEnableTheme === true) {
                Quicktab.get(SELECTOR_QUICKTAB).setTab(function (tabs) {
                    for (let tab of tabs) {
                        if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {


                            _this._setIframeTheme(tab.tabIFrame.el, themeVal)


                            // $doc.find('html').attr('data-bs-theme', themeVal);
                            //
                            // //同时我们还得在iframe的子文档中再次查找iframe元素
                            // let $iframes = $doc.find('iframe');
                            // $iframes.each(function (index, item) {
                            //     if (Quicktab.canAccessIFrame(item)) {
                            //         let $doc = $(item.contentDocument);
                            //         $doc.find('html').attr('data-bs-theme', themeVal);
                            //     }
                            // })


                        }
                    }
                });

            }
        });


        //tab插件初始化
        if ($(SELECTOR_QUICKTAB).length !== 0 && typeof Quicktab !== 'undefined') {

            new Quicktab({
                selector: SELECTOR_QUICKTAB,
                minHeight: '',
                //不设置默认自适应容器高度
                height: '100%',
                //不设置默认自适应容器宽度
                width: '',
                //"sessionStorage","localStorage",null:不缓存每次刷新都会只展示选项tabs里面的tab
                cache: 'sessionStorage',
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
                    //拖动排序
                    dragSort: true,
                    //点击tab时自动居中
                    clickRollback: true,
                    //右键菜单功能启用
                    contextmenu: {
                        enable: true
                    }
                },
                //实例初始化完毕回调，只会执行一次
                onInit: function (e) {

                    $('.bsa-menu a').each(function (index, a) {
                        if ($(a).attr('href') === Quicktab.getTabUrl(e.target.getActiveTab())) {
                            _this._scrollToA(a);
                            //结束循环，避免左侧菜单有重复的测试地址时会展开多个菜单
                            return false;
                        }
                    });
                },

                //tab被单击事件
                onTabClick: function (e) {
                    let $allA = $('.bsa-menu a');
                    $allA.each(function (index, a) {
                        //如果找到这个tab的地址
                        if ($(a).attr('href') === e.tabUrl) {

                            //移除所有的展开和激活状态
                            $allA.each(function (index, a) {
                                $(a).removeClass('open active');
                            });

                            //移除所有ul正在执行的动画,并且移除掉行内style样式
                            $('.bsa-menu ul').each(function (index, ul) {
                                $(ul).removeAttr('style');
                            });

                            _this._scrollToA(a);
                            //结束循环，避免左侧菜单有重复的测试地址时会展开多个菜单
                            return false;
                        }
                    });
                },
                //tab加载完毕事件
                onTabLoaded: function (tab) {
                    //是否启用主题适配子页面
                    if (_this._config.tabPageEnableTheme === true) {
                        if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                            $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', _this.Storge.get(THEME_CACHE_KEY));
                        }
                    }
                }
            });
        }


        //遮罩层关闭
        setTimeout(() => {
            $('html').attr('data-bs-theme', _this.Storge.get(THEME_CACHE_KEY))
            $(SELECTOR_PRELOADER).fadeOut(_this._config.preloadDuration);
        }, this._config.preloadDuration)
    }


    _setIframeTheme(iframe, theme) {

        let _this = this;

        if (Helper.canAccessIFrame(iframe)) {

            let $doc = $(iframe.contentDocument);
            //先给自己设置主题
            $doc.find('html').attr('data-bs-theme', theme);
            //再给内部的所有iframe设置主题
            $doc.find('iframe').each(function (index, iframeEl) {
                //递归调用，给所有的iframe设置主题
                _this._setIframeTheme(iframeEl,theme)
            })
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

        sidebarOsInstance.elements().viewport.scrollTo({top: $a.position().top});


    }


    // Static
    static _jQueryInterface(config) {


        for (const element of this) {


            let $element = $(element);


            let data = $element.data(DATA_KEY);

            const _config = $.extend({}, Default, typeof config === 'object' ? config : $element.data());

            if (!data) {
                //没有就new
                data = new Layout($element, _config)

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
    Layout._jQueryInterface.call($('body'));
})


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
