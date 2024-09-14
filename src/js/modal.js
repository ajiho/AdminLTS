import $ from "jquery"
import Utils from "./util"

const {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} = OverlayScrollbarsGlobal

// 全局api的名称
const NAME = "modal"

const DATA_KEY_OK_NAME = "ok"
const DATA_KEY_CANCEL_NAME = "cancel"

// 默认参数
const Default = {
  // 惰性打开
  lazyOpen: false,
  //打开的窗口对象
  window: "top",
  //取消按钮的文本
  btnCancelText: "取消",
  //取消按钮的class
  btnCancelClass: "btn-light",
  //ok按钮的文本
  btnOKText: "确定",
  //ok按钮的class
  btnOKClass: "btn-primary",
  //确定按钮回调
  ok: function () {
    return false
  },
  //开启取消按钮
  btnCancel: true,
  //取消按钮回调
  cancel: function () {
    return true
  },
  //标题
  title: "信息",
  //高度 当为iframe时 高度默认自动计算为屏幕高度最适宜的高度,您可以设置该选项强制覆盖默认行为
  height: undefined,
  //内容
  body: "",
  //可以设置底部按钮对齐方式 可选值: start  center  end
  btnAlign: "end",
  //可以设置底部按钮的尺寸 可选值: sm lg
  btnSize: "",
  //单个按钮的基本模板
  btntpl: {
    text: "按钮",
    class: "btn-light",
    action: null,
  },
  //自定义按钮,默认是null,默认的确定和取消按钮如果不满足需求可以自定义,设置为: 空数组[]模态框的footer部分将会被隐藏
  buttons: null,
  // ".modal"所在div修饰类  比如:fade
  modalClass: "fade",
  //垂直居中  undefined/boolean  true:启用垂直居中 false:不启用  如果是IFrame模式，则默认自动垂直居中，您可以设置该选项强制覆盖默认行为
  centered: undefined,
  //可滚动,undefined/boolean  该配置只在在非iframe模式下有效
  scrollable: undefined,
  //尺寸 undefined/String 可选值:sm lg xl ,为了好的用户体验，如果是iframe模式，尺寸默认会被设置为lg，您可以设置该选项强制覆盖默认行为
  size: undefined,
  //全屏模式 可选值:sm md lg xl xxl always
  fullscreen: undefined,
  // bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options
  modalOptions: {
    backdrop: true,
    keyboard: true,
    focus: true,
  },
  //iframe的url地址,如果设置了该选项，则表示该modal为一个iframe弹层
  url: undefined,
  //右边的关闭按钮 是否启用
  btnClose: true,
  //右边的全屏按钮  undefined/boolean true:启用全屏按钮 false:不启用全屏按钮  如果是iframe模式，则会默认会启用该选项，如果被该选项被设置则打破默认规则
  btnFullscreen: undefined,
  //右边的刷新按钮是否显示,该选项只在iframe时设置有效
  btnRefresh: true,
  //是否启用加载动画效果,该选项只有当是iframe弹出层时有效,false或者对象
  loading: false,
  onShow: null,
  onShown: null,
  onHide: null,
  onHidden: null,
  onHidePrevented: null,
  //子页面通过postMessage这个api向父级页面传递的消息时产生的回调
  onMessage: null,
}

//类名
const ClassName = {
  //自定义的类用来对一些样式进行设置
  MODAL: "lts-modal",
  //居中类
  MODAL_DIALOG_CENTERED: "modal-dialog-centered",
  //全屏类
  MODAL_FULLSCREEN: "modal-fullscreen",
  //滚动类
  MODAL_DIALOG_SCROLLABLE: "modal-dialog-scrollable",
  //模态框包裹容器(用于美化滚动条的包裹)
  MODAL_WRAPPER: "modal-wrapper",

  //退出全屏
  BTN_FULLSCREEN_EXIT: "btn-fullscreen-exit",
  //全屏按钮类
  BTN_FULLSCREEN: "btn-fullscreen",
}

