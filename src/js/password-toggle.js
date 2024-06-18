import $ from 'jquery'

const NAME = 'PasswordToggle'
const DATA_KEY = 'bsa.passwordtoggle'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="passwordtoggle"]'

const Default = {
  //针对的input输入框
  target: null,
  //可见的图标
  visibleIcon: 'bi bi-eye-slash',
  //不可见的图标
  invisibleIcon: 'bi bi-eye',
}

class PasswordToggle {
  #config
  #element

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  #init() {
    if ($(this.#config.target).length <= 0) {
      //如果没有提供target参数直接不处理
      return
    }
    // 初始化点击事件
    this.#setupListeners()
  }

  // 初始化事件
  #setupListeners() {
    const that = this

    that.#element.on('click', function (event) {
      const $input = $(that.#config.target)

      if ($input.attr('type') === 'text') {
        $input.attr('type', 'password')

        $(this).html(`<i class="${that.#config.visibleIcon}"></i>`)
      } else if ($input.attr('type') === 'password') {
        $input.attr('type', 'text')
        $(this).html(`<i class="${that.#config.invisibleIcon}"></i>`)
      }
    })
  }

  // Static
  static jQueryInterface(config, ...args) {
    let value

    this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (typeof config === 'string') {
        if (!data) {
          return
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        value = data[config](...args)

        return
      }

      if (data) {
        console.warn('You cannot initialize the table more than once!')
        return
      }

      data = new PasswordToggle(
        $(this),
        $.extend(
          {},
          Default,
          typeof config === 'object' ? config : $(this).data(),
        ),
      )
      $(this).data(DATA_KEY, data)
      data.#init()
    })

    return typeof value === 'undefined' ? this : value
  }
}

/**
 * Data API
 * ====================================================
 */

$(() => {
  $(SELECTOR_DATA_TOGGLE).each(function () {
    PasswordToggle.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = PasswordToggle.jQueryInterface
$.fn[NAME].Constructor = PasswordToggle
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return PasswordToggle.jQueryInterface
}

export default PasswordToggle
