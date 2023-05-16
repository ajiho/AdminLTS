/* global bootstrap   */

import $ from 'jquery'
import _template from 'lodash-es/template'


// toast组件的模板
const TPL = `
              <div class="toast position-fixed <%= positionClass %>" id="<%= id %>" style="<%= style %>"   role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <% if ( config.image !== '' ) { %>
                  <img src="<%= config.image %>" style="height: <%= config.imageHeight %>" class="rounded me-2" alt="<%= config.imageAlt %>">
                  <% } %>
                  <strong class="me-auto"><%= config.title %></strong>
                  <small><%= config.subTitle %></small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  <%= config.body %>
                </div>
              </div>
`;


//用于唯一id标志累计
let i = 0;

class Toasts {

    constructor(config) {

        this._config = config
        i++;


        //准备模板数据
        //再次计算position的值，避免用户随意输入一个字符串导致不正确
        let positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
        this._config.position = positions.indexOf(this._config.position) !== -1 ? this._config.position : 'top-right';

        //拆分成数组，方便取用
        this.positionArr = this._config.position.split('-');
        //计算得到一个class
        this.positionClass = 'bsa-toast-' + this._config.position;
        //得到一个唯一id,用于查找dom
        this.id = 'bsa-toast-' + i;

        //行内处理样式
        let style = '';
        if (this._config.position === 'top-center') {
            style = `z-index: ${this._config.zIndex};position: fixed;${this.positionArr[0]}: -100%;left:50%;transform:translateX(-50%)`;
        } else if (this._config.position === 'bottom-center') {
            style = `z-index: ${this._config.zIndex};position: fixed;${this.positionArr[0]}: -100%;left:50%;transform:translateX(-50%)`;
        } else {
            style = `z-index: ${this._config.zIndex};position: fixed;${this.positionArr[0]}: 1rem;${this.positionArr[1]}: -100%;`;
        }


        //模板引擎来组合dom
        let tpl = _template(TPL)({
            id: this.id,
            config: this._config,
            positionClass: this.positionClass,
            style,
        })

        document.body.insertAdjacentHTML('afterbegin', tpl);

        //再次查找dom并存到对象属性上
        this.element = document.getElementById(this.id);


        //nwe bootstrap的Toast实例
        this.bootstrapToast = new bootstrap.Toast(this.element, {
            animation: this._config.animation,
            autohide: this._config.autohide,
            delay: this._config.delay
        });


        //事件注册和监听
        this.element.addEventListener('show.bs.toast', () => {
            //触发堆叠动画
            let timer = setInterval(() => {
                if (this.element.offsetHeight > 0) {
                    clearInterval(timer);



                    this.element.style.transition = 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms';
                    if (this._config.position === 'top-center') {
                        this.element.style[this.positionArr[0]] = '0';
                    } else if (this._config.position === 'bottom-center') {
                        this.element.style[this.positionArr[0]] = '0';
                    } else {
                        this.element.style[this.positionArr[1]] = '1rem';
                    }

                    this._stack();

                }
            }, 0);


        })


        //调用堆叠动画
        this.element.addEventListener('hide.bs.toast', () => {
            console.log('hide');
        })


        //直接移除这个dom
        this.element.addEventListener('hidden.bs.toast', () => {
            this.element.remove();
            this._stack();

        })

        //直接调用显示的方法
        this.show();


    }


    show() {
        this.bootstrapToast.show();
    }

    hide() {
        this.bootstrapToast.hide();
    }



    // Private

    _stack() {

        let _this = this;

        let elements = document.body.querySelectorAll(`.${this.positionClass}`);

        let yAxis = [];
        elements.forEach((el, index) => {
            if (el instanceof HTMLElement) {

                index === 0 && yAxis.push(0);

                if (elements[index + 1] instanceof HTMLElement) {
                    yAxis.push(yAxis[index] + el.offsetHeight);
                }

                el.style[this.positionArr[0]] = yAxis[index] + _this._config.gap * index + 'px';
            }
        });

    }


}


$.extend({
    toasts: function (options, option2) {


        let def = $.extend({}, $.toasts.default, options);

        //new实例
        return new Toasts(def);
    }
});


$.toasts.default = {

    //标题
    title: '',
    //图片
    image: '',
    //图片的高度
    imageHeight: '25px',
    imageAlt: '',

    //副标题
    subtitle: '',
    //正文内容
    body: '',

    //拓展的class类
    class: '',

    //index
    zIndex: 1081,

    //将过渡应用到吐司
    animation: true,

    //自动隐藏吐司
    autohide: true,

    //延迟隐藏吐司（毫秒）
    delay: 5000,


    //toast 之间的间隙 (px)
    gap: 16,


    //角边距。也可以填充一个css变量。例子：var(--toast-margin)
    margin: '1rem',


    //toast 的角落位置。可用值：top-right,top-center, top-left, bottom-right,bottom-center,bottom-left
    position: 'top-right',


    //事件
    onShow: null,
    onShown: null,
    onHide: null,
    onHidden: null

}


export default Toasts
