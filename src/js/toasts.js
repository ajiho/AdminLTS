/* global bootstrap   */

import $ from 'jquery'
import _template from 'lodash-es/template'

// toast组件的模板
const TPL = `
              <div class="toast <%= toastClass %>  overflow-hidden" id="<%= id %>"  role="alert" aria-live="assertive" aria-atomic="true">
                
                <% if ( config.content !== '') { %>
                    <div class="toast-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <span><%= config.content %></span>
                            <% if ( config.btnClose === true ) { %>
                            <button type="button" class="btn-close <% if ( enableBtnCloseWhite ) { %> btn-close-white  <% } %>" data-bs-dismiss="toast" aria-label="Close"></button>
                             <% } %>
                        </div>
                    </div>
                <% }else { %>
                
                <% if ( config.image !== '' || config.title !== '' ) { %>
                    <div class="toast-header">
                      <% if ( config.image !== '' ) { %>
                      <img src="<%= config.image %>" style="height: <%= config.imageHeight %>" class="rounded me-2" alt="<%= config.imageAlt %>">
                      <% } %>
                      <strong class="me-auto"><%= config.title %></strong>
                      <small><%= config.subTitle %></small>
                      <% if ( config.btnClose === true ) { %>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                      <% } %>
                    </div>
                    <% } %>
                    
                    <div class="toast-body">
                    <%= config.body %>
                    </div>
                
                <% } %>
                
                <% if ( config.autohide === true ) { %>
                    <div style="height: 4px" class="progress" role="progressbar">
                        <div class="progress-bar progress-bar-striped progress-bar-animated <%= progressClass %>" 
                        style="animation: progress <%= config.delay %>ms linear forwards">
                        </div>
                    </div>
                <% } %>
              </div>`

//用于唯一id标志累计
let i = 0

class Toasts {
  constructor(config) {
    // let _this = this;
    this._config = config
    i++

    //准备容器
    this._buildContainer()

    //得到一个唯一id,用于查找dom
    this.id = 'bsa-toast-' + i

    //模板引擎来组合dom
    let tpl = _template(TPL)({
      id: this.id,
      config: this._config,
      toastClass: this._getToastColorSchemesClass(),
      progressClass: this._getProgressClassColorSchemesClass(),
      enableBtnCloseWhite: this._enableBtnCloseWhite(),
    })

    let containerSelecter = this._getContainerClass()

    //找到这个容器并把toast插入进去
    $(`.toast-container.${containerSelecter}`).append(tpl)

    //再次查找dom并存到对象属性上
    this.element = document.getElementById(this.id)

    //nwe bootstrap的Toast实例
    this.bootstrapToast = new bootstrap.Toast(this.element, {
      animation: this._config.animation,
      autohide: false,
    })

    //事件注册和监听

    //进度条事件处理,必须要autohide===true的时候才会启用此选项
    if (this._config.autohide === true) {
      this._progressEvent()
    }

    this.element.addEventListener('show.bs.toast', () => {
      if (this._config.onShow !== null) {
        this._config.onShow(this)
      }
    })

    this.element.addEventListener('shown.bs.toast', () => {
      if (this._config.onShown !== null) {
        this._config.onShown(this)
      }
    })

    this.element.addEventListener('hide.bs.toast', () => {
      if (this._config.onHide !== null) {
        this._config.onHide(this)
      }
    })

    this.element.addEventListener('hidden.bs.toast', () => {
      if (this._config.onHidden !== null) {
        this._config.onHidden(this)
      }
    })

    //直接调用显示的方法
    this.bootstrapToast.show()
  }

  _progressEvent() {
    let _this = this

    if (_this._config.hoverProgressPause === true) {
      $(this.element).mouseenter(() => {
        $(this.element).addClass('bsa-toast-pause')
      })

      //鼠标移出
      $(this.element).mouseleave(() => {
        $(this.element).removeClass('bsa-toast-pause')
      })
    }

    //监听滚动条读条动画完毕事件
    $(this.element).on('animationend', '.progress-bar', function (e) {
      if (e.target === e.currentTarget) {
        //手动隐藏
        _this.hide()
      }
    })
  }

