import $ from 'jquery'

const NAME = 'IFrame'
const DATA_KEY = 'lts.iframe'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="iframe"]'

const Default = {
  //侧边栏是否跟着tab的激活来进行展开折叠动画
  sidebarToggle: false,
  //点击是否自动关闭侧边栏
  clickCloseSidebar: false,
  //触发元素选择器
  triggerElement: '.lts-navigation a:not(.has-arrow):not([target])',
  //treeview的实例选择器
  treeviewElement: '.lts-navigation',
  //scrollbar的实例选择器
  scrollbarElement: '.lts-sidebar .card-body',
  //pushMenu插件的选择器
  pushMenuElement: '.lts-sidebar-toggler',
  //tab的标题,选择器字符串,内部是从triggerElement提供的选择器下面查找的
  tabTitle: '.content',
}

class IFrame {
  #config
  #element
  // quicktab插件实例
  #quicktab
  // 内部插件treeview实例
  #$treeview
  #link

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  // Private
  #init() {
    const that = this

    this.#$treeview = $(this.#config.treeviewElement)

    //初始化quicktab实例
    this.#quicktab = new Quicktab(this.#element[0], {
      height: '100%',
      //tab的激活事件
      onTabActivated: function (url) {
        // if (that.#config.sidebarToggle === true) {
        //   if (that.#clicked === false) {
        //     that.#link = $(that.#config.triggerElement).filter(function () {
        //       return $(this).attr('href') === url
        //     })
        //     if (that.#link.length > 0) {
        //       //调用expandRecursive方法
        //       that.#$treeview.Treeview('expandRecursive', that.#link)
        //     }
        //   }
        //   that.#clicked = false
        // }
      },

      onTabCloseAll: function () {
        that.#$treeview.Treeview('collapseAll')
      },
      onInit: function () {
        $('.quicktab-dropdown .body').Scrollbar()
      },
    })

    // 初始化点击事件
    this.#setupListeners()
  }

  #setupListeners() {
    const that = this

    //侧边栏，没有子集的链接
    $(document).on('click', that.#config.triggerElement, function (event) {
      event.preventDefault() //阻止默认事件

      const $trigger = $(this)

      // 移除所有的激活类
      that.#$treeview.Treeview('removeAllActiveClass')

      // 给当前的a添加激活类
      that.#$treeview.Treeview('addActiveClass', $trigger)

      if (that.#config.clickCloseSidebar === true) {
        //如果开启自动关闭
        $(that.#config.pushMenuElement).PushMenu('collapse')
      }

      // that.#clicked = true

      //添加tab处理
      that.#quicktab.addTab({
        title: $trigger.find(that.#config.tabTitle).text(),
        url: this.getAttribute('href'),
        close: true,
      })
    })

    //treeview插件的事件监听
    this.#$treeview.on('recursive.collapsed.lts.treeview', function () {
      $(that.#config.scrollbarElement)
        .Scrollbar('getOsInstance')
        .elements()
        .viewport.scrollTo({
          top: that.#link.prop('offsetTop'),
          behavior: 'smooth',
        })
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

        if (typeof data[config] !== 'undefined') {
          value = data[config](...args)
        } else if (data.#quicktab[config] !== 'undefined') {
          value = data.#quicktab[config](...args)
        } else {
          throw new TypeError(`No method named "${config}"`)
        }

        return
      }

      if (data) {
        console.warn('You cannot initialize the table more than once!')
        return
      }

      data = new IFrame(
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
    IFrame.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */
$.fn[NAME] = IFrame.jQueryInterface
$.fn[NAME].Constructor = IFrame
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return IFrame.jQueryInterface
}

export default IFrame
