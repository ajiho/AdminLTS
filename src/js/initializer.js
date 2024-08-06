import $ from 'jquery'

const NAME = 'Initializer'
const DATA_KEY = 'lts.Initializer'
const JQUERY_NO_CONFLICT = $.fn[NAME]

//类名
const ClassName = {
  pe: 'pe-none',
}

const Default = {
  //提示工具允许的属性和标签设置 see:https://getbootstrap.com/docs/5.3/getting-started/javascript/#sanitizer
  sanitizerAllowList: {
    '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
    a: ['target', 'href', 'title', 'rel'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    button: ['onclick'],
  },
  //提示和气泡工具是否点击下一次自动关闭
  nextClickDismiss: true,
}

class Initializer {
  #config
  #element

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  //bootstrap提示组件初始化
  tooltipInit(config = {}, hide = false) {
    $('[data-bs-toggle="tooltip"]').each(function () {
      const instance = bootstrap.Tooltip.getOrCreateInstance(this, config)
      hide && instance.hide()
    })
  }

  //bootstrap气泡组件初始化
  popoverInit(config = {}, hide = false) {
    $('[data-bs-toggle="popover"]').each(function () {
      const instance = bootstrap.Popover.getOrCreateInstance(this, config)
      hide && instance.hide()
    })
  }

  #headerDropdown() {
    $('.lts-header [data-bs-toggle="dropdown"]').on(
      'hidden.bs.dropdown shown.bs.dropdown',
      function (event) {
        const $content = $('.lts-content')
        $('.lts-header .dropdown-menu.show').length > 0
          ? $content.addClass(ClassName.pe)
          : $content.removeClass(ClassName.pe)
      },
    )
  }

  #checkProtocol() {
    // 检查协议
    if (window.location.protocol === 'file:') {
      const relativePath =
        window.location.pathname + window.location.search + window.location.hash
      alert(
        `您正在通过file://协议打开${relativePath}页面。为了确保一切功能正常，请通过本地服务器运行此页面`,
      )
      document.write('')
      document.close() // 确保文档流关闭
    }
  }

  // Private
  #init() {
    this.#checkProtocol()

    this.#sanitizerSetUp()

    this.tooltipInit()

    this.popoverInit()

    this.#headerDropdown()

    this.#optimize()

    this.#nextClickDismiss()
  }

  #optimize() {
    //优化:禁止所有的input记忆输入内容
    $('input').attr('AutoComplete', 'off')

    // 优化:在提示框和气泡框显示出来之前先把别的已经存在的都隐藏掉
    $(document).on('show.bs.popover', '[data-bs-toggle="popover"]', () => {
      this.popoverInit({}, true)
    })

    $(document).on('show.bs.tooltip', '[data-bs-toggle="tooltip"]', () => {
      this.tooltipInit({}, true)
    })

    //优化:无效表单禁止提交(如果form没有action属性或者action属性值等于#,不让提交)
    $(document).on('submit', 'form', function (event) {
      const action = $(this).attr('action')
      if (action === undefined || action === '#') {
        event.preventDefault()
      }
    })

    //优化:对于含有#的a链接阻止默认事件
    $(document).on('click', 'a[href="#"]', function (event) {
      event.preventDefault()
    })

    //优化表单验证插件，在请求完毕后按钮重置，自动再重置表单
    $(document).on('ajaxComplete', function (event, jqXHR, ajaxOptions) {
      $('form').each(function () {
        const formValidation = $(this).data('formValidation')

        if (formValidation !== undefined) {
          //再次判断表单验证插件有实例

          formValidation.resetForm()
        }
      })
    })
  }

  //优化:处理提示工具和气泡工具的下一次关闭，弥补官方的不足，官方的下一次关闭只能是a元素，参阅:https://getbootstrap.com/docs/5.3/components/popovers/#dismiss-on-next-click
  #nextClickDismiss() {
    const that = this

    if (that.#config.nextClickDismiss === true) {
      $(document).on('click', function (event) {
        if (
          !$(event.target).closest(
            '[data-bs-toggle="popover"],[data-bs-toggle="tooltip"]',
          ).length
        ) {
          that.tooltipInit({}, true)
          that.popoverInit({}, true)
        }
      })
    }
  }

  // 消毒剂处理
  #sanitizerSetUp() {
    $.extend(bootstrap.Tooltip.Default.allowList, Default.sanitizerAllowList)
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
        console.warn('You cannot Initializer the table more than once!')
        return
      }

      data = new Initializer(
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
  Initializer.jQueryInterface.call($('body'))
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Initializer.jQueryInterface
$.fn[NAME].Constructor = Initializer
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Initializer.jQueryInterface
}

export default Initializer