  _getContainerClass(selecterMode = true) {
    //根据访问来取对应的类名
    switch (this._config.placement) {
      case 'top-left':
        return selecterMode ? 'top-0.start-0' : 'top-0 start-0'
      case 'top-center':
        return selecterMode
          ? 'top-0.start-50.translate-middle-x'
          : 'top-0 start-50 translate-middle-x'
      case 'top-right':
        return selecterMode ? 'top-0.end-0' : 'top-0 end-0'
      case 'middle-left':
        return selecterMode
          ? 'top-50.start-0.translate-middle-y'
          : 'top-50 start-0 translate-middle-y'
      case 'middle-center':
        return selecterMode
          ? 'top-50.start-50.translate-middle'
          : 'top-50 start-50 translate-middle'
      case 'middle-right':
        return selecterMode
          ? 'top-50.end-0.translate-middle-y'
          : 'top-50 end-0 translate-middle-y'
      case 'bottom-left':
        return selecterMode ? 'bottom-0.start-0' : 'bottom-0 start-0'
      case 'bottom-center':
        return selecterMode
          ? 'bottom-0.start-50.translate-middle-x'
          : 'bottom-0 start-50 translate-middle-x'
      case 'bottom-right':
        return selecterMode ? 'bottom-0.end-0' : 'bottom-0 end-0'
      default:
        return selecterMode ? 'top-0.end-0' : 'top-0 end-0'
    }
  }

  _getToastColorSchemesClass() {
    //根据访问来取对应的类名
    switch (this._config.type) {
      case 'primary':
        return 'text-bg-primary border-0'
      case 'secondary':
        return 'text-bg-secondary border-0'
      case 'success':
        return 'text-bg-success border-0'
      case 'danger':
        return 'text-bg-danger border-0'
      case 'warning':
        return 'text-bg-warning border-0'
      case 'info':
        return 'text-bg-info border-0'
      case 'dark':
        return 'text-bg-dark border-0'
      case 'light':
        return 'text-bg-light border-0'
      default:
        return ''
    }
  }

  _enableBtnCloseWhite() {
    //根据访问来取对应的类名
    switch (this._config.type) {
      case 'primary':
        return true
      case 'secondary':
        return true
      case 'success':
        return true
      case 'danger':
        return true
      case 'warning':
        return false
      case 'info':
        return false
      case 'dark':
        return true
      case 'light':
        return false
      default:
        return false
    }
  }

  _getProgressClassColorSchemesClass() {
    //根据访问来取对应的类名
    switch (this._config.type) {
      case 'primary':
        return 'bg-primary'
      case 'secondary':
        return 'bg-secondary'
      case 'success':
        return 'bg-success'
      case 'danger':
        return 'bg-danger'
      case 'warning':
        return 'bg-warning'
      case 'info':
        return 'bg-info'
      case 'dark':
        return 'bg-dark'
      case 'light': //如果是light那么给进度条变成bg-secondary 因为 bg-light根本看不见
        return 'bg-secondary'
      default:
        return ''
    }
  }

  _buildContainer() {
    //判断容器是否存在，存在就创建并添加到body中
    let containerSelecter = this._getContainerClass()
    let containerClass = this._getContainerClass(false)
    let containerDomStr = ` <div class="toast-container position-fixed ${containerClass}  p-3"></div>`
    if ($(`.toast-container.${containerSelecter}`).length === 0) {
      $(containerDomStr).appendTo('body')
    }
  }

  hide() {
    this.bootstrapToast.hide()
  }
}

$.extend({
  toasts: function (options, option2) {
    let def = $.extend({}, $.toasts.default, options)

    //new实例
    return new Toasts(def)
  },
})

$.toasts.default = {
  //鼠标移入进度条暂停
  hoverProgressPause: true,
  //toast是否添加关闭按钮
  btnClose: true,
  //标题
  title: '',
  //内容
  content: '',
  //图片
  image: '',
  //图片的高度
  imageHeight: '25px',
  imageAlt: '',
  //副标题
  subTitle: '',
  //正文内容此选项完全可以自定义body的内容
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

  //情景模式
  type: 'primary',

  //事件
  onShow: null,
  onShown: null,
  onHide: null,
  onHidden: null,
}

export default Toasts
