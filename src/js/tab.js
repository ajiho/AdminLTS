import $ from "jquery"

const NAME = "Tab"
const DATA_KEY = "lts.tab"
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="tab"]'

const EVENT_ACTIVE = `active${EVENT_KEY}`

const Default = {
  activeClass: "active",
  //配置
  config: {},
}

class Tab {
  #config
  #element

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  // Private
  #init() {
    // 初始化点击事件
    this.#setupListeners()
  }

  #removeActiveClass() {
    $(SELECTOR_DATA_TOGGLE).removeClass(this.#config.activeClass)
  }

  // 初始化事件
  #setupListeners() {
    const that = this

    that.#element.on("click", function (event) {
      //已经激活的就不要再激活了
      if (!$(this).hasClass(that.#config.activeClass)) {
        //移除所有的激活类
        that.#removeActiveClass()
        //然后给当前按钮添加激活类
        $(this).addClass(that.#config.activeClass)
        //触发激活事件
        $(that.#element).trigger($.Event(EVENT_ACTIVE), [that.#config.config])
      }
    })
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

      data = new Tab(
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
    Tab.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Tab.jQueryInterface
$.fn[NAME].Constructor = Tab
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Tab.jQueryInterface
}

export default Tab
