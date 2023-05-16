/* global bootstrap   */

import $ from 'jquery'
import _template from 'lodash-es/template'
import Helper from './util/helper'


const MODAL_CLASS = 'bsa-modal';
const IFrameTpl = '<iframe src="<%= config.url %>" class="d-block w-100 h-100"></iframe>'


// 遮罩层
const maskTpl = ` <div class="w-100 h-100  bg-body-tertiary d-flex align-items-center justify-content-center mask z-1 position-absolute start-0 top-0 end-0 bottom-0">
                           <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                           </div> 
                        </div>`;


//模态框模板
const TPL = `
    <div class="modal ${MODAL_CLASS} <%= config.modalClass %>" id="<%= id %>"   tabindex="-1" aria-labelledby="<%= id %>Label" aria-hidden="true">
        <div class="modal-dialog <% if ( config.url !== '' ) { %> modal-dialog-centered   <% } %> <%= config.modalDialogClass %>">
            <div class="modal-content">
                <div class="modal-header">
                    

                    
                   <h1 class="modal-title fs-5" id="<%= id %>Label">
                   <% if ( config.url !== '' && config.title === '' ) { %>
                        <%= _htmlspecialchars(config.url) %>
                   <% }else if ( config.url === '' && config.title === '' ) { %>
                        提示    
                   <% } else { %>
                        <%= _htmlspecialchars(config.title) %>
                   <% } %>
                    </h1>
                  
                   <% if ( config.url === '' ) { %>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   <% }else { %>
                        <div class="d-flex align-items-center gap-3 fs-5">
                        <i class="bi bi-arrow-clockwise btn-refresh" role="button"></i>
                        <% if ( !config.modalDialogClass.trim().split(/\\s+/).includes('modal-fullscreen') ) { %>
                         <i class="bi bi-fullscreen btn-fullscreen" role="button"></i>
                        <% } %>
                         <i class="bi bi-x-circle" role="button" data-bs-dismiss="modal"></i>
                        </div>
                   <% } %>

                   
                </div>
       
                <% if ( config.url !== '' ) { %>
                <div class="modal-body p-0 overflow-hidden">
                    <div class="iframe-wrapper">
                        ${maskTpl}
                     </div> 
                </div>
                <% }else{ %>
                <div class="modal-body">
                    <%= config.body %>
                </div>
                <% } %>
                
                <% if( Array.isArray(config.buttons) && config.buttons.length !== 0 ) { %>
                <div class="modal-footer">
                    <% _each(config.buttons, function (index,item) { %>
                      <button type="button" data-key="<%= index %>" class="btn <%= item.class %>"><%= item.text %></button>
                    <% });%>
                </div>
                <% }else if( !(Array.isArray(config.buttons) && config.buttons.length === 0) ) { %>
                 <div class="modal-footer">
                    <button type="button" data-key="ok" data-bs-dismiss="modal" class="btn <%= config.btnOKClass %>"><%= config.btnOKText %></button>
                    <% if ( config.cancelBtn === true ) { %>
                    <button type="button" data-key="cancel" data-bs-dismiss="modal" class="btn <%= config.btnCancelClass %>"><%= config.btnCancelText %></button>
                    <% } %>
                </div>
                <% } %>
            </div>
        </div>
    </div>`;


//进行累计
let i = 0;


class Modal {

    //构造函数
    constructor(options) {
        this._config = options;


        //唯一id
        this.id = MODAL_CLASS + '-' + i;
        i++;

        //显示modal框
        this.show();


    }


    // 事件注册程序
    _eventRegister() {

        let _this = this;


        this._element.addEventListener('hide.bs.modal', function (event) {

            if (_this._config.onHide !== null) {
                _this._config.onHide(_this);
            }
        })

        //监听
        this._element.addEventListener('hidden.bs.modal', function (event) {
            //调用隐藏完毕的回调
            if (_this._config.onHidden !== null) {
                _this._config.onHidden(_this);
            }

            const modalInstance = bootstrap.Modal.getInstance(_this._element);
            if (modalInstance) {
                modalInstance.dispose();
            }

            document.body.removeChild(_this._element);
        });


        this._element.addEventListener('show.bs.modal', function (event) {
            if (_this._config.onShow !== null) {
                _this._config.onShow(_this);
            }
        })

        this._element.addEventListener('shown.bs.modal', function (event) {

            //调用隐藏完毕的回调
            if (_this._config.onShown !== null) {
                _this._config.onShown(_this);
            }

            _this._addIframe();


        });


        _this._iframeAction();

        //按钮区域的事件绑定
        _this._btnEvent();

    }

    _btnEvent() {

        let _this = this;

        $(this._element).on('click', '.modal-footer button', function () {


            let key = $(this).attr('data-key');

            if (['ok', 'cancel'].includes(key)) {

                if (key === 'ok' && _this._config.ok !== null) {

                    _this._config.ok(_this)
                }

                if (key === 'cancel' && _this._config.cancel !== null) {
                    _this._config.cancel(_this)
                }
            } else {
                //判断action是否为null
                if (_this._config.buttons[key].action !== null) {
                    _this._config.buttons[key].action(_this);
                }

            }


        });
    }

