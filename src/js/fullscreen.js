import $ from "jquery"

const NAME = "Fullscreen"
const DATA_KEY = "lts.fullscreen"
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="fullscreen"]'

// 默认选项
const Default = {
  //全屏图标
  fullIcon: "bi bi-arrows-fullscreen",
  //退出全屏图标
  exitIcon: "bi bi-fullscreen-exit",
}

class Fullscreen {
  #config
  #element

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  // Private
  #init() {
    this.#setupListeners()
  }

  #setupListeners() {
    const that = this

    // 这里是全局监听,避免是非通过点击退出全屏时图标没有恢复的问题
    $(document).on("fullscreenchange", function () {
      that.#iconToggle()
    })

    that.#element.on("click", function () {
      that.toggle()
    })
  }

  toggle() {
    if (document.fullscreenElement) {
      this.exitFullscreen()
    } else {
      this.fullscreen()
    }
  }

  #iconToggle() {
    if (document.fullscreenElement) {
      //全屏图标
      this.#element
        .find("i")
        .removeClass(this.#config.fullIcon)
        .addClass(this.#config.exitIcon)
    } else {
      this.#element
        .find("i")
        .removeClass(this.#config.exitIcon)
        .addClass(this.#config.fullIcon)
    }
  }

  // 全屏
  fullscreen() {
    document.documentElement.requestFullscreen()
  }

  // 退出全屏
  exitFullscreen() {
    document.exitFullscreen()
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

      data = new Fullscreen(
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
    Fullscreen.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Fullscreen.jQueryInterface
$.fn[NAME].Constructor = Fullscreen
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Fullscreen.jQueryInterface
}

export default Fullscreen
