/* global bootstrap */

import $ from 'jquery'
// import _template from 'lodash-es/template'

const NAME = 'Toasts'
const DATA_KEY = 'bsa.toasts'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const EVENT_INIT = `init${EVENT_KEY}`
// const EVENT_CREATED = `created${EVENT_KEY}`
// const EVENT_REMOVED = `removed${EVENT_KEY}`


const POSITION_TOP_RIGHT = 'topRight'


const Default = {
    //正文内容。也可以填充html标签。例子：Hello <b>World</b>
    body: '',
    //将过渡应用到吐司
    animation: true,
    //自动隐藏吐司
    autohide: true,
    //是否显示关闭按钮
    btnClose: true,
    //将关闭按钮设置为白色变体
    btnCloseWhite: false,
    //要添加到类“.toast”中的类属性
    className: '',
    //延迟隐藏吐司（毫秒）
    delay: 5000,
    //toast 之间的间隙 (px)
    gap: 16,
    //角边距。也可以填充一个css变量。例子：var(--toast-margin)
    margin: '1rem',
    //toast 的角落位置。可用值：top-right, top-left, bottom-right, bottom-left
    position: POSITION_TOP_RIGHT
}


class Toasts {
    constructor(element, config) {
        this._config = config

        //bootstrap官方的实例
        this._bootstrapToast = null

        //调用容器
        this._prepareContainer();
        //准备
        $('body').trigger($.Event(EVENT_INIT))
    }

    // Public

    show() {
        this._bootstrapToast.show();
    }

    hide() {
        this._bootstrapToast.hide();
    }


    // Private
    _prepareContainer() {

        let template = `
              <div style="z-index: 1081" class="toast position-fixed bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <img src="dist/img/user.png" style="height: 25px" class="rounded me-2" alt="...">
                  <i class="bi bi-bell"></i>  
                  <strong class="me-auto">Bootstrap</strong>
                  <small>11 mins ago</small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  Hello, world! This is a toast message.
                </div>
              </div>
        `
        let $element = $(template);


        $('body').append($element)

        this._bootstrapToast = new bootstrap.Toast($element[0], {
            animation: this._config.animation,
            autohide: this._config.autohide,
            delay: this._config.delay
        });

//         let html = `
//                 <div class="big">
//                     <p>1</p>
//                     <p>2</p>
//                     <% if ( options.autohide === true ) { %>
//                     <p>3</p>
//                     <% } %>
//                 </div>
// `
//         let ret = _template(html)({
//             options: this._config
//         })
//
//         console.log(ret)


    }

    // Static
    static _jQueryInterface(option, config) {
        return this.each(function () {
            const _options = $.extend({}, Default, config)
            const toast = new Toasts($(this), _options)

            if (option === 'show') {
                toast[option]()
            }
        })
    }
}

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Toasts._jQueryInterface
$.fn[NAME].Constructor = Toasts
$.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Toasts._jQueryInterface
}

export default Toasts
