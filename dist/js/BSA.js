!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).BSA={})}(this,(function(t){"use strict";function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function n(t,n){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(o)return(o=o.call(t)).next.bind(o);if(Array.isArray(t)||(o=function(t,n){if(t){if("string"==typeof t)return e(t,n);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){o&&(t=o);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(t){return new bootstrap.Popover(t)})),[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(t){return new bootstrap.Tooltip(t)})),document.querySelectorAll('form:not([action]),form[action="#"]').forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()}))})),document.querySelectorAll("input").forEach((function(t){t.setAttribute("AutoComplete","off")}));var o,r,a=function(t,e,n,o,r){t.addEventListener(e,(function(t){for(var e=t.target,a=t.currentTarget;e!==a&&e instanceof HTMLElement;){if(e.matches(n)){o.call(e,t);break}if(e.matches(r))break;e=e.parentNode}}),!1)},i=function(t,e){e=e||!1;for(var o,r=[],a=n(t.parentNode.children);!(o=a()).done;){var i=o.value;i instanceof HTMLElement&&(e?i!==t&&i.matches(e)&&r.push(i):i!==t&&r.push(i))}return r},c=function(t){var e=document.createElement("div");return e.innerHTML=t,e.children[0]},s=function(t,e){var n;return void 0===e&&(e=500),function(){for(var o=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];n&&clearTimeout(n),n=setTimeout((function(){t.apply(o,a)}),e)}},l={exports:{}},u={exports:{}};o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&r.rotl(t,8)|4278255360&r.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=r.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,o=0;n<t.length;n++,o+=8)e[o>>>5]|=t[n]<<24-o%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var e=[],n=0;n<t.length;n+=3)for(var r=t[n]<<16|t[n+1]<<8|t[n+2],a=0;a<4;a++)8*n+6*a<=8*t.length?e.push(o.charAt(r>>>6*(3-a)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],n=0,r=0;n<t.length;r=++n%4)0!=r&&e.push((o.indexOf(t.charAt(n-1))&Math.pow(2,-2*r+8)-1)<<2*r|o.indexOf(t.charAt(n))>>>6-2*r);return e}},u.exports=r;var d={utf8:{stringToBytes:function(t){return d.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(d.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}},b=d,f=function(t){return null!=t&&(h(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&h(t.slice(0,0))}(t)||!!t._isBuffer)};function h(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}!function(){var t=u.exports,e=b.utf8,n=f,o=b.bin,r=function(a,i){a.constructor==String?a=i&&"binary"===i.encoding?o.stringToBytes(a):e.stringToBytes(a):n(a)?a=Array.prototype.slice.call(a,0):Array.isArray(a)||a.constructor===Uint8Array||(a=a.toString());for(var c=t.bytesToWords(a),s=8*a.length,l=1732584193,u=-271733879,d=-1732584194,b=271733878,f=0;f<c.length;f++)c[f]=16711935&(c[f]<<8|c[f]>>>24)|4278255360&(c[f]<<24|c[f]>>>8);c[s>>>5]|=128<<s%32,c[14+(s+64>>>9<<4)]=s;var h=r._ff,_=r._gg,p=r._hh,m=r._ii;for(f=0;f<c.length;f+=16){var v=l,y=u,g=d,T=b;l=h(l,u,d,b,c[f+0],7,-680876936),b=h(b,l,u,d,c[f+1],12,-389564586),d=h(d,b,l,u,c[f+2],17,606105819),u=h(u,d,b,l,c[f+3],22,-1044525330),l=h(l,u,d,b,c[f+4],7,-176418897),b=h(b,l,u,d,c[f+5],12,1200080426),d=h(d,b,l,u,c[f+6],17,-1473231341),u=h(u,d,b,l,c[f+7],22,-45705983),l=h(l,u,d,b,c[f+8],7,1770035416),b=h(b,l,u,d,c[f+9],12,-1958414417),d=h(d,b,l,u,c[f+10],17,-42063),u=h(u,d,b,l,c[f+11],22,-1990404162),l=h(l,u,d,b,c[f+12],7,1804603682),b=h(b,l,u,d,c[f+13],12,-40341101),d=h(d,b,l,u,c[f+14],17,-1502002290),l=_(l,u=h(u,d,b,l,c[f+15],22,1236535329),d,b,c[f+1],5,-165796510),b=_(b,l,u,d,c[f+6],9,-1069501632),d=_(d,b,l,u,c[f+11],14,643717713),u=_(u,d,b,l,c[f+0],20,-373897302),l=_(l,u,d,b,c[f+5],5,-701558691),b=_(b,l,u,d,c[f+10],9,38016083),d=_(d,b,l,u,c[f+15],14,-660478335),u=_(u,d,b,l,c[f+4],20,-405537848),l=_(l,u,d,b,c[f+9],5,568446438),b=_(b,l,u,d,c[f+14],9,-1019803690),d=_(d,b,l,u,c[f+3],14,-187363961),u=_(u,d,b,l,c[f+8],20,1163531501),l=_(l,u,d,b,c[f+13],5,-1444681467),b=_(b,l,u,d,c[f+2],9,-51403784),d=_(d,b,l,u,c[f+7],14,1735328473),l=p(l,u=_(u,d,b,l,c[f+12],20,-1926607734),d,b,c[f+5],4,-378558),b=p(b,l,u,d,c[f+8],11,-2022574463),d=p(d,b,l,u,c[f+11],16,1839030562),u=p(u,d,b,l,c[f+14],23,-35309556),l=p(l,u,d,b,c[f+1],4,-1530992060),b=p(b,l,u,d,c[f+4],11,1272893353),d=p(d,b,l,u,c[f+7],16,-155497632),u=p(u,d,b,l,c[f+10],23,-1094730640),l=p(l,u,d,b,c[f+13],4,681279174),b=p(b,l,u,d,c[f+0],11,-358537222),d=p(d,b,l,u,c[f+3],16,-722521979),u=p(u,d,b,l,c[f+6],23,76029189),l=p(l,u,d,b,c[f+9],4,-640364487),b=p(b,l,u,d,c[f+12],11,-421815835),d=p(d,b,l,u,c[f+15],16,530742520),l=m(l,u=p(u,d,b,l,c[f+2],23,-995338651),d,b,c[f+0],6,-198630844),b=m(b,l,u,d,c[f+7],10,1126891415),d=m(d,b,l,u,c[f+14],15,-1416354905),u=m(u,d,b,l,c[f+5],21,-57434055),l=m(l,u,d,b,c[f+12],6,1700485571),b=m(b,l,u,d,c[f+3],10,-1894986606),d=m(d,b,l,u,c[f+10],15,-1051523),u=m(u,d,b,l,c[f+1],21,-2054922799),l=m(l,u,d,b,c[f+8],6,1873313359),b=m(b,l,u,d,c[f+15],10,-30611744),d=m(d,b,l,u,c[f+6],15,-1560198380),u=m(u,d,b,l,c[f+13],21,1309151649),l=m(l,u,d,b,c[f+4],6,-145523070),b=m(b,l,u,d,c[f+11],10,-1120210379),d=m(d,b,l,u,c[f+2],15,718787259),u=m(u,d,b,l,c[f+9],21,-343485551),l=l+v>>>0,u=u+y>>>0,d=d+g>>>0,b=b+T>>>0}return t.endian([l,u,d,b])};r._ff=function(t,e,n,o,r,a,i){var c=t+(e&n|~e&o)+(r>>>0)+i;return(c<<a|c>>>32-a)+e},r._gg=function(t,e,n,o,r,a,i){var c=t+(e&o|n&~o)+(r>>>0)+i;return(c<<a|c>>>32-a)+e},r._hh=function(t,e,n,o,r,a,i){var c=t+(e^n^o)+(r>>>0)+i;return(c<<a|c>>>32-a)+e},r._ii=function(t,e,n,o,r,a,i){var c=t+(n^(e|~o))+(r>>>0)+i;return(c<<a|c>>>32-a)+e},r._blocksize=16,r._digestsize=16,l.exports=function(e,n){if(null==e)throw new Error("Illegal argument "+e);var a=t.wordsToBytes(r(e,n));return n&&n.asBytes?a:n&&n.asString?o.bytesToString(a):t.bytesToHex(a)}}();var _=["h-100","d-flex","flex-column","bsa-tabs"],p="out",m="fadeIn",v="data-tab-id",y="data-tab-url",g="tabs",T='<button class="nav-link border flex-shrink-0" '+y+'="{{url}}"  '+v+'="{{id}}" type="button">{{title}}</button>',w='<button class="nav-link border flex-shrink-0" '+y+'="{{url}}" '+v+'="{{id}}" type="button">{{title}}<i class="bi bi-x  closetab"></i></button>',x='<iframe src="{{url}}" class="w-100 h-100 d-block  out" '+v+'="{{id}}"></iframe>',I={consoleLog:!0,defaultTabs:[],tabFadein:!0,tabCache:!0,sideMenuClickClose:!1},A={title:"",url:"",id:null,close:!0},L=function(){function t(t){this._config=Object.assign({},I,t),this._init()}var e=t.prototype;return e._init=function(){!0===this._config.consoleLog&&this._advert(),this._addEventListener(),this._tabInit()},e._tabInit=function(){var t;(this._tab_container=document.querySelector(this._config.tabEl),this._tab_container instanceof HTMLElement)&&((t=this._tab_container.classList).add.apply(t,_),this._tab_container.insertAdjacentHTML("beforeEnd",'<ul class="nav nav-pills border flex-nowrap" role="tablist"><li class="nav-item caret-btn caret-btn-left  border-end" role="presentation"><button class="nav-link"><i class="bi bi-caret-left"></i></button></li><li class="nav-item flex-grow-1 d-flex flex-nowrap align-items-center position-relative" role="presentation"></li>\n                    <li class="nav-item caret-btn border-start dropdown" role="presentation">\n                        <button class="nav-link" data-bs-toggle="dropdown"><i class="bi bi-caret-down"></i></button>\n                        <ul class="dropdown-menu dropdown-menu-end">\n                            <li>\n                                <button class="dropdown-item rollback-current" type="button">回到当前</button>\n                            </li>\n                            <li>\n                                <button class="dropdown-item refresh-current" type="button">刷新当前</button>\n                            </li>\n                            <li>\n                                <button class="dropdown-item close-current" type="button">关闭当前</button>\n                            </li>\n                            <li>\n                                <button class="dropdown-item close-other" type="button">关闭其他</button>\n                            </li>\n                            <li>\n                                <button class="dropdown-item close-all" type="button">关闭全部</button>\n                            </li>\n                        </ul>\n                    </li>\n<li class="nav-item caret-btn caret-btn-right  border-start" role="presentation"><button class="nav-link"><i class="bi bi-caret-right"></i></button></li></ul><div class="flex-grow-1 position-relative"></div>'),this._tab_wraper=this._tab_container.querySelector("li.flex-grow-1"),this._tab_content_wraper=this._tab_container.querySelector("div.flex-grow-1"),this._buildContextmenu(),this._addTabEventListener(),this._restoreTabs())},e._restoreTabs=function(){var t=this;this._isOpenCacheTab()?0!==this._getCacheTabs().length?this._echoCacheAllTabs():this._config.defaultTabs.forEach((function(e){t.addTab(e)})):(this._clearCacheTabsAll(),this._config.defaultTabs.forEach((function(e){t.addTab(e)})))},e._echoCacheAllTabs=function(){var t=this,e=document.createDocumentFragment();this._getCacheTabs().forEach((function(n){var o=n.close?t._formatString(w,n):t._formatString(T,n);e.appendChild(c(o))})),this._tab_wraper.appendChild(e),this.activeTabById(this._getActivatedCacheTabId())},e._isOpenCacheTab=function(){return!0===this._config.tabCache},e._getCacheTabs=function(){var t=JSON.parse(localStorage.getItem(g));return null===t&&(t=[]),t},e._clearCacheTabsAll=function(){localStorage.removeItem(g)},e._buildContextmenu=function(){document.body.insertAdjacentHTML("beforeEnd",'\n            <div class="list-group bsa-contextmenu shadow-sm">\n                <button type="button" class="list-group-item list-group-item-action refresh">刷新</button>\n                <button type="button" class="list-group-item list-group-item-action close">关闭</button>\n                <button type="button" class="list-group-item list-group-item-action close-other">关闭其它</button>\n            </div>'),this._contextmenu_wraper=document.querySelector(".bsa-contextmenu")},e._addTabEventListener=function(){var t=this;a(document.body,"click","[data-bsa-tab-url][data-bsa-tab-title]",(function(e){e.preventDefault();var n=this.getAttribute("data-bsa-tab-url"),o=this.getAttribute("data-bsa-tab-title");t.addTab({title:o,url:n,close:!0})})),a(document.body,"click",".bsa-sidebar-body > ul a:not(.has-children):not([target])",(function(e){e.preventDefault();var n=this.getAttribute("href"),o=this.innerText;t.addTab({title:o,url:n,close:!0})})),this._tab_wraper.addEventListener("wheel",s((function(e){e.preventDefault(),e.stopPropagation();var n=t.getActivatedTab(),o=e.deltaY;if(o<0){var r=n.previousElementSibling;r instanceof HTMLElement&&t.activeTabById(r.getAttribute(v))}else if(o>0){var a=n.nextElementSibling;a instanceof HTMLElement&&t.activeTabById(a.getAttribute(v))}}),100)),a(t._tab_wraper,"click","button.nav-link",(function(){t.activeTabById(this.getAttribute(v))}),".closetab"),a(t._tab_wraper,"click",".closetab",(function(){t.closeTabById(this.parentNode.getAttribute(v))})),a(t._tab_wraper,"contextmenu","button.nav-link",(function(e){e.preventDefault();var n=this.getAttribute(v);t._canRemoveTabById(n)?t._contextmenu_wraper.querySelector(".close").style.display="block":t._contextmenu_wraper.querySelector(".close").style.display="none",t._contextmenu_wraper.style.top=e.clientY+"px",t._contextmenu_wraper.style.left=e.clientX+"px",t._contextmenu_wraper.style.display="block",t._tab_container.classList.add("pen"),bootstrap.Dropdown.getOrCreateInstance(t._tab_container.querySelector("ul>li.dropdown>button")).hide(),t._contextmenu_wraper.querySelectorAll("button.list-group-item").forEach((function(t){t.setAttribute(v,n)}))}),".closetab"),document.addEventListener("click",(function(){t._closeTabsContextmenu()})),window.addEventListener("resize",s((function(){t._closeTabsContextmenu()}),60));var e=t._tab_container.querySelector("ul>li.dropdown>button");e.addEventListener("show.bs.dropdown",(function(e){t._tab_container.classList.add("pen2")})),e.addEventListener("hide.bs.dropdown",(function(e){t._tab_container.classList.remove("pen2")})),a(t._contextmenu_wraper,"click",".refresh",(function(e){e.preventDefault(),t._contextmenuRefresh(this)})),a(t._contextmenu_wraper,"contextmenu",".refresh",(function(e){e.preventDefault(),t._contextmenuRefresh(this)})),a(t._contextmenu_wraper,"click",".close",(function(e){e.preventDefault(),t._contextmenuClose(this)})),a(t._contextmenu_wraper,"contextmenu",".close",(function(e){e.preventDefault(),t._contextmenuClose(this)})),a(t._contextmenu_wraper,"click",".close-other",(function(e){e.preventDefault(),t._contextmenuCloseOther(this)})),a(t._contextmenu_wraper,"contextmenu",".close-other",(function(e){e.preventDefault(),t._contextmenuCloseOther(this)})),a(t._tab_container,"click",".caret-btn-left",(function(){t._tab_wraper.scrollLeft=t._tab_wraper.scrollLeft-t._tab_wraper.offsetWidth})),a(t._tab_container,"click",".caret-btn-right",(function(){t._tab_wraper.scrollLeft=t._tab_wraper.scrollLeft+t._tab_wraper.offsetWidth})),a(t._tab_container,"click",".rollback-current",(function(){t.activeTabById(t.getActivatedTabId())})),a(t._tab_container,"click",".refresh-current",(function(){t._refreshTabById(t.getActivatedTabId())})),a(t._tab_container,"click",".close-current",(function(){var e=t.getActivatedTabId();t._canRemoveTabById(e)&&t.closeTabById(e)})),a(t._tab_container,"click",".close-other",(function(){t._closeAllTabExceptForId(t.getActivatedTabId())})),a(t._tab_container,"click",".close-all",(function(){t.closeAllTabs()}))},e._contextmenuRefresh=function(t){this._refreshTabById(t.getAttribute(v)),this._closeTabsContextmenu()},e._contextmenuClose=function(t){this.closeTabById(t.getAttribute(v)),this._closeTabsContextmenu()},e._contextmenuCloseOther=function(t){this._closeAllTabExceptForId(t.getAttribute(v)),this._closeTabsContextmenu()},e.closeAllTabs=function(){var t=this;this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(e){var n=e.getAttribute(v);t._canRemoveTabById(n)&&t._removeTabById(n)}));var e=this._tab_wraper.firstChild;e instanceof HTMLElement&&this.activeTabById(e.getAttribute(v))},e._closeAllTabExceptForId=function(t){var e=this;this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(n){var o=n.getAttribute(v);o!==t&&e._canRemoveTabById(o)&&e._removeTabById(o)}))},e._removeTabById=function(t){var e=this.findTabById(t),n=this.findIframeById(t);e.remove(),this._removeCacheTabById(t),n instanceof HTMLElement&&n.remove()},e._refreshTabById=function(t){var e=this.findIframeById(t);if(e instanceof HTMLElement)!0===this._config.tabFadein?(e.classList.remove("fadeIn"),e.offsetWidth,e.contentWindow.location.reload(),e.classList.add("fadeIn")):e.contentWindow.location.reload();else{var n=this.findTabById(t);this._addIframeByTab(n)}},e._closeTabsContextmenu=function(){this._contextmenu_wraper.style.display="none",this._tab_container.classList.remove("pen")},e._canRemoveTabById=function(t){var e=!1;return this.findTabById(t).querySelector(".bi-x")instanceof HTMLElement&&(e=!0),e},e._removeCacheTabById=function(t){var e=this._getCacheTabs();e.forEach((function(n,o){n.id===t&&e.splice(o,1)})),localStorage.setItem(g,JSON.stringify(e))},e.closeTabById=function(t){var e=this.findTabById(t);if(e.classList.contains("active")){var n=null;e.nextElementSibling instanceof HTMLElement?n=e.nextElementSibling.getAttribute(v):e.previousElementSibling instanceof HTMLElement&&(n=e.previousElementSibling.getAttribute(v)),this._removeTabById(t),n&&this.activeTabById(n)}else this._removeTabById(t)},e.addTab=function(t){if(this._tab_container instanceof HTMLElement){if((t=Object.assign({},A,t)).id=l.exports(t.url),null===this.findIframeById(t.id)){var e=t.close?this._formatString(w,t):this._formatString(T,t);this._tab_wraper.insertAdjacentHTML("beforeEnd",e);var n=this._formatString(x,t),o=c(n);!0===this._config.tabFadein&&o.classList.add(m),this._tab_content_wraper.appendChild(o),this._isOpenCacheTab()&&this._addTabToCache(t)}this.activeTabById(t.id)}},e._activeCacheTabById=function(t){var e=this._getCacheTabs();e.forEach((function(e){e.active=e.id===t})),localStorage.setItem(g,JSON.stringify(e))},e._addTabToCache=function(t){var e=this._getCacheTabs();t.active=!1,e.push(t),localStorage.setItem(g,JSON.stringify(e))},e.getActivatedTabId=function(){var t=null;return this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(e){e.classList.contains("active")&&(t=e.getAttribute(v))})),t},e._getActivatedCacheTabId=function(){var t=null;return this._getCacheTabs().forEach((function(e){e.hasOwnProperty("active")&&!0===e.active&&(t=e.id)})),t},e.getActivatedTab=function(){var t=null;return this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(e){e.classList.contains("active")&&(t=e)})),t},e._addIframeByTab=function(t){var e={id:t.getAttribute(v),url:t.getAttribute(y)},n=this._formatString(x,e),o=c(n);!0===this._config.tabFadein&&o.classList.add(m),this._tab_content_wraper.appendChild(o)},e.activeTabById=function(t){this._isOpenCacheTab()&&this._activeCacheTabById(t),this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(t){t.classList.remove("active")})),this._tab_content_wraper.querySelectorAll("iframe").forEach((function(t){t.classList.add(p)}));var e=this.findTabById(t);e.classList.add("active"),this.findIframeById(t)instanceof HTMLElement||this._addIframeByTab(e),this.findIframeById(t).classList.remove(p),this.scrollToTabById(t)},e.scrollToTabById=function(t){var e=this.findTabById(t);this._tab_wraper.scrollLeft=e.offsetLeft-this._tab_wraper.offsetWidth/2+e.offsetWidth/2,this._closeTabsContextmenu()},e.findIframeById=function(t){var e=null;return this._tab_content_wraper.querySelectorAll("iframe").forEach((function(n){n.getAttribute(v)===t&&(e=n)})),e},e.findTabById=function(t){var e=null;return this._tab_wraper.querySelectorAll("button.nav-link").forEach((function(n){n.getAttribute(v)===t&&(e=n)})),e},e._formatString=function(t,e){return t.replace(/{{(\w+)}}/g,(function(t,n){return e[n]}))},e._addEventListener=function(){var t=this;a(document.body,"transitionend",".bsa-sidebar-body > ul",(function(t){var e=t.target;e.matches("ul")&&e.removeAttribute("style")})),a(document.body,"click",".bsa-sidebar-body > ul a.has-children",(function(e){e.preventDefault();var n=this;n.classList.contains("open")?(t._menuToggle(n,0),n.classList.remove("open")):(n.classList.add("open"),t._menuToggle(n,1)),i(n.parentNode).forEach((function(e){var n=e.querySelector("a.has-children.open");n instanceof HTMLElement&&(t._menuToggle(n,0),n.classList.remove("open"));var o=e.querySelector("a.active");o instanceof HTMLElement&&o.classList.remove("active")}))})),a(document.body,"click","div[class^=sidebarcolor]",(function(t){t.preventDefault();for(var e,n=this.getAttribute("class"),o=[],r=0;r<8;r++)o.push("sidebarcolor"+(r+1));"sidebarcolor0"===n?(document.documentElement.classList.remove("color-sidebar"),o.map((function(t){document.documentElement.classList.remove(t)}))):(document.documentElement.classList.add("color-sidebar",n),o.splice(o.indexOf(n),1),(e=document.documentElement.classList).remove.apply(e,o))})),a(document.body,"click","div[class^=headercolor]",(function(t){t.preventDefault();for(var e,n=this.getAttribute("class"),o=[],r=0;r<8;r++)o.push("headercolor"+(r+1));"headercolor0"===n?(document.documentElement.classList.remove("color-header"),o.map((function(t){document.documentElement.classList.remove(t)}))):(document.documentElement.classList.add("color-header",n),o.splice(o.indexOf(n),1),(e=document.documentElement.classList).remove.apply(e,o))})),a(document.body,"click",".bsa-search-close-btn",(function(t){t.preventDefault(),document.querySelector(".bsa-search-form-wrapper").classList.remove("open")})),a(document.body,"click",".bsa-search-form-toggler",(function(t){t.preventDefault(),document.querySelector(".bsa-search-form-wrapper").classList.add("open")})),a(document.body,"click",".bsa-sidebar-toggler",(function(t){t.preventDefault(),document.querySelector(".bsa-sidebar").classList.add("open"),document.body.insertAdjacentHTML("beforeEnd",'<div class="bsa-mask"></div>')})),a(document.body,"click",".bsa-mask",(function(t){t.preventDefault(),this.remove(),document.querySelector(".bsa-sidebar").classList.remove("open")}))},e._menuToggle=function(t,e){var n=t.nextElementSibling,o=n.scrollHeight+"px";1===e?(n.style.cssText="display:block;height:0;overflow: hidden;",t.scrollHeight,n.style.cssText="display:block;height:"+o+";overflow: hidden;"):0===e&&(n.style.cssText="display:block;height:"+o+";overflow: hidden;",t.scrollHeight,n.style.cssText="display:block;height:0;overflow: hidden;")},e._advert=function(){console.log("\n   ___  _______ \n  / _ )/ __/ _ |\n / _  |\\ \\/ __ |\n/____/___/_/ |_|\n\n作者:ajiho\n描述:基于bootstrap5.x设计的一个纯静态开源免费的响应式后台管理HTML模板，旨在快速让喜欢用bootstrap开发后台的程序员有个轻松愉悦的起点。\n无论您是用于项目开发、学习、还是教学演示、希望能给个star，这将会是我最大的动力!\nGitee开源地址:https://gitee.com/ajiho/bootstrap-admin\n")},t}(),E=function(){function t(t,e){this._config=e,this._element=t}return t.prototype.run=function(){console.log("Toast-run")},t}();t.Main=L,t.Toast=E}));
//# sourceMappingURL=BSA.js.map
