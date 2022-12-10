/*!
 * bootstrap-admin v1.1.0 (https://gitee.com/ajiho/bootstrap-admin)
 * Copyright 2021-2022 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-admin/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BSA = {}));
})(this, (function (exports) { 'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Util = {
    //事件委托
    delegate: function delegate(element, type, selector, fn, exceptSelector) {
      element.addEventListener(type, function (e) {
        var target = e.target;
        var currTarget = e.currentTarget;
        while (target !== currTarget && target instanceof HTMLElement) {
          if (target.matches(selector)) {
            fn.call(target, e);
            break;
          } else if (target.matches(exceptSelector)) {
            break;
          }
          target = target.parentNode;
        }
      }, false);
    },
    /**
     * 原生js实现jq的siblings()方法
     * @param element
     * @param selector
     * @returns {*[]}
     */
    siblings: function siblings(element, selector) {
      selector = selector || false;
      //先获取到当前传入的元素的所有父元素的子集
      var pChildren = element.parentNode.children;
      var eleMatch = [];
      //遍历把自己干掉
      for (var _iterator = _createForOfIteratorHelperLoose(pChildren), _step; !(_step = _iterator()).done;) {
        var children = _step.value;
        if (children instanceof HTMLElement) {
          if (selector) {
            //如果为真，说明传入选择器
            if (children !== element && children.matches(selector)) {
              eleMatch.push(children);
            }
          } else {
            //没有传入
            if (children !== element) {
              eleMatch.push(children);
            }
          }
        }
      }
      return eleMatch;
    },
    /**
     * 通过字符串创建节点
     * @param htmlStr
     * @returns {Element}
     */
    createNode: function createNode(htmlStr) {
      var div = document.createElement("div");
      div.innerHTML = htmlStr;
      return div.children[0];
    },
    /**
     * 节流函数
     * @param func
     * @param wait
     * @returns {(function(...[*]): void)|*}
     */
    debounce: function debounce(func, wait) {
      if (wait === void 0) {
        wait = 500;
      }
      var timeID;
      return function () {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (timeID) clearTimeout(timeID);
        timeID = setTimeout(function () {
          func.apply(_this, args);
        }, wait);
      };
    }
  };

  Util.delegate(document.body, 'change', '.bsa-check-all', function (event) {
    var target = event.target;
    document.querySelectorAll("input[type='checkbox']").forEach(function (input) {
      input.checked = target.checked;
    });
  });

  //bootstrap气泡组件初始化
  [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  //bootstrap提示组件初始化
  [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  //优化:使无效表单禁止提交
  document.querySelectorAll('form:not([action]),form[action="#"]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  });

  //优化:禁止所有的input记忆输入内容
  document.querySelectorAll('input').forEach(function (e) {
    e.setAttribute("AutoComplete", "off");
  });

  var md5 = {exports: {}};

  var crypt = {exports: {}};

  (function() {
    var base64map
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

    crypt$1 = {
      // Bit-wise rotation left
      rotl: function(n, b) {
        return (n << b) | (n >>> (32 - b));
      },

      // Bit-wise rotation right
      rotr: function(n, b) {
        return (n << (32 - b)) | (n >>> b);
      },

      // Swap big-endian to little-endian and vice versa
      endian: function(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt$1.rotl(n, 8) & 0x00FF00FF | crypt$1.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++)
          n[i] = crypt$1.endian(n[i]);
        return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function(n) {
        for (var bytes = []; n > 0; n--)
          bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
          words[b >>> 5] |= bytes[i] << (24 - b % 32);
        return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
          bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
        return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
          for (var j = 0; j < 4; j++)
            if (i * 8 + j * 6 <= bytes.length * 8)
              base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
            else
              base64.push('=');
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
            imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push(((base64map.indexOf(base64.charAt(i - 1))
              & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
              | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
        }
        return bytes;
      }
    };

    crypt.exports = crypt$1;
  })();

  var charenc = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },

    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        for (var bytes = [], i = 0; i < str.length; i++)
          bytes.push(str.charCodeAt(i) & 0xFF);
        return bytes;
      },

      // Convert a byte array to a string
      bytesToString: function(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++)
          str.push(String.fromCharCode(bytes[i]));
        return str.join('');
      }
    }
  };

  var charenc_1 = charenc;

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  var isBuffer_1 = function (obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
  };

  function isBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
  }

  (function(){
    var crypt$1 = crypt.exports,
        utf8 = charenc_1.utf8,
        isBuffer = isBuffer_1,
        bin = charenc_1.bin,

    // The core
    md5$1 = function (message, options) {
      // Convert to byte array
      if (message.constructor == String)
        if (options && options.encoding === 'binary')
          message = bin.stringToBytes(message);
        else
          message = utf8.stringToBytes(message);
      else if (isBuffer(message))
        message = Array.prototype.slice.call(message, 0);
      else if (!Array.isArray(message) && message.constructor !== Uint8Array)
        message = message.toString();
      // else, assume byte array already

      var m = crypt$1.bytesToWords(message),
          l = message.length * 8,
          a =  1732584193,
          b = -271733879,
          c = -1732584194,
          d =  271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
               ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << (l % 32);
      m[(((l + 64) >>> 9) << 4) + 14] = l;

      // Method shortcuts
      var FF = md5$1._ff,
          GG = md5$1._gg,
          HH = md5$1._hh,
          II = md5$1._ii;

      for (var i = 0; i < m.length; i += 16) {

        var aa = a,
            bb = b,
            cc = c,
            dd = d;

        a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
        d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
        c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
        b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
        d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
        c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
        a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
        d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i+10], 17, -42063);
        b = FF(b, c, d, a, m[i+11], 22, -1990404162);
        a = FF(a, b, c, d, m[i+12],  7,  1804603682);
        d = FF(d, a, b, c, m[i+13], 12, -40341101);
        c = FF(c, d, a, b, m[i+14], 17, -1502002290);
        b = FF(b, c, d, a, m[i+15], 22,  1236535329);

        a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
        d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
        c = GG(c, d, a, b, m[i+11], 14,  643717713);
        b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
        a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
        d = GG(d, a, b, c, m[i+10],  9,  38016083);
        c = GG(c, d, a, b, m[i+15], 14, -660478335);
        b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
        a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
        d = GG(d, a, b, c, m[i+14],  9, -1019803690);
        c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
        b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
        a = GG(a, b, c, d, m[i+13],  5, -1444681467);
        d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
        c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
        b = GG(b, c, d, a, m[i+12], 20, -1926607734);

        a = HH(a, b, c, d, m[i+ 5],  4, -378558);
        d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i+11], 16,  1839030562);
        b = HH(b, c, d, a, m[i+14], 23, -35309556);
        a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
        d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
        c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
        b = HH(b, c, d, a, m[i+10], 23, -1094730640);
        a = HH(a, b, c, d, m[i+13],  4,  681279174);
        d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
        c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
        b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
        a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
        d = HH(d, a, b, c, m[i+12], 11, -421815835);
        c = HH(c, d, a, b, m[i+15], 16,  530742520);
        b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

        a = II(a, b, c, d, m[i+ 0],  6, -198630844);
        d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
        c = II(c, d, a, b, m[i+14], 15, -1416354905);
        b = II(b, c, d, a, m[i+ 5], 21, -57434055);
        a = II(a, b, c, d, m[i+12],  6,  1700485571);
        d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
        c = II(c, d, a, b, m[i+10], 15, -1051523);
        b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
        a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
        d = II(d, a, b, c, m[i+15], 10, -30611744);
        c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
        b = II(b, c, d, a, m[i+13], 21,  1309151649);
        a = II(a, b, c, d, m[i+ 4],  6, -145523070);
        d = II(d, a, b, c, m[i+11], 10, -1120210379);
        c = II(c, d, a, b, m[i+ 2], 15,  718787259);
        b = II(b, c, d, a, m[i+ 9], 21, -343485551);

        a = (a + aa) >>> 0;
        b = (b + bb) >>> 0;
        c = (c + cc) >>> 0;
        d = (d + dd) >>> 0;
      }

      return crypt$1.endian([a, b, c, d]);
    };

    // Auxiliary functions
    md5$1._ff  = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5$1._gg  = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5$1._hh  = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    md5$1._ii  = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };

    // Package private blocksize
    md5$1._blocksize = 16;
    md5$1._digestsize = 16;

    md5.exports = function (message, options) {
      if (message === undefined || message === null)
        throw new Error('Illegal argument ' + message);

      var digestbytes = crypt$1.wordsToBytes(md5$1(message, options));
      return options && options.asBytes ? digestbytes :
          options && options.asString ? bin.bytesToString(digestbytes) :
          crypt$1.bytesToHex(digestbytes);
    };

  })();

  /**
   * --------------------------------------------
   * BSA Main.js
   * License MIT
   * --------------------------------------------
   */
  var TAB_CONTAINER_MOUNT_CLASS = ['h-100', 'd-flex', 'flex-column', 'bsa-tabs'];
  var TAB_IFRAME_LEAVE_CLASS = 'out';
  var TAB_IFRAME_FADEIN_CLASS = 'fadeIn';
  var TAB_ID_KEY = 'data-tab-id';
  var TAB_URL_KEY = 'data-tab-url';
  var TAB_CACHE_KEY = 'tabs';
  var SIDEBARCOLOR_CACHE_KEY = 'sidebarcolor';
  var HEADERCOLOR_CACHE_KEY = 'headercolor';
  var TAB_LEFT = "<li class=\"nav-item caret-btn caret-btn-left  border-end\" role=\"presentation\"><button class=\"nav-link\"><i class=\"bi bi-caret-left\"></i></button></li>";
  var TAB_ROLL_AREA = "<li class=\"nav-item flex-grow-1 d-flex flex-nowrap align-items-center position-relative\" role=\"presentation\"></li>";
  var TAB_ACTIONS = "\n                    <li class=\"nav-item caret-btn border-start dropdown\" role=\"presentation\">\n                        <button class=\"nav-link\" data-bs-toggle=\"dropdown\"><i class=\"bi bi-caret-down\"></i></button>\n                        <ul class=\"dropdown-menu dropdown-menu-end\">\n                            <li>\n                                <button class=\"dropdown-item rollback-current\" type=\"button\">\u56DE\u5230\u5F53\u524D</button>\n                            </li>\n                            <li>\n                                <button class=\"dropdown-item refresh-current\" type=\"button\">\u5237\u65B0\u5F53\u524D</button>\n                            </li>\n                            <li>\n                                <button class=\"dropdown-item close-current\" type=\"button\">\u5173\u95ED\u5F53\u524D</button>\n                            </li>\n                            <li>\n                                <button class=\"dropdown-item close-other\" type=\"button\">\u5173\u95ED\u5176\u4ED6</button>\n                            </li>\n                            <li>\n                                <button class=\"dropdown-item close-all\" type=\"button\">\u5173\u95ED\u5168\u90E8</button>\n                            </li>\n                        </ul>\n                    </li>\n";
  var TAB_RIGHT = "<li class=\"nav-item caret-btn caret-btn-right  border-start\" role=\"presentation\"><button class=\"nav-link\"><i class=\"bi bi-caret-right\"></i></button></li>";
  var TAB_UPPER_HALF_TPL = "<ul class=\"nav nav-pills border flex-nowrap\" role=\"tablist\">" + TAB_LEFT + TAB_ROLL_AREA + TAB_ACTIONS + TAB_RIGHT + "</ul>";
  var TAB_LOWER_HALF_TPL = "<div class=\"flex-grow-1 position-relative\"></div>";
  var TAB_ITEM = "<button class=\"nav-link border flex-shrink-0\" " + TAB_URL_KEY + "=\"{{url}}\"  " + TAB_ID_KEY + "=\"{{id}}\" type=\"button\">{{title}}</button>";
  var TAB_ITEM_CLOSE = "<button class=\"nav-link border flex-shrink-0\" " + TAB_URL_KEY + "=\"{{url}}\" " + TAB_ID_KEY + "=\"{{id}}\" type=\"button\">{{title}}<i class=\"bi bi-x  closetab\"></i></button>";
  var TAB_IFRAME = "<iframe src=\"{{url}}\" class=\"w-100 h-100 d-inline-block  " + TAB_IFRAME_LEAVE_CLASS + "\" " + TAB_ID_KEY + "=\"{{id}}\"></iframe>";

  //右键菜单的容器
  var TBA_CONTEXTMENU_TPL = "\n            <div class=\"list-group bsa-contextmenu shadow-sm\">\n                <button type=\"button\" class=\"list-group-item list-group-item-action refresh\">\u5237\u65B0</button>\n                <button type=\"button\" class=\"list-group-item list-group-item-action close\">\u5173\u95ED</button>\n                <button type=\"button\" class=\"list-group-item list-group-item-action close-other\">\u5173\u95ED\u5176\u5B83</button>\n            </div>";
  var Default = {
    //控制台广告
    consoleLog: true,
    //tab组件挂载元素
    tabEl: '.bsa-main',
    //默认初始化的tab
    defaultTabs: [],
    //淡入动画
    tabFadein: true,
    //tab缓存
    tabCache: true,
    //点击左侧菜单项后是否立马关闭(仅在iframe模式下有效)
    sideMenuClickClose: false,
    //tab激活展开侧边栏导航对应的位置
    tabActiveOpenInSideMenuLocation: true
  };

  //单个tab的默认选项
  var tabDefault = {
    //标题
    title: "",
    //连接
    url: '',
    //tab唯一标志
    id: null,
    //是否可以关闭
    close: true
  };
  var Main = /*#__PURE__*/function () {
    function Main(config) {
      //参数合并
      this._config = Object.assign({}, Default, config);
      this._init();
    }
    var _proto = Main.prototype;
    _proto._init = function _init() {
      //广告是否输出
      if (this._config.consoleLog === true) {
        this._advert();
      }

      //事件处理
      this._addEventListener();

      //主题色回显
      this.restoreColor();

      //tab初始化
      this._tabInit();
    };
    _proto.restoreColor = function restoreColor() {
      var sidebarcolor = localStorage.getItem(SIDEBARCOLOR_CACHE_KEY);
      var headercolor = localStorage.getItem(HEADERCOLOR_CACHE_KEY);
      if (sidebarcolor !== null) {
        document.documentElement.classList.add("color-sidebar", sidebarcolor);
      }
      if (headercolor !== null) {
        document.documentElement.classList.add("color-header", headercolor);
      }
    };
    _proto._tabInit = function _tabInit() {
      //容器
      this._tab_container = document.querySelector(this._config.tabEl);
      //检测是否是一个正常的dom元素
      if (this._tab_container instanceof HTMLElement) {
        var _this$_tab_container$;
        //继续执行下面的逻辑
        (_this$_tab_container$ = this._tab_container.classList).add.apply(_this$_tab_container$, TAB_CONTAINER_MOUNT_CLASS);
        //加入到容器中
        this._tab_container.insertAdjacentHTML("beforeEnd", "" + TAB_UPPER_HALF_TPL + TAB_LOWER_HALF_TPL);
        //单个tab的容器
        this._tab_wraper = this._tab_container.querySelector("li.flex-grow-1");
        //单个tab面板的容器
        this._tab_content_wraper = this._tab_container.querySelector("div.flex-grow-1");

        //构建右键菜单
        this._buildContextmenu();

        //事件监听
        this._addTabEventListener();

        //tab回显
        this._restoreTabs();
      }
    };
    _proto._restoreTabs = function _restoreTabs() {
      var _this2 = this;
      //判断选项是否开启缓存
      if (this._isOpenCacheTab()) {
        //从缓存里面读
        var cacheTabs = this._getCacheTabs();
        if (cacheTabs.length !== 0) {
          //回显缓存中所有的tab
          this._echoCacheAllTabs();
        } else {
          //缓存没有则加载默认tab
          this._config.defaultTabs.forEach(function (option) {
            _this2.addTab(option);
          });
        }
      } else {
        //删除缓存
        this._clearCacheTabsAll();

        //然后添加传递进来的默认tab选项
        this._config.defaultTabs.forEach(function (option) {
          _this2.addTab(option);
        });
      }
    }

    /**
     * 回显缓存中的所有tab
     * @private
     */;
    _proto._echoCacheAllTabs = function _echoCacheAllTabs() {
      var _this3 = this;
      //创建两个虚拟节点
      var tabFrag = document.createDocumentFragment();
      // let iframeFrag = document.createDocumentFragment();
      var cacheTabs = this._getCacheTabs();

      //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆
      cacheTabs.forEach(function (option) {
        //添加tab
        var tabHTML = option.close ? _this3._formatString(TAB_ITEM_CLOSE, option) : _this3._formatString(TAB_ITEM, option);
        tabFrag.appendChild(Util.createNode(tabHTML));
      });
      this._tab_wraper.appendChild(tabFrag);

      //激活tab
      var id = this._getActivatedCacheTabId();
      this.activeTabById(id);
      this._openLeftMenuByid(id);
    }

    // 清除缓存
    ;
    _proto.clearCache = function clearCache() {
      localStorage.removeItem(TAB_CACHE_KEY);
      localStorage.removeItem(HEADERCOLOR_CACHE_KEY);
      localStorage.removeItem(SIDEBARCOLOR_CACHE_KEY);
    }

    /**
     * 判断是否开启缓存
     * @private
     */;
    _proto._isOpenCacheTab = function _isOpenCacheTab() {
      return this._config.tabCache === true;
    }

    /**
     * 获取缓存中的所有tab
     * @returns {*[]}
     * @private
     */;
    _proto._getCacheTabs = function _getCacheTabs() {
      var tabs = JSON.parse(localStorage.getItem(TAB_CACHE_KEY));
      if (tabs === null) {
        tabs = [];
      }
      return tabs;
    }

    /**
     * 清空缓存中所有的tab
     * @private
     */;
    _proto._clearCacheTabsAll = function _clearCacheTabsAll() {
      localStorage.removeItem(TAB_CACHE_KEY);
    }

    //构建右键菜单
    ;
    _proto._buildContextmenu = function _buildContextmenu() {
      //加入到body
      document.body.insertAdjacentHTML("beforeEnd", TBA_CONTEXTMENU_TPL);
      //找到这个容器
      this._contextmenu_wraper = document.querySelector(".bsa-contextmenu");
    }

    /**
     * 通过id同时激活和展开左侧的菜单
     * @param id
     * @private
     */;
    _proto._openLeftMenuByid = function _openLeftMenuByid(id) {
      var _this4 = this;
      if (this._config.tabActiveOpenInSideMenuLocation === true) {
        //展开左侧指定区域
        var tabId = id;

        //先把所有的激活状态移除和闭合掉
        document.querySelectorAll('.bsa-sidebar-body > ul a').forEach(function (a) {
          var _a$classList;
          (_a$classList = a.classList).remove.apply(_a$classList, ['open', 'active']);
        });

        //找到当前tab的左侧菜单项目,激活、展开
        document.querySelectorAll('.bsa-sidebar-body > ul a').forEach(function (a) {
          var url = md5.exports(a.getAttribute('href'));
          if (url === tabId) {
            a.classList.add('active');
            _this4._openMenu(a);
            document.querySelector('.bsa-sidebar-body').scrollTo({
              top: a.offsetTop,
              behavior: "auto"
            });
          }
        });
      }
    }

    //tab的事件监听
    ;
    _proto._addTabEventListener = function _addTabEventListener() {
      var _this = this;

      //其它任意元素生成tab
      Util.delegate(document.body, 'click', '[data-bsa-tab-url][data-bsa-tab-title]', function (e) {
        e.preventDefault();
        var url = this.getAttribute('data-bsa-tab-url');
        var title = this.getAttribute('data-bsa-tab-title');
        _this.addTab({
          title: title,
          url: url,
          close: true
        });
      });

      //适配左侧菜单点击生成tab
      Util.delegate(document.body, 'click', '.bsa-sidebar-body > ul a:not(.has-children):not([target])', function (event) {
        event.preventDefault();
        var a = this;
        //得到当前a链接的href
        var url = a.getAttribute('href');
        var title = a.innerText;
        _this.addTab({
          title: title,
          url: url,
          close: true
        });
        if (_this._config.sideMenuClickClose === true) {
          if (screen.availWidth < 992) {
            _this.closeSideMenu();
          }
        }
      });

      //监听滚动事件,让鼠标滚动也能左右切换
      this._tab_wraper.addEventListener("wheel", Util.debounce(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var activeTab = _this.getActivatedTab();
        var deltaY = e.deltaY;
        if (deltaY < 0) {
          //向左滚动

          //获取它前一个tab
          var preTab = activeTab.previousElementSibling;
          if (preTab instanceof HTMLElement) {
            _this.activeTabById(preTab.getAttribute(TAB_ID_KEY));
          }
        } else if (deltaY > 0) {
          //向右滚动
          var nextTab = activeTab.nextElementSibling;
          if (nextTab instanceof HTMLElement) {
            _this.activeTabById(nextTab.getAttribute(TAB_ID_KEY));
          }
        }
      }, 100));

      //点击tab处理
      Util.delegate(_this._tab_wraper, 'click', 'button.nav-link', function () {
        var id = this.getAttribute(TAB_ID_KEY);
        _this.activeTabById(id);
        _this._openLeftMenuByid(id);
      }, '.closetab');

      //tab关闭
      Util.delegate(_this._tab_wraper, 'click', '.closetab', function () {
        // self.closeTabByPageId(pageid);
        // console.log(this.parentNode)
        _this.closeTabById(this.parentNode.getAttribute(TAB_ID_KEY));
      });

      //tab右键
      Util.delegate(_this._tab_wraper, 'contextmenu', 'button.nav-link', function (e) {
        e.preventDefault();
        var tab = this;
        var id = tab.getAttribute(TAB_ID_KEY);

        //同时查看是否需要显示关闭选项
        if (_this._canRemoveTabById(id)) {
          _this._contextmenu_wraper.querySelector('.close').style.display = 'block';
        } else {
          _this._contextmenu_wraper.querySelector('.close').style.display = 'none';
        }
        _this._contextmenu_wraper.style.top = e.clientY + "px";
        _this._contextmenu_wraper.style.left = e.clientX + "px";
        _this._contextmenu_wraper.style.display = 'block';

        //同时给iframe窗口禁用所有的鼠标事件
        _this._tab_container.classList.add('pen');

        //获取dw的示例对象
        var tabActionsDropdown = bootstrap.Dropdown.getOrCreateInstance(_this._tab_container.querySelector('ul>li.dropdown>button'));
        tabActionsDropdown.hide();

        //把所有的id都给遍历给右键菜单的每一项
        _this._contextmenu_wraper.querySelectorAll('button.list-group-item').forEach(function (item) {
          item.setAttribute(TAB_ID_KEY, id);
        });
      }, '.closetab');

      //点击任何区域左键单击都关闭
      document.addEventListener('click', function () {
        _this._closeTabsContextmenu();
      });

      //监听窗口变化也要让右键菜单消失
      window.addEventListener('resize', Util.debounce(function () {
        _this._closeTabsContextmenu();
      }, 60));

      //更多操作的下拉菜单
      var tabActionsDropdown = _this._tab_container.querySelector('ul>li.dropdown>button');
      tabActionsDropdown.addEventListener('show.bs.dropdown', function (event) {
        _this._tab_container.classList.add('pen2');
      });
      //更多操作下拉菜单关闭移除
      tabActionsDropdown.addEventListener('hide.bs.dropdown', function (event) {
        _this._tab_container.classList.remove('pen2');
      });

      //tab右键刷新左击处理
      Util.delegate(_this._contextmenu_wraper, 'click', '.refresh', function (e) {
        e.preventDefault();
        _this._contextmenuRefresh(this);
      });

      //tab右键刷新右击处理
      Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.refresh', function (e) {
        e.preventDefault();
        _this._contextmenuRefresh(this);
      });

      //右键菜单-关闭左击处理
      Util.delegate(_this._contextmenu_wraper, 'click', '.close', function (e) {
        e.preventDefault();
        _this._contextmenuClose(this);
      });

      //右键菜单-关闭右击处理
      Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.close', function (e) {
        e.preventDefault();
        _this._contextmenuClose(this);
      });

      //右键菜单-关闭其它左击处理
      Util.delegate(_this._contextmenu_wraper, 'click', '.close-other', function (e) {
        e.preventDefault();
        _this._contextmenuCloseOther(this);
      });

      //右键菜单-关闭其它右击处理
      Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.close-other', function (e) {
        e.preventDefault();
        _this._contextmenuCloseOther(this);
      });

      //左滑动按钮被单击
      Util.delegate(_this._tab_container, 'click', '.caret-btn-left', function () {
        _this._tab_wraper.scrollLeft = _this._tab_wraper.scrollLeft - _this._tab_wraper.offsetWidth;
      });

      //右滑动按钮被单击
      Util.delegate(_this._tab_container, 'click', '.caret-btn-right', function () {
        _this._tab_wraper.scrollLeft = _this._tab_wraper.scrollLeft + _this._tab_wraper.offsetWidth;
      });

      //回到当前
      Util.delegate(_this._tab_container, 'click', '.rollback-current', function () {
        _this.activeTabById(_this.getActivatedTabId());
      });

      //刷新当前
      Util.delegate(_this._tab_container, 'click', '.refresh-current', function () {
        _this._refreshTabById(_this.getActivatedTabId());
      });

      //关闭当前
      Util.delegate(_this._tab_container, 'click', '.close-current', function () {
        //得到当前激活的id
        var id = _this.getActivatedTabId();
        if (_this._canRemoveTabById(id)) {
          //判断能不能删除
          _this.closeTabById(id);
        }
      });

      //关闭其它
      Util.delegate(_this._tab_container, 'click', '.close-other', function () {
        _this._closeAllTabExceptForId(_this.getActivatedTabId());
      });

      //关闭全部
      Util.delegate(_this._tab_container, 'click', '.close-all', function () {
        _this.closeAllTabs();
      });
    }

    /**
     * 右键菜单-刷新按钮-处理程序
     * @private
     */;
    _proto._contextmenuRefresh = function _contextmenuRefresh(element) {
      this._refreshTabById(element.getAttribute(TAB_ID_KEY));
      this._closeTabsContextmenu();
    }

    /**
     * 右键菜单-关闭按钮-处理程序
     * @private
     */;
    _proto._contextmenuClose = function _contextmenuClose(element) {
      this.closeTabById(element.getAttribute(TAB_ID_KEY));
      this._closeTabsContextmenu();
    }

    /**
     * 右键菜单-关闭其它按钮-处理程序
     * @private
     */;
    _proto._contextmenuCloseOther = function _contextmenuCloseOther(element) {
      this._closeAllTabExceptForId(element.getAttribute(TAB_ID_KEY));
      this._closeTabsContextmenu();
    }

    /**
     * 关闭所有的tab
     */;
    _proto.closeAllTabs = function closeAllTabs() {
      var _this5 = this;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (tab) {
        var id = tab.getAttribute(TAB_ID_KEY);
        if (_this5._canRemoveTabById(id)) {
          _this5._removeTabById(id);
        }
      });

      //选中那些禁止删除的取第一个,将其激活
      var firstTab = this._tab_wraper.firstChild;
      if (firstTab instanceof HTMLElement) {
        this.activeTabById(firstTab.getAttribute(TAB_ID_KEY));
      }
    }

    /**
     * 关闭除了传递进来的id的所有tab
     * @param id
     * @private
     */;
    _proto._closeAllTabExceptForId = function _closeAllTabExceptForId(id) {
      var _this6 = this;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (tab) {
        var forEachId = tab.getAttribute(TAB_ID_KEY);
        if (forEachId !== id && _this6._canRemoveTabById(forEachId)) {
          //如果不相等，且tab可以被删除的情况下
          _this6._removeTabById(forEachId);
        }
      });
    }

    /**
     * 通过id直接删除tab(包括iframe)
     * @param id
     * @private
     */;
    _proto._removeTabById = function _removeTabById(id) {
      var tab = this.findTabById(id);
      var ifr = this.findIframeById(id);
      tab.remove();
      this._removeCacheTabById(id);
      if (ifr instanceof HTMLElement) {
        ifr.remove();
      }
    }

    /**
     * 根据id刷新tab
     * @param id
     * @private
     */;
    _proto._refreshTabById = function _refreshTabById(id) {
      var iframe = this.findIframeById(id);
      if (!(iframe instanceof HTMLElement)) {
        //如果没有就加入iframe

        //添加iframe
        var tab = this.findTabById(id);
        this._addIframeByTab(tab);
      } else {
        //如果有就正常刷新逻辑

        if (this._config.tabFadein === true) {
          //查看是否需要淡入
          iframe.classList.remove('fadeIn');
          void iframe.offsetWidth;
          iframe.contentWindow.location.reload();
          iframe.classList.add('fadeIn');
        } else {
          iframe.contentWindow.location.reload();
        }
      }
    }

    //关闭TAB的右键菜单
    ;
    _proto._closeTabsContextmenu = function _closeTabsContextmenu() {
      this._contextmenu_wraper.style.display = 'none';
      this._tab_container.classList.remove('pen');
    }

    /**
     * 根据id判断能否删除
     * @param id
     * @returns {boolean}
     * @private
     */;
    _proto._canRemoveTabById = function _canRemoveTabById(id) {
      var result = false;
      if (this.findTabById(id).querySelector(".bi-x") instanceof HTMLElement) {
        result = true;
      }
      return result;
    }

    /**
     * 删除缓存中的tab
     * @param id
     * @private
     */;
    _proto._removeCacheTabById = function _removeCacheTabById(id) {
      var cacheTabs = this._getCacheTabs();
      cacheTabs.forEach(function (tab, index) {
        if (tab.id === id) {
          cacheTabs.splice(index, 1);
        }
      });
      //重新设置回去
      localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }

    /**
     * 通过id关闭tab选项卡
     * @param id
     */;
    _proto.closeTabById = function closeTabById(id) {
      var tab = this.findTabById(id);
      if (tab.classList.contains('active')) {
        //判断是否是激活的tab
        //把active传递给其它的tab
        var willActiveId = null;
        if (tab.nextElementSibling instanceof HTMLElement) {
          //后面有tab
          //得到后面tab的pageid作为将要激活的tab id
          willActiveId = tab.nextElementSibling.getAttribute(TAB_ID_KEY);
        } else if (tab.previousElementSibling instanceof HTMLElement) {
          //看看前面是否有tab

          willActiveId = tab.previousElementSibling.getAttribute(TAB_ID_KEY);
        }

        //先删除再滚动
        this._removeTabById(id);
        if (willActiveId) {
          //如果该id存在就激活

          //激活
          this.activeTabById(willActiveId);
        }
      } else {
        this._removeTabById(id);
      }
    }

    //添加tab
    ;
    _proto.addTab = function addTab(option) {
      if (this._tab_container instanceof HTMLElement) {
        //参数合并
        option = Object.assign({}, tabDefault, option);
        option.id = md5.exports(option.url);
        if (this.findTabById(option.id) === null) {
          //如果没有则添加

          //添加tab
          var tabHTML = option.close ? this._formatString(TAB_ITEM_CLOSE, option) : this._formatString(TAB_ITEM, option);
          this._tab_wraper.insertAdjacentHTML("beforeEnd", tabHTML);

          //添加iframe
          var iframeHTML = this._formatString(TAB_IFRAME, option);
          var iframeDom = Util.createNode(iframeHTML);
          //判断是否需要加淡入动画
          if (this._config.tabFadein === true) {
            iframeDom.classList.add(TAB_IFRAME_FADEIN_CLASS);
          }
          this._tab_content_wraper.appendChild(iframeDom);

          //同时也添加进缓存
          if (this._isOpenCacheTab()) {
            this._addTabToCache(option);
          }
        }

        //激活tab
        this.activeTabById(option.id);
      }
    }

    /**
     * 激活缓存中的tab
     * @param id
     * @private
     */;
    _proto._activeCacheTabById = function _activeCacheTabById(id) {
      //激活前删除所有的激活样式
      var cacheTabs = this._getCacheTabs();
      cacheTabs.forEach(function (option) {
        option.active = option.id === id;
      });
      localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }

    /**
     * 添加tab进缓存
     * @param option
     * @private
     */;
    _proto._addTabToCache = function _addTabToCache(option) {
      //先取
      var cacheTabs = this._getCacheTabs();
      //追加属性 active
      option.active = false;
      cacheTabs.push(option);
      //重新设置回去
      localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }

    /**
     * 得到当前激活tab的id
     * @returns {null}
     */;
    _proto.getActivatedTabId = function getActivatedTabId() {
      var id = null;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (btn) {
        if (btn.classList.contains('active')) {
          id = btn.getAttribute(TAB_ID_KEY);
        }
      });
      return id;
    }

    /**
     * 获取缓冲中激活的tab
     * @returns {null}
     * @private
     */;
    _proto._getActivatedCacheTabId = function _getActivatedCacheTabId() {
      var id = null;
      var cacheTabs = this._getCacheTabs();
      cacheTabs.forEach(function (option) {
        if (option.hasOwnProperty('active') && option.active === true) {
          id = option.id;
        }
      });
      return id;
    }

    /**
     * 得到当前激活tab
     * @returns {null}
     */;
    _proto.getActivatedTab = function getActivatedTab() {
      var tab = null;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (btn) {
        if (btn.classList.contains('active')) {
          tab = btn;
        }
      });
      return tab;
    }

    /**
     * 通过tab添加iframe
     * @private
     */;
    _proto._addIframeByTab = function _addIframeByTab(tabEl) {
      //添加iframe
      var option = {
        id: tabEl.getAttribute(TAB_ID_KEY),
        url: tabEl.getAttribute(TAB_URL_KEY)
      };
      var iframeHTML = this._formatString(TAB_IFRAME, option);
      var iframeDom = Util.createNode(iframeHTML);
      //判断是否需要加淡入动画
      if (this._config.tabFadein === true) {
        iframeDom.classList.add(TAB_IFRAME_FADEIN_CLASS);
      }
      this._tab_content_wraper.appendChild(iframeDom);
    }

    /**
     * 通过id激活tab
     * @param id
     */;
    _proto.activeTabById = function activeTabById(id) {
      //同时激活缓存中的tab选项
      if (this._isOpenCacheTab()) {
        this._activeCacheTabById(id);
      }

      //激活前删除所有的激活样式
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (btnEl) {
        btnEl.classList.remove('active');
      });

      //把所有的iframe都移除出去
      this._tab_content_wraper.querySelectorAll('iframe').forEach(function (iframeEl) {
        iframeEl.classList.add(TAB_IFRAME_LEAVE_CLASS);
      });

      //给当前tab添加激活样式
      var tab = this.findTabById(id);
      tab.classList.add('active');

      //把当前面板激活
      var iframe = this.findIframeById(id);
      if (!(iframe instanceof HTMLElement)) {
        this._addIframeByTab(tab);
      }

      //再次查找iframe并激活
      this.findIframeById(id).classList.remove(TAB_IFRAME_LEAVE_CLASS);

      //滚动到指定tab
      this.scrollToTabById(id);
    };
    _proto._openMenu = function _openMenu(a) {
      var ul = a.parentNode.parentNode;
      var aHasChildren = Util.siblings(ul, 'a.has-children')[0];
      if (!(aHasChildren instanceof HTMLElement)) {
        return;
      }
      aHasChildren.classList.add('open');
      return this._openMenu(aHasChildren);
    }

    /**
     * 通过id滚动到指定的tab
     * @param id
     */;
    _proto.scrollToTabById = function scrollToTabById(id) {
      var tab = this.findTabById(id);
      // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
      this._tab_wraper.scrollLeft = tab.offsetLeft - this._tab_wraper.offsetWidth / 2 + tab.offsetWidth / 2;
      //关闭右键菜单
      this._closeTabsContextmenu();
    }

    /**
     * 通过id找到iframe
     * @param id
     * @returns {null}
     */;
    _proto.findIframeById = function findIframeById(id) {
      var results = null;
      this._tab_content_wraper.querySelectorAll('iframe').forEach(function (iframeEl) {
        if (iframeEl.getAttribute(TAB_ID_KEY) === id) {
          results = iframeEl;
        }
      });
      return results;
    }

    /**
     * 通过id找到tab
     * @param id
     * @returns {null}
     */;
    _proto.findTabById = function findTabById(id) {
      var results = null;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (btnEl) {
        if (btnEl.getAttribute(TAB_ID_KEY) === id) {
          results = btnEl;
        }
      });
      return results;
    }

    /**
     * 格式化模板数据
     * @param str
     * @param data
     * @returns {*}
     * @private
     */;
    _proto._formatString = function _formatString(str, data) {
      return str.replace(/{{(\w+)}}/g, function (matchingStr, group1) {
        return data[group1];
      });
    }

    //事件监听
    ;
    _proto._addEventListener = function _addEventListener() {
      var _this = this;

      //清空缓存
      Util.delegate(document.body, 'click', '.bsa-clear-cache', function (e) {
        e.preventDefault();
        _this.clearCache();
      });

      //左侧菜单展开必须移除style
      Util.delegate(document.body, 'transitionend', '.bsa-sidebar-body > ul', function (event) {
        var target = event.target;
        if (target.matches('ul')) {
          target.removeAttribute('style');
        }
      });

      //左侧菜单展开折叠逻辑
      Util.delegate(document.body, 'click', '.bsa-sidebar-body > ul a.has-children', function (event) {
        event.preventDefault();
        var a = this;
        if (!a.classList.contains('open')) {
          //展开
          a.classList.add('open');
          _this._menuToggle(a, 1);
        } else {
          _this._menuToggle(a, 0);
          a.classList.remove('open');
        }
        // 兄弟节点处理
        Util.siblings(a.parentNode).forEach(function (li) {
          var openA = li.querySelector('a.has-children.open');
          if (openA instanceof HTMLElement) {
            _this._menuToggle(openA, 0);
            openA.classList.remove('open');
          }
          var activeA = li.querySelector('a.active');
          if (activeA instanceof HTMLElement) {
            activeA.classList.remove('active');
          }
        });
      });

      //调色板侧边栏
      Util.delegate(document.body, 'click', 'div[class^=sidebarcolor]', function (event) {
        event.preventDefault();
        var sidebarcolor = this.getAttribute('class');
        var sidebarcolorList = [];
        for (var i = 0; i < 8; i++) {
          sidebarcolorList.push("sidebarcolor" + (i + 1));
        }
        if (sidebarcolor === "sidebarcolor0") {
          //从缓存中移除
          localStorage.removeItem(SIDEBARCOLOR_CACHE_KEY);
          document.documentElement.classList.remove("color-sidebar");
          sidebarcolorList.map(function (item) {
            document.documentElement.classList.remove(item);
          });
        } else {
          var _document$documentEle;
          //存入缓存
          localStorage.setItem(SIDEBARCOLOR_CACHE_KEY, sidebarcolor);
          document.documentElement.classList.add("color-sidebar", sidebarcolor);
          sidebarcolorList.splice(sidebarcolorList.indexOf(sidebarcolor), 1);
          (_document$documentEle = document.documentElement.classList).remove.apply(_document$documentEle, sidebarcolorList);
        }
      });

      //调色板头部
      Util.delegate(document.body, 'click', 'div[class^=headercolor]', function (event) {
        event.preventDefault();
        var headercolor = this.getAttribute('class');
        var headercolorList = [];
        for (var i = 0; i < 8; i++) {
          headercolorList.push("headercolor" + (i + 1));
        }
        if (headercolor === "headercolor0") {
          //删除缓存
          localStorage.removeItem(HEADERCOLOR_CACHE_KEY);
          document.documentElement.classList.remove("color-header");
          headercolorList.map(function (item) {
            document.documentElement.classList.remove(item);
          });
        } else {
          var _document$documentEle2;
          //存入缓存
          localStorage.setItem(HEADERCOLOR_CACHE_KEY, headercolor);
          document.documentElement.classList.add("color-header", headercolor);
          headercolorList.splice(headercolorList.indexOf(headercolor), 1);
          (_document$documentEle2 = document.documentElement.classList).remove.apply(_document$documentEle2, headercolorList);
        }
      });

      //搜索框关闭
      Util.delegate(document.body, 'click', '.bsa-search-close-btn', function (event) {
        event.preventDefault();
        document.querySelector('.bsa-search-form-wrapper').classList.remove('open');
      });

      //搜索框打开
      Util.delegate(document.body, 'click', '.bsa-search-form-toggler', function (event) {
        event.preventDefault();
        document.querySelector('.bsa-search-form-wrapper').classList.add('open');
      });

      //移动端左侧菜单Toggler
      Util.delegate(document.body, 'click', '.bsa-sidebar-toggler', function (event) {
        event.preventDefault();
        document.querySelector('.bsa-sidebar').classList.add('open');
        document.body.insertAdjacentHTML('beforeEnd', "<div class=\"bsa-mask\"></div>");
      });

      //遮罩层点击
      Util.delegate(document.body, 'click', '.bsa-mask', function (event) {
        event.preventDefault();
        _this.closeSideMenu();
      });
    }

    /**
     * 关闭侧边栏的菜单
     * @private
     */;
    _proto.closeSideMenu = function closeSideMenu() {
      document.querySelector('.bsa-mask').remove();
      document.querySelector('.bsa-sidebar').classList.remove('open');
    };
    _proto._menuToggle = function _menuToggle(element, type) {
      //找到ul元素
      var ul = element.nextElementSibling;
      //先计算得到ul可滚动的高度scrollHeight
      var ulSh = ul.scrollHeight + 'px';
      if (type === 1) {
        ul.style.cssText = 'display:block;height:0;overflow: hidden;';
        void element.scrollHeight;
        ul.style.cssText = "display:block;height:" + ulSh + ";overflow: hidden;";
      } else if (type === 0) {
        ul.style.cssText = "display:block;height:" + ulSh + ";overflow: hidden;";
        void element.scrollHeight;
        ul.style.cssText = "display:block;height:0;overflow: hidden;";
      }
    }

    //广告输出
    ;
    _proto._advert = function _advert() {
      console.log("\n" + "   ___  _______ \n" + "  / _ )/ __/ _ |\n" + " / _  |\\ \\/ __ |\n" + "/____/___/_/ |_|\n" + "\n作者:ajiho\n" + "描述:基于bootstrap5.x设计的一个纯静态开源免费的响应式后台管理HTML模板，旨在快速让喜欢用bootstrap开发后台的程序员有个轻松愉悦的起点。\n无论您是用于项目开发、学习、还是教学演示、希望能给个star，这将会是我最大的动力!\n" + "Gitee开源地址:https://gitee.com/ajiho/bootstrap-admin\n");
    };
    return Main;
  }();

  /**
   * --------------------------------------------
   * Main.js
   * License MIT
   * --------------------------------------------
   */
  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._config = config;
      this._element = element;
    }
    var _proto = Toast.prototype;
    _proto.run = function run() {
      console.log('Toast-run');
    };
    return Toast;
  }();

  exports.Main = Main;
  exports.Toast = Toast;

}));
//# sourceMappingURL=bootstrap-admin.js.map
