/*!
 * bootstrap-admin v2.0.1 (https://github.com/ajiho/bootstrap-admin)
 * Copyright 2023-2024 ajiho
 * license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrapadmin = {}, global.jQuery));
})(this, (function (exports, $) { 'use strict';

  var id = 0;
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }

  const NAME$d = 'NavbarSearch';
  const DATA_KEY$a = 'bsa.navbar-search';
  const JQUERY_NO_CONFLICT$a = $.fn[NAME$d];
  const SELECTOR_DATA_TOGGLE$9 = '[data-bsa-toggle="navbar-search"]';
  const Default$d = {
    //关闭时重置
    closeReset: false,
    //触发器
    trigger: '.bsa-search-form-toggler'
  };
  var _config$d = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$b = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init$a = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  class NavbarSearch {
    constructor(element, config) {
      // Public
      Object.defineProperty(this, _init$a, {
        value: _init2$a
      });
      Object.defineProperty(this, _config$d, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$b, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$d)[_config$d] = config;
      _classPrivateFieldLooseBase(this, _element$b)[_element$b] = element;
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$a);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new NavbarSearch($(this), $.extend({}, Default$d, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$a, data);
        _classPrivateFieldLooseBase(data, _init$a)[_init$a]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$a() {
    console.log('init');
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$9).each(function () {
      NavbarSearch.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$d] = NavbarSearch.jQueryInterface;
  $.fn[NAME$d].Constructor = NavbarSearch;
  $.fn[NAME$d].noConflict = function () {
    $.fn[NAME$d] = JQUERY_NO_CONFLICT$a;
    return NavbarSearch.jQueryInterface;
  };

  var functionDebounce = debounce;

  function debounce(fn, wait, callFirst) {
    var timeout = null;
    var debouncedFn = null;

    var clear = function() {
      if (timeout) {
        clearTimeout(timeout);

        debouncedFn = null;
        timeout = null;
      }
    };

    var flush = function() {
      var call = debouncedFn;
      clear();

      if (call) {
        call();
      }
    };

    var debounceWrapper = function() {
      if (!wait) {
        return fn.apply(this, arguments);
      }

      var context = this;
      var args = arguments;
      var callNow = callFirst && !timeout;
      clear();

      debouncedFn = function() {
        fn.apply(context, args);
      };

      timeout = setTimeout(function() {
        timeout = null;

        if (!callNow) {
          var call = debouncedFn;
          debouncedFn = null;

          return call();
        }
      }, wait);

      if (callNow) {
        return debouncedFn();
      }
    };

    debounceWrapper.cancel = clear;
    debounceWrapper.flush = flush;

    return debounceWrapper;
  }

  var Utils = {
    debounce(...args) {
      return functionDebounce(...args);
    },
    // 给任意url添加一个参数
    addSearchParams(url, params = {}) {
      let isRootPath = url.startsWith('/');
      let isRelative;
      let base = window.location.origin;
      let urlObj;
      try {
        urlObj = new URL(url);
        isRelative = false;
      } catch (e) {
        urlObj = new URL(url, base);
        isRelative = true;
      }

      // 遍历 params 并使用 set 替换现有参数或添加新参数
      Object.entries(params).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });

      // 构造新的 URL
      const new_url = new URL(`${urlObj.origin}${urlObj.pathname}?${urlObj.searchParams.toString()}${urlObj.hash}`);
      if (isRelative) {
        let finalUrl = new_url.href.replace(`${base}/`, '');
        return isRootPath ? `/${finalUrl}` : finalUrl;
      } else {
        return new_url.href;
      }
    },
    isCrossOrigin(iframe) {
      try {
        // 尝试访问 iframe 的内容
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        // 如果没有抛出异常，说明不是跨域的
        return false;
      } catch (e) {
        // 如果捕获到 SecurityError 异常，说明是跨域的
        if (e instanceof DOMException && e.name === 'SecurityError') {
          return true;
        } else {
          throw e; // 重新抛出不是 SecurityError 的异常
        }
      }
    },
    isSVGString(str) {
      // 1. 检查字符串是否包含 <svg> 标签
      if (typeof str !== 'string' || !str.trim().startsWith('<svg')) {
        return false;
      }

      // 2. 使用 DOMParser 解析字符串
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, 'image/svg+xml');

      // 3. 检查解析结果是否包含 <svg> 根元素
      const svgElement = doc.documentElement;
      return svgElement.tagName === 'svg' && !doc.querySelector('parsererror');
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
    },
    sprintf(_str, ...args) {
      let flag = true;
      let i = 0;
      const str = _str.replace(/%s/g, () => {
        const arg = args[i++];
        if (typeof arg === 'undefined') {
          flag = false;
          return '';
        }
        return arg;
      });
      return flag ? str : '';
    },
    quicktabCacheClear(prefix = 'Quicktab') {
      ['localStorage', 'sessionStorage'].forEach(storage => {
        const keys = Object.keys(window[storage]);
        keys.forEach(key => {
          if (key.startsWith(prefix)) {
            window[storage].removeItem(key);
          }
        });
      });
    }
  };

  const NAME$c = 'toasts';
  const ClassName$3 = {
    //白色按钮
    BTN_CLOSE_WHITE: 'btn-close-white',
    //容器的类名
    TOAST_CONTAINER: 'toast-container',
    //动画暂停类
    TOAST_PAUSE: 'bsa-toast-pause',
    //body关闭按钮的修饰类
    TOAST_BODY_BTN_CLASS: 'me-2 m-auto'
  };
  const ICONS = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-success me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-danger me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-warning me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-info me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`
  };

  //html的构造
  const HTML$2 = {
    //容器
    container: [`<div class="${ClassName$3.TOAST_CONTAINER} position-fixed %s p-3">`, `</div>`],
    //吐司
    toast: [`<div class="toast %s border-0  overflow-hidden" id="%s"  role="alert" aria-live="assertive" aria-atomic="true">`, '</div>'],
    //身体的容器
    toastBodyWrapper: [`<div class="d-flex">`, `</div>`],
    //身体
    toastBody: `<div class="toast-body">%s</div>`,
    //参数1: 白色按钮 参数2:没有标题时的关闭按钮需要再多两个修饰类 me-2 m-auto
    btnClose: `<button type="button" class="btn-close %s %s" data-bs-dismiss="toast" aria-label="Close"></button>`,
    //参数1:主题色适配
    toastHeader: [`<div class="toast-header %s">`, `</div>`],
    headerImg: `<img src="%s" height="%s" class="rounded me-2" alt="%s">`,
    headerTitle: `<strong class="me-auto">%s</strong>`,
    headerSubTitle: '<small>%s</small>',
    progress: `<div style="height: 4px" class="progress" role="progressbar">
         <div class="progress-bar progress-bar-striped progress-bar-animated %s"
                        style="animation: progress %sms linear forwards"></div></div>`
  };

  // 需要白色关闭按钮的情景
  const needWhiteCloseBtnType = ['primary', 'secondary', 'success', 'danger', 'dark'];
  const Map$2 = {
    //主题色
    toastColorScheme: {
      primary: 'text-bg-primary',
      secondary: 'text-bg-secondary',
      success: 'text-bg-success',
      danger: 'text-bg-danger',
      warning: 'text-bg-warning',
      info: 'text-bg-info',
      dark: 'text-bg-dark',
      light: 'text-bg-light'
    },
    //主题色
    toastHeaderColorScheme: {
      primary: 'border-bottom border-primary-subtle text-bg-primary',
      secondary: 'border-bottom border-secondary-subtle text-bg-secondary',
      success: 'border-bottom border-success-subtle text-bg-success',
      danger: 'border-bottom border-danger-subtle text-bg-danger',
      warning: 'border-bottom border-warning-subtle text-bg-warning',
      info: 'border-bottom border-info-subtle text-bg-info',
      dark: 'border-bottom border-dark-subtle text-bg-dark',
      light: 'border-bottom border-light-subtle text-bg-light'
    },
    progressColorScheme: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      danger: 'bg-danger',
      warning: 'bg-warning',
      info: 'bg-info',
      dark: 'bg-dark',
      light: 'bg-light'
    },
    placement: {
      'top-left': 'top-0 start-0',
      'top-center': 'top-0 start-50 translate-middle-x',
      'top-right': 'top-0 end-0',
      'middle-left': 'top-50 start-0 translate-middle-y',
      'middle-center': 'top-50 start-50 translate-middle',
      'middle-right': 'top-50 end-0 translate-middle-y',
      'bottom-left': 'bottom-0 start-0',
      'bottom-center': 'bottom-0 start-50 translate-middle-x',
      'bottom-right': 'bottom-0 end-0'
    }
  };

  //默认参数
  const Default$c = {
    // 惰性打开
    lazyOpen: false,
    //打开的窗口对象
    window: 'top',
    //鼠标移入进度条暂停
    hoverProgressPause: true,
    //是否添加关闭按钮,如果标题 title选项被定义，那么该关闭按钮则是头部的关闭按钮，否则则是body的关闭按钮
    btnClose: true,
    //标题
    title: '',
    //图片，title不为空时有效
    image: '',
    //图片的高度,title不为空时有效
    imageHeight: '25px',
    //图片的提示 title不为空时有效
    imageAlt: '',
    //副标题 title不为空时有效
    subTitle: '',
    //身体部分的内容
    body: '',
    //index
    zIndex: 1081,
    //将过渡应用到吐司
    animation: true,
    //自动隐藏吐司
    autohide: true,
    //延迟隐藏吐司（毫秒）
    delay: 5000,
    //方位 可用值：top-left,top-center, top-left, middle-left,middle-center,middle-right,bottom-left,bottom-center,bottom-right
    placement: 'top-right',
    //情景模式 undefined/string 可用值:primary success info  warning danger light dark
    type: undefined,
    //事件
    onShow: null,
    onShown: null,
    onHide: null,
    onHidden: null
  };

  //用于唯一id标志累计
  let i$1 = 0;
  var _config$c = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _id$1 = /*#__PURE__*/_classPrivateFieldLooseKey("id");
  var _container = /*#__PURE__*/_classPrivateFieldLooseKey("container");
  var _toast = /*#__PURE__*/_classPrivateFieldLooseKey("toast");
  var _toastInstance = /*#__PURE__*/_classPrivateFieldLooseKey("toastInstance");
  var _$$2 = /*#__PURE__*/_classPrivateFieldLooseKey("$");
  var _bootstrap$1 = /*#__PURE__*/_classPrivateFieldLooseKey("bootstrap");
  var _bindEvents$1 = /*#__PURE__*/_classPrivateFieldLooseKey("bindEvents");
  var _progressEvents = /*#__PURE__*/_classPrivateFieldLooseKey("progressEvents");
  var _buildToast = /*#__PURE__*/_classPrivateFieldLooseKey("buildToast");
  var _buildContainer = /*#__PURE__*/_classPrivateFieldLooseKey("buildContainer");
  class Toasts {
    constructor(config) {
      Object.defineProperty(this, _buildContainer, {
        value: _buildContainer2
      });
      Object.defineProperty(this, _buildToast, {
        value: _buildToast2
      });
      // 进度条的事件
      Object.defineProperty(this, _progressEvents, {
        value: _progressEvents2
      });
      Object.defineProperty(this, _bindEvents$1, {
        value: _bindEvents2$1
      });
      Object.defineProperty(this, _config$c, {
        writable: true,
        value: void 0
      });
      //唯一id
      Object.defineProperty(this, _id$1, {
        writable: true,
        value: void 0
      });
      //容器元素
      Object.defineProperty(this, _container, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _toast, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _toastInstance, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _$$2, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _bootstrap$1, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$c)[_config$c] = config;

      //更改触发的全局对象
      _classPrivateFieldLooseBase(this, _$$2)[_$$2] = window[_classPrivateFieldLooseBase(this, _config$c)[_config$c].window].$;
      _classPrivateFieldLooseBase(this, _bootstrap$1)[_bootstrap$1] = window[_classPrivateFieldLooseBase(this, _config$c)[_config$c].window].bootstrap;
      i$1++;
      _classPrivateFieldLooseBase(this, _id$1)[_id$1] = i$1;

      //准备容器
      _classPrivateFieldLooseBase(this, _buildContainer)[_buildContainer]();

      //nwe bootstrap的Toast实例
      _classPrivateFieldLooseBase(this, _toastInstance)[_toastInstance] = new (_classPrivateFieldLooseBase(this, _bootstrap$1)[_bootstrap$1].Toast)(_classPrivateFieldLooseBase(this, _toast)[_toast][0], {
        animation: _classPrivateFieldLooseBase(this, _config$c)[_config$c].animation,
        autohide: false
      });

      //事件注册和监听
      _classPrivateFieldLooseBase(this, _bindEvents$1)[_bindEvents$1]();
      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].lazyOpen === false) {
        //直接弹出
        this.show();
      }
    }
    show() {
      _classPrivateFieldLooseBase(this, _toastInstance)[_toastInstance].show();
    }
    hide() {
      _classPrivateFieldLooseBase(this, _toastInstance)[_toastInstance].hide();
    }
  }

  /**
   * jQuery 全局函数 API
   * ====================================================
   */
  function _bindEvents2$1() {
    //进度条事件处理,必须要autohide===true的时候才会启用此选项
    if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].autohide === true) {
      _classPrivateFieldLooseBase(this, _progressEvents)[_progressEvents]();
    }
    _classPrivateFieldLooseBase(this, _toast)[_toast][0].addEventListener('show.bs.toast', () => {
      typeof _classPrivateFieldLooseBase(this, _config$c)[_config$c].onShow === 'function' && _classPrivateFieldLooseBase(this, _config$c)[_config$c].onShow.call(this);
    });
    _classPrivateFieldLooseBase(this, _toast)[_toast][0].addEventListener('shown.bs.toast', () => {
      typeof _classPrivateFieldLooseBase(this, _config$c)[_config$c].onShown === 'function' && _classPrivateFieldLooseBase(this, _config$c)[_config$c].onShown.call(this);
    });
    _classPrivateFieldLooseBase(this, _toast)[_toast][0].addEventListener('hide.bs.toast', () => {
      typeof _classPrivateFieldLooseBase(this, _config$c)[_config$c].onHide === 'function' && _classPrivateFieldLooseBase(this, _config$c)[_config$c].onHide.call(this);
    });
    _classPrivateFieldLooseBase(this, _toast)[_toast][0].addEventListener('hidden.bs.toast', () => {
      typeof _classPrivateFieldLooseBase(this, _config$c)[_config$c].onHidden === 'function' && _classPrivateFieldLooseBase(this, _config$c)[_config$c].onHidden.call(this);
      //直接删除该toast
      _classPrivateFieldLooseBase(this, _toast)[_toast].remove();
      if (_classPrivateFieldLooseBase(this, _container)[_container].children().length === 0) {
        _classPrivateFieldLooseBase(this, _container)[_container].remove();
      }
    });
  }
  function _progressEvents2() {
    let that = this;
    if (_classPrivateFieldLooseBase(that, _config$c)[_config$c].hoverProgressPause === true) {
      _classPrivateFieldLooseBase(this, _toast)[_toast].mouseenter(function () {
        _classPrivateFieldLooseBase(that, _$$2)[_$$2](this).addClass(ClassName$3.TOAST_PAUSE);
      });

      //鼠标移出
      _classPrivateFieldLooseBase(this, _toast)[_toast].mouseleave(function () {
        _classPrivateFieldLooseBase(that, _$$2)[_$$2](this).removeClass(ClassName$3.TOAST_PAUSE);
      });
    }

    //监听滚动条读条动画完毕事件
    _classPrivateFieldLooseBase(this, _toast)[_toast].on('animationend', '.progress-bar', function (event) {
      if (event.target === event.currentTarget) {
        //手动隐藏
        that.hide();
      }
    });
  }
  function _buildToast2() {
    let html = [];

    //接着是内部的判断
    html.push(Utils.sprintf(HTML$2.toast[0], Map$2.toastColorScheme[_classPrivateFieldLooseBase(this, _config$c)[_config$c].type] || '', _classPrivateFieldLooseBase(this, _id$1)[_id$1]));

    //按钮类,确定哪些情景类型需要使用白色的按钮类
    const btnClass = needWhiteCloseBtnType.includes(_classPrivateFieldLooseBase(this, _config$c)[_config$c].type) ? ClassName$3.BTN_CLOSE_WHITE : '';
    if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].title !== '') {
      //标题不为空
      //如果标题被设置了

      let toastHeaderColor = Map$2.toastHeaderColorScheme[_classPrivateFieldLooseBase(this, _config$c)[_config$c].type] || '';
      html.push(Utils.sprintf(HTML$2.toastHeader[0], toastHeaderColor)); //头部

      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].image !== '') {
        //有传递图标

        //判断是否是svg字符串
        if (Utils.isSVGString(_classPrivateFieldLooseBase(this, _config$c)[_config$c].image)) {
          html.push(_classPrivateFieldLooseBase(this, _config$c)[_config$c].image);
        } else {
          html.push(Utils.sprintf(HTML$2.headerImg, _classPrivateFieldLooseBase(this, _config$c)[_config$c].image, _classPrivateFieldLooseBase(this, _config$c)[_config$c].imageHeight, _classPrivateFieldLooseBase(this, _config$c)[_config$c].imageAlt));
        }
      }
      html.push(Utils.sprintf(HTML$2.headerTitle, _classPrivateFieldLooseBase(this, _config$c)[_config$c].title));
      html.push(Utils.sprintf(HTML$2.headerSubTitle, _classPrivateFieldLooseBase(this, _config$c)[_config$c].subTitle));
      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].btnClose === true) {
        html.push(Utils.sprintf(HTML$2.btnClose, btnClass, ''));
      }
      //中间添加内容
      html.push(HTML$2.toastHeader[1]);

      //加入内容
      html.push(Utils.sprintf(HTML$2.toastBody, _classPrivateFieldLooseBase(this, _config$c)[_config$c].body));
    } else {
      //只插入body

      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].btnClose === true) {
        //身体容器的开始
        html.push(HTML$2.toastBodyWrapper[0]);
      }
      let body = _classPrivateFieldLooseBase(this, _config$c)[_config$c].body;
      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].image !== '') {
        //有传递图标

        //判断是否是svg字符串
        if (Utils.isSVGString(_classPrivateFieldLooseBase(this, _config$c)[_config$c].image)) {
          body = _classPrivateFieldLooseBase(this, _config$c)[_config$c].image + body;
        } else {
          body = html.push(Utils.sprintf(HTML$2.headerImg, _classPrivateFieldLooseBase(this, _config$c)[_config$c].image, _classPrivateFieldLooseBase(this, _config$c)[_config$c].imageHeight, _classPrivateFieldLooseBase(this, _config$c)[_config$c].imageAlt)) + body;
        }
      }
      html.push(Utils.sprintf(HTML$2.toastBody, body));
      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].btnClose === true) {
        html.push(Utils.sprintf(HTML$2.btnClose, btnClass, ClassName$3.TOAST_BODY_BTN_CLASS));
      }
      if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].btnClose === true) {
        //身体容器的结束
        html.push(HTML$2.toastBodyWrapper[1]);
      }
    }
    if (_classPrivateFieldLooseBase(this, _config$c)[_config$c].autohide === true) {
      //进度条
      html.push(Utils.sprintf(HTML$2.progress, Map$2.progressColorScheme[_classPrivateFieldLooseBase(this, _config$c)[_config$c].type] || 'bg-light', _classPrivateFieldLooseBase(this, _config$c)[_config$c].delay));
    }
    html.push(HTML$2.toast[1]);
    return html.join('');
  }
  function _buildContainer2() {
    let placement = Map$2.placement[_classPrivateFieldLooseBase(this, _config$c)[_config$c].placement] || 'top-right';
    let html = [Utils.sprintf(HTML$2.container[0], placement), HTML$2.container[1]].join('');

    //判断不同方向的容器是否存在，不存在就创建并添加到body中
    const containerSelector = `.${ClassName$3.TOAST_CONTAINER}.${placement.replace(/ /g, '.')}`;
    if (_classPrivateFieldLooseBase(this, _$$2)[_$$2](containerSelector).length === 0) {
      _classPrivateFieldLooseBase(this, _$$2)[_$$2](html).appendTo('body');
    }
    _classPrivateFieldLooseBase(this, _container)[_container] = _classPrivateFieldLooseBase(this, _$$2)[_$$2](containerSelector);
    _classPrivateFieldLooseBase(this, _container)[_container].append(_classPrivateFieldLooseBase(this, _buildToast)[_buildToast]());
    _classPrivateFieldLooseBase(this, _toast)[_toast] = _classPrivateFieldLooseBase(this, _container)[_container].find('#' + _classPrivateFieldLooseBase(this, _id$1)[_id$1]);
  }
  $[NAME$c] = function (options) {
    return new Toasts($.extend({}, $[NAME$c].default, typeof options === 'object' ? options : {}));
  };

  //快捷方法的封装
  const fastMethods = {
    success: {
      placement: 'top-center',
      image: ICONS.success,
      body: '操作成功'
    },
    error: {
      placement: 'top-center',
      image: ICONS.error,
      body: '操作失败'
    },
    warning: {
      placement: 'top-center',
      image: ICONS.warning
    },
    info: {
      placement: 'top-center',
      image: ICONS.info
    }
  };
  for (const methodName of Object.keys(fastMethods)) {
    //快捷方法
    $[NAME$c][methodName] = function (options, options2) {
      let ops = {};
      if (typeof options === "string") {
        ops.body = options;
      }
      if (typeof options2 === "function") {
        ops.onHidden = options2;
      }
      if (typeof options === "object") {
        ops = options;
      }
      return new Toasts($.extend({}, $[NAME$c].default, fastMethods[methodName], ops));
    };
  }
  $[NAME$c].default = Default$c;

  const NAME$b = 'PushMenu';
  const DATA_KEY$9 = 'bsa.pushmenu';
  const EVENT_KEY$3 = `.${DATA_KEY$9}`;
  const JQUERY_NO_CONFLICT$9 = $.fn[NAME$b];
  const Event = {
    //折叠开始
    COLLAPSE: `collapse${EVENT_KEY$3}`,
    //折叠完毕
    COLLAPSED: `collapsed${EVENT_KEY$3}`,
    //展开开始
    EXPAND: `expand${EVENT_KEY$3}`,
    //展开完毕
    EXPANDED: `expanded${EVENT_KEY$3}`
  };
  const SELECTOR_DATA_TOGGLE$8 = '[data-bsa-toggle="pushmenu"]';

  //侧边栏选择器
  const SELECTOR_SIDEBAR = '.bsa-sidebar';
  const SELECTOR_MASK = '.bsa-mask';
  //折叠类名
  const CLASS_NAME_COLLAPSED = 'open';
  const Default$b = {
    //过渡的动画时间
    animationSpeed: 300
  };
  var _element$a = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _config$b = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _addTransition = /*#__PURE__*/_classPrivateFieldLooseKey("addTransition");
  var _addOverlay = /*#__PURE__*/_classPrivateFieldLooseKey("addOverlay");
  var _init$9 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$6 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  class PushMenu {
    constructor(element, config) {
      Object.defineProperty(this, _setupListeners$6, {
        value: _setupListeners2$6
      });
      Object.defineProperty(this, _init$9, {
        value: _init2$9
      });
      Object.defineProperty(this, _addOverlay, {
        value: _addOverlay2
      });
      // Private
      Object.defineProperty(this, _addTransition, {
        value: _addTransition2
      });
      Object.defineProperty(this, _element$a, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _config$b, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _element$a)[_element$a] = element;
      _classPrivateFieldLooseBase(this, _config$b)[_config$b] = config;
      _classPrivateFieldLooseBase(this, _addTransition)[_addTransition]();
    }

    // Public

    expand() {
      let w = $(window).width();
      if (w < 992) {
        //事件
        $(_classPrivateFieldLooseBase(this, _element$a)[_element$a]).trigger($.Event(Event.EXPAND));

        // 展开
        $('.bsa-sidebar').addClass(CLASS_NAME_COLLAPSED);
        $(SELECTOR_SIDEBAR).data('isOpen', true);
        //添加遮罩层
        _classPrivateFieldLooseBase(this, _addOverlay)[_addOverlay]();
      }
    }
    collapse() {
      let w = $(window).width();
      if (w < 992) {
        $(_classPrivateFieldLooseBase(this, _element$a)[_element$a]).trigger($.Event(Event.COLLAPSE));
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
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$9);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new PushMenu($(this), $.extend({}, Default$b, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$9, data);
        _classPrivateFieldLooseBase(data, _init$9)[_init$9]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _addTransition2() {
    $(SELECTOR_SIDEBAR).css({
      transition: `${_classPrivateFieldLooseBase(this, _config$b)[_config$b].animationSpeed}ms transform`
    });
  }
  function _addOverlay2() {
    if ($(SELECTOR_MASK).length === 0) {
      $('<div class="bsa-mask"></div>').prependTo('body');
    }
  }
  function _init2$9() {
    _classPrivateFieldLooseBase(this, _setupListeners$6)[_setupListeners$6]();
  }
  function _setupListeners2$6() {
    let that = this;

    //遮罩层关闭事件
    $(document).on('click', SELECTOR_MASK, function (e) {
      e.preventDefault();
      that.collapse();
    });

    //监听过渡事件
    $(document).on('transitionend', SELECTOR_SIDEBAR, function (e) {
      if (e.target === e.currentTarget) {
        //判断是展开还是折叠
        if ($(e.target).data('isOpen')) {
          $(_classPrivateFieldLooseBase(that, _element$a)[_element$a]).trigger($.Event(Event.EXPANDED));
        } else {
          $(_classPrivateFieldLooseBase(that, _element$a)[_element$a]).trigger($.Event(Event.COLLAPSED));
        }
      }
    });
    $(document).on('click', SELECTOR_DATA_TOGGLE$8, event => {
      event.preventDefault();
      that.toggle();
    });
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$8).each(function () {
      PushMenu.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$b] = PushMenu.jQueryInterface;
  $.fn[NAME$b].Constructor = PushMenu;
  $.fn[NAME$b].noConflict = function () {
    $.fn[NAME$b] = JQUERY_NO_CONFLICT$9;
    return PushMenu.jQueryInterface;
  };

  const NAME$a = 'Treeview';
  const DATA_KEY$8 = 'bsa.treeview';
  const EVENT_KEY$2 = `.${DATA_KEY$8}`;
  const JQUERY_NO_CONFLICT$8 = $.fn[NAME$a];
  const SELECTOR_DATA_TOGGLE$7 = '[data-bsa-toggle="treeview"]';
  const EVENT_EXPANDED = `expanded${EVENT_KEY$2}`;
  const EVENT_COLLAPSED = `collapsed${EVENT_KEY$2}`;

  //递归折叠完成
  const EVENT_RECURSIVE_COLLAPSED = `recursive.collapsed${EVENT_KEY$2}`;
  const SELECTOR_LI = 'li';
  const SELECTOR_LINK = 'a';
  const SELECTOR_SUBMENU = 'ul';
  const CLASS_NAME_EXPANDED = 'open';
  const CLASS_NAME_ACTIVE = 'active';
  const Default$a = {
    //动画速度,单位毫秒
    animationSpeed: 150,
    //是否启用手风琴模式
    accordion: true
  };
  var _config$a = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$9 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init$8 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$5 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  var _isAnimating = /*#__PURE__*/_classPrivateFieldLooseKey("isAnimating");
  var _accordion = /*#__PURE__*/_classPrivateFieldLooseKey("accordion");
  class Treeview {
    constructor(element, config) {
      Object.defineProperty(this, _accordion, {
        value: _accordion2
      });
      Object.defineProperty(this, _isAnimating, {
        value: _isAnimating2
      });
      // 初始化事件
      Object.defineProperty(this, _setupListeners$5, {
        value: _setupListeners2$5
      });
      // Private
      Object.defineProperty(this, _init$8, {
        value: _init2$8
      });
      Object.defineProperty(this, _config$a, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$9, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$a)[_config$a] = config;
      _classPrivateFieldLooseBase(this, _element$9)[_element$9] = element;
    }
    toggle($link, event) {
      //查找兄弟元素ul
      const $nextUl = $link.siblings(SELECTOR_SUBMENU);
      const $parentLi = $link.parent();
      if (!_classPrivateFieldLooseBase(this, _isAnimating)[_isAnimating]($link)) return;
      if ($nextUl.length > 0) {
        //说明它是包含子集的可以点击
        event.preventDefault(); //阻止默认事件,防止跳转
        if ($parentLi.hasClass(CLASS_NAME_EXPANDED)) {
          this.collapse($link);
        } else {
          this.expand($link);
        }
      }
    }
    expand($link, callback) {
      _classPrivateFieldLooseBase(this, _accordion)[_accordion]($link);
      const that = this;
      const $nextUl = $link.siblings(SELECTOR_SUBMENU);
      const $parentLi = $link.parent();
      if (!$parentLi.hasClass(CLASS_NAME_EXPANDED)) {
        $parentLi.addClass(CLASS_NAME_EXPANDED);
        $nextUl.css('display', 'none').stop(true, false).slideDown(_classPrivateFieldLooseBase(that, _config$a)[_config$a].animationSpeed, function () {
          $(this).removeAttr('style');
          $(_classPrivateFieldLooseBase(that, _element$9)[_element$9]).trigger($.Event(EVENT_EXPANDED));
          typeof callback === 'function' && callback();
        });
      }
    }

    //折叠
    collapse($link, callback) {
      const that = this;
      const $nextUl = $link.siblings(SELECTOR_SUBMENU);
      const $parentLi = $link.parent();
      if ($parentLi.hasClass(CLASS_NAME_EXPANDED)) {
        $parentLi.removeClass(CLASS_NAME_EXPANDED);
        $nextUl.css('display', 'block').stop(true, false).slideUp(_classPrivateFieldLooseBase(that, _config$a)[_config$a].animationSpeed, function () {
          $(this).removeAttr('style');
          $(_classPrivateFieldLooseBase(that, _element$9)[_element$9]).trigger($.Event(EVENT_COLLAPSED));
          typeof callback === 'function' && callback();
        });
      }
    }

    // 展开全部
    expandAll() {}

    // 折叠全部
    collapseAll() {
      const that = this;
      that.removeAllActiveClass();
      $(_classPrivateFieldLooseBase(this, _element$9)[_element$9]).find(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`).children(SELECTOR_LINK).each(function () {
        const $link = $(this);
        that.collapse($link);
      });
    }
    addActiveClass($link) {
      $link.addClass(CLASS_NAME_ACTIVE);
    }
    removeActiveClass($link) {
      $link.removeClass(CLASS_NAME_ACTIVE);
    }

    // 递归折叠某个菜单
    collapseRecursive($link) {
      let collapsible = this.getChildCollapsible($link);
      collapsible.forEach(item => {
        this.collapse(item);
      });
    }

    // 递归展开某个菜单
    expandRecursive($link) {
      const that = this;
      let collapsible = this.getParentCollapsible($link);
      collapsible = collapsible.reverse();
      let collapsibleLen = collapsible.length;

      //已展开的数量
      let expandedNum = 0;

      //移除所有的激活状态
      this.removeAllActiveClass();

      //添加激活类
      this.addActiveClass($link);

      //折叠子集
      this.collapseRecursive($link);
      if (collapsibleLen > 0) {
        //则是有子集的
        collapsible.forEach(item => {
          this.expand(item, function () {
            expandedNum++;
            if (collapsibleLen === expandedNum) {
              $(_classPrivateFieldLooseBase(that, _element$9)[_element$9]).trigger($.Event(EVENT_RECURSIVE_COLLAPSED));
            }
          });
        });
      } else {
        //顶级
        $(_classPrivateFieldLooseBase(that, _element$9)[_element$9]).trigger($.Event(EVENT_RECURSIVE_COLLAPSED));
      }
    }
    removeAllActiveClass() {
      const that = this;
      $(_classPrivateFieldLooseBase(this, _element$9)[_element$9]).find(SELECTOR_LINK).each(function () {
        that.removeActiveClass($(this));
      });
    }
    getParentCollapsible($link) {
      // 定义内部递归函数，并传递结果数组
      const recursiveHelper = ($link, obj) => {
        let $ul = $link.parent().parent();
        let $canOpen = $ul.siblings($link);
        if (!($canOpen.length > 0)) {
          return obj; // 如果没有更多的可展开项，返回当前的obj
        }
        const $parentLi = $canOpen.parent();
        if (!$parentLi.hasClass(CLASS_NAME_EXPANDED)) {
          obj.push($canOpen);
        }

        // 递归调用，传递累积结果
        return recursiveHelper($canOpen, obj);
      };

      // 初始调用，传递一个空数组作为累积结果
      return recursiveHelper($link, []);
    }
    getChildCollapsible($link) {
      const result = [];
      $link.closest(SELECTOR_SUBMENU).find(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`).children(SELECTOR_LINK).each(function () {
        result.push($(this));
      });
      return result;
    }

    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$8);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Treeview($(this), $.extend({}, Default$a, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$8, data);
        _classPrivateFieldLooseBase(data, _init$8)[_init$8]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$8() {
    // 初始化点击事件
    _classPrivateFieldLooseBase(this, _setupListeners$5)[_setupListeners$5]();
  }
  function _setupListeners2$5() {
    const that = this;
    $(_classPrivateFieldLooseBase(this, _element$9)[_element$9]).on('click', `${SELECTOR_LINK}:not([target])`, function (event) {
      let $link = $(this);
      that.toggle($link, event);
    });
  }
  function _isAnimating2($link) {
    return !$link.parent().find(SELECTOR_SUBMENU).slice(1).is(':animated') && !$link.parents(SELECTOR_SUBMENU).is(':animated');
  }
  function _accordion2($link) {
    if (_classPrivateFieldLooseBase(this, _config$a)[_config$a].accordion) {
      //手风琴

      const that = this;
      $link.parent().siblings(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`).children(SELECTOR_LINK).each(function () {
        const $link = $(this);
        that.collapse($link);
      });
    }
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$7).each(function () {
      Treeview.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$a] = Treeview.jQueryInterface;
  $.fn[NAME$a].Constructor = Treeview;
  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$8;
    return Treeview.jQueryInterface;
  };

  OverlayScrollbarsGlobal;

  // 全局api的名称
  const NAME$9 = 'modal';
  const DATA_KEY_OK_NAME = 'ok';
  const DATA_KEY_CANCEL_NAME = 'cancel';

  // 默认参数
  const Default$9 = {
    // 惰性打开
    lazyOpen: false,
    //打开的窗口对象
    window: 'top',
    //取消按钮的文本
    btnCancelText: '取消',
    //取消按钮的class
    btnCancelClass: 'btn-light',
    //ok按钮的文本
    btnOKText: '确定',
    //ok按钮的class
    btnOKClass: 'btn-primary',
    //确定按钮回调
    ok: function () {
      return false;
    },
    //开启取消按钮
    btnCancel: true,
    //取消按钮回调
    cancel: function () {
      return true;
    },
    //标题
    title: '信息',
    //高度 当为iframe时 高度默认自动计算为屏幕高度最适宜的高度,您可以设置该选项强制覆盖默认行为
    height: undefined,
    //内容
    body: '',
    //可以设置底部按钮对齐方式 可选值: start  center  end
    btnAlign: 'end',
    //可以设置底部按钮的尺寸 可选值: sm lg
    btnSize: '',
    //单个按钮的基本模板
    btntpl: {
      text: '按钮',
      class: 'btn-light',
      action: null
    },
    //自定义按钮,默认是null,默认的确定和取消按钮如果不满足需求可以自定义,设置为: 空数组[]模态框的footer部分将会被隐藏
    buttons: null,
    // ".modal"所在div修饰类  比如:fade
    modalClass: 'fade',
    //垂直居中  undefined/boolean  true:启用垂直居中 false:不启用  如果是IFrame模式，则默认自动垂直居中，您可以设置该选项强制覆盖默认行为
    centered: undefined,
    //可滚动,undefined/boolean  该配置只在在非iframe模式下有效
    scrollable: undefined,
    //尺寸 undefined/String 可选值:sm lg xl ,为了好的用户体验，如果是iframe模式，尺寸默认会被设置为lg，您可以设置该选项强制覆盖默认行为
    size: undefined,
    //全屏模式 可选值:sm md lg xl xxl always
    fullscreen: undefined,
    // bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options
    modalOptions: {
      backdrop: true,
      keyboard: true,
      focus: true
    },
    //iframe的url地址,如果设置了该选项，则表示该modal为一个iframe弹层
    url: undefined,
    //右边的关闭按钮 是否启用
    btnClose: true,
    //右边的全屏按钮  undefined/boolean true:启用全屏按钮 false:不启用全屏按钮  如果是iframe模式，则会默认会启用该选项，如果被该选项被设置则打破默认规则
    btnFullscreen: undefined,
    //右边的刷新按钮是否显示,该选项只在iframe时设置有效
    btnRefresh: true,
    //是否启用加载动画效果,该选项只有当是iframe弹出层时有效,false或者对象
    loading: false,
    onShow: null,
    onShown: null,
    onHide: null,
    onHidden: null,
    onHidePrevented: null,
    //子页面通过postMessage这个api向父级页面传递的消息时产生的回调
    onMessage: null
  };

  //类名
  const ClassName$2 = {
    //自定义的类用来对一些样式进行设置
    MODAL: 'bsa-modal',
    //居中类
    MODAL_DIALOG_CENTERED: 'modal-dialog-centered',
    //全屏类
    MODAL_FULLSCREEN: 'modal-fullscreen',
    //滚动类
    MODAL_DIALOG_SCROLLABLE: 'modal-dialog-scrollable',
    //模态框包裹容器(用于美化滚动条的包裹)
    MODAL_WRAPPER: 'modal-wrapper',
    //退出全屏
    BTN_FULLSCREEN_EXIT: 'btn-fullscreen-exit',
    //全屏按钮类
    BTN_FULLSCREEN: 'btn-fullscreen'
  };

  // 简短选项映射，为了使用的时候更方便
  const Map$1 = {
    size: {
      sm: 'modal-sm',
      lg: 'modal-lg',
      xl: 'modal-xl'
    },
    fullscreen: {
      always: 'modal-fullscreen',
      sm: 'modal-fullscreen-sm-down',
      md: 'modal-fullscreen-md-down',
      lg: 'modal-fullscreen-lg-down',
      xl: 'modal-fullscreen-xl-down',
      xxl: 'modal-fullscreen-xxl-down'
    },
    btnAlign: {
      start: 'justify-content-start',
      center: 'justify-content-center',
      end: 'justify-content-end'
    },
    btnSize: {
      sm: 'btn-sm',
      lg: 'btn-lg'
    }
  };

  // html的结构定义
  const HTML$1 = {
    IFrame: `<iframe class="d-block w-100 h-100"></iframe>`,
    modal: [
    //开始标记
    `<div class="modal ${ClassName$2.MODAL} %s" id="%s"   tabindex="-1" aria-labelledby="%sLabel" aria-hidden="true">`, `</div>`],
    //包裹容器
    modalWrapper: [`<div class="${ClassName$2.MODAL_WRAPPER}">`, `</div>`],
    // dialog部分
    modalDialog: [
    // 垂直居中 可滚动  大小尺寸 全屏设置
    `<div class="modal-dialog %s %s %s %s">`, `</div>`],
    modalContent: [`<div class="modal-content overflow-hidden border-0 shadow-sm">`, `</div>`],
    modalHeader: [`<div class="modal-header">`, `</div>`],
    modalTitle: `<h1 class="modal-title fs-5" id="%sLabel">%s</h1>`,
    btnClose: `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`,
    btnRefresh: `<button type="button" class="btn-refresh"></button>`,
    btnFullscreen: `<button type="button" class="btn-fullscreen-trigger ${ClassName$2.BTN_FULLSCREEN}"></button>`,
    //这个是如果url不为空(也就是iframe模式弹出层的时候)头部的操作按钮
    headerRightWrapper: [`<div class="d-flex align-items-center gap-3 ms-auto">`, `</div>`],
    //身体部分,高度可以等到添加到body后动态计算并设置它，因为如果buttons参数设置为[] 那么表示底部不启用,此时就需要动态计算高度比较合理
    modalBody: [`<div class="modal-body %s">`, `</div>`],
    modalFooter: [
    // 参数1:用来设置对齐方式
    `<div class="modal-footer %s">`, `</div>`],
    //参数1：用来设置按钮的主题色，参数2：用来设置尺寸
    modalFooterBtn: `<button type="button" data-key="%s" class="btn %s %s">%s</button>`
  };

  //进行累计
  let i = 0;
  var _$$1 = /*#__PURE__*/_classPrivateFieldLooseKey("$");
  var _bootstrap = /*#__PURE__*/_classPrivateFieldLooseKey("bootstrap");
  var _config$9 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _id = /*#__PURE__*/_classPrivateFieldLooseKey("id");
  var _element$8 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _modalInstance = /*#__PURE__*/_classPrivateFieldLooseKey("modalInstance");
  var _modalDialog = /*#__PURE__*/_classPrivateFieldLooseKey("modalDialog");
  var _modalHeader = /*#__PURE__*/_classPrivateFieldLooseKey("modalHeader");
  var _modalBodyEl = /*#__PURE__*/_classPrivateFieldLooseKey("modalBodyEl");
  var _modalFooter = /*#__PURE__*/_classPrivateFieldLooseKey("modalFooter");
  var _modalWrapper = /*#__PURE__*/_classPrivateFieldLooseKey("modalWrapper");
  var _iframe = /*#__PURE__*/_classPrivateFieldLooseKey("iframe");
  var _showLoading = /*#__PURE__*/_classPrivateFieldLooseKey("showLoading");
  var _beautifyScrollbar = /*#__PURE__*/_classPrivateFieldLooseKey("beautifyScrollbar");
  var _createModalElement = /*#__PURE__*/_classPrivateFieldLooseKey("createModalElement");
  var _bodyDynamicHeight = /*#__PURE__*/_classPrivateFieldLooseKey("bodyDynamicHeight");
  var _bindEvents = /*#__PURE__*/_classPrivateFieldLooseKey("bindEvents");
  var _bindFullscreenEvents = /*#__PURE__*/_classPrivateFieldLooseKey("bindFullscreenEvents");
  var _bindRefreshBtnEvents = /*#__PURE__*/_classPrivateFieldLooseKey("bindRefreshBtnEvents");
  var _bindMessageEvent = /*#__PURE__*/_classPrivateFieldLooseKey("bindMessageEvent");
  var _bindModalEvents = /*#__PURE__*/_classPrivateFieldLooseKey("bindModalEvents");
  var _isCrossOrigin = /*#__PURE__*/_classPrivateFieldLooseKey("isCrossOrigin");
  var _bindIFrameEvents = /*#__PURE__*/_classPrivateFieldLooseKey("bindIFrameEvents");
  var _destory = /*#__PURE__*/_classPrivateFieldLooseKey("destory");
  var _bandFooterBtnEvent = /*#__PURE__*/_classPrivateFieldLooseKey("bandFooterBtnEvent");
  class Modal {
    //构造函数
    constructor(config) {
      Object.defineProperty(this, _bandFooterBtnEvent, {
        value: _bandFooterBtnEvent2
      });
      Object.defineProperty(this, _destory, {
        value: _destory2
      });
      Object.defineProperty(this, _bindIFrameEvents, {
        value: _bindIFrameEvents2
      });
      Object.defineProperty(this, _isCrossOrigin, {
        value: _isCrossOrigin2
      });
      // 模态框的事件处理
      Object.defineProperty(this, _bindModalEvents, {
        value: _bindModalEvents2
      });
      Object.defineProperty(this, _bindMessageEvent, {
        value: _bindMessageEvent2
      });
      Object.defineProperty(this, _bindRefreshBtnEvents, {
        value: _bindRefreshBtnEvents2
      });
      // 全屏按钮事件
      Object.defineProperty(this, _bindFullscreenEvents, {
        value: _bindFullscreenEvents2
      });
      // 绑定事件
      Object.defineProperty(this, _bindEvents, {
        value: _bindEvents2
      });
      Object.defineProperty(this, _bodyDynamicHeight, {
        value: _bodyDynamicHeight2
      });
      Object.defineProperty(this, _createModalElement, {
        value: _createModalElement2
      });
      Object.defineProperty(this, _beautifyScrollbar, {
        value: _beautifyScrollbar2
      });
      Object.defineProperty(this, _showLoading, {
        value: _showLoading2
      });
      // jquery对象
      Object.defineProperty(this, _$$1, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _bootstrap, {
        writable: true,
        value: void 0
      });
      //配置
      Object.defineProperty(this, _config$9, {
        writable: true,
        value: void 0
      });
      //id
      Object.defineProperty(this, _id, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$8, {
        writable: true,
        value: void 0
      });
      // 实例对象
      Object.defineProperty(this, _modalInstance, {
        writable: true,
        value: void 0
      });
      //模态框的头部
      Object.defineProperty(this, _modalDialog, {
        writable: true,
        value: void 0
      });
      //模态框的头部
      Object.defineProperty(this, _modalHeader, {
        writable: true,
        value: void 0
      });
      //模态框的内容部分
      Object.defineProperty(this, _modalBodyEl, {
        writable: true,
        value: void 0
      });
      //模态框的底部
      Object.defineProperty(this, _modalFooter, {
        writable: true,
        value: void 0
      });
      // 模态框的包裹
      Object.defineProperty(this, _modalWrapper, {
        writable: true,
        value: void 0
      });
      //iframe元素
      Object.defineProperty(this, _iframe, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$9)[_config$9] = config;
      i++;
      //唯一id
      _classPrivateFieldLooseBase(this, _id)[_id] = `modal-${i}`;

      //更改触发的jquery和bootstrap对象

      _classPrivateFieldLooseBase(this, _$$1)[_$$1] = window[_classPrivateFieldLooseBase(this, _config$9)[_config$9].window].$;
      _classPrivateFieldLooseBase(this, _bootstrap)[_bootstrap] = window[_classPrivateFieldLooseBase(this, _config$9)[_config$9].window].bootstrap;

      //创建容器
      _classPrivateFieldLooseBase(this, _createModalElement)[_createModalElement]();
      _classPrivateFieldLooseBase(this, _showLoading)[_showLoading]();

      // 滚动条美化
      _classPrivateFieldLooseBase(this, _beautifyScrollbar)[_beautifyScrollbar]();

      // 创建实例
      _classPrivateFieldLooseBase(this, _modalInstance)[_modalInstance] = new (_classPrivateFieldLooseBase(this, _bootstrap)[_bootstrap].Modal)(_classPrivateFieldLooseBase(this, _element$8)[_element$8], _classPrivateFieldLooseBase(this, _config$9)[_config$9].modalOptions);

      //绑定事件
      _classPrivateFieldLooseBase(this, _bindEvents)[_bindEvents]();
      if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].lazyOpen === false) {
        //直接弹出
        this.show();
      }
    }
    show() {
      _classPrivateFieldLooseBase(this, _modalInstance)[_modalInstance].show();
    }
    hide() {
      _classPrivateFieldLooseBase(this, _modalInstance)[_modalInstance].hide();
    }
    toggle() {
      _classPrivateFieldLooseBase(this, _modalInstance)[_modalInstance].toggle();
    }
  }

  /**
   * jQuery 全局函数 API
   * ====================================================
   */
  function _showLoading2() {
    //根据选项决定是否要加入loading层
    if (_classPrivateFieldLooseBase(this, _iframe)[_iframe].length > 0 && _classPrivateFieldLooseBase(this, _config$9)[_config$9].loading !== false) {
      $.loading({
        window: _classPrivateFieldLooseBase(this, _config$9)[_config$9].window,
        container: _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl],
        class: 'bg-body-tertiary',
        spinner: 'grow'
      }).show();
    }
  }
  function _beautifyScrollbar2() {
    const that = this;

    //滚动条美化
    _classPrivateFieldLooseBase(this, _modalWrapper)[_modalWrapper].Scrollbar();

    //处理美化遮罩层导致的关闭问题
    _classPrivateFieldLooseBase(this, _modalWrapper)[_modalWrapper].on('click', function (event) {
      event.stopPropagation(); //阻止冒泡行为

      const res = $(event.target).closest(_classPrivateFieldLooseBase(that, _modalDialog)[_modalDialog]);
      if (!res.length > 0) {
        //下面的代码摘自bootstrap的modal官方的源码

        if (_classPrivateFieldLooseBase(that, _config$9)[_config$9].modalOptions.backdrop === 'static') {
          _classPrivateFieldLooseBase(that, _modalInstance)[_modalInstance]._triggerBackdropTransition();
          return;
        }
        if (_classPrivateFieldLooseBase(that, _config$9)[_config$9].modalOptions.backdrop) {
          that.hide();
        }
      }
    });

    //处理modal被启用可滚动的情况就美化滚动条
    if (_classPrivateFieldLooseBase(this, _iframe)[_iframe].length === 0 && _classPrivateFieldLooseBase(this, _config$9)[_config$9].scrollable === true) {
      _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl].Scrollbar();
    }
  }
  function _createModalElement2() {
    let html = [];
    html.push(Utils.sprintf(HTML$1.modal[0], _classPrivateFieldLooseBase(this, _config$9)[_config$9].modalClass, _classPrivateFieldLooseBase(this, _id)[_id], _classPrivateFieldLooseBase(this, _id)[_id]));
    html.push(HTML$1.modalWrapper[0]);

    //垂直居中,如果是iframe模式那么默认给它开启
    let centered = '';
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined && _classPrivateFieldLooseBase(this, _config$9)[_config$9].centered === undefined) {
      centered = ClassName$2.MODAL_DIALOG_CENTERED;
    } else if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].centered === true) {
      centered = ClassName$2.MODAL_DIALOG_CENTERED;
    }
    let scrollable = '';
    //body可滚动，如果iframe模式则默认不给它使用该功能
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].scrollable === true && _classPrivateFieldLooseBase(this, _config$9)[_config$9].url === undefined) {
      scrollable = ClassName$2.MODAL_DIALOG_SCROLLABLE;
    }
    let size = '';
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined && _classPrivateFieldLooseBase(this, _config$9)[_config$9].size === undefined) {
      size = Map$1.size['lg'];
    } else {
      size = Map$1.size[_classPrivateFieldLooseBase(this, _config$9)[_config$9].size] || '';
    }
    let fullscreen = Map$1.fullscreen[_classPrivateFieldLooseBase(this, _config$9)[_config$9].fullscreen] || '';
    html.push(Utils.sprintf(HTML$1.modalDialog[0], centered, scrollable, size, fullscreen));

    //装填modalContent
    html.push(HTML$1.modalContent[0]);

    //装填modal-header
    html.push(HTML$1.modalHeader[0]);
    //标题准备
    html.push(Utils.sprintf(HTML$1.modalTitle, _classPrivateFieldLooseBase(this, _id)[_id], Utils.htmlspecialchars(_classPrivateFieldLooseBase(this, _config$9)[_config$9].title)));
    //右边的操作按钮
    html.push(HTML$1.headerRightWrapper[0]);
    //刷新按钮，要判断是否为url模式,不是的话，就加入刷新按钮
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined && _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnRefresh === true) {
      html.push(HTML$1.btnRefresh);
    }

    //全屏按钮,如果是iframe则给它开启
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined && _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnFullscreen === undefined) {
      html.push(HTML$1.btnFullscreen);
    } else if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].btnFullscreen === true) {
      html.push(HTML$1.btnFullscreen);
    }

    //关闭按钮
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].btnClose === true) {
      html.push(HTML$1.btnClose);
    }
    html.push(HTML$1.headerRightWrapper[1]);
    html.push(HTML$1.modalHeader[1]);
    html.push(Utils.sprintf(HTML$1.modalBody[0], _classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined ? 'p-0 overflow-hidden' : ''));

    //装填modal-body部分
    if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].url !== undefined) {
      //插入iframe
      html.push(HTML$1.IFrame);
    } else {
      html.push(_classPrivateFieldLooseBase(this, _config$9)[_config$9].body);
    }
    html.push(HTML$1.modalBody[1]);
    let btnAlign = Map$1.btnAlign[_classPrivateFieldLooseBase(this, _config$9)[_config$9].btnAlign] || '';
    let btnSize = Map$1.btnSize[_classPrivateFieldLooseBase(this, _config$9)[_config$9].btnSize] || '';

    //装填modal-footer部分
    if (Array.isArray(_classPrivateFieldLooseBase(this, _config$9)[_config$9].buttons) && _classPrivateFieldLooseBase(this, _config$9)[_config$9].buttons.length !== 0) {
      html.push(Utils.sprintf(HTML$1.modalFooter[0], btnAlign));
      _classPrivateFieldLooseBase(this, _config$9)[_config$9].buttons.forEach((item, index) => {
        item = Object.assign(_classPrivateFieldLooseBase(this, _config$9)[_config$9].btntpl, item);
        html.push(Utils.sprintf(HTML$1.modalFooterBtn, index, item.class, btnSize, item.text));
      });
      html.push(HTML$1.modalFooter[1]);
    } else if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].buttons === null) {
      html.push(Utils.sprintf(HTML$1.modalFooter[0], btnAlign));
      html.push(Utils.sprintf(HTML$1.modalFooterBtn, DATA_KEY_OK_NAME, _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnOKClass, btnSize, _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnOKText));
      if (_classPrivateFieldLooseBase(this, _config$9)[_config$9].btnCancel === true) {
        html.push(Utils.sprintf(HTML$1.modalFooterBtn, DATA_KEY_CANCEL_NAME, _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnCancelClass, btnSize, _classPrivateFieldLooseBase(this, _config$9)[_config$9].btnCancelText));
      }
      html.push(HTML$1.modalFooter[1]);
    }
    html.push(HTML$1.modalContent[1]);
    html.push(HTML$1.modalDialog[1]);
    html.push(HTML$1.modalWrapper[1]);
    html.push(HTML$1.modal[1]);

    //转回字符串
    html = html.join('');

    //加入到body中放着
    _classPrivateFieldLooseBase(this, _$$1)[_$$1](html).prependTo('body');

    //查找元素方便后续的使用,避免重复的查找
    _classPrivateFieldLooseBase(this, _element$8)[_element$8] = _classPrivateFieldLooseBase(this, _$$1)[_$$1](`#${_classPrivateFieldLooseBase(this, _id)[_id]}`);
    _classPrivateFieldLooseBase(this, _modalDialog)[_modalDialog] = _classPrivateFieldLooseBase(this, _element$8)[_element$8].find('.modal-dialog');
    _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl] = _classPrivateFieldLooseBase(this, _element$8)[_element$8].find('.modal-body');
    _classPrivateFieldLooseBase(this, _modalHeader)[_modalHeader] = _classPrivateFieldLooseBase(this, _element$8)[_element$8].find('.modal-header');
    _classPrivateFieldLooseBase(this, _modalFooter)[_modalFooter] = _classPrivateFieldLooseBase(this, _element$8)[_element$8].find('.modal-footer');
    _classPrivateFieldLooseBase(this, _iframe)[_iframe] = _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl].find('iframe');
    _classPrivateFieldLooseBase(this, _modalWrapper)[_modalWrapper] = _classPrivateFieldLooseBase(this, _element$8)[_element$8].find(`.${ClassName$2.MODAL_WRAPPER}`);

    //动态计算高度
    _classPrivateFieldLooseBase(this, _bodyDynamicHeight)[_bodyDynamicHeight]();
  }
  function _bodyDynamicHeight2() {
    //设置body高度
    if (_classPrivateFieldLooseBase(this, _iframe)[_iframe].length > 0 && _classPrivateFieldLooseBase(this, _config$9)[_config$9].height === undefined) {
      //是iframe则动态设置高度

      //先动态显示出来
      _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].style.display = 'block';
      //拿到高度
      let headerHeader = _classPrivateFieldLooseBase(this, _modalHeader)[_modalHeader].length > 0 ? _classPrivateFieldLooseBase(this, _modalHeader)[_modalHeader][0].getBoundingClientRect().height : 0;
      let footerHeader = _classPrivateFieldLooseBase(this, _modalFooter)[_modalFooter].length > 0 ? _classPrivateFieldLooseBase(this, _modalFooter)[_modalFooter][0].getBoundingClientRect().height : 0;
      //立马隐藏
      _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].style.display = 'none';

      //动态设置高度
      _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl][0].style.height = `calc(100vh - 9rem - ${headerHeader + footerHeader}px)`;
    } else {
      //设置选项提供的高度
      _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl][0].style.height = _classPrivateFieldLooseBase(this, _config$9)[_config$9].height;
    }
  }
  function _bindEvents2() {
    _classPrivateFieldLooseBase(this, _bindModalEvents)[_bindModalEvents]();
    _classPrivateFieldLooseBase(this, _bindIFrameEvents)[_bindIFrameEvents]();
    _classPrivateFieldLooseBase(this, _bindRefreshBtnEvents)[_bindRefreshBtnEvents]();
    _classPrivateFieldLooseBase(this, _bindFullscreenEvents)[_bindFullscreenEvents]();
    _classPrivateFieldLooseBase(this, _bandFooterBtnEvent)[_bandFooterBtnEvent]();
    _classPrivateFieldLooseBase(this, _bindMessageEvent)[_bindMessageEvent]();
  }
  function _bindFullscreenEvents2() {
    const that = this;
    _classPrivateFieldLooseBase(this, _modalHeader)[_modalHeader].on('click', '.btn-fullscreen-trigger', function () {
      if (!_classPrivateFieldLooseBase(that, _modalDialog)[_modalDialog].hasClass(ClassName$2.MODAL_FULLSCREEN)) {
        _classPrivateFieldLooseBase(that, _modalDialog)[_modalDialog].addClass(ClassName$2.MODAL_FULLSCREEN);
        $(this).removeClass(ClassName$2.BTN_FULLSCREEN).addClass(ClassName$2.BTN_FULLSCREEN_EXIT);
      } else {
        _classPrivateFieldLooseBase(that, _modalDialog)[_modalDialog].removeClass(ClassName$2.MODAL_FULLSCREEN);
        $(this).removeClass(ClassName$2.BTN_FULLSCREEN_EXIT).addClass(ClassName$2.BTN_FULLSCREEN);
      }
    });
  }
  function _bindRefreshBtnEvents2() {
    const that = this;

    //刷新按钮
    _classPrivateFieldLooseBase(this, _modalHeader)[_modalHeader].on('click', '.btn-refresh', function () {
      _classPrivateFieldLooseBase(that, _showLoading)[_showLoading]();

      //判断是否是跨域的iframe,如果是跨域的就直接移除重新添加
      if (!_classPrivateFieldLooseBase(that, _isCrossOrigin)[_isCrossOrigin](_classPrivateFieldLooseBase(that, _iframe)[_iframe][0])) {
        _classPrivateFieldLooseBase(that, _iframe)[_iframe][0].contentWindow.location.reload();
      } else {
        _classPrivateFieldLooseBase(that, _iframe)[_iframe].attr('src', Utils.addSearchParams(_classPrivateFieldLooseBase(that, _iframe)[_iframe].attr('src'), {
          ___t: Math.random()
        }));
      }
    });
  }
  function _bindMessageEvent2() {
    window[_classPrivateFieldLooseBase(this, _config$9)[_config$9].window].addEventListener('message', event => {
      if (event.source === _classPrivateFieldLooseBase(this, _iframe)[_iframe][0].contentWindow) {
        //判断是否来自子页面的
        //调用选项
        typeof _classPrivateFieldLooseBase(this, _config$9)[_config$9].onMessage === 'function' && _classPrivateFieldLooseBase(this, _config$9)[_config$9].onMessage.call(this, event.data, event.source, event.origin);
      }
    }, false);
  }
  function _bindModalEvents2() {
    let that = this;
    _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].addEventListener('hide.bs.modal', function (event) {
      typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHide === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHide.call(that, event);
    });

    //监听
    _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].addEventListener('hidden.bs.modal', function (event) {
      typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHidden === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHidden.call(that, event);
      _classPrivateFieldLooseBase(that, _destory)[_destory]();
    });

    //监听
    _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].addEventListener('hidePrevented.bs.modal', function (event) {
      typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHidePrevented === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].onHidePrevented.call(that, event);
    });
    _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].addEventListener('show.bs.modal', function (event) {
      typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].onShow === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].onShow.call(that, event);
    });
    _classPrivateFieldLooseBase(this, _element$8)[_element$8][0].addEventListener('shown.bs.modal', function (event) {
      //设置src
      _classPrivateFieldLooseBase(that, _iframe)[_iframe].attr('src', _classPrivateFieldLooseBase(that, _config$9)[_config$9].url);
      typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].onShown === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].onShown.call(that, event);
    });
  }
  function _isCrossOrigin2(iframe) {
    try {
      // 尝试访问 iframe 的内容
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      // 如果没有抛出异常，说明不是跨域的
      return false;
    } catch (e) {
      // 如果捕获到 SecurityError 异常，说明是跨域的
      if (e instanceof DOMException && e.name === 'SecurityError') {
        return true;
      } else {
        throw e; // 重新抛出不是 SecurityError 的异常
      }
    }
  }
  function _bindIFrameEvents2() {
    const that = this;
    if (_classPrivateFieldLooseBase(this, _iframe)[_iframe].length > 0) {
      //绑定事件
      _classPrivateFieldLooseBase(this, _iframe)[_iframe].on('load', function () {
        $.loading.hide({
          window: _classPrivateFieldLooseBase(that, _config$9)[_config$9].window,
          container: _classPrivateFieldLooseBase(that, _modalBodyEl)[_modalBodyEl]
        });
      });
    }
  }
  function _destory2() {
    //销毁滚动条
    const osBodyInstance = _classPrivateFieldLooseBase(this, _modalBodyEl)[_modalBodyEl].Scrollbar('getOsInstance');
    if (!osBodyInstance.jquery) {
      $(osBodyInstance.elements().viewport).html('');
      osBodyInstance.destroy();
    }
    const osInstance = _classPrivateFieldLooseBase(this, _modalWrapper)[_modalWrapper].Scrollbar('getOsInstance');
    if (!osInstance.jquery) {
      $(osInstance.elements().viewport).html('');
      osInstance.destroy();
    }
    // 删除dom上存储的数据
    _classPrivateFieldLooseBase(this, _modalInstance)[_modalInstance].dispose();

    // 直接删除整个元素
    _classPrivateFieldLooseBase(this, _element$8)[_element$8].remove();
  }
  function _bandFooterBtnEvent2() {
    let that = this;
    _classPrivateFieldLooseBase(this, _modalFooter)[_modalFooter].on('click', 'button', function () {
      let key = $(this).attr('data-key');
      let contentWindow;
      if (_classPrivateFieldLooseBase(that, _iframe)[_iframe].length > 0) {
        contentWindow = _classPrivateFieldLooseBase(that, _iframe)[_iframe][0].contentWindow;
      }
      if ([DATA_KEY_OK_NAME, DATA_KEY_CANCEL_NAME].includes(key)) {
        if (key === DATA_KEY_OK_NAME && typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].ok === 'function') {
          //ok 默认不要自动关闭
          _classPrivateFieldLooseBase(that, _config$9)[_config$9].ok.call(that, contentWindow);
        }
        if (key === DATA_KEY_CANCEL_NAME && typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].cancel === 'function') {
          let callret = _classPrivateFieldLooseBase(that, _config$9)[_config$9].cancel.call(that, contentWindow);
          if (callret !== false) {
            that.hide();
          }
        }
      } else {
        typeof _classPrivateFieldLooseBase(that, _config$9)[_config$9].buttons[key]['action'] === 'function' && _classPrivateFieldLooseBase(that, _config$9)[_config$9].buttons[key].action.call(that, contentWindow);
      }
    });
  }
  $[NAME$9] = function (options) {
    return new Modal($.extend({}, $[NAME$9].default, options));
  };
  $[NAME$9].default = Default$9;

  // 全局api的名称
  const NAME$8 = 'loading';

  //类名
  const ClassName$1 = {
    loading: 'bsa-loading',
    //显示时的激活类
    active: 'active'
  };
  const Map = {
    spinner: {
      border: 'spinner-border',
      grow: 'spinner-grow'
    },
    //主题色
    spinnerColorScheme: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      danger: 'text-danger',
      warning: 'text-warning',
      info: 'text-info',
      dark: 'text-dark',
      light: 'text-light'
    }
  };

  // html的结构
  const HTML = {
    container: [`<div class="${ClassName$1.loading}">`, `</div>`],
    //旋转器 参数1:旋转器类型,参数2:主题色 参数3:尺寸 参数4:行内样式控制的尺寸
    spinner: `<div class="%s %s %s" %s role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
  };

  //默认参数
  const Default$8 = {
    //打开的窗口对象
    window: 'top',
    //容器,选择器，element。jQuery对象
    container: 'body',
    // 容器的定位
    containerPosition: 'relative',
    //情景模式 undefined/string 可用值:primary success info  warning danger light dark
    type: '',
    //旋转器 grow:实心圈  border:空心圈
    spinner: 'border',
    //尺寸 可选值 'sm' | 'style="width: 3rem; height: 3rem;"'
    size: '',
    //给loading层附加的样式类
    class: '',
    //是否有淡出效果
    fadeOut: true
  };
  var _config$8 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _$ = /*#__PURE__*/_classPrivateFieldLooseKey("$");
  var _$loading = /*#__PURE__*/_classPrivateFieldLooseKey("$loading");
  var _transitionendListeners = /*#__PURE__*/_classPrivateFieldLooseKey("transitionendListeners");
  var _transitionendHandle = /*#__PURE__*/_classPrivateFieldLooseKey("transitionendHandle");
  var _createLoadingElement = /*#__PURE__*/_classPrivateFieldLooseKey("createLoadingElement");
  class Loading {
    //构造函数
    constructor(config) {
      Object.defineProperty(this, _createLoadingElement, {
        value: _createLoadingElement2
      });
      Object.defineProperty(this, _transitionendHandle, {
        value: _transitionendHandle2
      });
      Object.defineProperty(this, _transitionendListeners, {
        value: _transitionendListeners2
      });
      Object.defineProperty(this, _config$8, {
        writable: true,
        value: void 0
      });
      // jquery对象
      Object.defineProperty(this, _$, {
        writable: true,
        value: void 0
      });
      //元素
      Object.defineProperty(this, _$loading, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$8)[_config$8] = config;

      //更改触发的jquery对象
      _classPrivateFieldLooseBase(this, _$)[_$] = window[_classPrivateFieldLooseBase(this, _config$8)[_config$8].window].$;
      _classPrivateFieldLooseBase(this, _createLoadingElement)[_createLoadingElement]();
      _classPrivateFieldLooseBase(this, _transitionendListeners)[_transitionendListeners]();
    }
    show() {
      _classPrivateFieldLooseBase(this, _$loading)[_$loading].addClass(ClassName$1.active);
    }
    hide(options) {
      let config = Object.assign(_classPrivateFieldLooseBase(this, _config$8)[_config$8], typeof options === "object" ? options : {});
      const $loading = window[config.window].$(config.container).find(`.${ClassName$1.loading}`);
      if (_classPrivateFieldLooseBase(this, _config$8)[_config$8].fadeOut === true) {
        $loading.addClass('fade-out');
      } else {
        $loading.remove();
      }
    }
  }

  /**
   * jQuery 全局函数 API
   * ====================================================
   */
  function _transitionendListeners2() {
    //事件委托
    if (_classPrivateFieldLooseBase(this, _config$8)[_config$8].fadeOut === true) {
      _classPrivateFieldLooseBase(this, _$)[_$](window[_classPrivateFieldLooseBase(this, _config$8)[_config$8].window].document).off('transitionend', `.${ClassName$1.loading}`, _classPrivateFieldLooseBase(this, _transitionendHandle)[_transitionendHandle]);
      _classPrivateFieldLooseBase(this, _$)[_$](window[_classPrivateFieldLooseBase(this, _config$8)[_config$8].window].document).on('transitionend', `.${ClassName$1.loading}`, _classPrivateFieldLooseBase(this, _transitionendHandle)[_transitionendHandle]);
    }
  }
  function _transitionendHandle2() {
    $(this).remove();
  }
  function _createLoadingElement2() {
    let html = [];
    html.push(HTML.container[0]);
    let spinner = Map.spinner[_classPrivateFieldLooseBase(this, _config$8)[_config$8].spinner] || 'spinner-border';
    let color = Map.spinnerColorScheme[_classPrivateFieldLooseBase(this, _config$8)[_config$8].type] || '';
    let size = _classPrivateFieldLooseBase(this, _config$8)[_config$8].size === 'sm' ? spinner + '-sm' : '';
    let styleSize = _classPrivateFieldLooseBase(this, _config$8)[_config$8].size !== 'sm' ? _classPrivateFieldLooseBase(this, _config$8)[_config$8].size : '';
    html.push(Utils.sprintf(HTML.spinner, spinner, color, size, styleSize));
    html.push(HTML.container[1]);
    html = html.join('');

    //先移除
    _classPrivateFieldLooseBase(this, _$)[_$](_classPrivateFieldLooseBase(this, _config$8)[_config$8].container).find(`.${ClassName$1.loading}`).remove();
    _classPrivateFieldLooseBase(this, _$)[_$](html).prependTo(_classPrivateFieldLooseBase(this, _config$8)[_config$8].container);
    //查找元素
    _classPrivateFieldLooseBase(this, _$loading)[_$loading] = _classPrivateFieldLooseBase(this, _$)[_$](_classPrivateFieldLooseBase(this, _config$8)[_config$8].container).find(`.${ClassName$1.loading}`);
    _classPrivateFieldLooseBase(this, _$)[_$](_classPrivateFieldLooseBase(this, _config$8)[_config$8].container).css({
      position: _classPrivateFieldLooseBase(this, _config$8)[_config$8].containerPosition
    });
    if (_classPrivateFieldLooseBase(this, _config$8)[_config$8].container !== 'body') {
      //动态设置样式
      _classPrivateFieldLooseBase(this, _$loading)[_$loading].css({
        position: 'absolute'
      });
    }
    _classPrivateFieldLooseBase(this, _config$8)[_config$8].class !== '' && _classPrivateFieldLooseBase(this, _$loading)[_$loading].addClass(_classPrivateFieldLooseBase(this, _config$8)[_config$8].class);
  }
  let loadingInstance;
  $[NAME$8] = function (options) {
    loadingInstance = new Loading($.extend({}, $[NAME$8].default, typeof options === 'object' ? options : {}));
    return loadingInstance;
  };
  $[NAME$8].hide = function (options) {
    loadingInstance.hide(options);
  };
  $[NAME$8].default = Default$8;

  const {
    OverlayScrollbars,
    ScrollbarsHidingPlugin,
    SizeObserverPlugin,
    ClickScrollPlugin
  } = OverlayScrollbarsGlobal;
  const NAME$7 = 'Scrollbar';
  const DATA_KEY$7 = 'bsa.scrollbar';
  const JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  const SELECTOR_DATA_TOGGLE$6 = '[data-bsa-toggle="scrollbar"]';
  const Default$7 = {
    param1: {},
    param2: {
      overflow: {
        x: 'hidden',
        y: 'scroll'
      },
      scrollbars: {
        //never scroll leave move
        autoHide: 'leave',
        //是否可以点击轨道滚动
        clickScroll: true,
        //隐藏滚动条的时间
        autoHideDelay: 1300
      }
    },
    param3: {}
  };
  var _config$7 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$7 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _osInstance = /*#__PURE__*/_classPrivateFieldLooseKey("osInstance");
  var _init$7 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  class Scrollbar {
    constructor(element, config) {
      // Private
      Object.defineProperty(this, _init$7, {
        value: _init2$7
      });
      Object.defineProperty(this, _config$7, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$7, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _osInstance, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$7)[_config$7] = config;
      _classPrivateFieldLooseBase(this, _element$7)[_element$7] = element;
    }
    // 获取滚动条插件的实例
    getOsInstance() {
      return _classPrivateFieldLooseBase(this, _osInstance)[_osInstance];
    }

    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$7);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Scrollbar($(this), $.extend({}, Default$7, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$7, data);
        _classPrivateFieldLooseBase(data, _init$7)[_init$7]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$7() {
    //插件注册
    OverlayScrollbars.plugin([SizeObserverPlugin, ClickScrollPlugin, ScrollbarsHidingPlugin]);

    //初始化实例
    _classPrivateFieldLooseBase(this, _osInstance)[_osInstance] = OverlayScrollbars($.isEmptyObject(_classPrivateFieldLooseBase(this, _config$7)[_config$7].param1) ? _classPrivateFieldLooseBase(this, _element$7)[_element$7][0] : _classPrivateFieldLooseBase(this, _config$7)[_config$7].param1, _classPrivateFieldLooseBase(this, _config$7)[_config$7].param2, _classPrivateFieldLooseBase(this, _config$7)[_config$7].param3);
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$6).each(function () {
      Scrollbar.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$7] = Scrollbar.jQueryInterface;
  $.fn[NAME$7].Constructor = Scrollbar;
  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Scrollbar.jQueryInterface;
  };

  const NAME$6 = 'Fullscreen';
  const DATA_KEY$6 = 'bsa.fullscreen';
  const JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  const SELECTOR_DATA_TOGGLE$5 = '[data-bsa-toggle="fullscreen"]';

  // 默认选项
  const Default$6 = {
    //全屏图标
    fullIcon: 'bi bi-arrows-fullscreen',
    //退出全屏图标
    exitIcon: 'bi bi-fullscreen-exit'
  };
  var _config$6 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$6 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init$6 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$4 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  var _iconToggle = /*#__PURE__*/_classPrivateFieldLooseKey("iconToggle");
  class Fullscreen {
    constructor(element, config) {
      Object.defineProperty(this, _iconToggle, {
        value: _iconToggle2
      });
      Object.defineProperty(this, _setupListeners$4, {
        value: _setupListeners2$4
      });
      // Private
      Object.defineProperty(this, _init$6, {
        value: _init2$6
      });
      Object.defineProperty(this, _config$6, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$6, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$6)[_config$6] = config;
      _classPrivateFieldLooseBase(this, _element$6)[_element$6] = element;
    }
    toggle() {
      if (document.fullscreenElement) {
        this.exitFullscreen();
      } else {
        this.fullscreen();
      }
    }
    // 全屏
    fullscreen() {
      document.documentElement.requestFullscreen();
    }

    // 退出全屏
    exitFullscreen() {
      document.exitFullscreen();
    }

    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$6);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Fullscreen($(this), $.extend({}, Default$6, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$6, data);
        _classPrivateFieldLooseBase(data, _init$6)[_init$6]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$6() {
    _classPrivateFieldLooseBase(this, _setupListeners$4)[_setupListeners$4]();
  }
  function _setupListeners2$4() {
    const that = this;

    // 这里是全局监听,避免是非通过点击退出全屏时图标没有恢复的问题
    $(document).on('fullscreenchange', function () {
      _classPrivateFieldLooseBase(that, _iconToggle)[_iconToggle]();
    });
    _classPrivateFieldLooseBase(that, _element$6)[_element$6].on('click', function () {
      that.toggle();
    });
  }
  function _iconToggle2() {
    if (document.fullscreenElement) {
      //全屏图标
      _classPrivateFieldLooseBase(this, _element$6)[_element$6].find('i').removeClass(_classPrivateFieldLooseBase(this, _config$6)[_config$6].fullIcon).addClass(_classPrivateFieldLooseBase(this, _config$6)[_config$6].exitIcon);
    } else {
      _classPrivateFieldLooseBase(this, _element$6)[_element$6].find('i').removeClass(_classPrivateFieldLooseBase(this, _config$6)[_config$6].exitIcon).addClass(_classPrivateFieldLooseBase(this, _config$6)[_config$6].fullIcon);
    }
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$5).each(function () {
      Fullscreen.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$6] = Fullscreen.jQueryInterface;
  $.fn[NAME$6].Constructor = Fullscreen;
  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Fullscreen.jQueryInterface;
  };

  const NAME$5 = 'IFrame';
  const DATA_KEY$5 = 'bsa.iframe';
  const JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  const SELECTOR_DATA_TOGGLE$4 = '[data-bsa-toggle="iframe"]';
  const Default$5 = {
    //侧边栏是否跟着tab的激活来进行展开折叠动画
    sidebarToggle: false,
    //点击是否自动关闭侧边栏
    clickCloseSidebar: false,
    //触发元素选择器
    triggerElement: '.bsa-navigation a:not(.has-arrow):not([target])',
    //treeview的实例选择器
    treeviewElement: '.bsa-navigation',
    //scrollbar的实例选择器
    scrollbarElement: '.bsa-sidebar .card-body',
    //pushMenu插件的选择器
    pushMenuElement: '.bsa-sidebar-toggler',
    //tab的标题,选择器字符串,内部是从triggerElement提供的选择器下面查找的
    tabTitle: '.content'
  };
  var _config$5 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$5 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _quicktab = /*#__PURE__*/_classPrivateFieldLooseKey("quicktab");
  var _$treeview = /*#__PURE__*/_classPrivateFieldLooseKey("$treeview");
  var _link = /*#__PURE__*/_classPrivateFieldLooseKey("link");
  var _clicked = /*#__PURE__*/_classPrivateFieldLooseKey("clicked");
  var _init$5 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$3 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  class IFrame {
    constructor(element, config) {
      Object.defineProperty(this, _setupListeners$3, {
        value: _setupListeners2$3
      });
      // Private
      Object.defineProperty(this, _init$5, {
        value: _init2$5
      });
      Object.defineProperty(this, _config$5, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$5, {
        writable: true,
        value: void 0
      });
      // quicktab插件实例
      Object.defineProperty(this, _quicktab, {
        writable: true,
        value: void 0
      });
      // 内部插件treeview实例
      Object.defineProperty(this, _$treeview, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _link, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _clicked, {
        writable: true,
        value: false
      });
      _classPrivateFieldLooseBase(this, _config$5)[_config$5] = config;
      _classPrivateFieldLooseBase(this, _element$5)[_element$5] = element;
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$5);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] !== 'undefined') {
            value = data[config](...args);
          } else if (_classPrivateFieldLooseBase(data, _quicktab)[_quicktab][config] !== 'undefined') {
            value = _classPrivateFieldLooseBase(data, _quicktab)[_quicktab][config](...args);
          } else {
            throw new TypeError(`No method named "${config}"`);
          }
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new IFrame($(this), $.extend({}, Default$5, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$5, data);
        _classPrivateFieldLooseBase(data, _init$5)[_init$5]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$5() {
    const that = this;
    _classPrivateFieldLooseBase(this, _$treeview)[_$treeview] = $(_classPrivateFieldLooseBase(this, _config$5)[_config$5].treeviewElement);

    //初始化quicktab实例
    _classPrivateFieldLooseBase(this, _quicktab)[_quicktab] = new Quicktab(_classPrivateFieldLooseBase(this, _element$5)[_element$5][0], {
      height: '100%',
      //tab的激活事件
      onTabActivated: function (url) {
        if (_classPrivateFieldLooseBase(that, _config$5)[_config$5].sidebarToggle === true) {
          if (_classPrivateFieldLooseBase(that, _clicked)[_clicked] === false) {
            _classPrivateFieldLooseBase(that, _link)[_link] = $(_classPrivateFieldLooseBase(that, _config$5)[_config$5].triggerElement).filter(function () {
              return $(this).attr('href') === url;
            });
            if (_classPrivateFieldLooseBase(that, _link)[_link].length > 0) {
              //调用expandRecursive方法
              _classPrivateFieldLooseBase(that, _$treeview)[_$treeview].Treeview('expandRecursive', _classPrivateFieldLooseBase(that, _link)[_link]);
            }
          }
          _classPrivateFieldLooseBase(that, _clicked)[_clicked] = false;
        }
      },
      onTabCloseAll: function () {
        _classPrivateFieldLooseBase(that, _$treeview)[_$treeview].Treeview('collapseAll');
      },
      onInit: function () {
        $('.quicktab-dropdown .body').Scrollbar();
      }
    });

    // 初始化点击事件
    _classPrivateFieldLooseBase(this, _setupListeners$3)[_setupListeners$3]();
  }
  function _setupListeners2$3() {
    const that = this;

    //侧边栏，没有子集的链接
    $(document).on('click', _classPrivateFieldLooseBase(that, _config$5)[_config$5].triggerElement, function (event) {
      event.preventDefault(); //阻止默认事件

      const $trigger = $(this);

      // 移除所有的激活类
      _classPrivateFieldLooseBase(that, _$treeview)[_$treeview].Treeview('removeAllActiveClass');

      // 给当前的a添加激活类
      _classPrivateFieldLooseBase(that, _$treeview)[_$treeview].Treeview('addActiveClass', $trigger);
      if (_classPrivateFieldLooseBase(that, _config$5)[_config$5].clickCloseSidebar === true) {
        //如果开启自动关闭
        $(_classPrivateFieldLooseBase(that, _config$5)[_config$5].pushMenuElement).PushMenu('collapse');
      }
      _classPrivateFieldLooseBase(that, _clicked)[_clicked] = true;

      //添加tab处理
      _classPrivateFieldLooseBase(that, _quicktab)[_quicktab].addTab({
        title: $trigger.find(_classPrivateFieldLooseBase(that, _config$5)[_config$5].tabTitle).text(),
        url: this.getAttribute('href'),
        close: true
      });
    });

    //treeview插件的事件监听
    _classPrivateFieldLooseBase(this, _$treeview)[_$treeview].on('recursive.collapsed.bsa.treeview', function () {
      $(_classPrivateFieldLooseBase(that, _config$5)[_config$5].scrollbarElement).Scrollbar('getOsInstance').elements().viewport.scrollTo({
        top: _classPrivateFieldLooseBase(that, _link)[_link].prop('offsetTop'),
        behavior: 'smooth'
      });
    });
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$4).each(function () {
      IFrame.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */
  $.fn[NAME$5] = IFrame.jQueryInterface;
  $.fn[NAME$5].Constructor = IFrame;
  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return IFrame.jQueryInterface;
  };

  const NAME$4 = 'BackToTop';
  const DATA_KEY$4 = 'bsa.backtotop';
  const EVENT_KEY$1 = `.${DATA_KEY$4}`;
  const JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  const SELECTOR_DATA_TOGGLE$3 = '[data-bsa-toggle="backtotop"]';
  const EVENT_SCROLL_BEFORE = `scroll.before${EVENT_KEY$1}`;
  const EVENT_SCROLL_COMPLETE = `scroll.complete${EVENT_KEY$1}`;

  // 类名,美化的
  const CLASS_NAME_BACKTOTOP = 'bsa-back-to-top';
  const Default$4 = {
    //距离顶部的距离
    distanceFromTop: 300,
    //滚动速度
    speed: 600,
    //添加到那个容器中
    prependTo: 'body',
    //触发元素
    triggerElement: '.bsa-back-to-top'
  };
  var _config$4 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$4 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init$4 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$2 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  class BackToTop {
    constructor(element, config) {
      Object.defineProperty(this, _setupListeners$2, {
        value: _setupListeners2$2
      });
      // Private
      Object.defineProperty(this, _init$4, {
        value: _init2$4
      });
      Object.defineProperty(this, _config$4, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$4, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$4)[_config$4] = config;
      _classPrivateFieldLooseBase(this, _element$4)[_element$4] = element;
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$4);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new BackToTop($(this), $.extend({}, Default$4, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$4, data);
        _classPrivateFieldLooseBase(data, _init$4)[_init$4]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$4() {
    _classPrivateFieldLooseBase(this, _setupListeners$2)[_setupListeners$2]();
  }
  function _setupListeners2$2() {
    const that = this;

    //回到顶部,向下滚动300px渐显回到顶部按钮
    $(window).on('scroll', function () {
      // 先找到这个滚动到顶部的元素
      const $backtotop = $(`.${CLASS_NAME_BACKTOTOP}`);
      if ($backtotop.length === 0) {
        //如果没有
        $(`<a class="${CLASS_NAME_BACKTOTOP}"><i class="bi bi-arrow-up-short"></i></a>`).prependTo($(_classPrivateFieldLooseBase(that, _config$4)[_config$4].prependTo));
      }
      $(this).scrollTop() > _classPrivateFieldLooseBase(that, _config$4)[_config$4].distanceFromTop ? $backtotop.fadeIn() : $backtotop.fadeOut();
    });

    //回到顶部事件监听
    $(document).on('click', _classPrivateFieldLooseBase(that, _config$4)[_config$4].triggerElement, function () {
      $(_classPrivateFieldLooseBase(that, _element$4)[_element$4]).trigger($.Event(EVENT_SCROLL_BEFORE));
      $('html').animate({
        scrollTop: 0
      }, _classPrivateFieldLooseBase(that, _config$4)[_config$4].speed, function () {
        $(_classPrivateFieldLooseBase(that, _element$4)[_element$4]).trigger($.Event(EVENT_SCROLL_COMPLETE));
      });
    });
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$3).each(function () {
      BackToTop.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$4] = BackToTop.jQueryInterface;
  $.fn[NAME$4].Constructor = BackToTop;
  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return BackToTop.jQueryInterface;
  };

  const NAME$3 = 'Initialize';
  const DATA_KEY$3 = 'bsa.initialize';
  const JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];

  //类名
  const ClassName = {
    pe: 'pe-none'
  };
  const Default$3 = {
    //提示工具允许的属性和标签设置 see:https://getbootstrap.com/docs/5.3/getting-started/javascript/#sanitizer
    sanitizerAllowList: {
      '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
      a: ['target', 'href', 'title', 'rel'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
      button: ['onclick']
    },
    //提示和气泡工具是否点击下一次自动关闭
    nextClickDismiss: true
  };
  var _config$3 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$3 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _headerDropdown = /*#__PURE__*/_classPrivateFieldLooseKey("headerDropdown");
  var _checkProtocol = /*#__PURE__*/_classPrivateFieldLooseKey("checkProtocol");
  var _init$3 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _optimize = /*#__PURE__*/_classPrivateFieldLooseKey("optimize");
  var _nextClickDismiss = /*#__PURE__*/_classPrivateFieldLooseKey("nextClickDismiss");
  var _sanitizerSetUp = /*#__PURE__*/_classPrivateFieldLooseKey("sanitizerSetUp");
  class Initialize {
    constructor(element, config) {
      // 消毒剂处理
      Object.defineProperty(this, _sanitizerSetUp, {
        value: _sanitizerSetUp2
      });
      //优化:处理提示工具和气泡工具的下一次关闭，弥补官方的不足，官方的下一次关闭只能是a元素，参阅:https://getbootstrap.com/docs/5.3/components/popovers/#dismiss-on-next-click
      Object.defineProperty(this, _nextClickDismiss, {
        value: _nextClickDismiss2
      });
      Object.defineProperty(this, _optimize, {
        value: _optimize2
      });
      // Private
      Object.defineProperty(this, _init$3, {
        value: _init2$3
      });
      Object.defineProperty(this, _checkProtocol, {
        value: _checkProtocol2
      });
      Object.defineProperty(this, _headerDropdown, {
        value: _headerDropdown2
      });
      Object.defineProperty(this, _config$3, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$3, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$3)[_config$3] = config;
      _classPrivateFieldLooseBase(this, _element$3)[_element$3] = element;
    }

    //bootstrap提示组件初始化
    tooltipInit(config = {}, hide = false) {
      $('[data-bs-toggle="tooltip"]').each(function () {
        const instance = bootstrap.Tooltip.getOrCreateInstance(this, config);
        hide && instance.hide();
      });
    }

    //bootstrap气泡组件初始化
    popoverInit(config = {}, hide = false) {
      $('[data-bs-toggle="popover"]').each(function () {
        const instance = bootstrap.Popover.getOrCreateInstance(this, config);
        hide && instance.hide();
      });
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$3);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Initialize($(this), $.extend({}, Default$3, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$3, data);
        _classPrivateFieldLooseBase(data, _init$3)[_init$3]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _headerDropdown2() {
    $('.bsa-header [data-bs-toggle="dropdown"]').on('hidden.bs.dropdown shown.bs.dropdown', function (event) {
      const $content = $('.bsa-content');
      $('.bsa-header .dropdown-menu.show').length > 0 ? $content.addClass(ClassName.pe) : $content.removeClass(ClassName.pe);
    });
  }
  function _checkProtocol2() {
    // 检查协议
    if (window.location.protocol === 'file:') {
      const relativePath = window.location.pathname + window.location.search + window.location.hash;
      alert(`您正在通过file://协议打开${relativePath}页面。为了确保一切功能正常，请通过本地服务器运行此页面`);
      document.write('');
      document.close(); // 确保文档流关闭
    }
  }
  function _init2$3() {
    _classPrivateFieldLooseBase(this, _checkProtocol)[_checkProtocol]();
    _classPrivateFieldLooseBase(this, _sanitizerSetUp)[_sanitizerSetUp]();
    this.tooltipInit();
    this.popoverInit();
    _classPrivateFieldLooseBase(this, _headerDropdown)[_headerDropdown]();
    _classPrivateFieldLooseBase(this, _optimize)[_optimize]();
    _classPrivateFieldLooseBase(this, _nextClickDismiss)[_nextClickDismiss]();
  }
  function _optimize2() {
    //优化:禁止所有的input记忆输入内容
    $('input').attr('AutoComplete', 'off');

    // 优化:在提示框和气泡框显示出来之前先把别的已经存在的都隐藏掉
    $(document).on('show.bs.popover', '[data-bs-toggle="popover"]', () => {
      this.popoverInit({}, true);
    });
    $(document).on('show.bs.tooltip', '[data-bs-toggle="tooltip"]', () => {
      this.tooltipInit({}, true);
    });

    //优化:无效表单禁止提交(如果form没有action属性或者action属性值等于#,不让提交)
    $(document).on('submit', 'form', function (event) {
      const action = $(this).attr('action');
      if (action === undefined || action === '#') {
        event.preventDefault();
      }
    });

    //优化:对于含有#的a链接阻止默认事件
    $(document).on('click', 'a[href="#"]', function (event) {
      event.preventDefault();
    });

    //优化表单验证插件，在请求完毕后按钮重置，自动再重置表单
    $(document).on('ajaxComplete', function (event, jqXHR, ajaxOptions) {
      $('form').each(function () {
        const formValidation = $(this).data('formValidation');
        if (formValidation !== undefined) {
          //再次判断表单验证插件有实例

          formValidation.resetForm();
        }
      });
    });
  }
  function _nextClickDismiss2() {
    const that = this;
    if (_classPrivateFieldLooseBase(that, _config$3)[_config$3].nextClickDismiss === true) {
      $(document).on('click', function (event) {
        if (!$(event.target).closest('[data-bs-toggle="popover"],[data-bs-toggle="tooltip"]').length) {
          that.tooltipInit({}, true);
          that.popoverInit({}, true);
        }
      });
    }
  }
  function _sanitizerSetUp2() {
    $.extend(bootstrap.Tooltip.Default.allowList, Default$3.sanitizerAllowList);
  }
  $(() => {
    Initialize.jQueryInterface.call($('body'));
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$3] = Initialize.jQueryInterface;
  $.fn[NAME$3].Constructor = Initialize;
  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Initialize.jQueryInterface;
  };

  const NAME$2 = 'Table';
  const DATA_KEY$2 = 'bsa.table';
  const JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  const SELECTOR_DATA_TOGGLE$2 = '[data-bsa-toggle="table"]';

  // 图标相关配置
  const ICON = {
    // 图标前缀
    iconsPrefix: 'bi',
    // 图标大小 undefined sm lg
    iconSize: undefined,
    // 图标的设置 详细参考:https://examples.bootstrap-table.com/#options/table-icons.html
    icons: {
      paginationSwitchDown: 'bi bi-sort-down',
      paginationSwitchUp: 'bi bi-sort-up',
      refresh: 'bi-arrow-repeat',
      toggleOff: 'bi-toggle2-off',
      toggleOn: 'bi-toggle2-on',
      fullscreen: 'bi-fullscreen',
      columns: 'bi-card-checklist',
      detailOpen: 'bi-plus',
      detailClose: 'bi-dash'
    }
  };

  //工具栏相关配置
  const TOOLBAR = {
    // 工具按钮容器
    toolbar: '#toolbar',
    // true:显示详细视图和列表视图的切换按钮
    showToggle: true,
    // true:显示可以弹出所有列名称的列表的下拉菜单的按钮
    showColumns: true,
    // true:显示刷新按钮
    showRefresh: true,
    // true:显示全屏按钮
    showFullscreen: true,
    // true:显示控制分页的开关的按钮
    showPaginationSwitch: true,
    // true:toolbar的按钮组则会显示图标
    showButtonIcons: true,
    // true:toolbar的按钮组则会显示文本,false:不显示按钮的文本信息，为了美观多半会把该选项设置为false
    showButtonText: false,
    // 按钮的类名前缀
    buttonsPrefix: 'btn',
    // 按钮的类,和buttonsPrefix组合使用实际上就是设置按钮的class类名 <button class="btn btn-light" type="button"></button>
    buttonsClass: 'light',
    // 给右上角的按钮区域增加一个自定义按钮
    buttons: function () {
      return {
        //这里只做一个示例
        collapseSearch: {
          text: '搜索区域折叠/显示',
          icon: 'bi bi-search',
          event: function () {
            $('.bsa-search-area').slideToggle();
          },
          attributes: {
            title: '折叠搜索区域'
          }
        }
      };
    }
  };

  //分页相关配置
  const PAGINATION = {
    //是否开启分页
    pagination: true,
    //是客户端分页还是服务端分页  'client','server',由于演示没有后端提供服务，所以采用前端分页演示
    sidePagination: 'client',
    // 初始化加载第一页，默认第一页
    pageNumber: 1,
    //默认显示几条
    pageSize: 5,
    //可供选择的每页的行数
    pageList: [5, 10, 25, 50, 100],
    //true:当在最后一页时,点击下一页跳转到第一页
    paginationLoop: true,
    // 展示首尾页的最小页数
    paginationPagesBySide: 2
  };
  const Default$2 = {
    //配置语言
    locale: 'zh-CN',
    //设置高度就可以固定表头,不过不建议设置
    // height: 300,
    //固定列功能开启
    fixedColumns: true,
    //左侧固定列数
    fixedNumber: 1,
    //右侧固定列数
    fixedRightNumber: 1,
    // 是否启用点击选中行
    clickToSelect: true,
    //点击那些元素可以忽略勾选
    ignoreClickToSelectOn: function (element) {
      //意思就是遇到.more-btn和.form-check-input或者button、a标签的时候被点击的时候行不会被选中
      return !!$(element).closest('.more-btn, .form-check-input,button,a,.treegrid-expander').length;
    },
    // 总数字段
    totalField: 'total',
    // 当字段为 undefined 显示
    undefinedText: '-',
    // 定义全局排序方式 只能是undefined, 'asc' or 'desc'
    sortOrder: 'asc',
    //加载模板,不改的话，默认的会超出不好看
    loadingTemplate: function () {
      return '<div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>';
    },
    //所有的事件都会触发的事件,用于初始化bootstrap的提示和气泡插件
    onAll: function (name, args) {
      const $body = $('body');
      $body.Initialize('tooltipInit', {
        container: '.bootstrap-table'
      }, true);
      $body.Initialize('popoverInit', {
        container: '.bootstrap-table'
      }, true);
    },
    ...PAGINATION,
    ...ICON,
    ...TOOLBAR
  };
  var _config$2 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$2 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _table = /*#__PURE__*/_classPrivateFieldLooseKey("table");
  var _init$2 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _getParents = /*#__PURE__*/_classPrivateFieldLooseKey("getParents");
  var _getChildren = /*#__PURE__*/_classPrivateFieldLooseKey("getChildren");
  var _toggleParentOnLastChildUncheck = /*#__PURE__*/_classPrivateFieldLooseKey("toggleParentOnLastChildUncheck");
  class Table {
    constructor(element, config) {
      Object.defineProperty(this, _toggleParentOnLastChildUncheck, {
        value: _toggleParentOnLastChildUncheck2
      });
      Object.defineProperty(this, _getChildren, {
        value: _getChildren2
      });
      Object.defineProperty(this, _getParents, {
        value: _getParents2
      });
      Object.defineProperty(this, _init$2, {
        value: _init2$2
      });
      Object.defineProperty(this, _config$2, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$2, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _table, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$2)[_config$2] = config;
      _classPrivateFieldLooseBase(this, _element$2)[_element$2] = element;
    }
    //快速刷新
    refreshSelectPage(page = 1) {
      _classPrivateFieldLooseBase(this, _table)[_table].bootstrapTable('refresh');
      _classPrivateFieldLooseBase(this, _table)[_table].bootstrapTable('selectPage', page);
    }

    // 快速搜索的方法
    search(btnSelector) {
      const that = this;
      $(document).on('click', btnSelector, function (event) {
        event.preventDefault();
        that.refreshSelectPage();
      });
    }

    // 快速重置,如果情况不满足还可以通过回调函数进行自定义处理
    reset(btnSelector, formSelector, callback) {
      const that = this;
      $(document).on('click', btnSelector, function (event) {
        event.preventDefault();

        //找到传递进来的form表单
        if (typeof formSelector === 'string') {
          $(formSelector)[0].reset(); //快速重置表单
        }
        typeof callback === 'function' && callback.call(that, formSelector);

        //然后刷新
        that.refreshSelectPage();
      });
    }

    //批量删除
    batch(btnSelector, callback, conditionFn) {
      const that = this;
      const $btn = $(btnSelector);
      _classPrivateFieldLooseBase(that, _table)[_table].on('all.bs.table', function (name, args) {
        const selectedRows = _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('getSelections');
        let conditionResult;
        // 如果传递了条件函数，则使用传递的条件函数进行判断
        if (typeof conditionFn === "function") {
          conditionResult = conditionFn.call(that, selectedRows);
        } else {
          // 默认条件：选中行数量大于 0
          conditionResult = selectedRows.length > 0;
        }
        // 根据条件结果设置按钮状态
        $btn.attr('disabled', !conditionResult);
      });
      $(document).on('click', btnSelector, function () {
        //获取所有选中行的id
        const ids = [];
        const rowSelected = _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('getSelections');
        $.each(rowSelected, function (index, row) {
          ids.push(row.id);
        });
        callback.call(this, ids, rowSelected);
      });
    }

    /**
     * 让按钮具备bootstrap-table的treegrid拓展的全部展开和折叠能力
     * @param {String} btnSelector
     */
    treegridExtSlideToggleByButton(btnSelector) {
      const that = this;
      $(document).on('click', btnSelector, function (event) {
        event.preventDefault();
        if (_classPrivateFieldLooseBase(that, _table)[_table].find('tr').hasClass('treegrid-expanded')) {
          //只要有一个tr是被展开的就折叠
          _classPrivateFieldLooseBase(that, _table)[_table].treegrid('collapseAll');
        } else {
          _classPrivateFieldLooseBase(that, _table)[_table].treegrid('expandAll');
        }
      });
    }
    treegridExtSlideToggleClickRow(exceptSelector = 'button') {
      //给整行绑定事件委托

      _classPrivateFieldLooseBase(this, _element$2)[_element$2].on('click', 'tbody tr', function (event) {
        const $target = $(event.target);
        if (!$target.closest(exceptSelector).length) {
          if (!$target.is('.treegrid-expander')) {
            if ($(this).treegrid('isExpanded')) {
              $(this).treegrid('collapse');
            } else {
              $(this).treegrid('expand');
            }
          }
        }
      });
    }
    treegridExtInit() {
      const that = this;
      _classPrivateFieldLooseBase(that, _table)[_table].on('post-body.bs.table', function (event, data) {
        const options = _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('getOptions');
        const columns = options.columns;
        const columnsFirst = columns[0];
        if (columns && columnsFirst) {
          const treeColumn = columnsFirst.findIndex(obj => obj.field === options.treeShowField);
          if (treeColumn !== -1 && columnsFirst[treeColumn].visible) {
            _classPrivateFieldLooseBase(that, _table)[_table].treegrid({
              treeColumn: treeColumn,
              onChange: function () {
                _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('resetView');
              },
              saveState: true
            });
          }
        }
      });
    }
    //勾选节点关联
    toggleCheckRelation(idField = 'id', pidField = 'pid') {
      const that = this;
      _classPrivateFieldLooseBase(that, _table)[_table].on('change', '.bs-checkbox input', function () {
        const $input = $(this);
        const rowIndex = $input.attr('data-index');
        if (rowIndex !== undefined) {
          const data = _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('getData');
          const row = data[rowIndex];
          if ($input.is(':checked')) {
            const parentsIndex = [];
            const childrenIndex = [];
            _classPrivateFieldLooseBase(that, _getParents)[_getParents](data, row, [], parentsIndex, idField, pidField);
            _classPrivateFieldLooseBase(that, _getChildren)[_getChildren](data, row, [], childrenIndex, idField, pidField);
            //所有的行索引
            const rowsIndex = [...parentsIndex, ...childrenIndex];
            rowsIndex.forEach(index => {
              _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('check', index);
            });
          } else {
            //1.把所有的子节点都取消掉
            const childrenIndex = [];
            _classPrivateFieldLooseBase(that, _getChildren)[_getChildren](data, row, [], childrenIndex, idField, pidField);
            childrenIndex.forEach(index => {
              _classPrivateFieldLooseBase(that, _table)[_table].bootstrapTable('uncheck', index);
            });

            //2.取消选中最后一个子元素时查找对应父元素取消
            _classPrivateFieldLooseBase(that, _toggleParentOnLastChildUncheck)[_toggleParentOnLastChildUncheck](data, row, idField, pidField);
          }
        }
      });
    }

    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$2);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] !== 'undefined') {
            value = data[config](...args);
          } else if (_classPrivateFieldLooseBase(data, _table)[_table].bootstrapTable.methods.includes(config)) {
            value = _classPrivateFieldLooseBase(data, _table)[_table].bootstrapTable(config, ...args);
          } else {
            throw new TypeError(`No method named "${config}"`);
          }
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Table($(this), $.extend({}, Default$2, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$2, data);
        _classPrivateFieldLooseBase(data, _init$2)[_init$2]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$2() {
    //实例化bootstrapTable
    _classPrivateFieldLooseBase(this, _table)[_table] = _classPrivateFieldLooseBase(this, _element$2)[_element$2].bootstrapTable(_classPrivateFieldLooseBase(this, _config$2)[_config$2]);
  }
  function _getParents2(data, row, result = [], rowsIndex = [], idField = 'id', pidField = 'pid') {
    data.forEach((item, index) => {
      if (item[idField] === row[pidField]) {
        result.push(item);
        rowsIndex.push(index);
        _classPrivateFieldLooseBase(this, _getParents)[_getParents](data, item, result, rowsIndex, idField, pidField);
      }
    });
  }
  function _getChildren2(data, row, result = [], rowsIndex = [], idField = 'id', pidField = 'pid') {
    data.forEach((item, index) => {
      if (item[pidField] === row[idField]) {
        result.push(item);
        rowsIndex.push(index);
        _classPrivateFieldLooseBase(this, _getChildren)[_getChildren](data, item, result, rowsIndex, idField, pidField);
      }
    });
  }
  function _toggleParentOnLastChildUncheck2(data, row, idField = 'id', pidField = 'pid') {
    //找到父级的数据
    const parentIndex = data.findIndex(obj => obj.id === row.pid);
    const parentRow = data[parentIndex];
    if (parentIndex !== -1) {
      //找到所有子集
      const sonData = [];
      _classPrivateFieldLooseBase(this, _getChildren)[_getChildren](data, parentRow, sonData, [], idField, pidField);

      //获取所有的被勾选的row
      const sonCheckedData = sonData.filter(item => item[0] === true);
      if (sonCheckedData.length === 0) {
        _classPrivateFieldLooseBase(this, _table)[_table].bootstrapTable('uncheck', parentIndex);

        //递归调用
        _classPrivateFieldLooseBase(this, _toggleParentOnLastChildUncheck)[_toggleParentOnLastChildUncheck](data, parentRow, idField, pidField);
      }
    }
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$2).each(function () {
      Table.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$2] = Table.jQueryInterface;
  $.fn[NAME$2].Constructor = Table;
  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Table.jQueryInterface;
  };

  const NAME$1 = 'PasswordToggle';
  const DATA_KEY$1 = 'bsa.passwordtoggle';
  const JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  const SELECTOR_DATA_TOGGLE$1 = '[data-bsa-toggle="passwordtoggle"]';
  const Default$1 = {
    //针对的input输入框
    target: null,
    //可见的图标
    visibleIcon: 'bi bi-eye-slash',
    //不可见的图标
    invisibleIcon: 'bi bi-eye'
  };
  var _config$1 = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element$1 = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init$1 = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _setupListeners$1 = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  class PasswordToggle {
    constructor(element, config) {
      // 初始化事件
      Object.defineProperty(this, _setupListeners$1, {
        value: _setupListeners2$1
      });
      Object.defineProperty(this, _init$1, {
        value: _init2$1
      });
      Object.defineProperty(this, _config$1, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element$1, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config$1)[_config$1] = config;
      _classPrivateFieldLooseBase(this, _element$1)[_element$1] = element;
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY$1);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new PasswordToggle($(this), $.extend({}, Default$1, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY$1, data);
        _classPrivateFieldLooseBase(data, _init$1)[_init$1]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2$1() {
    if ($(_classPrivateFieldLooseBase(this, _config$1)[_config$1].target).length <= 0) {
      //如果没有提供target参数直接不处理
      return;
    }
    // 初始化点击事件
    _classPrivateFieldLooseBase(this, _setupListeners$1)[_setupListeners$1]();
  }
  function _setupListeners2$1() {
    const that = this;
    _classPrivateFieldLooseBase(that, _element$1)[_element$1].on('click', function (event) {
      const $input = $(_classPrivateFieldLooseBase(that, _config$1)[_config$1].target);
      if ($input.attr('type') === 'text') {
        $input.attr('type', 'password');
        $(this).html(`<i class="${_classPrivateFieldLooseBase(that, _config$1)[_config$1].visibleIcon}"></i>`);
      } else if ($input.attr('type') === 'password') {
        $input.attr('type', 'text');
        $(this).html(`<i class="${_classPrivateFieldLooseBase(that, _config$1)[_config$1].invisibleIcon}"></i>`);
      }
    });
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE$1).each(function () {
      PasswordToggle.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME$1] = PasswordToggle.jQueryInterface;
  $.fn[NAME$1].Constructor = PasswordToggle;
  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return PasswordToggle.jQueryInterface;
  };

  const NAME = 'Tab';
  const DATA_KEY = 'bsa.tab';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="tab"]';
  const EVENT_ACTIVE = `active${EVENT_KEY}`;
  const Default = {
    activeClass: 'active',
    //配置
    config: {}
  };
  var _config = /*#__PURE__*/_classPrivateFieldLooseKey("config");
  var _element = /*#__PURE__*/_classPrivateFieldLooseKey("element");
  var _init = /*#__PURE__*/_classPrivateFieldLooseKey("init");
  var _removeActiveClass = /*#__PURE__*/_classPrivateFieldLooseKey("removeActiveClass");
  var _setupListeners = /*#__PURE__*/_classPrivateFieldLooseKey("setupListeners");
  class Tab {
    constructor(element, config) {
      // 初始化事件
      Object.defineProperty(this, _setupListeners, {
        value: _setupListeners2
      });
      Object.defineProperty(this, _removeActiveClass, {
        value: _removeActiveClass2
      });
      // Private
      Object.defineProperty(this, _init, {
        value: _init2
      });
      Object.defineProperty(this, _config, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _element, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _config)[_config] = config;
      _classPrivateFieldLooseBase(this, _element)[_element] = element;
    }
    // Static
    static jQueryInterface(config, ...args) {
      let value;
      this.each(function () {
        let data = $(this).data(DATA_KEY);
        if (typeof config === 'string') {
          if (!data) {
            return;
          }
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          value = data[config](...args);
          return;
        }
        if (data) {
          console.warn('You cannot initialize the table more than once!');
          return;
        }
        data = new Tab($(this), $.extend({}, Default, typeof config === 'object' ? config : $(this).data()));
        $(this).data(DATA_KEY, data);
        _classPrivateFieldLooseBase(data, _init)[_init]();
      });
      return typeof value === 'undefined' ? this : value;
    }
  }

  /**
   * Data API
   * ====================================================
   */
  function _init2() {
    // 初始化点击事件
    _classPrivateFieldLooseBase(this, _setupListeners)[_setupListeners]();
  }
  function _removeActiveClass2() {
    $(SELECTOR_DATA_TOGGLE).removeClass(_classPrivateFieldLooseBase(this, _config)[_config].activeClass);
  }
  function _setupListeners2() {
    const that = this;
    _classPrivateFieldLooseBase(that, _element)[_element].on('click', function (event) {
      //已经激活的就不要再激活了
      if (!$(this).hasClass(_classPrivateFieldLooseBase(that, _config)[_config].activeClass)) {
        //移除所有的激活类
        _classPrivateFieldLooseBase(that, _removeActiveClass)[_removeActiveClass]();
        //然后给当前按钮添加激活类
        $(this).addClass(_classPrivateFieldLooseBase(that, _config)[_config].activeClass);
        //触发激活事件
        $(_classPrivateFieldLooseBase(that, _element)[_element]).trigger($.Event(EVENT_ACTIVE), [_classPrivateFieldLooseBase(that, _config)[_config].config]);
      }
    });
  }
  $(() => {
    $(SELECTOR_DATA_TOGGLE).each(function () {
      Tab.jQueryInterface.call($(this));
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Tab.jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab.jQueryInterface;
  };

  exports.BackToTop = BackToTop;
  exports.Fullscreen = Fullscreen;
  exports.IFrame = IFrame;
  exports.Initialize = Initialize;
  exports.Loading = Loading;
  exports.Modal = Modal;
  exports.NavbarSearch = NavbarSearch;
  exports.PasswordToggle = PasswordToggle;
  exports.PushMenu = PushMenu;
  exports.Scrollbar = Scrollbar;
  exports.Tab = Tab;
  exports.Table = Table;
  exports.Toasts = Toasts;
  exports.Treeview = Treeview;
  exports.util = Utils;

}));
//# sourceMappingURL=bootstrap-admin.js.map
