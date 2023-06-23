/*!
 * bootstrap-admin v2.0.1 (https://gitee.com/ajiho/bootstrap-admin)
 * Copyright 2021-2023 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-admin/blob/2.x/LICENSE)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('bootstrap-quicktab')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'bootstrap-quicktab'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BootstrapAdmin = {}, global.jQuery, global.Quicktab));
})(this, (function (exports, $, Quicktab) { 'use strict';

    var Helper = {
      //判断是否为主页面
      isIndex() {
        return $('.bsa-header').length !== 0 && $('.bsa-sidebar').length !== 0;
      },
      canAccessIFrame(iframe) {
        let html = null;
        try {
          // 浏览器兼容
          let doc = iframe.contentDocument || iframe.contentWindow.document;
          html = doc.body.innerHTML;
        } catch (err) {
          // do nothing
        }
        return html !== null;
      },
      isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
      },
      /**
       * 通过key更新obj中的指定数据
       * @param obj 更新值的对象
       * @param objKey 拼接后的key数据，string ‘.’符号拼接
       * @param newValue 更新的值
       * @returns {*} 返回更新后的数据
       */
      updateObjDataByKey(obj, objKey, newValue) {
        const keyList = objKey.split('.');
        const lastKey = keyList[keyList.length - 1];
        keyList.reduce((pre, item) => {
          if (item === lastKey) pre[item] = newValue;
          return pre[item];
        }, obj);
        return obj;
      },
      //html反转义
      htmlspecialchars_decode(text) {
        let temp = document.createElement('div');
        temp.innerHTML = text;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      },
      // HTML转义
      htmlspecialchars(html) {
        let temp = document.createElement('div');
        temp.textContent != null ? temp.textContent = html : temp.innerText = html;
        let output = temp.innerHTML;
        temp = null;
        return output;
      }
    };

    class Storage {
      /**
       * @param type 1:sessionStorage 2:localStorage
       */
      constructor(type = 1) {
        this.type = type;
      }

      /**
       * 设置缓存
       * @param name 缓存的key
       * @param data 缓存数据
       */
      set(name, data) {
        this.remove(name);
        if (this.type === 1) {
          sessionStorage.setItem(name, JSON.stringify(data));
        } else if (this.type === 2) {
          localStorage.setItem(name, JSON.stringify(data));
        }
      }

      /**
       * 获取缓存
       * @param name 缓存的key
       * @returns {any}
       */
      get(name) {
        if (this.type === 1) {
          let value = sessionStorage.getItem(name);
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        } else if (this.type === 2) {
          let value = localStorage.getItem(name);
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
      }

      /**
       * 删除缓存
       * @param name
       */
      remove(name) {
        if (this.type === 1) {
          sessionStorage.removeItem(name);
        } else if (this.type === 2) {
          localStorage.removeItem(name);
        }
      }

      /**
       * 同时删除 sessionStorage和localStorage缓存
       * @param name
       */
      static removeBoth(name) {
        sessionStorage.removeItem(name);
        localStorage.removeItem(name);
      }
    }

    /* global bootstrap OverlayScrollbarsGlobal  */
    const NAME$4 = 'Layout';
    const DATA_KEY$6 = 'bsa.layout';
    const THEME_CACHE_KEY = 'theme';
    const SELECTOR_QUICKTAB$1 = '.qtab';
    const SELECTOR_BACK_TO_TOP = '.bsa-back-to-top';
    const JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];

    //用于实现密码点击显示/隐藏
    const SELECTOR_LOGIN_PASSWORD = '.bsa-show_hide_password span';
    //装载器
    const SELECTOR_PRELOADER = '.bsa-preloader';

    //侧边栏滚动区域选择器
    const SELECTOR_SIDEBAR_SCROLL_AREA = '.bsa-sidebar> .card > .card-body';
    const Default$4 = {
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
    };

    //滚动条插件对象
    let OverlayScrollbars = null;

    //侧边栏滚动条插件的示例对象
    let sidebarOsInstance = null;
    class Layout {
      constructor(element, config) {
        this._config = config;
        this._element = element;
        let cacheType = 1;
        //换成实例化
        if (this._config.themeCacheType === 'localStorage') {
          cacheType = 2;
        } else if (this._config.themeCacheType === 'sessionStorage') {
          cacheType = 1;
        }
        this.Storge = new Storage(cacheType);
        let theme = this.Storge.get(THEME_CACHE_KEY);
        if (theme === null) {
          //设置主题
          $('html').attr('data-bs-theme', this._config.theme);
        } else {
          //让主题色选中
          $(`.bsa-theme-switcher-wrapper input[type="checkbox"][value=${theme}]`).prop('checked', true);
          //设置主题
          $('html').attr('data-bs-theme', theme);
        }
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
        //启用提示
        $('[data-bs-toggle="tooltip"]').each(function (i, el) {
          new bootstrap.Tooltip(el);
        });

        //启用弹出层工具
        $('[data-bs-toggle="popover"]').each(function (i, el) {
          new bootstrap.Popover(el);
        });

        //禁止所有的input框记忆,优化体验，否则会有烦人提示
        $('input').attr('AutoComplete', 'off');

        //禁止action为#的无效表单提交
        $(document).on('submit', 'form[action="#"]', function (e) {
          e.preventDefault();
        });

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
              $bsaLayout1Left.removeClass('open');

              //移除遮罩层
              $('.bsa-mask').remove();
            } else {
              $bsaLayout1Left.addClass('open');
              let maskStr = '<div class="bsa-mask"></div>';
              let $maskStr = $(maskStr);
              $maskStr.css('zIndex', 1011);
              // 绑定点击事件
              $maskStr.on('click', function () {
                $bsaLayout1Left.removeClass('open');
                $(this).remove();
              });

              // 把 DOM 元素添加到页面中
              $('body').append($maskStr);
            }
          } else {
            $('.bsa-layout1').toggleClass('collapsed');
          }
        });

        // 布局2的左侧js逻辑
        $(document).on('click', '.bsa-layout2-left .bsa-chevron-toggle', function (e) {
          e.preventDefault();
          let w = $(window).width();
          if (w < 992) {
            let $bsaLayout2Left = $('.bsa-layout2-left');
            let $bsaLayout2Right = $('.bsa-layout2-right');
            $bsaLayout2Right.removeClass('right-open');
            if ($bsaLayout2Left.hasClass('left-open')) {
              $bsaLayout2Left.removeClass('left-open');
              $('.bsa-mask').remove();
            } else {
              $bsaLayout2Left.addClass('left-open');
              if ($('.bsa-mask').length === 0) {
                let maskStr = '<div class="bsa-mask"></div>';
                let $maskStr = $(maskStr);
                $maskStr.css('zIndex', 1011);
                $maskStr.on('click', function () {
                  $bsaLayout2Left.removeClass('left-open');
                  $bsaLayout2Right.removeClass('right-open');
                  $(this).remove();
                });
                $('body').append($maskStr);
              }
            }
          } else {
            $('.bsa-layout2').toggleClass('left-collapsed');
          }
        });

        // 布局2的右侧js逻辑
        $(document).on('click', '.bsa-layout2-right .bsa-chevron-toggle', function (e) {
          e.preventDefault();
          let w = $(window).width();
          if (w < 992) {
            let $bsaLayout2Left = $('.bsa-layout2-left');
            let $bsaLayout2Right = $('.bsa-layout2-right');
            $bsaLayout2Left.removeClass('left-open');
            if ($bsaLayout2Right.hasClass('right-open')) {
              $bsaLayout2Right.removeClass('right-open');
              $('.bsa-mask').remove();
            } else {
              $bsaLayout2Right.addClass('right-open');
              if ($('.bsa-mask').length === 0) {
                let maskStr = '<div class="bsa-mask"></div>';
                let $maskStr = $(maskStr);
                $maskStr.css('zIndex', 1011);
                $maskStr.on('click', function () {
                  $bsaLayout2Left.removeClass('left-open');
                  $bsaLayout2Right.removeClass('right-open');
                  $(this).remove();
                });
                $('body').append($maskStr);
              }
            }
          } else {
            $('.bsa-layout2').toggleClass('right-collapsed');
          }
        });

        // 布局3的逻辑部分
        $(document).on('click', '.bsa-layout3-right .bsa-chevron-toggle', function (e) {
          e.preventDefault();
          let w = $(window).width();
          if (w < 992) {
            let $bsaLayout3Right = $('.bsa-layout3-right');
            if ($bsaLayout3Right.hasClass('open')) {
              $bsaLayout3Right.removeClass('open');
              //移除遮罩层
              $('.bsa-mask').remove();
            } else {
              $bsaLayout3Right.addClass('open');
              let maskStr = '<div class="bsa-mask"></div>';
              let $maskStr = $(maskStr);
              $maskStr.css('zIndex', 1011);
              // 绑定点击事件
              $maskStr.on('click', function () {
                $bsaLayout3Right.removeClass('open');
                $(this).remove();
              });

              // 把 DOM 元素添加到页面中
              $('body').append($maskStr);
            }
          } else {
            $('.bsa-layout3').toggleClass('collapsed');
          }
        });

        //回到顶部逻辑部分
        $(window).on('scroll', function () {
          $(this).scrollTop() > 300 ? $(SELECTOR_BACK_TO_TOP).fadeIn() : $(SELECTOR_BACK_TO_TOP).fadeOut();
        });
        $(SELECTOR_BACK_TO_TOP).on('click', function () {
          $('html').animate({
            scrollTop: 0
          }, 600);
        });
      }

      // 首页需要执行的方法
      _index() {
        let _this = this;

        //给滚动条注册插件
        if (typeof OverlayScrollbarsGlobal !== 'undefined') {
          OverlayScrollbars = OverlayScrollbarsGlobal.OverlayScrollbars;

          //给滚动条对象注册插件
          OverlayScrollbars.plugin([OverlayScrollbarsGlobal.ScrollbarsHidingPlugin, OverlayScrollbarsGlobal.SizeObserverPlugin, OverlayScrollbarsGlobal.ClickScrollPlugin]);

          //侧边栏滚动区域
          if ($(SELECTOR_SIDEBAR_SCROLL_AREA).length !== 0) {
            //导航菜单滚动条插件
            sidebarOsInstance = OverlayScrollbars($(SELECTOR_SIDEBAR_SCROLL_AREA)[0], {
              overflow: {
                x: 'hidden',
                y: 'scroll'
              },
              scrollbars: {
                //never scroll leave move
                autoHide: _this._config.scrollbarAutoHide,
                //是否可以点击轨道滚动
                clickScroll: true,
                //隐藏滚动条的时间
                autoHideDelay: _this._config.scrollbarAutoHideDelay
              }
            });
          }
        }

        //头部下拉菜单滚动条
        $('.bsa-header .card-body').each(function (index, element) {
          OverlayScrollbars(element, {
            overflow: {
              x: 'hidden',
              y: 'scroll'
            },
            scrollbars: {
              //never scroll leave move
              autoHide: _this._config.scrollbarAutoHide,
              clickScroll: true,
              //隐藏滚动条的时间
              autoHideDelay: _this._config.scrollbarAutoHideDelay
            }
          });
        });

        // 监听全屏事件
        $(document).on('fullscreenchange', function () {
          if (document.fullscreenElement == null) {
            //退出全屏
            $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-fullscreen-exit').addClass('bi-arrows-fullscreen');
          } else {
            $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-arrows-fullscreen').addClass('bi-fullscreen-exit');
          }
        });

        //全屏
        $('.bsa-fullscreen-toggler').on('click', function () {
          if ($(this).find('.bi-arrows-fullscreen').length > 0) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        });

        //处理主题色的复选框
        $('.bsa-theme-switcher-wrapper input[type="checkbox"]').click(function () {
          // 如果当前复选框被选中
          if ($(this).is(':checked')) {
            let theme = $(this).attr('value');

            // 取消其他复选框的选中状态
            $('.bsa-theme-switcher-wrapper input[type="checkbox"]').not(this).prop('checked', false);

            //存入缓存
            _this.Storge.set(THEME_CACHE_KEY, theme);

            //修改主题
            $('html').attr('data-bs-theme', theme);

            //tab内部也需要修改主题
            if ($(SELECTOR_QUICKTAB$1).length !== 0 && _this._config.tabPageEnableTheme === true) {
              Quicktab.get(SELECTOR_QUICKTAB$1).setTab(function (tabs) {
                for (let tab of tabs) {
                  if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                    _this._setIframeTheme(tab.tabIFrame.el, theme);
                  }
                }
              });
            }
          } else {
            _this.Storge.remove(THEME_CACHE_KEY);
            $('html').attr('data-bs-theme', _this._config.theme);
            //tab内部也需要修改主题
            if ($(SELECTOR_QUICKTAB$1).length !== 0 && _this._config.tabPageEnableTheme === true) {
              Quicktab.get(SELECTOR_QUICKTAB$1).setTab(function (tabs) {
                for (let tab of tabs) {
                  if (tab.tabIFrame.el !== null && tab.tabIFrame.canAccess === true) {
                    _this._setIframeTheme(tab.tabIFrame.el, _this._config.theme);
                  }
                }
              });
            }
          }
        });

        //tab插件初始化
        if ($(SELECTOR_QUICKTAB$1).length !== 0 && typeof Quicktab !== 'undefined') {
          new Quicktab({
            selector: SELECTOR_QUICKTAB$1,
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
                enable: true
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
                }
              }
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
                  $(tab.tabIFrame.el.contentDocument).find('html').attr('data-bs-theme', $(top.window.document).find('html').attr('data-bs-theme'));
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
          });
          el.addEventListener('shown.bs.dropdown', event => {
            _this._hasShowMenu();
          });
        });

        //遮罩层关闭
        setTimeout(() => {
          $(SELECTOR_PRELOADER).fadeOut(_this._config.preloadDuration);
        }, this._config.preloadDuration);
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
            _this._setIframeTheme(iframeEl, theme);
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
        $(a).addClass('active');
        this._openMenu(a);
        if (sidebarOsInstance !== null) {
          //bug: 用a.offsetTop 代替 $(a).position().top 避免 后者它有时候会得到0的结果
          sidebarOsInstance.elements().viewport.scrollTo({
            top: a.offsetTop
          });
        }
      }

      // Static
      static _jQueryInterface(config) {
        for (const element of this) {
          let $element = $(element);
          let data = $element.data(DATA_KEY$6);
          const _config = $.extend({}, Default$4, typeof config === 'object' ? config : $element.data());
          if (!data) {
            //没有就new
            data = new Layout($element, _config);

            //赋值给data,供给下次调用
            $element.data(DATA_KEY$6, data);

            //调用内部的私有方法,初始化，执行必须执行的方法
            data._init();
          }
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`方法 "${config}" 不存在`);
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
    });

    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME$4] = Layout._jQueryInterface;
    $.fn[NAME$4].Constructor = Layout;
    $.fn[NAME$4].noConflict = function () {
      $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Layout._jQueryInterface;
    };

    const NAME$3 = 'NavbarSearch';
    const DATA_KEY$5 = 'bsa.navbar-search';
    const JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];

    // 搜索事件触发
    const EVENT_SEARCH = 'search.bsa.navbar-search';
    const SELECTOR_DATA_TOGGLE$2 = '[data-bsa-toggle="navbar-search"]';
    const SELECTOR_SEARCH_TRIGGER = '.bsa-search-form-toggler';

    // 展开时的类名
    const CLASS_NAME_OPEN = 'open';
    const Default$3 = {
      //关闭时重置
      closeReset: false,
      //触发器
      trigger: SELECTOR_SEARCH_TRIGGER
    };
    class NavbarSearch {
      constructor(_element, _options) {
        this._element = _element;
        this._config = _options;
        this._$input = this._element.find('input.bsa-input-search');
      }

      // Public

      open() {
        this._element.addClass(CLASS_NAME_OPEN);
      }
      close() {
        this._element.removeClass(CLASS_NAME_OPEN);
        if (this._config.closeReset === true) {
          this._$input.val('');
        }
      }
      toggle() {
        if (this._element.hasClass(CLASS_NAME_OPEN)) {
          this.close();
        } else {
          this.open();
        }
      }
      _triggerSearch(inputValue) {
        const searchEvent = $.Event(EVENT_SEARCH);
        $(this._element).trigger(searchEvent, [inputValue, $(this._element).data()]);
      }
      _init() {
        let _this = this;

        //给input框绑定key事件
        _this._$input.on('keydown', function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            let inputVal = $.trim(_this._$input.val());
            if (inputVal !== '') {
              _this._triggerSearch(inputVal);
            }
          }
        });

        //给搜索图标绑定点击事件
        $(document).on('click', '.bsa-search-submit-btn', function (e) {
          e.preventDefault();
          let inputVal = $.trim(_this._$input.val());
          if (inputVal !== '') {
            _this._triggerSearch(inputVal);
          }
        });

        //给关闭按钮绑定点击事件
        $(document).on('click', '.bsa-search-close-btn', function (e) {
          e.preventDefault();
          _this.close();
        });

        //给触发器绑定事件

        $(document).on('click', _this._config.trigger, function (e) {
          e.preventDefault();
          _this.open();
        });
      }

      // Static
      static _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY$5);
          const _config = $.extend({}, Default$3, typeof config === 'object' ? config : $(this).data());
          if (!data) {
            data = new NavbarSearch($(this), _config);
            $(this).data(DATA_KEY$5, data);
            data._init();
          } else if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          } else if (typeof config === 'undefined') {
            data._init();
          }
        });
      }
    }

    /**
     * Data API
     * ====================================================
     */

    $(window).on('load', () => {
      if (Helper.isIndex()) {
        NavbarSearch._jQueryInterface.call($(SELECTOR_DATA_TOGGLE$2));
      }
    });

    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME$3] = NavbarSearch._jQueryInterface;
    $.fn[NAME$3].Constructor = NavbarSearch;
    $.fn[NAME$3].noConflict = function () {
      $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return NavbarSearch._jQueryInterface;
    };

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    var freeGlobal$1 = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal$1 || freeSelf || Function('return this')();

    var root$1 = root;

    /** Built-in value references. */
    var Symbol = root$1.Symbol;

    var Symbol$1 = Symbol;

    /** Used for built-in method references. */
    var objectProto$b = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$b.toString;

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$a = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$a.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag$1 = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root$1['__core-js_shared__'];

    var coreJsData$1 = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used for built-in method references. */
    var funcProto$2 = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$2 = funcProto$2.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$2.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$9 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var defineProperty$1 = defineProperty;

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty$1) {
        defineProperty$1(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
      return defineProperty$1(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    var baseSetToString$1 = baseSetToString;

    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString$1);

    var setToString$1 = setToString;

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString$1(overRest(func, start, identity), func + '');
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
    }

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag$1;
    }

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$6.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    var isArguments$1 = isArguments;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray$1 = isArray;

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /** Detect free variable `exports`. */
    var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

    /** Built-in value references. */
    var Buffer = moduleExports$1 ? root$1.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    var isBuffer$1 = isBuffer;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag$1 = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && freeGlobal$1.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    var nodeUtil$1 = nodeUtil;

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    var isTypedArray$1 = isTypedArray;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray$1(value),
          isArg = !isArr && isArguments$1(value),
          isBuff = !isArr && !isArg && isBuffer$1(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$5.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

      return value === proto;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    var assignInWith$1 = assignInWith;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    var getPrototype$1 = getPrototype;

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto$3 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype$1(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$3.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /** `Object#toString` result references. */
    var domExcTag = '[object DOMException]',
        errorTag = '[object Error]';

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    var attempt$1 = attempt;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto$2[key]) && !hasOwnProperty$2.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /** Used to escape characters for inclusion in compiled string literals. */
    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };

    /**
     * Used by `_.template` to escape characters for inclusion in compiled string literals.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar(chr) {
      return '\\' + stringEscapes[chr];
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);

    var nativeKeys$1 = nativeKeys;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys$1(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$1.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /** Used to match template delimiters. */
    var reInterpolate = /<%=([\s\S]+?)%>/g;

    var reInterpolate$1 = reInterpolate;

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }

    /** Used to map characters to HTML entities. */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /**
     * Used by `_.escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    var escapeHtmlChar = basePropertyOf(htmlEscapes);

    var escapeHtmlChar$1 = escapeHtmlChar;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray$1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /** Used to match HTML entities and HTML characters. */
    var reUnescapedHtml = /[&<>"']/g,
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar$1)
        : string;
    }

    /** Used to match template delimiters. */
    var reEscape = /<%-([\s\S]+?)%>/g;

    var reEscape$1 = reEscape;

    /** Used to match template delimiters. */
    var reEvaluate = /<%([\s\S]+?)%>/g;

    var reEvaluate$1 = reEvaluate;

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    var templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape$1,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate$1,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate$1,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': { 'escape': escape }
      }
    };

    var templateSettings$1 = templateSettings;

    /** Error message constants. */
    var INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

    /** Used to match empty string literals in compiled template source. */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /**
     * Used to validate the `validate` option in `_.template` variable.
     *
     * Forbids characters which could potentially change the meaning of the function argument definition:
     * - "()," (modification of function parameters)
     * - "=" (default value)
     * - "[]{}" (destructuring of function parameters)
     * - "/" (beginning of a comment)
     * - whitespace
     */
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

    /**
     * Used to match
     * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
     */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

    /** Used to ensure capturing order of template delimiters. */
    var reNoMatch = /($^)/;

    /** Used to match unescaped characters in compiled string literals. */
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = templateSettings$1.imports._.templateSettings || templateSettings$1;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith$1({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith$1({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate$1 ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
      // and escape the comment, thus injecting code that gets evaled.
      var sourceURL = hasOwnProperty.call(options, 'sourceURL')
        ? ('//# sourceURL=' +
           (options.sourceURL + '').replace(/\s/g, ' ') +
           '\n')
        : '';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Throw an error if a forbidden character was found in `variable`, to prevent
      // potential command injection attacks.
      else if (reForbiddenIdentifierChars.test(variable)) {
        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
      }

      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt$1(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /* global bootstrap   */


    // toast组件的模板
    const TPL$1 = `
              <div class="toast <%= toastClass %>  overflow-hidden" id="<%= id %>"  role="alert" aria-live="assertive" aria-atomic="true">

                <% if ( config.content !== '') { %>
                    <div class="toast-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <span><%= config.content %></span>
                            <% if ( config.btnClose === true ) { %>
                            <button type="button" class="btn-close <% if ( enableBtnCloseWhite ) { %> btn-close-white  <% } %>" data-bs-dismiss="toast" aria-label="Close"></button>
                             <% } %>
                        </div>
                    </div>
                <% }else { %>

                <% if ( config.image !== '' || config.title !== '' ) { %>
                    <div class="toast-header">
                      <% if ( config.image !== '' ) { %>
                      <img src="<%= config.image %>" style="height: <%= config.imageHeight %>" class="rounded me-2" alt="<%= config.imageAlt %>">
                      <% } %>
                      <strong class="me-auto"><%= config.title %></strong>
                      <small><%= config.subTitle %></small>
                      <% if ( config.btnClose === true ) { %>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                      <% } %>
                    </div>
                    <% } %>

                    <div class="toast-body">
                    <%= config.body %>
                    </div>

                <% } %>

                <% if ( config.autohide === true ) { %>
                    <div style="height: 4px" class="progress" role="progressbar">
                        <div class="progress-bar progress-bar-striped progress-bar-animated <%= progressClass %>"
                        style="animation: progress <%= config.delay %>ms linear forwards">
                        </div>
                    </div>
                <% } %>
              </div>`;

    //用于唯一id标志累计
    let i$2 = 0;
    class Toasts {
      constructor(config) {
        // let _this = this;
        this._config = config;
        i$2++;

        //准备容器
        this._buildContainer();

        //得到一个唯一id,用于查找dom
        this.id = 'bsa-toast-' + i$2;

        //模板引擎来组合dom
        let tpl = template(TPL$1)({
          id: this.id,
          config: this._config,
          toastClass: this._getToastColorSchemesClass(),
          progressClass: this._getProgressClassColorSchemesClass(),
          enableBtnCloseWhite: this._enableBtnCloseWhite()
        });
        let containerSelecter = this._getContainerClass();

        //找到这个容器并把toast插入进去
        $(`.toast-container.${containerSelecter}`).append(tpl);

        //再次查找dom并存到对象属性上
        this.element = document.getElementById(this.id);

        //nwe bootstrap的Toast实例
        this.bootstrapToast = new bootstrap.Toast(this.element, {
          animation: this._config.animation,
          autohide: false
        });

        //事件注册和监听

        //进度条事件处理,必须要autohide===true的时候才会启用此选项
        if (this._config.autohide === true) {
          this._progressEvent();
        }
        this.element.addEventListener('show.bs.toast', () => {
          if (this._config.onShow !== null) {
            this._config.onShow(this);
          }
        });
        this.element.addEventListener('shown.bs.toast', () => {
          if (this._config.onShown !== null) {
            this._config.onShown(this);
          }
        });
        this.element.addEventListener('hide.bs.toast', () => {
          if (this._config.onHide !== null) {
            this._config.onHide(this);
          }
        });
        this.element.addEventListener('hidden.bs.toast', () => {
          if (this._config.onHidden !== null) {
            this._config.onHidden(this);
          }
        });

        //直接调用显示的方法
        this.bootstrapToast.show();
      }
      _progressEvent() {
        let _this = this;
        if (_this._config.hoverProgressPause === true) {
          $(this.element).mouseenter(() => {
            $(this.element).addClass('bsa-toast-pause');
          });

          //鼠标移出
          $(this.element).mouseleave(() => {
            $(this.element).removeClass('bsa-toast-pause');
          });
        }

        //监听滚动条读条动画完毕事件
        $(this.element).on('animationend', '.progress-bar', function (e) {
          if (e.target === e.currentTarget) {
            //手动隐藏
            _this.hide();
          }
        });
      }
      _getContainerClass(selecterMode = true) {
        //根据访问来取对应的类名
        switch (this._config.placement) {
          case 'top-left':
            return selecterMode ? 'top-0.start-0' : 'top-0 start-0';
          case 'top-center':
            return selecterMode ? 'top-0.start-50.translate-middle-x' : 'top-0 start-50 translate-middle-x';
          case 'top-right':
            return selecterMode ? 'top-0.end-0' : 'top-0 end-0';
          case 'middle-left':
            return selecterMode ? 'top-50.start-0.translate-middle-y' : 'top-50 start-0 translate-middle-y';
          case 'middle-center':
            return selecterMode ? 'top-50.start-50.translate-middle' : 'top-50 start-50 translate-middle';
          case 'middle-right':
            return selecterMode ? 'top-50.end-0.translate-middle-y' : 'top-50 end-0 translate-middle-y';
          case 'bottom-left':
            return selecterMode ? 'bottom-0.start-0' : 'bottom-0 start-0';
          case 'bottom-center':
            return selecterMode ? 'bottom-0.start-50.translate-middle-x' : 'bottom-0 start-50 translate-middle-x';
          case 'bottom-right':
            return selecterMode ? 'bottom-0.end-0' : 'bottom-0 end-0';
          default:
            return selecterMode ? 'top-0.end-0' : 'top-0 end-0';
        }
      }
      _getToastColorSchemesClass() {
        //根据访问来取对应的类名
        switch (this._config.type) {
          case 'primary':
            return 'text-bg-primary border-0';
          case 'secondary':
            return 'text-bg-secondary border-0';
          case 'success':
            return 'text-bg-success border-0';
          case 'danger':
            return 'text-bg-danger border-0';
          case 'warning':
            return 'text-bg-warning border-0';
          case 'info':
            return 'text-bg-info border-0';
          case 'dark':
            return 'text-bg-dark border-0';
          case 'light':
            return 'text-bg-light border-0';
          default:
            return '';
        }
      }
      _enableBtnCloseWhite() {
        //根据访问来取对应的类名
        switch (this._config.type) {
          case 'primary':
            return true;
          case 'secondary':
            return true;
          case 'success':
            return true;
          case 'danger':
            return true;
          case 'warning':
            return false;
          case 'info':
            return false;
          case 'dark':
            return true;
          case 'light':
            return false;
          default:
            return false;
        }
      }
      _getProgressClassColorSchemesClass() {
        //根据访问来取对应的类名
        switch (this._config.type) {
          case 'primary':
            return 'bg-primary';
          case 'secondary':
            return 'bg-secondary';
          case 'success':
            return 'bg-success';
          case 'danger':
            return 'bg-danger';
          case 'warning':
            return 'bg-warning';
          case 'info':
            return 'bg-info';
          case 'dark':
            return 'bg-dark';
          case 'light':
            //如果是light那么给进度条变成bg-secondary 因为 bg-light根本看不见
            return 'bg-secondary';
          default:
            return '';
        }
      }
      _buildContainer() {
        //判断容器是否存在，存在就创建并添加到body中
        let containerSelecter = this._getContainerClass();
        let containerClass = this._getContainerClass(false);
        let containerDomStr = ` <div class="toast-container position-fixed ${containerClass}  p-3"></div>`;
        if ($(`.toast-container.${containerSelecter}`).length === 0) {
          $(containerDomStr).appendTo('body');
        }
      }
      hide() {
        this.bootstrapToast.hide();
      }
    }
    $.extend({
      toasts: function (options, option2) {
        let def = $.extend({}, $.toasts.default, options);

        //new实例
        return new Toasts(def);
      }
    });
    $.toasts.default = {
      //鼠标移入进度条暂停
      hoverProgressPause: true,
      //toast是否添加关闭按钮
      btnClose: true,
      //标题
      title: '',
      //内容
      content: '',
      //图片
      image: '',
      //图片的高度
      imageHeight: '25px',
      imageAlt: '',
      //副标题
      subTitle: '',
      //正文内容此选项完全可以自定义body的内容
      body: '',
      //index
      zIndex: 1081,
      //将过渡应用到吐司
      animation: true,
      //自动隐藏吐司
      autohide: true,
      //延迟隐藏吐司（毫秒）
      delay: 1500,
      //方位 可用值：top-left,top-center, top-left, middle-left,middle-center,middle-right,bottom-left,bottom-center,bottom-right
      placement: 'top-right',
      //情景模式
      type: 'primary',
      //事件
      onShow: null,
      onShown: null,
      onHide: null,
      onHidden: null
    };

    const NAME$2 = 'PushMenu';
    const DATA_KEY$4 = 'bsa.pushmenu';
    const EVENT_KEY$1 = `.${DATA_KEY$4}`;
    const JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];

    //折叠开始
    const EVENT_COLLAPSE = `collapse${EVENT_KEY$1}`;
    //折叠完毕
    const EVENT_COLLAPSED$1 = `collapsed${EVENT_KEY$1}`;

    //展开开始
    const EVENT_EXPAND = `expand${EVENT_KEY$1}`;

    //展开完毕
    const EVENT_EXPANDED$1 = `expanded${EVENT_KEY$1}`;
    const SELECTOR_TOGGLE_BUTTON = '[data-bsa-toggle="pushmenu"]';

    //侧边栏选择器
    const SELECTOR_SIDEBAR = '.bsa-sidebar';
    const SELECTOR_MASK = '.bsa-mask';
    //折叠类名
    const CLASS_NAME_COLLAPSED = 'open';
    const Default$2 = {
      //过渡的动画时间
      animationSpeed: 300
    };
    class PushMenu {
      constructor(element, options) {
        this._element = element;
        this._options = options;
        this._addTransition();
      }

      // Public

      expand() {
        let w = $(window).width();
        if (w < 992) {
          //事件
          $(this._element).trigger($.Event(EVENT_EXPAND));

          // 展开
          $('.bsa-sidebar').addClass(CLASS_NAME_COLLAPSED);
          $(SELECTOR_SIDEBAR).data('isOpen', true);
          //添加遮罩层
          this._addOverlay();
        }
      }
      collapse() {
        let w = $(window).width();
        if (w < 992) {
          $(this._element).trigger($.Event(EVENT_COLLAPSE));
          $(SELECTOR_SIDEBAR).removeClass(CLASS_NAME_COLLAPSED);
          $(SELECTOR_SIDEBAR).data('isOpen', false);
          //同时移除遮罩层
          $(SELECTOR_MASK).remove();
        }
      }
      toggle() {
        if ($(SELECTOR_SIDEBAR).hasClass(CLASS_NAME_COLLAPSED)) {
          this.collapse();
        } else {
          this.expand();
        }
      }

      // Private
      _addTransition() {
        $(SELECTOR_SIDEBAR).css({
          'transition': `${this._options.animationSpeed}ms transform`
        });
      }
      _addOverlay() {
        if ($(SELECTOR_MASK).length === 0) {
          $('<div class="bsa-mask"></div>').prependTo('body');
        }
      }
      _init() {
        let _this = this;

        //遮罩层关闭事件
        $(document).on('click', SELECTOR_MASK, function (e) {
          e.preventDefault();
          _this.collapse();
        });

        //监听过渡事件
        $(document).on('transitionend', SELECTOR_SIDEBAR, function (e) {
          if (e.target === e.currentTarget) {
            const expandedEvent = $.Event(EVENT_EXPANDED$1);
            const collapsedEvent = $.Event(EVENT_COLLAPSED$1);

            //判断是展开还是折叠
            if ($(e.target).data('isOpen')) {
              $(_this._element).trigger(expandedEvent);
            } else {
              $(_this._element).trigger(collapsedEvent);
            }
          }
        });
        $(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
          event.preventDefault();
          _this.toggle();
        });
      }

      // Static
      static _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY$4);
          const _config = $.extend({}, Default$2, typeof config === 'object' ? config : $(this).data());
          if (!data) {
            data = new PushMenu($(this), _config);
            $(this).data(DATA_KEY$4, data);
            data._init();
          } else if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          } else if (typeof config === 'undefined') {
            data._init();
          }
        });
      }
    }

    /**
     * Data API
     * ====================================================
     */

    $(window).on('load', () => {
      if (Helper.isIndex()) {
        PushMenu._jQueryInterface.call($(SELECTOR_TOGGLE_BUTTON));
      }
    });

    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME$2] = PushMenu._jQueryInterface;
    $.fn[NAME$2].Constructor = PushMenu;
    $.fn[NAME$2].noConflict = function () {
      $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return PushMenu._jQueryInterface;
    };

    const SELECTOR_QUICKTAB = '.qtab';
    const NAME$1 = 'Sidebar';
    const DATA_KEY$3 = 'bsa.sidebar';
    const EVENT_KEY = `.${DATA_KEY$3}`;
    const JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    const EVENT_EXPANDED = `expanded${EVENT_KEY}`;
    const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`;
    const SELECTOR_DATA_TOGGLE$1 = '[data-bsa-toggle="sidebar"]';
    const Default$1 = {
      //点击是否自动关闭侧边栏
      clickClose: false,
      //动画速度,单位毫秒
      animationSpeed: 150,
      //是否启用手风琴模式
      accordion: true
    };
    class Sidebar {
      constructor(element, config) {
        this._config = config;
        this._element = element;
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
          $element.css({
            'height': 0
          });

          //触发重绘
          void element.scrollHeight;
          $element.css({
            'transition-timing-function': 'ease',
            'transition-duration': `${_this._config.animationSpeed}ms`,
            'transition-property': 'height',
            'display': 'block',
            'height': scrollHeight
          });
        });
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
          });
          void element.scrollHeight;
          $element.css({
            'height': 0
          });
        });
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
              $(_this._element).trigger(expandedEvent);
            } else {
              $(_this._element).trigger(collapsedEvent);
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
            _this.collapse($pSiblingsOpenA);
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
        if ($(SELECTOR_QUICKTAB).length !== 0 && typeof Quicktab !== 'undefined') {
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
              $('[data-bsa-toggle="pushmenu"]').PushMenu('collapse');
            }

            //添加tab处理
            Quicktab.get('.qtab').addTab({
              title: this.innerText,
              url: this.getAttribute('href'),
              close: true
            });
          });
        }
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
        });
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
          let data = $element.data(DATA_KEY$3);
          let _config = $.extend({}, Default$1, typeof config === 'object' ? config : $element.data());
          if (_config.animationSpeed < 150) {
            _config.animationSpeed = 150;
          }
          if (!data) {
            //没有就new
            data = new Sidebar($element, _config);

            //赋值给data,供给下次调用
            $element.data(DATA_KEY$3, data);

            //调用内部的私有方法,初始化，执行必须执行的方法
            data._init();
          }
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError(`方法 "${config}" 不存在`);
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
        $(SELECTOR_DATA_TOGGLE$1).each(function () {
          Sidebar._jQueryInterface.call($(this));
        });
      }
    });

    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME$1] = Sidebar._jQueryInterface;
    $.fn[NAME$1].Constructor = Sidebar;
    $.fn[NAME$1].noConflict = function () {
      $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Sidebar._jQueryInterface;
    };

    /* global bootstrap   */

    const DATA_KEY$2 = 'bsa.modal';
    const MODAL_CLASS = 'bsa-modal';
    const IFrameTpl = '<iframe src="<%= config.url %>" class="d-block w-100 h-100"></iframe>';

    // 遮罩层
    const maskTpl = ` <div class="w-100 h-100  bg-body-tertiary d-flex align-items-center justify-content-center mask z-1 position-absolute start-0 top-0 end-0 bottom-0">
                           <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                           </div>
                        </div>`;

    //模态框模板
    const TPL = `
    <div class="modal ${MODAL_CLASS} <%= config.modalClass %>" id="<%= id %>"   tabindex="-1" aria-labelledby="<%= id %>Label" aria-hidden="true">
        <div class="modal-dialog <% if ( config.url !== '' ) { %> modal-dialog-centered   <% } %> <%= config.modalDialogClass %>">
            <div class="modal-content">
                <div class="modal-header">
                   <h1 class="modal-title fs-5" id="<%= id %>Label">
                   <% if ( config.url !== '' && config.title === '' ) { %>
                        <%= _htmlspecialchars(config.url) %>
                   <% }else if ( config.url === '' && config.title === '' ) { %>
                        提示
                   <% } else { %>
                        <%= _htmlspecialchars(config.title) %>
                   <% } %>
                    </h1>

                   <% if ( config.url === '' ) { %>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   <% }else { %>
                        <div class="d-flex align-items-center gap-3 fs-5">
                        <i class="bi bi-arrow-clockwise btn-refresh" role="button"></i>
                        <% if ( !config.modalDialogClass.trim().split(/\\s+/).includes('modal-fullscreen') ) { %>
                         <i class="bi bi-fullscreen btn-fullscreen" role="button"></i>
                        <% } %>
                         <i class="bi bi-x-circle" role="button" data-bs-dismiss="modal"></i>
                        </div>
                   <% } %>


                </div>

                <% if ( config.url !== '' ) { %>
                <div class="modal-body p-0 overflow-hidden">
                    <div class="iframe-wrapper">
                        ${maskTpl}
                     </div>
                </div>
                <% }else{ %>
                <div class="modal-body">
                    <%= config.body %>
                </div>
                <% } %>

                <% if( Array.isArray(config.buttons) && config.buttons.length !== 0 ) { %>
                <div class="modal-footer">
                    <% _each(config.buttons, function (index,item) { %>
                      <button type="button" data-key="<%= index %>" class="btn <%= item.class %>"><%= item.text %></button>
                    <% });%>
                </div>
                <% }else if( !(Array.isArray(config.buttons) && config.buttons.length === 0) ) { %>
                 <div class="modal-footer">
                    <button type="button" data-key="ok" data-bs-dismiss="modal" class="btn <%= config.btnOKClass %>"><%= config.btnOKText %></button>
                    <% if ( config.cancelBtn === true ) { %>
                    <button type="button" data-key="cancel" data-bs-dismiss="modal" class="btn <%= config.btnCancelClass %>"><%= config.btnCancelText %></button>
                    <% } %>
                </div>
                <% } %>
            </div>
        </div>
    </div>`;

    //进行累计
    let i$1 = 0;
    class Modal {
      //构造函数
      constructor(options) {
        this._config = options;

        //唯一id
        this.id = MODAL_CLASS + '-' + i$1;
        i$1++;

        //显示modal框
        this.show();
      }

      // 事件注册程序
      _eventRegister() {
        let _this = this;
        this._element.addEventListener('hide.bs.modal', function (event) {
          if (_this._config.onHide !== null) {
            _this._config.onHide(_this);
          }
        });

        //监听
        this._element.addEventListener('hidden.bs.modal', function (event) {
          //调用隐藏完毕的回调
          if (_this._config.onHidden !== null) {
            _this._config.onHidden(_this, $(_this._element).data(DATA_KEY$2));
          }
          const modalInstance = bootstrap.Modal.getInstance(_this._element);
          if (modalInstance) {
            modalInstance.dispose();
          }
          document.body.removeChild(_this._element);
        });
        this._element.addEventListener('show.bs.modal', function (event) {
          if (_this._config.onShow !== null) {
            _this._config.onShow(_this);
          }
        });
        this._element.addEventListener('shown.bs.modal', function (event) {
          //调用隐藏完毕的回调
          if (_this._config.onShown !== null) {
            _this._config.onShown(_this);
          }
          _this._addIframe();
        });
        _this._iframeAction();

        //按钮区域的事件绑定
        _this._btnEvent();
      }
      _btnEvent() {
        let _this = this;
        $(this._element).on('click', '.modal-footer button', function () {
          let key = $(this).attr('data-key');
          if (['ok', 'cancel'].includes(key)) {
            if (key === 'ok' && _this._config.ok !== null) {
              _this._config.ok(_this);
            }
            if (key === 'cancel' && _this._config.cancel !== null) {
              _this._config.cancel(_this);
            }
          } else {
            //判断action是否为null
            if (_this._config.buttons[key].action !== null) {
              _this._config.buttons[key].action(_this);
            }
          }
        });
      }

      // 添加iframe
      _addIframe() {
        let _this = this;
        let iframe = template(IFrameTpl)({
          id: _this.id,
          config: _this._config
        });
        let $ifd = $(iframe);
        $ifd.on('load', function () {
          //读取本地的主题,回显主题，判断是否是跨域的iframe,如果不是跨域的iframe就根据传入的配置决定是否自动加主题

          if (_this._config.iframeInnerTheme === true) {
            let iframe = this;
            if (Helper.canAccessIFrame(iframe)) {
              //不是跨域的iframe

              $(iframe.contentDocument).find('html').attr('data-bs-theme', $(top.window.document).find('html').attr('data-bs-theme'));
            }
          }

          //移除遮罩层
          $(_this._element).find('.iframe-wrapper .mask').fadeOut(function () {
            this.remove();
          });
        });
        $ifd.prependTo($(_this._element).find('.iframe-wrapper'));
      }

      // 最大化 刷新按钮操作
      _iframeAction() {
        let _this = this;

        //刷新处理
        $(this._element).on('click', '.modal-header .btn-refresh', function () {
          //先判断遮罩层是否已经存在，如果已经存在就给它删除
          if (_this._getMask().length > 0) {
            _this._removeMask();
          }

          //插入遮罩层
          $(maskTpl).prependTo($(_this._element).find('.iframe-wrapper'));

          //判断是否是跨域的iframe,如果是跨域的就直接移除重新添加
          if (Helper.canAccessIFrame(_this._getIframe()[0])) {
            _this._getIframe()[0].contentWindow.location.reload();
          } else {
            //移除iframe
            _this._getIframe().remove();
            _this._addIframe();
          }
        });

        //全屏处理
        $(this._element).on('click', '.modal-header .btn-fullscreen', function () {
          let fullBtn = this;
          if ($(fullBtn).hasClass('bi-fullscreen')) {
            $(_this._element).find('.modal-dialog').addClass('modal-fullscreen');
            $(fullBtn).removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');
          } else {
            //给模态框移除全屏的类
            $(_this._element).find('.modal-dialog').removeClass('modal-fullscreen');
            $(fullBtn).removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
          }
        });
      }
      _getIframe() {
        return $(this._element).find('.iframe-wrapper iframe');
      }
      _getMask() {
        return $(this._element).find('.iframe-wrapper .mask');
      }
      _removeMask() {
        this._getMask().remove();
      }
      show() {
        //创建容器
        this._createModalElement();
        let modalInstance = new bootstrap.Modal(this._element, this._config.modalOptions);
        if (modalInstance) {
          modalInstance.show();
        }
      }
      close() {
        const modalInstance = bootstrap.Modal.getInstance(this._element);
        if (modalInstance) {
          // modalInstance.dispose();
          modalInstance.hide();
        }
        // document.body.removeChild(this._element);
        // if (this.options.onDispose) {
        //     this.options.onDispose(this);
        // }
      }

      //设置数据到dom上面
      setData(data) {
        //获取当前的dom
        $(this._element).data(DATA_KEY$2, data);
      }
      _createModalElement() {
        //模板引擎来组合dom
        let tpl = template(TPL)({
          id: this.id,
          config: this._config,
          _each: $.each,
          _htmlspecialchars: Helper.htmlspecialchars
        });

        //加入到body中放着
        $(tpl).prependTo('body');

        //然后再把dom存起来
        this._element = document.getElementById(this.id);

        //事件监听程序
        this._eventRegister();
      }
    }
    $.extend({
      modal: function (options, option2) {
        let def = $.extend({}, $.modal.default, options);
        let buttonsTemp = [];
        if (Array.isArray(def.buttons) && def.buttons.length > 0) {
          $.each(def.buttons, function (index, item) {
            if (!Helper.isObject(item)) {
              throw new Error('选项buttons数组元素必须是一个对象');
            }
            //按钮的配置来合并
            let btnOpt = $.extend({}, $.modal.btnDefault, item);
            buttonsTemp.push(btnOpt);
          });
          def = Helper.updateObjDataByKey(def, 'buttons', buttonsTemp);
        }

        //new实例
        return new Modal(def);
      }
    });

    //单个按钮的默认值
    $.modal.btnDefault = {
      text: '按钮',
      class: 'btn-light',
      action: null
    };

    //把默认的参数暴露出去
    $.modal.default = {
      //取消按钮的文本
      btnCancelText: '取消',
      //取消按钮的class
      btnCancelClass: 'btn-light',
      //ok按钮的文本
      btnOKText: '确定',
      //ok按钮的class
      btnOKClass: 'btn-primary',
      //默认ok按钮是开启的。如果ok按钮回调存在的话，会调用回调
      ok: null,
      //开启取消按钮
      cancelBtn: false,
      //取消按钮被单击回调
      cancel: null,
      //标题
      title: '',
      //内容
      body: '',
      //iframe 内部是否自动适配bootstrap-admin的多主题
      iframeInnerTheme: true,
      //可以设置按钮对齐方式
      btnAlign: 'right',
      //如果想调整底部按钮的位置，可以这样
      btnSize: 'sm',
      //自定义按钮,默认是null
      buttons: null,
      // ".modal"所在div修饰类  比如:fade
      modalClass: 'fade',
      modalDialogClass: 'modal-dialog-centered modal-sm',
      // ".modal-dialog"所在div修饰类  比如:modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable

      // bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options
      modalOptions: {
        backdrop: true,
        keyboard: true,
        focus: true
      },
      //iframe的url地址,设置它就是设置iframe
      url: '',
      onShow: null,
      onShown: null,
      onHide: null,
      onHidden: null
    };

    //模板
    const LOADINGTPL = `<div class="bsa-loading">
    <div class="spinner-<%= config.type %> text-<%= config.color %> 
    <% if (config.type == 'border' && config.size == 'sm')  { %> spinner-border-sm <% } %>
    <% if (config.type == 'grow' && config.size == 'sm')  { %> spinner-grow-sm <% } %>
    " role="status" <% if ( typeof config.size == 'string' &&  config.size != 'sm')  { %> style="<%= config.size %>" <% } %>>
        <span class="visually-hidden">Loading...</span>
    </div>
