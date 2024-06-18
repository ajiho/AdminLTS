import $ from 'jquery'

import Utils from './util'

const NAME = 'toasts'

const ClassName = {
  //白色按钮
  BTN_CLOSE_WHITE: 'btn-close-white',
  //容器的类名
  TOAST_CONTAINER: 'toast-container',
  //动画暂停类
  TOAST_PAUSE: 'bsa-toast-pause',
  //body关闭按钮的修饰类
  TOAST_BODY_BTN_CLASS: 'me-2 m-auto',
}

const ICONS = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-success me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-danger me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-warning me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-info me-2" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`,
}

//html的构造
const HTML = {
  //容器
  container: [
    `<div class="${ClassName.TOAST_CONTAINER} position-fixed %s p-3">`,
    `</div>`,
  ],
  //吐司
  toast: [
    `<div class="toast %s border-0  overflow-hidden" id="%s"  role="alert" aria-live="assertive" aria-atomic="true">`,
    '</div>',
  ],

  //身体的容器
  toastBodyWrapper: [`<div class="d-flex">`, `</div>`],
  //身体
  toastBody: `<div class="toast-body">%s</div>`,

  //参数1: 白色按钮 参数2:没有标题时的关闭按钮需要再多两个修饰类 me-2 m-auto
  btnClose: `<button type="button" class="btn-close %s %s" data-bs-dismiss="toast" aria-label="Close"></button>`,

  //参数1:主题色适配
  toastHeader: [`<div class="toast-header %s">`, `</div>`],

  headerImg: `<img src="%s" height="%s" class="rounded me-2" alt="%s">`,

  headerTitle: `<strong class="me-auto">%s</strong>`,

  headerSubTitle: '<small>%s</small>',

  progress: `<div style="height: 4px" class="progress" role="progressbar">
         <div class="progress-bar progress-bar-striped progress-bar-animated %s"
                        style="animation: progress %sms linear forwards"></div></div>`,
}

// 需要白色关闭按钮的情景
const needWhiteCloseBtnType = [
  'primary',
  'secondary',
  'success',
  'danger',
  'dark',
]

const Map = {
  //主题色
  toastColorScheme: {
    primary: 'text-bg-primary',
    secondary: 'text-bg-secondary',
    success: 'text-bg-success',
    danger: 'text-bg-danger',
    warning: 'text-bg-warning',
    info: 'text-bg-info',
    dark: 'text-bg-dark',
    light: 'text-bg-light',
  },

  //主题色
  toastHeaderColorScheme: {
    primary: 'border-bottom border-primary-subtle text-bg-primary',
    secondary: 'border-bottom border-secondary-subtle text-bg-secondary',
    success: 'border-bottom border-success-subtle text-bg-success',
    danger: 'border-bottom border-danger-subtle text-bg-danger',
    warning: 'border-bottom border-warning-subtle text-bg-warning',
    info: 'border-bottom border-info-subtle text-bg-info',
    dark: 'border-bottom border-dark-subtle text-bg-dark',
    light: 'border-bottom border-light-subtle text-bg-light',
  },

  progressColorScheme: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info',
    dark: 'bg-dark',
    light: 'bg-light',
  },

  placement: {
    'top-left': 'top-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'top-right': 'top-0 end-0',
    'middle-left': 'top-50 start-0 translate-middle-y',
    'middle-center': 'top-50 start-50 translate-middle',
    'middle-right': 'top-50 end-0 translate-middle-y',
    'bottom-left': 'bottom-0 start-0',
    'bottom-center': 'bottom-0 start-50 translate-middle-x',
    'bottom-right': 'bottom-0 end-0',
  },
}

