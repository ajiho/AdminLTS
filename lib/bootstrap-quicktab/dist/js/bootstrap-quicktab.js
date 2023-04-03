/*!
 * bootstrap-quicktab v1.1.0 (https://gitee.com/ajiho/bootstrap-quicktab)
 * Copyright 2021-2023 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-quicktab/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Quicktab = factory());
})(this, (function () { 'use strict';

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

  var e,t=["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"];if(function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0;}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t);}catch(e){}return e}()){var o=EventTarget.prototype.addEventListener;e=o,EventTarget.prototype.addEventListener=function(o,r,n){var s,a="object"==typeof n&&null!==n,i=a?n.capture:n;(n=a?function(e){var t=Object.getOwnPropertyDescriptor(e,"passive");return t&&!0!==t.writable&&void 0===t.set?Object.assign({},e):e}(n):{}).passive=void 0!==(s=n.passive)?s:-1!==t.indexOf(o)&&!0,n.capture=void 0!==i&&i,e.call(this,o,r,n);},EventTarget.prototype.addEventListener._original=e;}

  var md5Exports = {};
  var md5 = {
    get exports(){ return md5Exports; },
    set exports(v){ md5Exports = v; },
  };

  var cryptExports = {};
  var crypt = {
    get exports(){ return cryptExports; },
    set exports(v){ cryptExports = v; },
  };

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
    return obj != null && (isBuffer$2(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
  };

  function isBuffer$2 (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$2(obj.slice(0, 0))
  }

  (function(){
    var crypt = cryptExports,
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

      var m = crypt.bytesToWords(message),
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

      return crypt.endian([a, b, c, d]);
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

      var digestbytes = crypt.wordsToBytes(md5$1(message, options));
      return options && options.asBytes ? digestbytes :
          options && options.asString ? bin.bytesToString(digestbytes) :
          crypt.bytesToHex(digestbytes);
    };

  })();

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeGlobal$1 = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var root$1 = root;

  /** Built-in value references. */
  var Symbol$1 = root$1.Symbol;

  var Symbol$2 = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$d.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$b.call(value, symToStringTag$1),
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
  var objectProto$c = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$c.toString;

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
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

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
      objectProto$b = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$b.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, '\\$&')
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
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

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
    if (!(hasOwnProperty$9.call(object, key) && eq(objValue, value)) ||
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
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$9.propertyIsEnumerable;

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
    return isObjectLike(value) && hasOwnProperty$8.call(value, 'callee') &&
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
  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

  /** Built-in value references. */
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

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
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal$1.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

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
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

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
      if ((inherited || hasOwnProperty$7.call(value, key)) &&
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
  var objectProto$7 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;

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
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

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
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
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
      objectProto$5 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

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
    var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
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
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

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
        (eq(objValue, objectProto$4[key]) && !hasOwnProperty$4.call(object, key))) {
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
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

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
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
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
  var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
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
  function escape$1(string) {
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
      '_': { 'escape': escape$1 }
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
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

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
    var sourceURL = hasOwnProperty$2.call(options, 'sourceURL')
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
    var variable = hasOwnProperty$2.call(options, 'variable') && options.variable;
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

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root$1, 'Map');

  var Map$1 = Map;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  var nativeCreate$1 = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$1 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  var baseFor$1 = baseFor;

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root$1.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$1 = root$1.Uint8Array;

  var Uint8Array$2 = Uint8Array$1;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var baseCreate$1 = baseCreate;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate$1(getPrototype$1(object))
      : {};
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray$1(srcValue),
          isBuff = !isArr && isBuffer$1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray$1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;
        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor$1(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  var _merge = merge;

  /**
   * --------------------------------------------
   * BSA Storage.js
   * License MIT
   * --------------------------------------------
   */
  var Storage = /*#__PURE__*/function () {
    function Storage(type) {
      if (type === void 0) {
        type = 1;
      }
      //type:1 则是sessionStorage type:2
      this.type = type;
    }

    /**
     * 设置缓存
     * @param name 缓存的key
     * @param data 缓存数据
     */
    var _proto = Storage.prototype;
    _proto.set = function set(name, data) {
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
     */;
    _proto.get = function get(name) {
      if (this.type === 1) {
        return JSON.parse(sessionStorage.getItem(name));
      } else if (this.type === 2) {
        return JSON.parse(localStorage.getItem(name));
      }
    }

    /**
     * 删除缓存
     * @param name
     */;
    _proto.remove = function remove(name) {
      if (this.type === 1) {
        sessionStorage.removeItem(name);
      } else if (this.type === 2) {
        localStorage.removeItem(name);
      }
    }

    /**
     * 同时删除 sessionStorage和localStorage缓存
     * @param name
     */;
    Storage.removeBoth = function removeBoth(name) {
      sessionStorage.removeItem(name);
      localStorage.removeItem(name);
    };
    return Storage;
  }();

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
      var div = document.createElement('div');
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
    },
    // 判断iframe是否跨域
    canAccessIFrame: function canAccessIFrame(iframe) {
      var html = null;
      try {
        // 浏览器兼容
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        html = doc.body.innerHTML;
      } catch (err) {
        // do nothing
      }
      return html !== null;
    },
    //判断是否为字符串
    isString: function isString(str) {
      return typeof str == 'string' && str.constructor === String;
    },
    deepExtend: function deepExtend(out) {
      if (!out) {
        return {};
      }
      for (var _len2 = arguments.length, arguments_ = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        arguments_[_key2 - 1] = arguments[_key2];
      }
      for (var _i = 0, _arguments_ = arguments_; _i < _arguments_.length; _i++) {
        var obj = _arguments_[_i];
        if (!obj) {
          continue;
        }
        for (var _i2 = 0, _Object$entries = Object.entries(obj); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _Object$entries[_i2],
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          switch (Object.prototype.toString.call(value)) {
            case '[object Object]':
              out[key] = this.deepExtend(out[key], value);
              break;
            case '[object Array]':
              out[key] = this.deepExtend(new Array(value.length), value);
              break;
            default:
              out[key] = value;
          }
        }
      }
      return out;
    },
    //数组对象去重
    arrUnique: function arrUnique(arr, objKey) {
      //临时数组
      var temp = [];
      return arr.reduce(function (prev, curr) {
        if (temp.indexOf(curr[objKey]) === -1) {
          temp.push(curr[objKey]);
          prev.push(curr);
        }
        return prev;
      }, []);
    },
    /**
     * 通过key更新obj中的指定数据
     * @param obj 更新值的对象
     * @param objKey 拼接后的key数据，string ‘.’符号拼接
     * @param newValue 更新的值
     * @returns {*} 返回更新后的数据
     */
    updateObjDataByKey: function updateObjDataByKey(obj, objKey, newValue) {
      var keyList = objKey.split('.');
      var lastKey = keyList[keyList.length - 1];
      keyList.reduce(function (pre, item) {
        if (item === lastKey) pre[item] = newValue;
        return pre[item];
      }, obj);
      return obj;
    }
  };

  var TAB_ID_KEY = 'data-tab-id';
  var TAB_URL_KEY = 'data-tab-url';
  //命名空间
  var TAB_NAMESPACE = 'quicktab';
  // tab激活的类名
  var TAB_ACTIVE_CLASS_NAME = 'active';
  // tab滚动区域的类名
  var TAB_SCROLL_AREA_CLASS_NAME = 'scroll_area';
  // tab全屏类
  var TAB_FULLSCREEN_CLASS_NAME = 'qt-fullscreen';
  // tab隐藏类
  var TAB_PANE_HIDE_CLASS_NAME = 'outing';
  // tab关闭图标挂载类名
  var TAB_CLOSE_BTN_ICON_CLASS_NAME = 'qt-close';

  // 用于更多下拉菜单展开时给容器挂载的阻止鼠标事件的类
  var TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME = 'more-menu-pen';
  // 全屏触发class
  var TAB_FULLSCREEN_TRIGGER_CLASS_NAME = 'fullscreen';
  //刷新触发class
  var TAB_REFRESH_TRIGGER_CLASS_NAME = 'refresh-toolbar-btn';
  // 顶部菜单左滚动
  var TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME = 'move-left-btn';
  //顶部菜单 右滚动 按钮
  var TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME = 'move-right-btn';
  // 顶部下拉菜单回到当前按钮
  var TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME = 'dropdown-rollback-current-btn';
  // 顶部下拉菜单刷新当前按钮
  var TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME = 'dropdown-refresh-current-btn';
  // 顶部下拉菜单关闭当前按钮
  var TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME = 'dropdown-close-current-btn';
  // 顶部下拉菜单关闭当前按钮
  var TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME = 'dropdown-close-other-btn';
  // 顶部下拉菜单关闭全部按钮
  var TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME = 'dropdown-close-all-btn';

  //右键菜单容器类
  var TAB_CONTEXTMENU_CONTAINER_CLASS_NAME = TAB_NAMESPACE + "-contextmenu";

  // 用于tab右键菜单时给容器挂载的阻止鼠标事件的类
  var TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME = 'pen';
  // 右键菜单刷新的类名
  var TAB_CONTEXTMENU_REFRESH_CLASS_NAME = 'contextmenu-refresh-btn';
  // 右键菜单关闭的类名
  var TAB_CONTEXTMENU_CLOSE_CLASS_NAME = 'contextmenu-close-btn';
  // 右键菜单关闭其它的类名
  var TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME = 'contextmenu-close-other-btn';
  // 固定宽度nav-link
  var TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME = 'iconbtn';
  // tab鼠标移入才展示关闭按钮类名
  var TAB_SHOWONHOVER_CLASS_NAME = 'showOnHover';
  var CONST = {
    TAB_ID_KEY: TAB_ID_KEY,
    TAB_URL_KEY: TAB_URL_KEY,
    TAB_NAMESPACE: TAB_NAMESPACE,
    TAB_ACTIVE_CLASS_NAME: TAB_ACTIVE_CLASS_NAME,
    TAB_SCROLL_AREA_CLASS_NAME: TAB_SCROLL_AREA_CLASS_NAME,
    TAB_FULLSCREEN_CLASS_NAME: TAB_FULLSCREEN_CLASS_NAME,
    TAB_PANE_HIDE_CLASS_NAME: TAB_PANE_HIDE_CLASS_NAME,
    TAB_CLOSE_BTN_ICON_CLASS_NAME: TAB_CLOSE_BTN_ICON_CLASS_NAME,
    TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME: TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME,
    TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME: TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME,
    TAB_FULLSCREEN_TRIGGER_CLASS_NAME: TAB_FULLSCREEN_TRIGGER_CLASS_NAME,
    TAB_REFRESH_TRIGGER_CLASS_NAME: TAB_REFRESH_TRIGGER_CLASS_NAME,
    TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME: TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME,
    TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME: TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME,
    TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME: TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME,
    TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME: TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME,
    TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME: TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME,
    TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME: TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME,
    TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME: TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME,
    TAB_CONTEXTMENU_REFRESH_CLASS_NAME: TAB_CONTEXTMENU_REFRESH_CLASS_NAME,
    TAB_CONTEXTMENU_CLOSE_CLASS_NAME: TAB_CONTEXTMENU_CLOSE_CLASS_NAME,
    TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME: TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME,
    TAB_CONTEXTMENU_CONTAINER_CLASS_NAME: TAB_CONTEXTMENU_CONTAINER_CLASS_NAME,
    TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME: TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME,
    TAB_SHOWONHOVER_CLASS_NAME: TAB_SHOWONHOVER_CLASS_NAME
  };

  // quicktab插件默认参数
  var DEFAULT = {
    //dom选择器
    selector: '',
    //最小高度
    minHeight: '',
    //高度
    height: '',
    //宽
    width: '',
    //缓存  false:不缓存  "sessionStorage"  "localStorage"
    cache: false,
    //初始tab
    tabs: [],
    //工具栏配置项
    toolbar: {
      //是否显示工具栏
      show: true,
      //向左滚动
      leftScroll: {
        enable: true,
        icon: 'bi bi-caret-left'
      },
      //刷新按钮
      refresh: {
        enable: false,
        icon: 'bi bi-arrow-clockwise'
      },
      //向右边滚动
      rightScroll: {
        enable: true,
        icon: 'bi bi-caret-right'
      },
      //全屏功能配置
      fullscreen: {
        //是否开启全屏, true:开启全屏 false:关闭该功能
        enable: false,
        //图标
        icon: 'bi bi-arrows-fullscreen',
        //退出全屏的图标
        exitIcon: 'bi bi-fullscreen-exit',
        //全屏自定义函数
        fullscreen: null,
        //退出全屏自定义函数
        exitFullscreen: null
      },
      //是否启用更多操作下拉菜单
      moreDropdowns: {
        enable: true,
        icon: 'bi bi-caret-down',
        items: {
          //回到当前
          rollback: {
            enable: true,
            text: '回到当前'
          },
          reload: {
            enable: true,
            text: '刷新当前'
          },
          close: {
            enable: true,
            text: '关闭当前'
          },
          closeOthers: {
            enable: true,
            text: '关闭其它'
          },
          closeAll: {
            enable: true,
            text: '关闭所有'
          }
        }
      }
    },
    //tab配置
    tabConfig: {
      //右键菜单是否开启
      contextmenu: {
        enable: false,
        items: {
          reload: {
            enable: true,
            text: '刷新'
          },
          close: {
            enable: true,
            text: '关闭'
          },
          closeOthers: {
            enable: true,
            text: '关闭其它'
          }
        }
      },
      //true: 鼠标滚动切换tab  false:关闭该功能
      mouseWheelToggleTab: false,
      //最大数量 >=1 时生效, null:表示无限制, 注意：提供的初始化tabs中有close:false的tab除外
      maxNum: null,
      //关闭按钮
      closeBtn: {
        enable: true,
        icon: 'bi bi-x',
        showOnHover: true
      },
      //当浏览器窗口大小改变时是否自动回到当前激活的tab的所在位置(居中)
      windowResizeRollback: true,
      //tab单击时滚动到当前所在位置(自动居中)  false:不启用 true:启用
      clickRollback: false,
      //可拖动排序 false:不启用 true:启用
      dragSort: false
    },
    //tab被激活的事件
    onTabActivated: null,
    //tab加载完毕事件
    onTabLoaded: null,
    //tab遮罩层加载完毕的事件
    onTabMaskTransitionend: null,
    //实例化完毕回调
    onInit: null,
    //tab被点击回调事件
    onTabClick: null
  };

  //单个tab的默认选项
  var TABDEFAULT = {
    //标题
    title: '新标签页',
    //连接
    url: '',
    //是否可以关闭
    close: true
  };
  var qtDef = {
    DEFAULT: DEFAULT,
    TABDEFAULT: TABDEFAULT
  };

  var style = "\n                ." + CONST.TAB_NAMESPACE + "{\n                    height:222px;\n                    background-color: var(--bs-body-bg);\n                    display: flex;\n                    flex-direction: column;\n                }\n            \n                /*  \u9762\u677F\u79FB\u9664\u6837\u5F0F */\n                ." + CONST.TAB_NAMESPACE + " ." + CONST.TAB_PANE_HIDE_CLASS_NAME + " {\n                    position: absolute !important;\n                    transform: translateY(101%);\n                }\n            \n                /*\u53BB\u9664\u6240\u6709\u7684\u5706\u89D2*/\n                ." + CONST.TAB_NAMESPACE + " .nav-pills .nav-link {\n                    border-radius: 0;\n                }\n            \n                ." + CONST.TAB_NAMESPACE + " .nav-pills .nav-link ." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME + " {\n                    position: absolute;\n                    top: -3px;\n                    right: -1px;\n                    cursor: pointer;\n                    font-size: 16px;\n                }\n            \n                ." + CONST.TAB_NAMESPACE + " .nav-pills .nav-link ." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME + ":hover {\n                    color: #f00;\n                }\n                \n                ." + CONST.TAB_NAMESPACE + " .nav-pills .nav-link." + CONST.TAB_SHOWONHOVER_CLASS_NAME + " ." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME + " {\n                    display: none;\n                }\n                \n                ." + CONST.TAB_NAMESPACE + " .nav-pills .nav-link." + CONST.TAB_SHOWONHOVER_CLASS_NAME + ":hover ." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME + " {\n                    display: inline-block;\n                }\n                \n                \n                ." + CONST.TAB_NAMESPACE + " li.flex-grow-1 {\n                    width:0;\n                }\n                /*\u5FC5\u987B\u6DFB\u52A0\u8BE5\u6837\u5F0F\u5426\u5219\u6EDA\u52A8\u6761\u4F1A\u8D85\u51FA*/\n                ." + CONST.TAB_NAMESPACE + " div.flex-grow-1 {\n                    overflow: hidden;\n                }\n                \n         \n                ." + CONST.TAB_NAMESPACE + " li.flex-grow-1 ." + CONST.TAB_SCROLL_AREA_CLASS_NAME + "{\n                    position: relative;\n                    display:flex;\n                    flex-wrap: nowrap;\n                    align-items: center;\n                    overflow: scroll;\n                    scrollbar-width: none;\n                    -ms-overflow-style: none;\n                    height: 100%;\n                    overflow-y: hidden;\n                }\n                \n                  /* \u8C37\u6B4C\u6D4F\u89C8\u5668 */\n                ." + CONST.TAB_NAMESPACE + " li.flex-grow-1 ." + CONST.TAB_SCROLL_AREA_CLASS_NAME + "::-webkit-scrollbar {\n                    display: none; \n                }\n                \n                /*\u4E2D\u95F4\u7684tab\u8BBE\u7F6E\u4E00\u4E2A\u6700\u5927\u7684\u5BBD\u5EA6\u8D85\u51FA\u90E8\u5206\u663E\u793A\u7701\u7565\u53F7*/\n                ." + CONST.TAB_NAMESPACE + " li.flex-grow-1 .nav-link {\n                    min-width: 0;\n                    max-width: 180px;\n                    white-space: nowrap;\n                    text-overflow: ellipsis;\n                    overflow: hidden;\n                    padding-left: 20px;\n                    padding-right: 20px;\n                }\n            \n                /*\u7ED9\u56FE\u6807\u6309\u94AE\u8BBE\u7F6E\u4E00\u4E2A\u56FA\u5B9A\u5BBD\u5EA6\uFF0C\u5426\u5219\u6EDA\u52A8\u5230\u6307\u5B9Atab\u4F4D\u7F6E\u65F6\u4E0D\u7CBE\u786E*/\n                ." + CONST.TAB_NAMESPACE + " ." + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + "{\n                    width: 48px;\n                }\n            \n                ." + CONST.TAB_NAMESPACE + " .show {\n                    opacity: 1;\n                }\n            \n                ." + CONST.TAB_NAMESPACE + " .hide {\n                    opacity: 0;\n                    transition: opacity 800ms;\n                }\n            \n                ." + CONST.TAB_NAMESPACE + "." + CONST.TAB_FULLSCREEN_CLASS_NAME + " {\n                    height: 100% !important;\n                    width: 100% !important;\n                    position: fixed !important;\n                    z-index: 99999 !important;\n                    top: 0 !important;\n                    bottom: 0 !important;\n                    left: 0 !important;\n                    right: 0 !important;\n                }\n                \n                ." + CONST.TAB_CONTEXTMENU_CONTAINER_CLASS_NAME + " {\n                  display: none;\n                  position: fixed;\n                  width: 100px;\n                  background: #fff;\n                  z-index: 999999 !important;\n                }\n                \n                \n                ." + CONST.TAB_NAMESPACE + "." + CONST.TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME + " iframe {\n                  pointer-events: none;\n                }\n                \n                ." + CONST.TAB_NAMESPACE + "." + CONST.TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME + " iframe {\n                  pointer-events: none;\n                }\n                \n                @media (max-width: 400.98px) {\n                    \n                    ." + CONST.TAB_NAMESPACE + " .left-scroll-li{\n                        display: none !important;\n                    }\n                    \n                    ." + CONST.TAB_NAMESPACE + " .refresh-li{\n                        display: none !important;\n                    }\n                    \n                    ." + CONST.TAB_NAMESPACE + " .rightScroll-li{\n                        display: none !important;\n                    }\n                   \n                    \n                }\n            ";
  var qtStyle = {
    style: style
  };

  // 主体模板
  var TAB_MAIN_TPL = "\n              <ul class=\"nav nav-pills border border-bottom-0 flex-nowrap <% if (options.toolbar.show !== true) { %> d-none <% } %>\">\n                <% if ( options.toolbar.leftScroll.enable === true ) { %>\n                <!--                \u5DE6\u8FB9\u7684\u7BAD\u5934-->\n                <li class=\"nav-item border-end left-scroll-li\" >\n                    <button class=\"nav-link " + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + " " + CONST.TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME + "\" >\n                    <i class=\"<%= options.toolbar.leftScroll.icon %>\"></i>\n                    </button>\n                </li>\n                <% } %>\n                <% if ( options.toolbar.refresh.enable === true ) { %>\n                 <!--                \u5237\u65B0\u6309\u94AE -->\n                <li class=\"nav-item  border-end refresh-li\">\n                    <button class=\"nav-link " + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + " " + CONST.TAB_REFRESH_TRIGGER_CLASS_NAME + "\" >\n                        <i class=\"<%= options.toolbar.refresh.icon %>\"></i>\n                    </button>\n                </li>\n                <% } %>\n                <!--                \u4E2D\u95F4\u6EDA\u52A8\u7684\u533A\u57DF-->\n                <li class=\"nav-item flex-grow-1\">\n                    <div class=\"" + CONST.TAB_SCROLL_AREA_CLASS_NAME + "\"></div>\n                </li>\n                <% if ( options.toolbar.rightScroll.enable === true ) { %>\n                <!--                \u53F3\u8FB9\u7684\u7BAD\u5934-->\n                <li class=\"nav-item  border-start rightScroll-li\" >\n                    <button class=\"nav-link " + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + " " + CONST.TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME + "\" >\n                        <i class=\"<%= options.toolbar.rightScroll.icon %>\"></i>\n                    </button>\n                </li>\n                <% } %>\n                <% if ( options.toolbar.moreDropdowns.enable === true ) { %>\n                <!--                \u66F4\u591A\u64CD\u4F5C\u4E0B\u62C9\u83DC\u5355 -->\n                <li class=\"nav-item  border-start dropdown\" >\n                    <button class=\"nav-link " + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + "\" data-bs-toggle=\"dropdown\" >\n                        <i class=\"<%= options.toolbar.moreDropdowns.icon %>\"></i>\n                    </button>\n                    <ul class=\"dropdown-menu dropdown-menu-end\">\n                        <% if (options.toolbar.moreDropdowns.items.rollback.enable === true) { %>\n                        <li>\n                            <button class=\"dropdown-item " + CONST.TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME + "\" type=\"button\">\n                            <%= options.toolbar.moreDropdowns.items.rollback.text %>\n                            </button>\n                        </li>\n                        <% } %>\n                        <% if (options.toolbar.moreDropdowns.items.reload.enable === true) { %>\n                        <li>\n                            <button class=\"dropdown-item " + CONST.TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME + "\" type=\"button\">\n                            <%= options.toolbar.moreDropdowns.items.reload.text %>\n                            </button>\n                        </li>\n                        <% } %>\n                        <% if (options.toolbar.moreDropdowns.items.close.enable === true) { %>\n                        <li>\n                            <button class=\"dropdown-item " + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME + "\" type=\"button\">\n                            <%= options.toolbar.moreDropdowns.items.close.text %>\n                            </button>\n                        </li>\n                        <% } %>\n                        <% if (options.toolbar.moreDropdowns.items.closeOthers.enable === true) { %>\n                        <li>\n                            <button class=\"dropdown-item " + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME + "\" type=\"button\">\n                            <%= options.toolbar.moreDropdowns.items.closeOthers.text %>\n                            </button>\n                        </li>\n                        <% } %>\n                        <% if (options.toolbar.moreDropdowns.items.closeAll.enable === true) { %>\n                        <li>\n                            <button class=\"dropdown-item " + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME + "\" type=\"button\">\n                            <%= options.toolbar.moreDropdowns.items.closeAll.text %>\n                            </button>\n                        </li>\n                        <% } %>\n                    </ul>\n                </li>\n                <% } %>  \n                <% if ( options.toolbar.fullscreen.enable === true ) { %>\n                <!-- \u5168\u5C4F\u5B9E\u73B0 -->\n                <li class=\"nav-item  border-start fullscreen-li\">\n                    <button class=\"nav-link " + CONST.TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME + " " + CONST.TAB_FULLSCREEN_TRIGGER_CLASS_NAME + "\">\n                        <i class=\"<%= options.toolbar.fullscreen.icon %>\"></i>\n                    </button>\n                </li>\n                <% } %>\n            </ul>\n            <!-- \u9762\u677F\u5BB9\u5668 -->\n            <div class=\"flex-grow-1 border position-relative\"></div>";

  // tab的遮罩层
  var TAB_LOADING_TPL = "\n     <!--loading-->\n     <div class=\"position-absolute start-0 end-0 top-0 bottom-0 bg-light bg-body-tertiary show d-flex align-items-center justify-content-center\">\n         <div class=\"spinner-border text-secondary text-body-tertiary\" role=\"status\">\n         <span class=\"visually-hidden\">Loading...</span>\n         </div>\n    </div>\n";

  // tab面板模板
  var TAB_PANE_TPL = "\n        <div class=\"h-100 w-100 position-relative\" " + CONST.TAB_ID_KEY + "=\"<%= option.id %>\">\n            " + TAB_LOADING_TPL + "    \n            <iframe src=\"<%= option.url %>\" class=\"d-block w-100 h-100\"></iframe>\n        </div>\n";

  //右键菜单的容器模板
  var TBA_CONTEXTMENU_TPL = "\n            <div class=\"list-group shadow-sm " + CONST.TAB_CONTEXTMENU_CONTAINER_CLASS_NAME + " " + CONST.TAB_CONTEXTMENU_CONTAINER_CLASS_NAME + "-<%= id %>\">\n                <% if ( options.tabConfig.contextmenu.items.reload.enable === true ) { %>\n                <button type=\"button\" class=\"list-group-item list-group-item-action " + CONST.TAB_CONTEXTMENU_REFRESH_CLASS_NAME + "\">\n                <%= options.tabConfig.contextmenu.items.reload.text %>\n                </button>\n                <% } %>\n                <% if ( options.tabConfig.contextmenu.items.close.enable === true ) { %>\n                <button type=\"button\" class=\"list-group-item list-group-item-action " + CONST.TAB_CONTEXTMENU_CLOSE_CLASS_NAME + "\">\n                <%= options.tabConfig.contextmenu.items.close.text %>\n                </button>\n                <% } %>\n                <% if ( options.tabConfig.contextmenu.items.closeOthers.enable === true ) { %>\n                <button type=\"button\" class=\"list-group-item list-group-item-action " + CONST.TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME + "\">\n                <%= options.tabConfig.contextmenu.items.closeOthers.text %>\n                </button>\n                <% } %>\n            </div>";

  // 每个tab的模板
  var TAB_TPL = "\n                    <button <% if (options.tabConfig.dragSort === true) { %> draggable=\"true\" <% } %> class=\"nav-link flex-shrink-0  border-end position-relative <% if (options.tabConfig.closeBtn.showOnHover === true) { %>" + CONST.TAB_SHOWONHOVER_CLASS_NAME + "<% } %>\" type=\"button\" " + CONST.TAB_URL_KEY + "=\"<%= option.url %>\"  " + CONST.TAB_ID_KEY + "=\"<%= option.id %>\">\n                     <%= option.title %>\n                     <% if (options.tabConfig.closeBtn.enable === true) { %>\n                        <% if (option.close === true) { %>\n                        <i class=\"<%= options.tabConfig.closeBtn.icon %> " + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME + "\"></i>\n                        <% } %>\n                     <% } %>\n                    </button>";
  var tpl = {
    TAB_MAIN_TPL: TAB_MAIN_TPL,
    TAB_LOADING_TPL: TAB_LOADING_TPL,
    TAB_PANE_TPL: TAB_PANE_TPL,
    TBA_CONTEXTMENU_TPL: TBA_CONTEXTMENU_TPL,
    TAB_TPL: TAB_TPL
  };

  var Quicktab = /*#__PURE__*/function () {
    //实例对象

    function Quicktab(option) {
      this._validateBootstrapVer();
      var _this = this;
      //构建样式
      this._buildStyle();

      //参数合并
      this._option = _merge({}, qtDef.DEFAULT, option);

      //容器检测
      this._tab_container = document.querySelector(this._option.selector);
      //第一步检测是否是一个有效的dom容器
      if (!(this._tab_container instanceof HTMLElement)) {
        throw new Error("selector '" + this._option.selector + "' invalid");
      }

      //第二步,检测是否是一个已经被实例化的dom容器
      if (this._tab_container.classList.contains(CONST.TAB_NAMESPACE)) {
        throw new Error("The provided selector '" + this._option.selector + "' has been initialized");
      }

      //每个实例的id是不一样的
      this._qt_id = md5Exports(this._option.selector);
      this._qt_cache_key = CONST.TAB_NAMESPACE + "-" + this._qt_id;
      //缓存初始化
      this.storage = this._initCache();

      //设置容器的宽高
      this._setContainerWH();

      //给容器挂载容器所需的类名
      this._tab_container.classList.add(CONST.TAB_NAMESPACE);

      //加入到容器中
      this._tab_container.insertAdjacentHTML('beforeEnd', template(tpl.TAB_MAIN_TPL)({
        'options': this._option
      }));
      //tab的容器
      this._tab_wraper = this._tab_container.querySelector("li.flex-grow-1 > ." + CONST.TAB_SCROLL_AREA_CLASS_NAME);
      //tab面板的容器
      this._tab_pane_wraper = this._tab_container.querySelector('div.flex-grow-1');

      // 选项可通过data属性覆盖
      this._dataAttrAssign();

      //回显tab(可能是缓存里的，或者是option选项里面的)
      this._restoreTabs();

      //注册必须的事件
      this._registerRequiredEvents();
      if (this._option.tabConfig.contextmenu.enable === true) {
        //构建dom
        this._buildContextmenu();

        //事件绑定
        this._registerContextmenuEvent();
      }

      //事件监听开始根据参数来进行绑定
      //左边滑动
      if (this._option.toolbar.leftScroll.enable === true) {
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME, function () {
          _this.leftScroll();
        });
      }

      //右边滑动
      if (this._option.toolbar.rightScroll.enable === true) {
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME, function () {
          _this.rightScroll();
        });
      }

      //全屏
      if (this._option.toolbar.fullscreen.enable === true) {
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_FULLSCREEN_TRIGGER_CLASS_NAME, function () {
          if (this.getElementsByClassName("" + _this._option.toolbar.fullscreen.icon).length > 0) {
            _this.fullscreen();
          } else {
            _this.exitFullscreen();
          }
        });
      }

      //刷新
      if (this._option.toolbar.refresh.enable === true) {
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_REFRESH_TRIGGER_CLASS_NAME, function () {
          _this.refreshActiveTab();
        });
      }

      //更多菜单的每个item判断
      if (this._option.toolbar.moreDropdowns.enable === true) {
        //更多操作的下拉菜单
        var tabActionsDropdown = this._tab_container.querySelector('ul>li.dropdown>button');
        tabActionsDropdown.addEventListener('show.bs.dropdown', function () {
          _this._tab_container.classList.add(CONST.TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME);
        });
        //更多操作下拉菜单关闭移除
        tabActionsDropdown.addEventListener('hide.bs.dropdown', function () {
          _this._tab_container.classList.remove(CONST.TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME);
        });

        //回到当前
        if (this._option.toolbar.moreDropdowns.items.rollback.enable === true) {
          Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME, function () {
            _this.scrollToActiveTab();
          });
        }

        //刷新当前
        if (this._option.toolbar.moreDropdowns.items.reload.enable === true) {
          Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME, function () {
            _this.refreshActiveTab();
          });
        }

        //关闭当前
        if (this._option.toolbar.moreDropdowns.items.close.enable === true) {
          Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME, function () {
            _this.closeActiveTab();
          });
        }

        //关闭其它
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME, function () {
          _this.closeExceptActiveTab();
        });

        //关闭全部
        Util.delegate(_this._tab_container, 'click', "." + CONST.TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME, function () {
          _this.closeAllTabs();
        });
      }

      //tab关闭
      if (this._option.tabConfig.closeBtn.enable === true) {
        Util.delegate(_this._tab_wraper, 'click', "." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME, function () {
          _this.closeTabById(Quicktab.getTabId(this.parentNode));
        });
      }

      //鼠标滚轮可以切换tab
      if (this._option.tabConfig.mouseWheelToggleTab === true) {
        var _this2 = this;
        this._tab_wraper.addEventListener('wheel', Util.debounce(function (e) {
          e.preventDefault();
          var activeTab = _this2.getActiveTab();

          //滚动的时候必须关闭tab的右键菜单
          if (_this2._option.tabConfig.contextmenu.enable === true) {
            _this2._closeTabsContextmenu();
          }
          var deltaY = e.deltaY;
          if (deltaY < 0) {
            //向左滚动

            //获取它前一个tab
            var preTab = activeTab.previousElementSibling;
            if (preTab instanceof HTMLElement) {
              _this2.activeTabById(Quicktab.getTabId(preTab));
            }
          } else if (deltaY > 0) {
            //向右滚动
            var nextTab = activeTab.nextElementSibling;
            if (nextTab instanceof HTMLElement) {
              _this2.activeTabById(Quicktab.getTabId(nextTab));
            }
          }
        }, 100));
      }

      //是否开启tab的拖动排序
      if (this._option.tabConfig.dragSort === true) {
        //当前拖动的元素
        var dragging = null;

        //拖拽开始
        _this._tab_wraper.ondragstart = function (event) {
          dragging = event.target;

          //拖动的时候关闭右键菜单显示
          if (_this._option.tabConfig.contextmenu.enable === true) {
            _this._closeTabsContextmenu();
          }
        };

        //拖拽移动中
        _this._tab_wraper.ondragover = function (event) {
          // 默认无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对元素的默认处理方式
          event.preventDefault();
          var target = event.target;

          //当前拖动的元素是li 且不等于
          if (target.nodeName === 'BUTTON' && target !== dragging) {
            // 获取初始位置
            var targetRect = target.getBoundingClientRect();
            var draggingRect = dragging.getBoundingClientRect();
            if (target) {
              // 判断是否动画元素
              if (target.animated) {
                return;
              }
            }
            if (_this._index(dragging) < _this._index(target)) {
              // 目标比元素大，插到其后面
              // extSibling下一个兄弟元素
              target.parentNode.insertBefore(dragging, target.nextSibling);
            } else {
              // 目标比元素小，插到其前面
              target.parentNode.insertBefore(dragging, target);
            }
            _this._animate(draggingRect, dragging);
            _this._animate(targetRect, target);
          }
        };
        //拖拽结束
        _this._tab_wraper.ondragend = function (event) {
          dragging = null;
        };
      }

      //静态属性存实例对象,用于子页面快速找到父级页面实例，然后添加tab等..
      Quicktab.instances[this._qt_id] = this;

      //实例化完毕回调
      if (this._option.onInit) {
        this._option.onInit({
          target: this
        });
      }
    }
    var _proto = Quicktab.prototype;
    _proto._registerRequiredEvents = function _registerRequiredEvents() {
      var _this = this;

      //监听窗口变化也要让右键菜单消失
      window.addEventListener('resize', Util.debounce(function () {
        if (_this._option.tabConfig.contextmenu.enable === true) {
          //关闭tab的右键菜单
          _this._closeTabsContextmenu();
        }

        //隐藏更多菜单
        _this._moreMenuDropdownHide();

        //回到当前位置
        if (_this._option.toolbar.moreDropdowns.enable === true && _this._option.toolbar.moreDropdowns.items.rollback.enable === true && _this._option.tabConfig.windowResizeRollback === true) {
          _this.scrollToActiveTab();
        }
      }, 150));

      //快速通过html属性注册tab
      Util.delegate(document.body, 'click', '[data-qt-tab][data-qt-target]', function (e) {
        e.preventDefault();
        if (this.getAttribute('data-qt-target') === _this._option.selector) {
          var tab = _this._mergeTab(JSON.parse(this.getAttribute('data-qt-tab')));
          _this.addTab(tab);
        }
      });

      //tab的单击事件
      Util.delegate(_this._tab_wraper, 'click', 'button.nav-link', function (e) {
        e.preventDefault();
        var tabId = Quicktab.getTabId(this);
        if (_this._option.onTabClick) {
          _this._option.onTabClick(_this._getCallBackParamsById(tabId));
        }

        //激活
        _this.activeTabById(tabId);
        //滚动到tab所在位置
        if (_this._option.tabConfig.clickRollback === true) {
          _this.scrollToTabById(tabId);
        }
      }, "." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME);
    };
    _proto._initCache = function _initCache() {
      if (this._option.cache === 'localStorage') {
        return new Storage(2);
      } else if (this._option.cache === 'sessionStorage') {
        return new Storage(1);
      } else {
        return null;
      }
    }

    //静态方法
    ;
    Quicktab.getTabId = function getTabId(tabEl) {
      return tabEl.getAttribute(CONST.TAB_ID_KEY);
    };
    Quicktab.getTabUrl = function getTabUrl(tabEl) {
      return tabEl.getAttribute(CONST.TAB_URL_KEY);
    };
    Quicktab.canAccessIFrame = function canAccessIFrame(iframe) {
      return Util.canAccessIFrame(iframe);
    };
    Quicktab.getTabIdByUrl = function getTabIdByUrl(url) {
      return md5Exports(url);
    }

    // 模仿tinymce插件的方式获取实例tinymce.get('editor').setContent('<h1>这是回显的内容</h1>')
    ;
    Quicktab.get = function get(selector) {
      return Quicktab.instances[md5Exports(selector)];
    };
    _proto._buildStyle = function _buildStyle() {
      var styleEl = document.querySelector("style[namespace=\"" + CONST.TAB_NAMESPACE + "\"]");
      if (!(styleEl instanceof HTMLStyleElement)) {
        var style = document.createElement('style');
        style.setAttribute('namespace', CONST.TAB_NAMESPACE);
        style.textContent = qtStyle.style;
        document.head.appendChild(style);
      }
    };
    _proto._buildContextmenu = function _buildContextmenu() {
      //加入到body
      document.body.insertAdjacentHTML('beforeEnd', template(tpl.TBA_CONTEXTMENU_TPL)({
        options: this._option,
        id: this._qt_id
      }));
      this._tab_contextmenu_wraper = document.querySelector("." + CONST.TAB_CONTEXTMENU_CONTAINER_CLASS_NAME + "-" + this._qt_id);
    };
    _proto._registerContextmenuEvent = function _registerContextmenuEvent() {
      var _this = this;
      //tab右键
      Util.delegate(_this._tab_wraper, 'contextmenu', 'button.nav-link', function (e) {
        e.preventDefault();
        var id = Quicktab.getTabId(this);

        //同时查看是否需要显示关闭选项
        if (_this._option.tabConfig.contextmenu.items.close.enable === true) {
          if (_this._canRemoveTabById(id)) {
            _this._tab_contextmenu_wraper.querySelector("." + CONST.TAB_CONTEXTMENU_CLOSE_CLASS_NAME).style.display = 'block';
          } else {
            _this._tab_contextmenu_wraper.querySelector("." + CONST.TAB_CONTEXTMENU_CLOSE_CLASS_NAME).style.display = 'none';
          }
        }
        _this._tab_contextmenu_wraper.style.top = e.clientY + "px";
        _this._tab_contextmenu_wraper.style.left = e.clientX + "px";
        _this._tab_contextmenu_wraper.style.display = 'block';

        //同时给iframe窗口禁用所有的鼠标事件
        _this._tab_container.classList.add(CONST.TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME);

        //如果此时下拉菜单是打开着的，需要给它关闭掉
        _this._moreMenuDropdownHide();

        //把所有的id都给遍历给右键菜单的每一项
        _this._tab_contextmenu_wraper.querySelectorAll('button.list-group-item').forEach(function (item) {
          item.setAttribute(CONST.TAB_ID_KEY, id);
        });
      });

      //点击任何区域左键单击都关闭
      document.addEventListener('click', function () {
        _this._closeTabsContextmenu();
      });

      //内容区域的右键也要能关闭这个tab右键菜单
      Util.delegate(_this._tab_container, 'contextmenu', 'div.flex-grow-1', function (e) {
        e.preventDefault();
        _this._closeTabsContextmenu();
        _this._moreMenuDropdownHide();
      });

      //tab右键刷新左击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'click', "." + CONST.TAB_CONTEXTMENU_REFRESH_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.refreshTabById(this.getAttribute(CONST.TAB_ID_KEY));
        _this._closeTabsContextmenu();
      });

      //tab右键刷新右击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'contextmenu', "." + CONST.TAB_CONTEXTMENU_REFRESH_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.refreshTabById(this.getAttribute(CONST.TAB_ID_KEY));
        _this._closeTabsContextmenu();
      });

      //右键菜单-关闭左击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'click', "." + CONST.TAB_CONTEXTMENU_CLOSE_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.closeTabById(this.getAttribute(CONST.TAB_ID_KEY));
        _this._closeTabsContextmenu();
      });

      //右键菜单-关闭右击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'contextmenu', "." + CONST.TAB_CONTEXTMENU_CLOSE_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.closeTabById(this.getAttribute(CONST.TAB_ID_KEY));
        _this._closeTabsContextmenu();
      });

      //右键菜单-关闭其它左击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'click', "." + CONST.TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.closeTabsExceptById(Quicktab.getTabId(this));
        _this._closeTabsContextmenu();
      });

      //右键菜单-关闭其它右击处理
      Util.delegate(_this._tab_contextmenu_wraper, 'contextmenu', "." + CONST.TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME, function (e) {
        e.preventDefault();
        _this.closeTabsExceptById(Quicktab.getTabId(this));
        _this._closeTabsContextmenu();
      });
    };
    _proto.addTab = function addTab(option) {
      //参数合并
      option = this._mergeTab(option);
      if (this.getTabById(option.id) === null) {
        //如果没有该tab则添加这个tab

        if (this._option.tabConfig.maxNum >= 1) {
          var canCloseTabs = [];
          var tabs = this._tab_wraper.children;
          for (var _iterator = _createForOfIteratorHelperLoose(tabs), _step; !(_step = _iterator()).done;) {
            var _tab2 = _step.value;
            if (this._canRemoveTabById(Quicktab.getTabId(_tab2))) {
              canCloseTabs.push(_tab2);
            }
          }
          //如果=1那就把全部都给删了
          if (this._option.tabConfig.maxNum === 1) {
            for (var _iterator2 = _createForOfIteratorHelperLoose(canCloseTabs), _step2; !(_step2 = _iterator2()).done;) {
              var tab = _step2.value;
              this._removeTabById(Quicktab.getTabId(tab));
            }
          } else {
            //判断是否已经达到了最大的tab数量,把第一个给移除
            if (canCloseTabs.length >= this._option.tabConfig.maxNum) {
              //得到需要排除的tab
              var _tabs = canCloseTabs.slice(0, -(this._option.tabConfig.maxNum - 1));
              for (var _iterator3 = _createForOfIteratorHelperLoose(_tabs), _step3; !(_step3 = _iterator3()).done;) {
                var _tab = _step3.value;
                this._removeTabById(Quicktab.getTabId(_tab));
              }
            }
          }
        }

        //添加tab
        this._tab_wraper.insertAdjacentHTML('beforeEnd', template(tpl.TAB_TPL)({
          'options': this._option,
          'option': option
        }));

        //添加面板容器
        this._tab_pane_wraper.insertAdjacentHTML('beforeEnd', template(tpl.TAB_PANE_TPL)({
          'options': this._option,
          'option': option
        }));

        //同时也添加进缓存
        this._addTabToCache(option);
      }

      //激活该tab
      this.activeTabById(option.id);
      //滚动到tab所在位置
      this.scrollToTabById(option.id);
    };
    _proto.activeTabById = function activeTabById(id) {
      var _this = this;

      //先判断该tab是否已经被激活
      if (_this.getTabById(id).classList.contains(CONST.TAB_ACTIVE_CLASS_NAME)) {
        return;
      }

      //激活缓存中的tab
      _this._activeCacheTabById(id);

      //删除前一个tab的激活样式
      var preActiveTab = _this.getActiveTab();
      if (preActiveTab instanceof HTMLElement) {
        preActiveTab.classList.remove(CONST.TAB_ACTIVE_CLASS_NAME);
      }

      //给当前tab添加激活样式
      this.getTabById(id).classList.add('active');

      //给面板激活(先给所有的面板都加上.outing类，然后再把当前的面板移除该类)
      for (var _iterator4 = _createForOfIteratorHelperLoose(_this._tab_pane_wraper.children), _step4; !(_step4 = _iterator4()).done;) {
        var tab_pane = _step4.value;
        tab_pane.classList.add(CONST.TAB_PANE_HIDE_CLASS_NAME);
      }

      //先查找该面板是否存在(因为可能是惰性tab)
      var tabPane = _this.getTabPaneById(id);
      if (!(tabPane instanceof HTMLElement)) {
        _this._addTabPaneById(id);
      }

      //找到面板下的iframe添加事件
      _this._addIframeEventById(id);

      //给当前的面板移进视野
      _this.getTabPaneById(id).classList.remove(CONST.TAB_PANE_HIDE_CLASS_NAME);

      //滚动到指定的tab区域
      // _this.scrollToTabById(id);

      //tab激活事件回调,给用户处理事件
      if (_this._option.onTabActivated) {
        _this._option.onTabActivated(_this._getCallBackParamsById(id));
      }
    };
    _proto.scrollToTabById = function scrollToTabById(id, smooth) {
      if (smooth === void 0) {
        smooth = true;
      }
      var tab = this.getTabById(id);
      this._tab_wraper.scrollTo({
        //需要父元素设置postion(relative、absolute、fixed)
        // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
        left: tab.offsetLeft - this._tab_wraper.offsetWidth / 2 + tab.offsetWidth / 2,
        behavior: smooth === true ? 'smooth' : 'auto'
      });
    };
    _proto.getTabById = function getTabById(id) {
      return this._tab_wraper.querySelector("[data-tab-id=\"" + id + "\"]");
    };
    _proto._getTabMaskById = function _getTabMaskById(id) {
      var tabPane = this.getTabPaneById(id);
      if (tabPane instanceof HTMLElement) {
        return tabPane.querySelector('div');
      }
      return null;
    };
    _proto.clsoeTabMaskById = function clsoeTabMaskById(id) {
      var loading = this._getTabMaskById(id);
      if (loading instanceof HTMLElement) {
        //如果已经存在就删除
        loading.remove();
      }
    };
    _proto.addTabMaskById = function addTabMaskById(id) {
      //关闭遮罩层
      this.clsoeTabMaskById(id);
      //判断该tab面板是否存在
      var tabPane = this.getTabPaneById(id);
      if (tabPane instanceof HTMLElement) {
        tabPane.insertAdjacentHTML('beforeEnd', tpl.TAB_LOADING_TPL);
      }
    };
    _proto.getActiveTab = function getActiveTab() {
      return this._tab_wraper.querySelector('button.nav-link.active');
    };
    _proto.getIFrameById = function getIFrameById(id) {
      var tabPane = this.getTabPaneById(id);
      var iframe = null;
      if (tabPane instanceof HTMLElement) {
        iframe = tabPane.querySelector('iframe');
      }
      return iframe;
    };
    _proto.getTabPaneById = function getTabPaneById(id) {
      return this._tab_pane_wraper.querySelector("[data-tab-id=\"" + id + "\"]");
    };
    _proto._restoreTabs = function _restoreTabs() {
      //判断选项是否开启缓存
      if (this._isCache()) {
        var cacheTabs = this._getCacheTabs();
        if (cacheTabs.length !== 0) {
          this._restoreTabsHandle(cacheTabs, this._getActiveTabFromCache().id);
        } else {
          //要缓存
          this._restoreTabsHandle(this._option.tabs, null, true);
        }
      } else {
        //删除缓存
        Storage.removeBoth(this._qt_cache_key);
        //回显处理程序
        this._restoreTabsHandle(this._option.tabs);
      }
    };
    _proto.closeTabById = function closeTabById(id) {
      var tab = this.getTabById(id);
      if (tab instanceof HTMLElement && this._canRemoveTabById(id)) {
        //如果tab真实存在,且tab可以删除
        if (tab.classList.contains('active')) {
          //判断是否是激活的tab
          //把active传递给其它的tab
          var willActiveId = null;
          if (tab.nextElementSibling instanceof HTMLElement) {
            //后面有tab
            //得到后面tab的pageid作为将要激活的tab id

            willActiveId = Quicktab.getTabId(tab.nextElementSibling);
          } else if (tab.previousElementSibling instanceof HTMLElement) {
            //看看前面是否有tab

            willActiveId = Quicktab.getTabId(tab.previousElementSibling);
          }

          //先删除再滚动
          this._removeTabById(id);
          if (willActiveId) {
            //如果该id存在就激活
            //激活
            this.activeTabById(willActiveId);
          }
        } else {
          //不是激活的tab直接删除

          this._removeTabById(id);
        }
      }
    };
    _proto._removeTabById = function _removeTabById(id) {
      //删除tab
      this.getTabById(id).remove();

      //删除tab面板
      var tabPane = this.getTabPaneById(id);
      if (tabPane instanceof HTMLElement) {
        tabPane.remove();
      }

      // 删除缓存里面的tab
      this._removeCacheTabById(id);
    }

    /**
     * 添加tab进缓存
     * @param option
     * @private
     */;
    _proto._addTabToCache = function _addTabToCache(option) {
      if (this._isCache()) {
        //先取
        var tabs = this._getCacheTabs();
        //追加属性 active
        option.active = false;
        tabs.push(option);
        //重新设置回去
        this.storage.set(this._qt_cache_key, tabs);
      }
    };
    _proto._getCacheTabs = function _getCacheTabs() {
      if (this._isCache()) {
        var tabs = this.storage.get(this._qt_cache_key);
        return tabs === null ? [] : tabs;
      }
    };
    _proto._isCache = function _isCache() {
      return this._option.cache !== false;
    };
    _proto._mergeTab = function _mergeTab(tabOption) {
      var option = _merge({}, qtDef.TABDEFAULT, tabOption);
      option.id = md5Exports(option.url);
      return option;
    }

    /**
     *
     * @param tabs tab数组
     * @param activeId   待激活的id,不填默认激活tabs的最后一项
     * @param cache   是否添加进缓存 默认：false  true：同时添加进本地缓存
     * @private
     */;
    _proto._restoreTabsHandle = function _restoreTabsHandle(tabs, activeId, cache) {
      if (activeId === void 0) {
        activeId = null;
      }
      if (cache === void 0) {
        cache = false;
      }
      var _this = this;
      if (!(Array.isArray(tabs) && tabs.length !== 0)) {
        return;
      }
      var newTabArr = [];
      tabs.forEach(function (option) {
        newTabArr.push(_this._mergeTab(option));
      });

      //bug:fix,如果添加两个url相同的tab以然会添加上去，导致点击无效，这里应该进行去重
      var uniTabArr = Util.arrUnique(newTabArr, 'id');

      //创建两个虚拟节点
      var tabFrag = document.createDocumentFragment();
      //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆(重点优化)
      for (var _iterator5 = _createForOfIteratorHelperLoose(uniTabArr), _step5; !(_step5 = _iterator5()).done;) {
        var option = _step5.value;
        if (cache === true) {
          _this._addTabToCache(option);
        }
        var tabHTML = template(tpl.TAB_TPL)({
          'options': this._option,
          'option': option
        });
        tabFrag.appendChild(Util.createNode(tabHTML));
      }

      //添加虚拟节点到tab的容器里面
      _this._tab_wraper.appendChild(tabFrag);
      if (activeId !== null) {
        //激活该tab
        _this.activeTabById(activeId);
        //并滚动到tab所在位置
        _this.scrollToTabById(activeId, false);
      } else {
        //激活数组里最后一个tab
        var id = newTabArr.at(-1).id;
        _this.activeTabById(id);
        //并滚动到tab所在位置
        _this.scrollToTabById(id, false);
      }
    };
    _proto._getActiveTabFromCache = function _getActiveTabFromCache() {
      if (this._isCache()) {
        var tab = null;
        this._getCacheTabs().forEach(function (option) {
          if (Object.prototype.hasOwnProperty.call(option, 'active') && option.active === true) {
            tab = option;
          }
        });
        return tab;
      }
    };
    _proto._activeCacheTabById = function _activeCacheTabById(id) {
      if (this._isCache()) {
        var cacheTabs = this._getCacheTabs();
        cacheTabs.forEach(function (option) {
          option.active = option.id === id;
        });
        this.storage.set(this._qt_cache_key, cacheTabs);
      }
    };
    _proto._addTabPaneById = function _addTabPaneById(id, active) {
      if (active === void 0) {
        active = true;
      }
      var tab = this.getTabById(id);
      var tabPaneStr = template(tpl.TAB_PANE_TPL)({
        'options': this._option,
        'option': {
          id: Quicktab.getTabId(tab),
          url: Quicktab.getTabUrl(tab)
        }
      });
      var tabPaneNode = Util.createNode(tabPaneStr);

      //如果不是激活的直接给它添加上hide类
      if (active === false) {
        tabPaneNode.classList.add(CONST.TAB_PANE_HIDE_CLASS_NAME);
      }
      this._tab_pane_wraper.appendChild(tabPaneNode);
    };
    _proto._removeCacheTabById = function _removeCacheTabById(id) {
      if (this._isCache()) {
        var cacheTabs = this._getCacheTabs();
        cacheTabs.forEach(function (tab, index) {
          if (tab.id === id) {
            cacheTabs.splice(index, 1);
          }
        });
        //重新设置回去
        this.storage.set(this._qt_cache_key, cacheTabs);
      }
    };
    _proto.refreshTabById = function refreshTabById(id) {
      var tabPane = this.getTabPaneById(id);
      if (!(tabPane instanceof HTMLElement)) {
        //没有的话需要添加tab面板还有注册iframe的事件
        this._addTabPaneById(id, false);
        this._addIframeEventById(id);
      } else {
        //如果有就正常刷新逻辑

        this.addTabMaskById(id);

        //在这里还需要判断是否存在跨域的情况，否则刷新功能会报错
        var iframe = this.getIFrameById(id);
        if (Quicktab.canAccessIFrame(iframe)) {
          iframe.contentWindow.location.reload();
        } else {
          iframe.setAttribute('src', iframe.getAttribute('src')); // 跨域状况下，重新设置url
        }
      }
    };
    _proto._canRemoveTabById = function _canRemoveTabById(id) {
      return this.getTabById(id).querySelector("." + CONST.TAB_CLOSE_BTN_ICON_CLASS_NAME) instanceof HTMLElement;
    };
    _proto._closeTabsContextmenu = function _closeTabsContextmenu() {
      this._tab_contextmenu_wraper.style.display = 'none';
      this._tab_container.classList.remove(CONST.TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME);
    };
    _proto._moreMenuDropdownHide = function _moreMenuDropdownHide() {
      if (this._option.toolbar.moreDropdowns.enable === true) {
        bootstrap.Dropdown.getOrCreateInstance(this._tab_container.querySelector('ul>li.dropdown>button')).hide();
      }
    };
    _proto.scrollToActiveTab = function scrollToActiveTab() {
      var activeTab = this.getActiveTab();
      if (activeTab instanceof HTMLElement) {
        this.scrollToTabById(Quicktab.getTabId(activeTab));
      }
    };
    _proto.refreshActiveTab = function refreshActiveTab() {
      var activeTab = this.getActiveTab();
      if (activeTab instanceof HTMLElement) {
        this.refreshTabById(Quicktab.getTabId(activeTab));
      }
    };
    _proto.setTab = function setTab(callBack) {
      var params = [];
      var tabs = this._tab_wraper.children;
      for (var _iterator6 = _createForOfIteratorHelperLoose(tabs), _step6; !(_step6 = _iterator6()).done;) {
        var tab = _step6.value;
        var p = this._getCallBackParamsById(Quicktab.getTabId(tab));
        params.push(p);
      }
      callBack(params);
    };
    _proto.fullscreen = function fullscreen() {
      if (this._option.toolbar.fullscreen.enable === true) {
        //不管如何它都要替换成退出全屏的图标
        this._tab_container.querySelector("." + CONST.TAB_FULLSCREEN_TRIGGER_CLASS_NAME).innerHTML = "<i class=\"" + this._option.toolbar.fullscreen.exitIcon + "\"></i>";
        document.documentElement.style.overflow = 'hidden';
        this._tab_container.classList.add(CONST.TAB_FULLSCREEN_CLASS_NAME);

        //回调
        if (this._option.toolbar.fullscreen.fullscreen) {
          this._option.toolbar.fullscreen.fullscreen(this);
        }
      }
    };
    _proto.exitFullscreen = function exitFullscreen() {
      if (this._option.toolbar.fullscreen.enable === true) {
        this._tab_container.querySelector("." + CONST.TAB_FULLSCREEN_TRIGGER_CLASS_NAME).innerHTML = "<i class=\"" + this._option.toolbar.fullscreen.icon + "\"></i>";
        document.documentElement.style.overflow = 'auto';
        this._tab_container.classList.remove(CONST.TAB_FULLSCREEN_CLASS_NAME);

        //退出全屏回调
        if (this._option.toolbar.fullscreen.exitFullscreen) {
          this._option.toolbar.fullscreen.exitFullscreen(this);
        }

        //回到当前
        this.scrollToActiveTab();
      }
    };
    _proto.leftScroll = function leftScroll() {
      this._tab_wraper.scrollTo({
        left: this._tab_wraper.scrollLeft - this._tab_wraper.offsetWidth,
        behavior: 'smooth'
      });
    };
    _proto.rightScroll = function rightScroll() {
      this._tab_wraper.scrollTo({
        left: this._tab_wraper.scrollLeft + this._tab_wraper.offsetWidth,
        behavior: 'smooth'
      });
    };
    _proto._dataAttrAssign = function _dataAttrAssign() {
      var tabs = JSON.parse(this._tab_container.getAttribute('data-qt-tabs'));
      if (Array.isArray(tabs) && tabs.length > 0) {
        //有传递，且能解析出正确的格式就更改选项数据
        Util.updateObjDataByKey(this._option, 'tabs', tabs);
      }
    };
    _proto._addIframeEventById = function _addIframeEventById(id) {
      var _this = this;
      var iframe = _this.getIFrameById(id);
      iframe.onload = function () {
        if (Quicktab.canAccessIFrame(iframe)) {
          //如果不是跨域的iframe才给刷新
          iframe.contentWindow.onunload = function () {
            _this.addTabMaskById(id);
          };
        }

        //触发
        if (_this._option.onTabLoaded) {
          _this._option.onTabLoaded(_this._getCallBackParamsById(id));
        }
        var loading = _this._getTabMaskById(id);
        if (loading instanceof HTMLElement) {
          //fade out
          loading.classList.replace('show', 'hide');
          //监听loadding层执行完毕后给它移除掉。
          loading.addEventListener('transitionend', function () {
            this.remove();
            //加载层淡出过渡执行完毕
            if (_this._option.onTabMaskTransitionend) {
              _this._option.onTabMaskTransitionend(_this._getCallBackParamsById(id));
            }
          });
        }
      };
    };
    _proto._getCallBackParamsById = function _getCallBackParamsById(id) {
      var _this = this;
      var tabEl = _this.getTabById(id);
      var tabId = Quicktab.getTabId(tabEl);
      var tabUrl = Quicktab.getTabUrl(tabEl);
      var tabPaneEl = _this.getTabPaneById(id);
      var tabIFrame = {
        el: _this.getIFrameById(id),
        canAccess: Quicktab.canAccessIFrame(_this.getIFrameById(id))
      };
      return {
        target: _this,
        tabEl: tabEl,
        tabId: tabId,
        tabUrl: tabUrl,
        tabPaneEl: tabPaneEl,
        tabIFrame: tabIFrame
      };
    };
    _proto._setContainerWH = function _setContainerWH() {
      if (Util.isString(this._option.height) && this._option.height.trim().length !== 0) {
        this._tab_container.style.setProperty('height', this._option.height, 'important');
      }
      if (Util.isString(this._option.width) && this._option.width.trim().length !== 0) {
        this._tab_container.style.setProperty('width', this._option.width, 'important');
      }
      if (Util.isString(this._option.minHeight) && this._option.minHeight.trim().length !== 0) {
        this._tab_container.style.setProperty('min-height', this._option.minHeight, 'important');
      }
    };
    _proto.closeActiveTab = function closeActiveTab() {
      var activeTab = this.getActiveTab();
      if (activeTab instanceof HTMLElement) {
        var id = Quicktab.getTabId(activeTab);
        if (this._canRemoveTabById(id)) {
          //判断能不能删除
          this.closeTabById(id);
        }
      }
    };
    _proto.closeTabsExceptById = function closeTabsExceptById(id) {
      var _this = this;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (tab) {
        var forEachId = Quicktab.getTabId(tab);
        if (forEachId !== id && _this._canRemoveTabById(forEachId)) {
          //如果不相等，且tab可以被删除的情况下
          _this.closeTabById(forEachId);
        }
      });
    };
    _proto.closeExceptActiveTab = function closeExceptActiveTab() {
      var activeTab = this.getActiveTab();
      if (activeTab instanceof HTMLElement) {
        this.closeTabsExceptById(Quicktab.getTabId(activeTab));
      }
    };
    _proto.closeAllTabs = function closeAllTabs() {
      var _this = this;
      this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (tab) {
        var id = Quicktab.getTabId(tab);
        if (_this._canRemoveTabById(id)) {
          _this._removeTabById(id);
        }
      });

      //选中那些禁止删除的取第一个,将其激活
      var lastTab = this._tab_wraper.lastChild;
      if (lastTab instanceof HTMLElement) {
        _this.activeTabById(Quicktab.getTabId(lastTab));
      }
    };
    _proto._getBootstrap5Version = function _getBootstrap5Version() {
      var versionArr = [];
      try {
        var bsv = bootstrap.Modal.VERSION;
        if (bsv.indexOf('-') !== -1) {
          //有可能是后面包含有-beta1或者5.0.0-alpha1
          bsv = bsv.substring(0, bsv.indexOf('-'));
        }
        versionArr.push.apply(versionArr, [parseInt(bsv.split('.')[0]), parseInt(bsv.split('.')[1]), parseInt(bsv.split('.')[2])]);
      } catch (err) {
        //do something
      }
      return versionArr;
    };
    _proto._validateBootstrapVer = function _validateBootstrapVer() {
      if (typeof bootstrap === 'undefined') {
        throw new Error(CONST.TAB_NAMESPACE + " must requires bootstrap");
      }
      var v = this._getBootstrap5Version();
      if (v.length !== 0 && (!(v[0] >= 5 && v[0] === 5 && v[1] >= 1) || v[0] === 5 && v[1] === 1 && v[2] < 3)) {
        throw new Error(CONST.TAB_NAMESPACE + " JavaScript requires Bootstrap version 5.1.3 or higher");
      }
    }

    // 获取元素在父元素中的index
    ;
    _proto._index = function _index(el) {
      var index = 0;
      if (!el || !el.parentNode) {
        return -1;
      }
      // previousElementSibling：上一个兄弟元素
      while (el && (el = el.previousElementSibling)) {
        index++;
      }
      return index;
    }

    // 触发动画
    ;
    _proto._animate = function _animate(prevRect, target) {
      var ms = 300;
      {
        var currentRect = target.getBoundingClientRect();
        if (prevRect.nodeType === 1) {
          prevRect = prevRect.getBoundingClientRect();
        }
        target.style.setProperty('transition', 'none');
        target.style.setProperty('transform', "translate3d(" + (prevRect.left - currentRect.left) + "px," + (prevRect.top - currentRect.top) + "px,0)");
        target.offsetWidth; // 触发重绘

        target.style.setProperty('transition', "transform " + ms + "ms");
        target.style.setProperty('transform', 'translate3d(0,0,0)');

        // 时间到了之后把transition和transform清空
        clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          target.style.setProperty('transition', '');
          target.style.setProperty('transform', '');
          target.animated = false;
        }, ms);
      }
    };
    return Quicktab;
  }();
  Quicktab.instances = [];

  return Quicktab;

}));
//# sourceMappingURL=bootstrap-quicktab.js.map
