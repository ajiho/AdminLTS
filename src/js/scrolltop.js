import $ from 'jquery'

const NAME = 'ScrollTop'
const DATA_KEY = 'lts.scrolltop'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="scrolltop"]'

const EVENT_SCROLL_BEFORE = `scroll.before${EVENT_KEY}`
const EVENT_SCROLL_COMPLETE = `scroll.complete${EVENT_KEY}`

// 类名,美化的
const CLASS_NAME_BACKTOTOP = 'lts-back-to-top'

const Default = {
  //距离顶部的距离
  distanceFromTop: 300,
  //滚动速度
  speed: 600,
  //添加到那个容器中
  prependTo: 'body',
  //触发元素
  triggerElement: '.lts-back-to-top',
}

class Scrolltop {
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

    //回到顶部,向下滚动300px渐显回到顶部按钮
    $(window).on('scroll', function () {
      // 先找到这个滚动到顶部的元素
      const $backtotop = $(`.${CLASS_NAME_BACKTOTOP}`)

      if ($backtotop.length === 0) {
        //如果没有
        $(
          `<a class="${CLASS_NAME_BACKTOTOP}"><i class="bi bi-arrow-up-short"></i></a>`,
        ).prependTo($(that.#config.prependTo))
      }
      $(this).scrollTop() > that.#config.distanceFromTop
        ? $backtotop.fadeIn()
        : $backtotop.fadeOut()
    })

    //回到顶部事件监听
    $(document).on('click', that.#config.triggerElement, function () {
      $(that.#element).trigger($.Event(EVENT_SCROLL_BEFORE))

      $('html').animate(
        {
          scrollTop: 0,
        },
        that.#config.speed,
        function () {
          $(that.#element).trigger($.Event(EVENT_SCROLL_COMPLETE))
        },
      )
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

      data = new Scrolltop(
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
    Scrolltop.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 *
 * ====================================================
 */

$.fn[NAME] = Scrolltop.jQueryInterface
$.fn[NAME].Constructor = Scrolltop
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Scrolltop.jQueryInterface
}

export default Scrolltop
