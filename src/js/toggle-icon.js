import $ from 'jquery'

const NAME = 'ToggleIcon'
const DATA_KEY = 'bsa.toggleicon'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="toggleicon"]'

const Default = {}

class ToggleIcon {
  #config
  #element

  #init() {
    console.log('w')
  }

  constructor(element, config) {
    this.#config = config
    this.#element = element
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

      data = new ToggleIcon(
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
    ToggleIcon.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = ToggleIcon.jQueryInterface
$.fn[NAME].Constructor = ToggleIcon
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return ToggleIcon.jQueryInterface
}

export default ToggleIcon
