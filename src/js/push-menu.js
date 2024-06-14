import $ from 'jquery'

const NAME = 'PushMenu'
const DATA_KEY = 'bsa.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Event = {
  //折叠开始
  COLLAPSE: `collapse${EVENT_KEY}`,
  //折叠完毕
  COLLAPSED: `collapsed${EVENT_KEY}`,
  //展开开始
  EXPAND: `expand${EVENT_KEY}`,
  //展开完毕
  EXPANDED: `expanded${EVENT_KEY}`,
}

const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="pushmenu"]'

//侧边栏选择器
const SELECTOR_SIDEBAR = '.bsa-sidebar'
const SELECTOR_MASK = '.bsa-mask'
//折叠类名
const CLASS_NAME_COLLAPSED = 'open'

const Default = {
  //过渡的动画时间
  animationSpeed: 300,
}

class PushMenu {
  #element
  #config

  constructor(element, config) {
    this.#element = element
    this.#config = config
    this.#addTransition()
  }

  // Public

  expand() {
    let w = $(window).width()
    if (w < 992) {
      //事件
      $(this.#element).trigger($.Event(Event.EXPAND))

      // 展开
      $('.bsa-sidebar').addClass(CLASS_NAME_COLLAPSED)
      $(SELECTOR_SIDEBAR).data('isOpen', true)
      //添加遮罩层
      this.#addOverlay()
    }
  }

  collapse() {
    let w = $(window).width()
    if (w < 992) {
      $(this.#element).trigger($.Event(Event.COLLAPSE))
      $(SELECTOR_SIDEBAR).removeClass(CLASS_NAME_COLLAPSED)
      $(SELECTOR_SIDEBAR).data('isOpen', false)
      //同时移除遮罩层
      $(SELECTOR_MASK).remove()
    }
  }

  toggle() {
    if ($(SELECTOR_SIDEBAR).hasClass(CLASS_NAME_COLLAPSED)) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  // Private
  #addTransition() {
    $(SELECTOR_SIDEBAR).css({
      transition: `${this.#config.animationSpeed}ms transform`,
    })
  }

  #addOverlay() {
    if ($(SELECTOR_MASK).length === 0) {
      $('<div class="bsa-mask"></div>').prependTo('body')
    }
  }

  #init() {
    this.#setupListeners()
  }

  #setupListeners() {
    let that = this

    //遮罩层关闭事件
    $(document).on('click', SELECTOR_MASK, function (e) {
      e.preventDefault()
      that.collapse()
    })

    //监听过渡事件
    $(document).on('transitionend', SELECTOR_SIDEBAR, function (e) {
      if (e.target === e.currentTarget) {
        //判断是展开还是折叠
        if ($(e.target).data('isOpen')) {
          $(that.#element).trigger($.Event(Event.EXPANDED))
        } else {
          $(that.#element).trigger($.Event(Event.COLLAPSED))
        }
      }
    })

    $(document).on('click', SELECTOR_DATA_TOGGLE, (event) => {
      event.preventDefault()
      that.toggle()
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

      data = new PushMenu(
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
    PushMenu.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = PushMenu.jQueryInterface
$.fn[NAME].Constructor = PushMenu
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return PushMenu.jQueryInterface
}

export default PushMenu