</div>`;
    class Loading {
      static show() {
        //根据传入的选项来控制模板
        let tpl = template(LOADINGTPL)({
          config: $.loading._config
        });
        if ($('.bsa-loading').length === 0) {
          $(tpl).prependTo('body');
        }
      }
      static hide() {
        if (typeof $.loading._config === 'undefined') {
          return;
        }
        $('.bsa-loading').remove();
      }
    }
    $.loading = {
      //默认参数
      default: {
        //颜色
        color: 'primary',
        //类型 grow:实心圈  border:空心圈
        type: 'border',
        //尺寸 要根据类型来判断  spinner-grow-sm spinner-border-sm  或者行内样式来控制：style="width: 3rem; height: 3rem;"
        size: null
      },
      show: function (params) {
        //参数合并
        this._config = $.extend({}, this.default, params);
        Loading.show(this._config);
      },
      hide: function () {
        Loading.hide();
      }
    };

    const DATA_KEY$1 = 'bsa.progress';
    class Progress {
      constructor(element, options) {
        this.element = element;
        this.options = options;
      }
      myMethod() {
        console.log('myMethod called');
      }
    }
    $.fn.Progress = function (options) {
      const args = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        let instance = $.data(this, DATA_KEY$1);
        if (!instance) {
          const newInstance = new Progress(this, options);
          $.data(this, DATA_KEY$1, newInstance);
          instance = newInstance;
        }
        if (typeof options === 'string') {
          instance[options].apply(instance, args);
        }
      });
    };
    $.extend($.fn.Progress, Progress.prototype);

    var t=function(){return t=Object.assign||function(t){for(var i,n=1,s=arguments.length;n<s;n++)for(var a in i=arguments[n])Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);return t},t.apply(this,arguments)},i=function(){function i(i,n,s){var a=this;this.endVal=n,this.options=s,this.version="2.6.2",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(t){a.startTime||(a.startTime=t);var i=t-a.startTime;a.remaining=a.duration-i,a.useEasing?a.countDown?a.frameVal=a.startVal-a.easingFn(i,0,a.startVal-a.endVal,a.duration):a.frameVal=a.easingFn(i,a.startVal,a.endVal-a.startVal,a.duration):a.frameVal=a.startVal+(a.endVal-a.startVal)*(i/a.duration);var n=a.countDown?a.frameVal<a.endVal:a.frameVal>a.endVal;a.frameVal=n?a.endVal:a.frameVal,a.frameVal=Number(a.frameVal.toFixed(a.options.decimalPlaces)),a.printValue(a.frameVal),i<a.duration?a.rAF=requestAnimationFrame(a.count):null!==a.finalEndVal?a.update(a.finalEndVal):a.options.onCompleteCallback&&a.options.onCompleteCallback();},this.formatNumber=function(t){var i,n,s,e,o=t<0?"-":"";i=Math.abs(t).toFixed(a.options.decimalPlaces);var r=(i+="").split(".");if(n=r[0],s=r.length>1?a.options.decimal+r[1]:"",a.options.useGrouping){e="";for(var l=3,h=0,u=0,p=n.length;u<p;++u)a.options.useIndianSeparators&&4===u&&(l=2,h=1),0!==u&&h%l==0&&(e=a.options.separator+e),h++,e=n[p-u-1]+e;n=e;}return a.options.numerals&&a.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]})),s=s.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]}))),o+a.options.prefix+n+s+a.options.suffix},this.easeOutExpo=function(t,i,n,s){return n*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=t(t({},this.defaults),s),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof i?document.getElementById(i):i,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined","undefined"!=typeof window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,i):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return a.handleScroll(a)})),window.onscroll=function(){window.onScrollFns.forEach((function(t){return t()}));},this.handleScroll(this)));}return i.prototype.handleScroll=function(t){if(t&&window&&!t.once){var i=window.innerHeight+window.scrollY,n=t.el.getBoundingClientRect(),s=n.top+window.pageYOffset,a=n.top+n.height+window.pageYOffset;a<i&&a>window.scrollY&&t.paused?(t.paused=!1,setTimeout((function(){return t.start()}),t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):(window.scrollY>a||s>i)&&!t.paused&&t.reset();}},i.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2;}else this.endVal=t,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing;},i.prototype.start=function(t){this.error||(t&&(this.options.onCompleteCallback=t),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal));},i.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused;},i.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal);},i.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count));},i.prototype.printValue=function(t){var i;if(this.el){var n=this.formattingFn(t);if(null===(i=this.options.plugin)||void 0===i?void 0:i.render)this.options.plugin.render(this.el,n);else if("INPUT"===this.el.tagName)this.el.value=n;else "text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=n:this.el.innerHTML=n;}},i.prototype.ensureNumber=function(t){return "number"==typeof t&&!isNaN(t)},i.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},i.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration;},i}();

    const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="numspin"]';
    const NAME = 'Numspin';
    const DATA_KEY = 'bsa.numspin';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const Default = {
      //小数点后面的位数
      decimalPlaces: 0,
      //持续时间
      duration: 1.5
    };
    class Numspin {
      constructor(element, options) {
        this.element = element;
        this.options = options;
        this.numAnim = new i(element, $(this.element).text(), options);
      }
      start() {
        if (!this.numAnim.error) {
          this.numAnim.start();
        } else {
          console.error(this.numAnim.error);
        }
      }
      static _jQueryInterface(options) {
        //将函数的参数包装成数组
        const args = Array.prototype.slice.call(arguments, 1);
        for (let element of this) {
          //读取一下实例对象
          let instance = $.data(element, DATA_KEY);
          if (!instance) {
            //如果没有就new

            //先读取一下属性进行合并
            let _options = $.extend({}, Default, typeof options === 'object' ? options : $(element).data());
            const newInstance = new Numspin(element, _options);
            $.data(element, DATA_KEY, newInstance); //再重新设置回去
            instance = newInstance;
          }
          if (typeof options === 'string') {
            //如果是字符串就当作是要调用类的方法

            if (typeof instance[options] === 'undefined') {
              //判断要调用的方法是否存在
              throw new TypeError(`方法 "${options}" 不存在`);
            }
            let res = instance[options].apply(instance, args);
            if (typeof res !== 'undefined') {
              return res;
            }
          }
        }
        return this;
      }
    }
    $(window).on('load', () => {
      $(SELECTOR_DATA_TOGGLE).each(function () {
        Numspin._jQueryInterface.call($(this), 'start');
      });
    });

    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Numspin._jQueryInterface;
    $.fn[NAME].Constructor = Numspin;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Numspin._jQueryInterface;
    };

    exports.Layout = Layout;
    exports.Loading = Loading;
    exports.Modal = Modal;
    exports.NavbarSearch = NavbarSearch;
    exports.Numspin = Numspin;
    exports.Progress = Progress;
    exports.PushMenu = PushMenu;
    exports.Sidebar = Sidebar;
    exports.Toasts = Toasts;

}));
//# sourceMappingURL=bootstrap-admin.js.map