// 简短选项映射，为了使用的时候更方便
const Map = {
  size: {
    sm: "modal-sm",
    lg: "modal-lg",
    xl: "modal-xl",
  },

  fullscreen: {
    always: "modal-fullscreen",
    sm: "modal-fullscreen-sm-down",
    md: "modal-fullscreen-md-down",
    lg: "modal-fullscreen-lg-down",
    xl: "modal-fullscreen-xl-down",
    xxl: "modal-fullscreen-xxl-down",
  },

  btnAlign: {
    start: "justify-content-start",
    center: "justify-content-center",
    end: "justify-content-end",
  },

  btnSize: {
    sm: "btn-sm",
    lg: "btn-lg",
  },
}

// html的结构定义
const HTML = {
  IFrame: `<iframe class="d-block w-100 h-100"></iframe>`,

  modal: [
    //开始标记
    `<div class="modal ${ClassName.MODAL} %s" id="%s"   tabindex="-1" aria-labelledby="%sLabel" aria-hidden="true">`,
    `</div>`,
  ],

  //包裹容器
  modalWrapper: [`<div class="${ClassName.MODAL_WRAPPER}">`, `</div>`],

  // dialog部分
  modalDialog: [
    // 垂直居中 可滚动  大小尺寸 全屏设置
    `<div class="modal-dialog %s %s %s %s">`,
    `</div>`,
  ],

  modalContent: [
    `<div class="modal-content overflow-hidden border-0 shadow-sm">`,
    `</div>`,
  ],

  modalHeader: [`<div class="modal-header">`, `</div>`],

  modalTitle: `<h1 class="modal-title fs-5" id="%sLabel">%s</h1>`,

  btnClose: `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`,
  btnRefresh: `<button type="button" class="btn-refresh"></button>`,
  btnFullscreen: `<button type="button" class="btn-fullscreen-trigger ${ClassName.BTN_FULLSCREEN}"></button>`,

  //这个是如果url不为空(也就是iframe模式弹出层的时候)头部的操作按钮
  headerRightWrapper: [
    `<div class="d-flex align-items-center gap-3 ms-auto">`,
    `</div>`,
  ],
  //身体部分,高度可以等到添加到body后动态计算并设置它，因为如果buttons参数设置为[] 那么表示底部不启用,此时就需要动态计算高度比较合理
  modalBody: [`<div class="modal-body %s">`, `</div>`],

  modalFooter: [
    // 参数1:用来设置对齐方式
    `<div class="modal-footer %s">`,
    `</div>`,
  ],
  //参数1：用来设置按钮的主题色，参数2：用来设置尺寸
  modalFooterBtn: `<button type="button" data-key="%s" class="btn %s %s">%s</button>`,
}

//进行累计
let i = 0

class Modal {
  // jquery对象
  #$
  #bootstrap
  //配置
  #config
  //id
  #id
  #element

  // 实例对象
  #modalInstance
  //模态框的头部
  #modalDialog
  //模态框的头部
  #modalHeader
  //模态框的内容部分
  #modalBodyEl
  //模态框的底部
  #modalFooter
  // 模态框的包裹
  #modalWrapper
  //iframe元素
  #iframe

  //构造函数
  constructor(config) {
    this.#config = config
    i++
    //唯一id
    this.#id = `modal-${i}`

    //更改触发的jquery和bootstrap对象

    this.#$ = window[this.#config.window].$
    this.#bootstrap = window[this.#config.window].bootstrap

    //创建容器
    this.#createModalElement()

    this.#showLoading()

    // 滚动条美化
    this.#beautifyScrollbar()

    // 创建实例
    this.#modalInstance = new this.#bootstrap.Modal(
      this.#element,
      this.#config.modalOptions,
    )

    //绑定事件
    this.#bindEvents()