//默认参数
const Default = {
  // 惰性打开
  lazyOpen: false,
  //打开的窗口对象
  window: 'top',
  //鼠标移入进度条暂停
  hoverProgressPause: true,
  //是否添加关闭按钮,如果标题 title选项被定义，那么该关闭按钮则是头部的关闭按钮，否则则是body的关闭按钮
  btnClose: true,
  //标题
  title: '',
  //图片，title不为空时有效
  image: '',
  //图片的高度,title不为空时有效
  imageHeight: '25px',
  //图片的提示 title不为空时有效
  imageAlt: '',
  //副标题 title不为空时有效
  subTitle: '',
  //身体部分的内容
  body: '',
  //index
  zIndex: 1081,
  //将过渡应用到吐司
  animation: true,
  //自动隐藏吐司
  autohide: true,
  //延迟隐藏吐司（毫秒）
  delay: 5000,
  //方位 可用值：top-left,top-center, top-left, middle-left,middle-center,middle-right,bottom-left,bottom-center,bottom-right
  placement: 'top-right',
  //情景模式 undefined/string 可用值:primary success info  warning danger light dark
  type: undefined,
  //事件
  onShow: null,
  onShown: null,
  onHide: null,
  onHidden: null,
}

//用于唯一id标志累计
let i = 0

class Toasts {
  #config
  //唯一id
  #id

  //容器元素
  #container
  #toast
  #toastInstance

  #$
  #bootstrap

