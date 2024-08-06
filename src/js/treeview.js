import $ from 'jquery'

const NAME = 'Treeview'
const DATA_KEY = 'lts.treeview'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="treeview"]'

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

//递归折叠完成
const EVENT_RECURSIVE_COLLAPSED = `recursive.collapsed${EVENT_KEY}`

const SELECTOR_LI = 'li'
const SELECTOR_LINK = 'a'
const SELECTOR_SUBMENU = 'ul'
const CLASS_NAME_EXPANDED = 'open'
const CLASS_NAME_ACTIVE = 'active'

const Default = {
  //动画速度,单位毫秒
  animationSpeed: 150,
  //是否启用手风琴模式
  accordion: true,
}

class Treeview {
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

  // 初始化事件
  #setupListeners() {
    const that = this

    $(this.#element).on(
      'click',
      `${SELECTOR_LINK}:not([target])`,
      function (event) {
        let $link = $(this)
        that.toggle($link, event)
      },
    )
  }

  toggle($link, event) {
    //查找兄弟元素ul
    const $nextUl = $link.siblings(SELECTOR_SUBMENU)
    const $parentLi = $link.parent()

    if (!this.#isAnimating($link)) return

    if ($nextUl.length > 0) {
      //说明它是包含子集的可以点击
      event.preventDefault() //阻止默认事件,防止跳转
      if ($parentLi.hasClass(CLASS_NAME_EXPANDED)) {
        this.collapse($link)
      } else {
        this.expand($link)
      }
    }
  }

  expand($link, callback) {
    this.#accordion($link)

    const that = this
    const $nextUl = $link.siblings(SELECTOR_SUBMENU)
    const $parentLi = $link.parent()

    if (!$parentLi.hasClass(CLASS_NAME_EXPANDED)) {
      $parentLi.addClass(CLASS_NAME_EXPANDED)
      $nextUl
        .css('display', 'none')
        .stop(true, false)
        .slideDown(that.#config.animationSpeed, function () {
          $(this).removeAttr('style')
          $(that.#element).trigger($.Event(EVENT_EXPANDED))
          typeof callback === 'function' && callback()
        })
    }
  }

  //折叠
  collapse($link, callback) {
    const that = this
    const $nextUl = $link.siblings(SELECTOR_SUBMENU)
    const $parentLi = $link.parent()

    if ($parentLi.hasClass(CLASS_NAME_EXPANDED)) {
      $parentLi.removeClass(CLASS_NAME_EXPANDED)
      $nextUl
        .css('display', 'block')
        .stop(true, false)
        .slideUp(that.#config.animationSpeed, function () {
          $(this).removeAttr('style')
          $(that.#element).trigger($.Event(EVENT_COLLAPSED))
          typeof callback === 'function' && callback()
        })
    }
  }

  // 展开全部
  expandAll() {}

  // 折叠全部
  collapseAll() {
    const that = this

    that.removeAllActiveClass()

    $(this.#element)
      .find(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`)
      .children(SELECTOR_LINK)
      .each(function () {
        const $link = $(this)
        that.collapse($link)
      })
  }

  addActiveClass($link) {
    $link.addClass(CLASS_NAME_ACTIVE)
  }

  removeActiveClass($link) {
    $link.removeClass(CLASS_NAME_ACTIVE)
  }

  // 递归折叠某个菜单
  collapseRecursive($link) {
    let collapsible = this.getChildCollapsible($link)

    collapsible.forEach((item) => {
      this.collapse(item)
    })
  }

  // 递归展开某个菜单
  expandRecursive($link) {
    const that = this

    let collapsible = this.getParentCollapsible($link)

    collapsible = collapsible.reverse()

    let collapsibleLen = collapsible.length

    //已展开的数量
    let expandedNum = 0

    //移除所有的激活状态
    this.removeAllActiveClass()

    //添加激活类
    this.addActiveClass($link)

    //折叠子集
    this.collapseRecursive($link)

    if (collapsibleLen > 0) {
      //则是有子集的
      collapsible.forEach((item) => {
        this.expand(item, function () {
          expandedNum++

          if (collapsibleLen === expandedNum) {
            $(that.#element).trigger($.Event(EVENT_RECURSIVE_COLLAPSED))
          }
        })
      })
    } else {
      //顶级
      $(that.#element).trigger($.Event(EVENT_RECURSIVE_COLLAPSED))
    }
  }

  removeAllActiveClass() {
    const that = this
    $(this.#element)
      .find(SELECTOR_LINK)
      .each(function () {
        that.removeActiveClass($(this))
      })
  }

  #isAnimating($link) {
    return (
      !$link.parent().find(SELECTOR_SUBMENU).slice(1).is(':animated') &&
      !$link.parents(SELECTOR_SUBMENU).is(':animated')
    )
  }

  #accordion($link) {
    if (this.#config.accordion) {
      //手风琴

      const that = this

      $link
        .parent()
        .siblings(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`)
        .children(SELECTOR_LINK)
        .each(function () {
          const $link = $(this)
          that.collapse($link)
        })
    }
  }

  getParentCollapsible($link) {
    // 定义内部递归函数，并传递结果数组
    const recursiveHelper = ($link, obj) => {
      let $ul = $link.parent().parent()
      let $canOpen = $ul.siblings($link)

      if (!($canOpen.length > 0)) {
        return obj // 如果没有更多的可展开项，返回当前的obj
      }

      const $parentLi = $canOpen.parent()
      if (!$parentLi.hasClass(CLASS_NAME_EXPANDED)) {
        obj.push($canOpen)
      }

      // 递归调用，传递累积结果
      return recursiveHelper($canOpen, obj)
    }

    // 初始调用，传递一个空数组作为累积结果
    return recursiveHelper($link, [])
  }

  getChildCollapsible($link) {
    const result = []
    $link
      .closest(SELECTOR_SUBMENU)
      .find(`${SELECTOR_LI}.${CLASS_NAME_EXPANDED}`)
      .children(SELECTOR_LINK)
      .each(function () {
        result.push($(this))
      })
    return result
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

      data = new Treeview(
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
    Treeview.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Treeview.jQueryInterface
$.fn[NAME].Constructor = Treeview
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Treeview.jQueryInterface
}

export default Treeview