    if (this.#config.lazyOpen === false) {
      //直接弹出
      this.show()
    }
  }

  #showLoading() {
    //根据选项决定是否要加入loading层
    if (this.#iframe.length > 0 && this.#config.loading !== false) {
      $.loading({
        window: this.#config.window,
        container: this.#modalBodyEl,
        class: "bg-body-tertiary",
        spinner: "grow",
      }).show()
    }
  }

  #beautifyScrollbar() {
    const that = this

    //滚动条美化
    this.#modalWrapper.Scrollbar()

    //处理美化遮罩层导致的关闭问题
    this.#modalWrapper.on("click", function (event) {
      event.stopPropagation() //阻止冒泡行为

      const res = $(event.target).closest(that.#modalDialog)

      if (!res.length > 0) {
        //下面的代码摘自bootstrap的modal官方的源码

        if (that.#config.modalOptions.backdrop === "static") {
          that.#modalInstance._triggerBackdropTransition()
          return
        }

        if (that.#config.modalOptions.backdrop) {
          that.hide()
        }
      }
    })

    //处理modal被启用可滚动的情况就美化滚动条
    if (this.#iframe.length === 0 && this.#config.scrollable === true) {
      this.#modalBodyEl.Scrollbar()
    }
  }

  #createModalElement() {
    let html = []

    html.push(
      Utils.sprintf(HTML.modal[0], this.#config.modalClass, this.#id, this.#id),
    )

    html.push(HTML.modalWrapper[0])

    //垂直居中,如果是iframe模式那么默认给它开启
    let centered = ""
    if (this.#config.url !== undefined && this.#config.centered === undefined) {
      centered = ClassName.MODAL_DIALOG_CENTERED
    } else if (this.#config.centered === true) {
      centered = ClassName.MODAL_DIALOG_CENTERED
    }

    let scrollable = ""
    //body可滚动，如果iframe模式则默认不给它使用该功能
    if (this.#config.scrollable === true && this.#config.url === undefined) {
      scrollable = ClassName.MODAL_DIALOG_SCROLLABLE
    }

    let size = ""
    if (this.#config.url !== undefined && this.#config.size === undefined) {
      size = Map.size["lg"]
    } else {
      size = Map.size[this.#config.size] || ""
    }

    let fullscreen = Map.fullscreen[this.#config.fullscreen] || ""
    html.push(
      Utils.sprintf(
        HTML.modalDialog[0],
        centered,
        scrollable,
        size,
        fullscreen,
      ),
    )

    //装填modalContent
    html.push(HTML.modalContent[0])

    //装填modal-header
    html.push(HTML.modalHeader[0])
    //标题准备
    html.push(
      Utils.sprintf(
        HTML.modalTitle,
        this.#id,
        Utils.htmlspecialchars(this.#config.title),
      ),
    )
    //右边的操作按钮
    html.push(HTML.headerRightWrapper[0])
    //刷新按钮，要判断是否为url模式,不是的话，就加入刷新按钮
    if (this.#config.url !== undefined && this.#config.btnRefresh === true) {
      html.push(HTML.btnRefresh)
    }

    //全屏按钮,如果是iframe则给它开启
    if (
      this.#config.url !== undefined &&
      this.#config.btnFullscreen === undefined
    ) {
      html.push(HTML.btnFullscreen)
    } else if (this.#config.btnFullscreen === true) {
      html.push(HTML.btnFullscreen)
    }

    //关闭按钮
    if (this.#config.btnClose === true) {
      html.push(HTML.btnClose)
    }
    html.push(HTML.headerRightWrapper[1])
    html.push(HTML.modalHeader[1])

    html.push(
      Utils.sprintf(
        HTML.modalBody[0],
        this.#config.url !== undefined ? "p-0 overflow-hidden" : "",
      ),
    )

    //装填modal-body部分
    if (this.#config.url !== undefined) {
      //插入iframe
      html.push(HTML.IFrame)
    } else {
      html.push(this.#config.body)
    }
    html.push(HTML.modalBody[1])

    let btnAlign = Map.btnAlign[this.#config.btnAlign] || ""
    let btnSize = Map.btnSize[this.#config.btnSize] || ""

    //装填modal-footer部分
    if (
      Array.isArray(this.#config.buttons) &&
      this.#config.buttons.length !== 0
    ) {
      html.push(Utils.sprintf(HTML.modalFooter[0], btnAlign))
      this.#config.buttons.forEach((item, index) => {
        item = Object.assign(this.#config.btntpl, item)

        html.push(
          Utils.sprintf(
            HTML.modalFooterBtn,
            index,
            item.class,
            btnSize,
            item.text,
          ),
        )
      })
      html.push(HTML.modalFooter[1])
    } else if (this.#config.buttons === null) {
      html.push(Utils.sprintf(HTML.modalFooter[0], btnAlign))

      html.push(
        Utils.sprintf(
          HTML.modalFooterBtn,
          DATA_KEY_OK_NAME,
          this.#config.btnOKClass,
          btnSize,
          this.#config.btnOKText,
        ),
      )

      if (this.#config.btnCancel === true) {
        html.push(
          Utils.sprintf(
            HTML.modalFooterBtn,
            DATA_KEY_CANCEL_NAME,
            this.#config.btnCancelClass,
            btnSize,
            this.#config.btnCancelText,
          ),
        )
      }
      html.push(HTML.modalFooter[1])
    }

    html.push(HTML.modalContent[1])
    html.push(HTML.modalDialog[1])
    html.push(HTML.modalWrapper[1])
    html.push(HTML.modal[1])

    //转回字符串
    html = html.join("")

    //加入到body中放着
    this.#$(html).prependTo("body")

    //查找元素方便后续的使用,避免重复的查找
    this.#element = this.#$(`#${this.#id}`)

    this.#modalDialog = this.#element.find(".modal-dialog")
    this.#modalBodyEl = this.#element.find(".modal-body")
    this.#modalHeader = this.#element.find(".modal-header")
    this.#modalFooter = this.#element.find(".modal-footer")
    this.#iframe = this.#modalBodyEl.find("iframe")
    this.#modalWrapper = this.#element.find(`.${ClassName.MODAL_WRAPPER}`)

    //动态计算高度
    this.#bodyDynamicHeight()
  }

  #bodyDynamicHeight() {
    //设置body高度
    if (this.#iframe.length > 0 && this.#config.height === undefined) {
      //是iframe则动态设置高度

      //先动态显示出来
      this.#element[0].style.display = "block"
      //拿到高度
      let headerHeader =
        this.#modalHeader.length > 0
          ? this.#modalHeader[0].getBoundingClientRect().height
          : 0
      let footerHeader =
        this.#modalFooter.length > 0
          ? this.#modalFooter[0].getBoundingClientRect().height
          : 0
      //立马隐藏
      this.#element[0].style.display = "none"

      //动态设置高度
      this.#modalBodyEl[0].style.height = `calc(100vh - 9rem - ${headerHeader + footerHeader}px)`
    } else {
      //设置选项提供的高度
      this.#modalBodyEl[0].style.height = this.#config.height
    }
  }

  // 绑定事件
  #bindEvents() {
    this.#bindModalEvents()

    this.#bindIFrameEvents()

    this.#bindRefreshBtnEvents()

    this.#bindFullscreenEvents()

    this.#bandFooterBtnEvent()

    this.#bindMessageEvent()
  }

  // 全屏按钮事件
  #bindFullscreenEvents() {
    const that = this

    this.#modalHeader.on("click", ".btn-fullscreen-trigger", function () {
      if (!that.#modalDialog.hasClass(ClassName.MODAL_FULLSCREEN)) {
        that.#modalDialog.addClass(ClassName.MODAL_FULLSCREEN)

        $(this)
          .removeClass(ClassName.BTN_FULLSCREEN)
          .addClass(ClassName.BTN_FULLSCREEN_EXIT)
      } else {
        that.#modalDialog.removeClass(ClassName.MODAL_FULLSCREEN)

        $(this)
          .removeClass(ClassName.BTN_FULLSCREEN_EXIT)
          .addClass(ClassName.BTN_FULLSCREEN)
      }
    })
  }

  #bindRefreshBtnEvents() {
    const that = this

    //刷新按钮
    this.#modalHeader.on("click", ".btn-refresh", function () {
      that.#showLoading()

      //判断是否是跨域的iframe,如果是跨域的就直接移除重新添加
      if (!that.#isCrossOrigin(that.#iframe[0])) {
        that.#iframe[0].contentWindow.location.reload()
      } else {
        that.#iframe.attr(
          "src",
          Utils.addSearchParams(that.#iframe.attr("src"), {
            ___t: Math.random(),
          }),
        )
      }
    })
  }

  #bindMessageEvent() {
    window[this.#config.window].addEventListener(
      "message",
      (event) => {
        if (event.source === this.#iframe[0].contentWindow) {
          //判断是否来自子页面的
          //调用选项
          typeof this.#config.onMessage === "function" &&
            this.#config.onMessage.call(
              this,
              event.data,
              event.source,
              event.origin,
            )
        }
      },
      false,
    )
  }

  // 模态框的事件处理
  #bindModalEvents() {
    let that = this

    this.#element[0].addEventListener("hide.bs.modal", function (event) {
      typeof that.#config.onHide === "function" &&
        that.#config.onHide.call(that, event)
    })

    //监听
    this.#element[0].addEventListener("hidden.bs.modal", function (event) {
      typeof that.#config.onHidden === "function" &&
        that.#config.onHidden.call(that, event)
      that.#destory()
    })

    //监听
    this.#element[0].addEventListener(
      "hidePrevented.bs.modal",
      function (event) {
        typeof that.#config.onHidePrevented === "function" &&
          that.#config.onHidePrevented.call(that, event)
      },
    )

    this.#element[0].addEventListener("show.bs.modal", function (event) {
      typeof that.#config.onShow === "function" &&
        that.#config.onShow.call(that, event)
    })

    this.#element[0].addEventListener("shown.bs.modal", function (event) {
      //设置src
      that.#iframe.attr("src", that.#config.url)

      typeof that.#config.onShown === "function" &&
        that.#config.onShown.call(that, event)
    })
  }

  #isCrossOrigin(iframe) {
    try {
      // 尝试访问 iframe 的内容
      const doc = iframe.contentDocument || iframe.contentWindow.document
      // 如果没有抛出异常，说明不是跨域的
      return false
    } catch (e) {
      // 如果捕获到 SecurityError 异常，说明是跨域的
      if (e instanceof DOMException && e.name === "SecurityError") {
        return true
      } else {
        throw e // 重新抛出不是 SecurityError 的异常
      }
    }
  }

  #bindIFrameEvents() {
    const that = this

    if (this.#iframe.length > 0) {
      //绑定事件
      this.#iframe.on("load", function () {
        $.loading.hide({
          window: that.#config.window,
          container: that.#modalBodyEl,
        })
      })
    }
  }

  #destory() {
    //销毁滚动条
    const osBodyInstance = this.#modalBodyEl.Scrollbar("getOsInstance")
    if (!osBodyInstance.jquery) {
      $(osBodyInstance.elements().viewport).html("")
      osBodyInstance.destroy()
    }
    const osInstance = this.#modalWrapper.Scrollbar("getOsInstance")
    if (!osInstance.jquery) {
      $(osInstance.elements().viewport).html("")
      osInstance.destroy()
    }
    // 删除dom上存储的数据
    this.#modalInstance.dispose()

    // 直接删除整个元素
    this.#element.remove()
  }

  #bandFooterBtnEvent() {
    let that = this

    this.#modalFooter.on("click", "button", function () {
      let key = $(this).attr("data-key")

      let contentWindow

      if (that.#iframe.length > 0) {
        contentWindow = that.#iframe[0].contentWindow
      }

      if ([DATA_KEY_OK_NAME, DATA_KEY_CANCEL_NAME].includes(key)) {
        if (key === DATA_KEY_OK_NAME && typeof that.#config.ok === "function") {
          //ok 默认不要自动关闭
          that.#config.ok.call(that, contentWindow)
        }

        if (
          key === DATA_KEY_CANCEL_NAME &&
          typeof that.#config.cancel === "function"
        ) {
          let callret = that.#config.cancel.call(that, contentWindow)
          if (callret !== false) {
            that.hide()
          }
        }
      } else {
        typeof that.#config.buttons[key]["action"] === "function" &&
          that.#config.buttons[key].action.call(that, contentWindow)
      }
    })
  }

  show() {
    this.#modalInstance.show()
  }

  hide() {
    this.#modalInstance.hide()
  }

  toggle() {
    this.#modalInstance.toggle()
  }
}

/**
 * jQuery 全局函数 API
 * ====================================================
 */
$[NAME] = function (options) {
  return new Modal($.extend({}, $[NAME].default, options))
}
$[NAME].default = Default

export default Modal