  constructor(config) {
    this.#config = config

    //更改触发的全局对象
    this.#$ = window[this.#config.window].$
    this.#bootstrap = window[this.#config.window].bootstrap

    i++
    this.#id = i

    //准备容器
    this.#buildContainer()

    //nwe bootstrap的Toast实例
    this.#toastInstance = new this.#bootstrap.Toast(this.#toast[0], {
      animation: this.#config.animation,
      autohide: false,
    })

    //事件注册和监听
    this.#bindEvents()

    if (this.#config.lazyOpen === false) {
      //直接弹出
      this.show()
    }
  }

  #bindEvents() {
    //进度条事件处理,必须要autohide===true的时候才会启用此选项
    if (this.#config.autohide === true) {
      this.#progressEvents()
    }

    this.#toast[0].addEventListener('show.bs.toast', () => {
      typeof this.#config.onShow === 'function' &&
        this.#config.onShow.call(this)
    })

    this.#toast[0].addEventListener('shown.bs.toast', () => {
      typeof this.#config.onShown === 'function' &&
        this.#config.onShown.call(this)
    })

    this.#toast[0].addEventListener('hide.bs.toast', () => {
      typeof this.#config.onHide === 'function' &&
        this.#config.onHide.call(this)
    })

    this.#toast[0].addEventListener('hidden.bs.toast', () => {
      typeof this.#config.onHidden === 'function' &&
        this.#config.onHidden.call(this)
      //直接删除该toast
      this.#toast.remove()

      if (this.#container.children().length === 0) {
        this.#container.remove()
      }
    })
  }

  // 进度条的事件
  #progressEvents() {
    let that = this

    if (that.#config.hoverProgressPause === true) {
      this.#toast.mouseenter(function () {
        that.#$(this).addClass(ClassName.TOAST_PAUSE)
      })

      //鼠标移出
      this.#toast.mouseleave(function () {
        that.#$(this).removeClass(ClassName.TOAST_PAUSE)
      })
    }

    //监听滚动条读条动画完毕事件
    this.#toast.on('animationend', '.progress-bar', function (event) {
      if (event.target === event.currentTarget) {
        //手动隐藏
        that.hide()
      }
    })
  }

  #buildToast() {
    let html = []

    //接着是内部的判断
    html.push(
      Utils.sprintf(
        HTML.toast[0],
        Map.toastColorScheme[this.#config.type] || '',
        this.#id,
      ),
    )

    //按钮类,确定哪些情景类型需要使用白色的按钮类
    const btnClass = needWhiteCloseBtnType.includes(this.#config.type)
      ? ClassName.BTN_CLOSE_WHITE
      : ''

    if (this.#config.title !== '') {
      //标题不为空
      //如果标题被设置了

      let toastHeaderColor = Map.toastHeaderColorScheme[this.#config.type] || ''

      html.push(Utils.sprintf(HTML.toastHeader[0], toastHeaderColor)) //头部

      if (this.#config.image !== '') {
        //有传递图标

        //判断是否是svg字符串
        if (Utils.isSVGString(this.#config.image)) {
          html.push(this.#config.image)
        } else {
          html.push(
            Utils.sprintf(
              HTML.headerImg,
              this.#config.image,
              this.#config.imageHeight,
              this.#config.imageAlt,
            ),
          )
        }
      }
      html.push(Utils.sprintf(HTML.headerTitle, this.#config.title))
      html.push(Utils.sprintf(HTML.headerSubTitle, this.#config.subTitle))

      if (this.#config.btnClose === true) {
        html.push(Utils.sprintf(HTML.btnClose, btnClass, ''))
      }
      //中间添加内容
      html.push(HTML.toastHeader[1])

      //加入内容
      html.push(Utils.sprintf(HTML.toastBody, this.#config.body))
    } else {
      //只插入body

      if (this.#config.btnClose === true) {
        //身体容器的开始
        html.push(HTML.toastBodyWrapper[0])
      }

      let body = this.#config.body
      if (this.#config.image !== '') {
        //有传递图标

        //判断是否是svg字符串
        if (Utils.isSVGString(this.#config.image)) {
          body = this.#config.image + body
        } else {
          body =
            html.push(
              Utils.sprintf(
                HTML.headerImg,
                this.#config.image,
                this.#config.imageHeight,
                this.#config.imageAlt,
              ),
            ) + body
        }
      }

      html.push(Utils.sprintf(HTML.toastBody, body))

      if (this.#config.btnClose === true) {
        html.push(
          Utils.sprintf(
            HTML.btnClose,
            btnClass,
            ClassName.TOAST_BODY_BTN_CLASS,
          ),
        )
      }

      if (this.#config.btnClose === true) {
        //身体容器的结束
        html.push(HTML.toastBodyWrapper[1])
      }
    }

    if (this.#config.autohide === true) {
      //进度条
      html.push(
        Utils.sprintf(
          HTML.progress,
          Map.progressColorScheme[this.#config.type] || 'bg-light',
          this.#config.delay,
        ),
      )
    }

    html.push(HTML.toast[1])

    return html.join('')
  }

  #buildContainer() {
    let placement = Map.placement[this.#config.placement] || 'top-right'

    let html = [
      Utils.sprintf(HTML.container[0], placement),
      HTML.container[1],
    ].join('')

    //判断不同方向的容器是否存在，不存在就创建并添加到body中
    const containerSelector = `.${ClassName.TOAST_CONTAINER}.${placement.replace(/ /g, '.')}`

    if (this.#$(containerSelector).length === 0) {
      this.#$(html).appendTo('body')
    }

    this.#container = this.#$(containerSelector)

    this.#container.append(this.#buildToast())
    this.#toast = this.#container.find('#' + this.#id)
  }

  show() {
    this.#toastInstance.show()
  }

  hide() {
    this.#toastInstance.hide()
  }
}

/**
 * jQuery 全局函数 API
 * ====================================================
 */
$[NAME] = function (options) {
  return new Toasts(
    $.extend({}, $[NAME].default, typeof options === 'object' ? options : {}),
  )
}

//快捷方法的封装
const fastMethods = {
  success: {
    placement: 'top-center',
    image: ICONS.success,
    body: '操作成功',
  },
  error: {
    placement: 'top-center',
    image: ICONS.error,
    body: '操作失败',
  },
  warning: {
    placement: 'top-center',
    image: ICONS.warning,
  },
  info: {
    placement: 'top-center',
    image: ICONS.info,
  },
}

for (const methodName of Object.keys(fastMethods)) {
  //快捷方法
  $[NAME][methodName] = function (options, options2) {
    let ops = {}
    if (typeof options === 'string') {
      ops.body = options
    }

    if (typeof options2 === 'function') {
      ops.onHidden = options2
    }

    if (typeof options === 'object') {
      ops = options
    }

    return new Toasts(
      $.extend({}, $[NAME].default, fastMethods[methodName], ops),
    )
  }
}

$[NAME].default = Default

export default Toasts
