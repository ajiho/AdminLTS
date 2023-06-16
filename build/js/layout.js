/* global bootstrap OverlayScrollbarsGlobal  */
import $ from 'jquery'

import Helper from './util/helper'
import Storage from './util/storage'

import Quicktab from 'bootstrap-quicktab';


const NAME = 'Layout'
const DATA_KEY = 'bsa.layout'
const THEME_CACHE_KEY = 'theme'
const SELECTOR_QUICKTAB = '.qtab'

const SELECTOR_BACK_TO_TOP = '.bsa-back-to-top'
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
  //默认主题
  theme: 'light',
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


    //布局1的js逻辑
    $(document).on('click', '.bsa-layout1-left .bsa-chevron-toggle', function (e) {
      e.preventDefault();
      let w = $(window).width();
      if (w < 992) {

        let $bsaLayout1Left = $('.bsa-layout1-left');
        if ($bsaLayout1Left.hasClass('open')) {
          $bsaLayout1Left.removeClass('open')

          //移除遮罩层
          $('.bsa-mask').remove();
        } else {
          $bsaLayout1Left.addClass('open')

          let maskStr = '<div class="bsa-mask"></div>';
          let $maskStr = $(maskStr);
          $maskStr.css('zIndex', 1011)
          // 绑定点击事件
          $maskStr.on('click', function () {
            $bsaLayout1Left.removeClass('open')

            $(this).remove();
          });

          // 把 DOM 元素添加到页面中
          $('body').append($maskStr);

        }
      } else {
        $('.bsa-layout1').toggleClass('collapsed')
      }
    })

    // 布局2的左侧js逻辑
    $(document).on('click', '.bsa-layout2-left .bsa-chevron-toggle', function (e) {
      e.preventDefault();
      let w = $(window).width();
      if (w < 992) {


        let $bsaLayout2Left = $('.bsa-layout2-left')
        let $bsaLayout2Right = $('.bsa-layout2-right')
        $bsaLayout2Right.removeClass('right-open')
        if ($bsaLayout2Left.hasClass('left-open')) {
          $bsaLayout2Left.removeClass('left-open');
          $('.bsa-mask').remove();
        } else {
          $bsaLayout2Left.addClass('left-open');
          if ($('.bsa-mask').length === 0) {
            let maskStr = '<div class="bsa-mask"></div>';
            let $maskStr = $(maskStr);
            $maskStr.css('zIndex', 1011)
            $maskStr.on('click', function () {
              $bsaLayout2Left.removeClass('left-open');
              $bsaLayout2Right.removeClass('right-open')
              $(this).remove();
            });
            $('body').append($maskStr);
          }
        }


      } else {
        $('.bsa-layout2').toggleClass('left-collapsed')
      }
    })

    // 布局2的右侧js逻辑
    $(document).on('click', '.bsa-layout2-right .bsa-chevron-toggle', function (e) {
      e.preventDefault();
      let w = $(window).width();
      if (w < 992) {

        let $bsaLayout2Left = $('.bsa-layout2-left')
        let $bsaLayout2Right = $('.bsa-layout2-right')
        $bsaLayout2Left.removeClass('left-open')
        if ($bsaLayout2Right.hasClass('right-open')) {
          $bsaLayout2Right.removeClass('right-open');
          $('.bsa-mask').remove();
        } else {
          $bsaLayout2Right.addClass('right-open');
          if ($('.bsa-mask').length === 0) {
            let maskStr = '<div class="bsa-mask"></div>';
            let $maskStr = $(maskStr);
            $maskStr.css('zIndex', 1011)
            $maskStr.on('click', function () {
              $bsaLayout2Left.removeClass('left-open');
              $bsaLayout2Right.removeClass('right-open')
              $(this).remove();
            });
            $('body').append($maskStr);
          }
        }
      } else {
        $('.bsa-layout2').toggleClass('right-collapsed')
      }
    })


    // 布局3的逻辑部分
    $(document).on('click', '.bsa-layout3-right .bsa-chevron-toggle', function (e) {
      e.preventDefault();
      let w = $(window).width();
      if (w < 992) {
        let $bsaLayout3Right = $('.bsa-layout3-right');
        if ($bsaLayout3Right.hasClass('open')) {
          $bsaLayout3Right.removeClass('open')
          //移除遮罩层
          $('.bsa-mask').remove();
        } else {
          $bsaLayout3Right.addClass('open')

          let maskStr = '<div class="bsa-mask"></div>';
          let $maskStr = $(maskStr);
          $maskStr.css('zIndex', 1011)
          // 绑定点击事件
          $maskStr.on('click', function () {
            $bsaLayout3Right.removeClass('open')

            $(this).remove();
          });

          // 把 DOM 元素添加到页面中
          $('body').append($maskStr);

        }
      } else {
        $('.bsa-layout3').toggleClass('collapsed')
      }
    })


    //回到顶部逻辑部分
    $(window).on('scroll', function () {
      $(this).scrollTop() > 300 ? $(SELECTOR_BACK_TO_TOP).fadeIn() : $(SELECTOR_BACK_TO_TOP).fadeOut();
    })

    $(SELECTOR_BACK_TO_TOP).on('click', function () {
      $('html').animate({
        scrollTop: 0
      }, 600)
    })


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


    //处理主题色的复选框
    $('.bsa-theme-switcher-wrapper input[type="checkbox"]').click(function () {
      // 如果当前复选框被选中
      if ($(this).is(':checked')) {

        let theme = $(this).attr('value');

        // 取消其他复选框的选中状态
        $('.bsa-theme-switcher-wrapper input[type="checkbox"]').not(this).prop('checked', false);

        //存入缓存
        _this.Storge.set(THEME_CACHE_KEY, theme)

        //修改主题
        $('html').attr('data-bs-theme', theme);


        //tab内部也需要修改主题
        if ($(SELECTOR_QUICKTAB).length !== 0 && _this._config.tabPageEnableTheme === true) {
          Quicktab.get(SELECTOR_QUICKTAB).setTab(function (tabs) {
            for (let tab of tabs) {
              if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                _this._setIframeTheme(tab.tabIFrame.el, theme)
              }
            }
          });
        }


      } else {


        _this.Storge.remove(THEME_CACHE_KEY);
        $('html').attr('data-bs-theme', _this._config.theme)
        //tab内部也需要修改主题
        if ($(SELECTOR_QUICKTAB).length !== 0 && _this._config.tabPageEnableTheme === true) {
          Quicktab.get(SELECTOR_QUICKTAB).setTab(function (tabs) {
            for (let tab of tabs) {
              if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                _this._setIframeTheme(tab.tabIFrame.el, _this._config.theme)
              }
            }
          });
        }
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

              let theme = _this.Storge.get(THEME_CACHE_KEY)

              if (theme === null) {
                $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', _this._config.theme);
              } else {
                $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', theme);
              }
            }

          }
        }
      });
    }


    // 监听头部几个下拉菜单的事件
    const myDropdown = document.querySelectorAll('.bsa-header [data-bs-toggle="dropdown"]');
    myDropdown.forEach(function (el) {
      el.addEventListener('hidden.bs.dropdown', event => {
        _this._hasShowMenu();
      })

      el.addEventListener('shown.bs.dropdown', event => {
        _this._hasShowMenu();
      })


    })

    //遮罩层关闭
    setTimeout(() => {

      let theme = _this.Storge.get(THEME_CACHE_KEY)
      if (theme === null) {
        //设置主题
        $('html').attr('data-bs-theme', _this._config.theme)
      } else {
        //让主题色选中
        $(`.bsa-theme-switcher-wrapper input[type="checkbox"][value=${theme}]`).prop('checked', true);
        //设置主题
        $('html').attr('data-bs-theme', theme)
      }
      $(SELECTOR_PRELOADER).fadeOut(_this._config.preloadDuration);
    }, this._config.preloadDuration)
  }


  _hasShowMenu() {
    let len = document.querySelectorAll('.bsa-header .dropdown-menu.show').length;
    if (len) {
      $('.bsa-content').addClass('pe-none');
    } else {
      $('.bsa-content').removeClass('pe-none');
    }
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
        _this._setIframeTheme(iframeEl, theme)
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


    $(a).addClass('active');
    this._openMenu(a);
    //bug: 用a.offsetTop 代替 $(a).position().top 避免 后者它有时候会得到0的结果
    sidebarOsInstance.elements().viewport.scrollTo({top: a.offsetTop})


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
