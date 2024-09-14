import $ from "jquery"
import Utils from "./util"

// 全局api的名称
const NAME = "loading"

//类名
const ClassName = {
  loading: "lts-loading",
  //显示时的激活类
  active: "active",
}

const Map = {
  spinner: {
    border: "spinner-border",
    grow: "spinner-grow",
  },

  //主题色
  spinnerColorScheme: {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    danger: "text-danger",
    warning: "text-warning",
    info: "text-info",
    dark: "text-dark",
    light: "text-light",
  },
}

// html的结构
const HTML = {
  container: [`<div class="${ClassName.loading}">`, `</div>`],

  //旋转器 参数1:旋转器类型,参数2:主题色 参数3:尺寸 参数4:行内样式控制的尺寸
  spinner: `<div class="%s %s %s" %s role="status">
  <span class="visually-hidden">Loading...</span>
</div>`,
}

//默认参数
const Default = {
  //打开的窗口对象
  window: "top",
  //容器,选择器，element。jQuery对象
  container: "body",
  // 容器的定位
  containerPosition: "relative",
  //情景模式 undefined/string 可用值:primary success info  warning danger light dark
  type: "",
  //旋转器 grow:实心圈  border:空心圈
  spinner: "border",
  //尺寸 可选值 'sm' | 'style="width: 3rem; height: 3rem;"'
  size: "",
  //给loading层附加的样式类
  class: "",
  //是否有淡出效果
  fadeOut: true,
}

class Loading {
  #config

  // jquery对象
  #$

  //元素
  #$loading

  //构造函数
  constructor(config) {
    this.#config = config

    //更改触发的jquery对象
    this.#$ = window[this.#config.window].$
    this.#createLoadingElement()
    this.#transitionendListeners()
  }

  #transitionendListeners() {
    //事件委托
    if (this.#config.fadeOut === true) {
      this.#$(window[this.#config.window].document).off(
        "transitionend",
        `.${ClassName.loading}`,
        this.#transitionendHandle,
      )
      this.#$(window[this.#config.window].document).on(
        "transitionend",
        `.${ClassName.loading}`,
        this.#transitionendHandle,
      )
    }
  }

  #transitionendHandle() {
    $(this).remove()
  }

  #createLoadingElement() {
    let html = []

    html.push(HTML.container[0])

    let spinner = Map.spinner[this.#config.spinner] || "spinner-border"
    let color = Map.spinnerColorScheme[this.#config.type] || ""
    let size = this.#config.size === "sm" ? spinner + "-sm" : ""
    let styleSize = this.#config.size !== "sm" ? this.#config.size : ""
    html.push(Utils.sprintf(HTML.spinner, spinner, color, size, styleSize))

    html.push(HTML.container[1])
    html = html.join("")

    //先移除
    this.#$(this.#config.container).find(`.${ClassName.loading}`).remove()
    this.#$(html).prependTo(this.#config.container)
    //查找元素
    this.#$loading = this.#$(this.#config.container).find(
      `.${ClassName.loading}`,
    )

    this.#$(this.#config.container).css({
      position: this.#config.containerPosition,
    })

    if (this.#config.container !== "body") {
      //动态设置样式
      this.#$loading.css({
        position: "absolute",
      })
    }

    this.#config.class !== "" && this.#$loading.addClass(this.#config.class)
  }

  show() {
    this.#$loading.addClass(ClassName.active)
  }

  hide(options) {
    let config = Object.assign(
      this.#config,
      typeof options === "object" ? options : {},
    )
    const $loading = window[config.window]
      .$(config.container)
      .find(`.${ClassName.loading}`)
    if (this.#config.fadeOut === true) {
      $loading.addClass("fade-out")
    } else {
      $loading.remove()
    }
  }
}

/**
 * jQuery 全局函数 API
 * ====================================================
 */
let loadingInstance
$[NAME] = function (options) {
  loadingInstance = new Loading(
    $.extend({}, $[NAME].default, typeof options === "object" ? options : {}),
  )
  return loadingInstance
}

$[NAME].hide = function (options) {
  loadingInstance.hide(options)
}

$[NAME].default = Default

export default Loading
