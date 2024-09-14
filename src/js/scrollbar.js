import $ from "jquery"

const {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} = OverlayScrollbarsGlobal

const NAME = "Scrollbar"
const DATA_KEY = "lts.scrollbar"
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="scrollbar"]'

const Default = {
  param1: {},
  param2: {
    overflow: {
      x: "hidden",
      y: "scroll",
    },
    scrollbars: {
      //never scroll leave move
      autoHide: "leave",
      //是否可以点击轨道滚动
      clickScroll: true,
      //隐藏滚动条的时间
      autoHideDelay: 1300,
    },
  },
  param3: {},
}

class Scrollbar {
  #config
  #element
  #osInstance

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  // Private
  #init() {
    //插件注册
    OverlayScrollbars.plugin([
      SizeObserverPlugin,
      ClickScrollPlugin,
      ScrollbarsHidingPlugin,
    ])

    //初始化实例
    this.#osInstance = OverlayScrollbars(
      $.isEmptyObject(this.#config.param1)
        ? this.#element[0]
        : this.#config.param1,
      this.#config.param2,
      this.#config.param3,
    )
  }

  // 获取滚动条插件的实例
  getOsInstance() {
    return this.#osInstance
  }

  // Static
  static jQueryInterface(config, ...args) {
    let value

    this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (typeof config === "string") {
        if (!data) {
          return
        }

        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`)
        }

        value = data[config](...args)

        return
      }

      if (data) {
        console.warn("You cannot initialize the table more than once!")
        return
      }

      data = new Scrollbar(
        $(this),
        $.extend(
          {},
          Default,
          typeof config === "object" ? config : $(this).data(),
        ),
      )
      $(this).data(DATA_KEY, data)
      data.#init()
    })

    return typeof value === "undefined" ? this : value
  }
}

/**
 * Data API
 * ====================================================
 */

$(() => {
  $(SELECTOR_DATA_TOGGLE).each(function () {
    Scrollbar.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Scrollbar.jQueryInterface
$.fn[NAME].Constructor = Scrollbar
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Scrollbar.jQueryInterface
}

export default Scrollbar
