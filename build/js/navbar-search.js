import $ from 'jquery'
import Helper from './util/helper'

const NAME = 'NavbarSearch'
const DATA_KEY = 'bsa.navbar-search'
const JQUERY_NO_CONFLICT = $.fn[NAME]


// 搜索事件触发
const EVENT_SEARCH = 'search.bsa.navbar-search'
const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="navbar-search"]'
const SELECTOR_SEARCH_TRIGGER = '.bsa-search-form-toggler'


// 展开时的类名
const CLASS_NAME_OPEN = 'open'


const Default = {
    //关闭时重置
    closeReset: false,
    //触发器
    trigger: SELECTOR_SEARCH_TRIGGER,
}


class NavbarSearch {
    constructor(_element, _options) {
        this._element = _element
        this._config = _options

        this._$input = this._element.find('input.bsa-input-search');


    }

    // Public

    open() {
        this._element.addClass(CLASS_NAME_OPEN)
    }

    close() {
        this._element.removeClass(CLASS_NAME_OPEN)
        if (this._config.closeReset === true) {
            this._$input.val('');
        }

    }

    toggle() {
        if (this._element.hasClass(CLASS_NAME_OPEN)) {
            this.close()
        } else {
            this.open()
        }
    }



    _triggerSearch(inputValue) {
        const searchEvent = $.Event(EVENT_SEARCH);
        $(this._element).trigger(searchEvent, [inputValue,$(this._element).data()])
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
        })

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
            let data = $(this).data(DATA_KEY)
            const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())


            if (!data) {
                data = new NavbarSearch($(this), _config)
                $(this).data(DATA_KEY, data)
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
    if (Helper.isIndex()) {
        NavbarSearch._jQueryInterface.call($(SELECTOR_DATA_TOGGLE))
    }
})


/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = NavbarSearch._jQueryInterface
$.fn[NAME].Constructor = NavbarSearch
$.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return NavbarSearch._jQueryInterface
}

export default NavbarSearch