    // 添加iframe
    _addIframe() {

        let _this = this;

        let iframe = _template(IFrameTpl)({
            id: _this.id,
            config: _this._config,
        })

        let $ifd = $(iframe);

        $ifd.on('load', function () {


            //读取本地的主题,回显主题，判断是否是跨域的iframe,如果不是跨域的iframe就根据传入的配置决定是否自动加主题

            if (_this._config.iframeInnerTheme === true) {
                let iframe = this;


                if (Helper.canAccessIFrame(iframe)) {//不是跨域的iframe

                    $(iframe.contentDocument).find('html').attr('data-bs-theme', $('body').Layout('getTheme'));

                }

            }


            //移除遮罩层
            $(_this._element).find('.iframe-wrapper .mask').fadeOut(function () {
                this.remove();
            });
        })

        $ifd.prependTo($(_this._element).find('.iframe-wrapper'));
    }


    // 最大化 刷新按钮操作
    _iframeAction() {

        let _this = this;

        //刷新处理
        $(this._element).on('click', '.modal-header .btn-refresh', function () {


            //先判断遮罩层是否已经存在，如果已经存在就给它删除
            if (_this._getMask().length > 0) {
                _this._removeMask();
            }

            //插入遮罩层
            $(maskTpl).prependTo($(_this._element).find('.iframe-wrapper'));


            //判断是否是跨域的iframe,如果是跨域的就直接移除重新添加
            if (Helper.canAccessIFrame(_this._getIframe()[0])) {
                _this._getIframe()[0].contentWindow.location.reload();
            } else {

                //移除iframe
                _this._getIframe().remove();

                _this._addIframe();
            }

        })

        //全屏处理
        $(this._element).on('click', '.modal-header .btn-fullscreen', function () {

            let fullBtn = this;



            if ($(fullBtn).hasClass('bi-fullscreen')) {

                $(_this._element).find('.modal-dialog').addClass('modal-fullscreen');
                $(fullBtn).removeClass('bi-fullscreen').addClass('bi-fullscreen-exit');

            } else {
                //给模态框移除全屏的类
                $(_this._element).find('.modal-dialog').removeClass('modal-fullscreen');
                $(fullBtn).removeClass('bi-fullscreen-exit').addClass('bi-fullscreen');
            }



        })

    }


    _getIframe() {
        return $(this._element).find('.iframe-wrapper iframe')
    }

    _getMask() {
        return $(this._element).find('.iframe-wrapper .mask')
    }


    _removeMask() {
        this._getMask().remove();
    }

    show() {

        //创建容器
        this._createModalElement();
        let modalInstance = new bootstrap.Modal(this._element, this._config.modalOptions);
        if (modalInstance) {
            modalInstance.show();
        }
    }


    close() {

        const modalInstance = bootstrap.Modal.getInstance(this._element);
        if (modalInstance) {
            // modalInstance.dispose();
            modalInstance.hide();
        }
        // document.body.removeChild(this._element);
        // if (this.options.onDispose) {
        //     this.options.onDispose(this);
        // }
    }


    _createModalElement() {

        //模板引擎来组合dom
        let tpl = _template(TPL)({
            id: this.id,
            config: this._config,
            _each: $.each,
            _htmlspecialchars: Helper.htmlspecialchars
        })


        //加入到body中放着
        $(tpl).prependTo('body');


        //然后再把dom存起来
        this._element = document.getElementById(this.id);

        //事件监听程序
        this._eventRegister();

    }

}


$.extend({
    modal: function (options, option2) {

        let def = $.extend({}, $.modal.default, options);

        let buttonsTemp = [];

        if (Array.isArray(def.buttons) && def.buttons.length > 0) {
            $.each(def.buttons, function (index, item) {
                if (!Helper.isObject(item)) {
                    throw new Error('选项buttons数组元素必须是一个对象');
                }
                //按钮的配置来合并
                let btnOpt = $.extend({}, $.modal.btnDefault, item);
                buttonsTemp.push(btnOpt);
            })
            def = Helper.updateObjDataByKey(def, 'buttons', buttonsTemp);
        }

        //new实例
        return new Modal(def);

    }
});


//单个按钮的默认值
$.modal.btnDefault = {
    text: '按钮',
    class: 'btn-light',
    action: null
}


//把默认的参数暴露出去
$.modal.default = {

    //取消按钮的文本
    btnCancelText: '取消',
    //取消按钮的class
    btnCancelClass: 'btn-light',
    //ok按钮的文本
    btnOKText: '确定',
    //ok按钮的class
    btnOKClass: 'btn-primary',

    //默认ok按钮是开启的。如果ok按钮回调存在的话，会调用回调
    ok: null,
    //开启取消按钮
    cancelBtn: false,
    //取消按钮被单击回调
    cancel: null,


    //标题
    title: '',

    //内容
    body: '',

    //iframe 内部是否自动适配bootstrap-admin的多主题
    iframeInnerTheme: true,

    //可以设置按钮对齐方式
    btnAlign: 'right',
    //如果想调整底部按钮的位置，可以这样
    btnSize: 'sm',

    //自定义按钮,默认是null
    buttons: null,

    // ".modal"所在div修饰类  比如:fade
    modalClass: 'fade',

    modalDialogClass: 'modal-dialog-centered modal-sm', // ".modal-dialog"所在div修饰类  比如:modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable

    // bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options
    modalOptions: {
        backdrop: true,
        keyboard: true,
        focus: true,
    },

    //iframe的url地址,设置它就是设置iframe
    url: '',

    onShow: null,
    onShown: null,
    onHide: null,
    onHidden: null
};


export default Modal