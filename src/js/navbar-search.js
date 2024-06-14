import $ from 'jquery'

const NAME = 'NavbarSearch'
const DATA_KEY = 'bsa.navbar-search'
const JQUERY_NO_CONFLICT = $.fn[NAME]

// 搜索事件触发
const EVENT_SEARCH = 'search.bsa.navbar-search'
const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="navbar-search"]'

// 展开时的类名
const CLASS_NAME_OPEN = 'open'

const Default = {
  //关闭时重置
  closeReset: false,
  //触发器
  trigger: '.bsa-search-form-toggler',
}

class NavbarSearch {
  #config
  #element

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  // Public

  #init() {
    console.log('init')
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

      data = new NavbarSearch(
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
    NavbarSearch.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = NavbarSearch.jQueryInterface
$.fn[NAME].Constructor = NavbarSearch
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return NavbarSearch.jQueryInterface
}

export default NavbarSearch
