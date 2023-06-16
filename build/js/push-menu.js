import $ from 'jquery'
import Helper from './util/helper'

const NAME = 'PushMenu'
const DATA_KEY = 'bsa.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]

//折叠开始
const EVENT_COLLAPSE = `collapse${EVENT_KEY}`
//折叠完毕
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

//展开开始
const EVENT_EXPAND = `expand${EVENT_KEY}`

//展开完毕
const EVENT_EXPANDED = `expanded${EVENT_KEY}`

const SELECTOR_TOGGLE_BUTTON = '[data-bsa-toggle="pushmenu"]'

//侧边栏选择器
const SELECTOR_SIDEBAR = '.bsa-sidebar'
const SELECTOR_MASK = '.bsa-mask'
//折叠类名
const CLASS_NAME_COLLAPSED = 'open'


const Default = {
  //过渡的动画时间
  animationSpeed: 300
}


class PushMenu {
  constructor(element, options) {
    this._element = element
    this._options = options
    this._addTransition();
  }

  // Public

  expand() {

    let w = $(window).width();
    if (w < 992) {
      //事件
      $(this._element).trigger($.Event(EVENT_EXPAND))

      // 展开
      $('.bsa-sidebar').addClass(CLASS_NAME_COLLAPSED);
      $(SELECTOR_SIDEBAR).data('isOpen', true);
      //添加遮罩层
      this._addOverlay();
    }

  }

  collapse() {

    let w = $(window).width();
    if (w < 992) {
      $(this._element).trigger($.Event(EVENT_COLLAPSE))
      $(SELECTOR_SIDEBAR).removeClass(CLASS_NAME_COLLAPSED);
      $(SELECTOR_SIDEBAR).data('isOpen', false);
      //同时移除遮罩层
      $(SELECTOR_MASK).remove();
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
  _addTransition() {
    $(SELECTOR_SIDEBAR).css({'transition': `${this._options.animationSpeed}ms transform`});
  }

  _addOverlay() {

    if ($(SELECTOR_MASK).length === 0) {
      $('<div class="bsa-mask"></div>').prependTo('body');
    }
  }

  _init() {

    let _this = this;

    //遮罩层关闭事件
    $(document).on('click', SELECTOR_MASK, function (e) {
      e.preventDefault();
      _this.collapse();
    });


    //监听过渡事件
    $(document).on('transitionend', SELECTOR_SIDEBAR, function (e) {
      if (e.target === e.currentTarget) {

        const expandedEvent = $.Event(EVENT_EXPANDED);
        const collapsedEvent = $.Event(EVENT_COLLAPSED);

        //判断是展开还是折叠
        if ($(e.target).data('isOpen')) {

          $(_this._element).trigger(expandedEvent)

        } else {
          $(_this._element).trigger(collapsedEvent)
        }
      }
    });

    $(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
      event.preventDefault();

      _this.toggle();

    })


  }


  // Static
  static _jQueryInterface(config) {
    return this.each(function () {


      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

      if (!data) {
        data = new PushMenu($(this), _config)
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
    PushMenu._jQueryInterface.call($(SELECTOR_TOGGLE_BUTTON))
  }
})


/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = PushMenu._jQueryInterface
$.fn[NAME].Constructor = PushMenu
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return PushMenu._jQueryInterface
}

export default PushMenu
