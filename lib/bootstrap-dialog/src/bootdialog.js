/*!
 * bootdialog v0.0.1 (https://gitee.com/x852/bootdialog)
 * Author: x852
 * License: MIT
 */
;(function (window) {

    "use strict"

    var _window = window;

    if (typeof _window.bootstrap === "undefined") {
        throw new Error('must requires bootstrap5');
    }

    var bs_version = _window.bootstrap.Modal.VERSION;//5.1.3 // '5', '2', '0-beta1'


    if (bs_version.split('.')[0] > 5 || bs_version.split('.')[1] > 1) {
        throw new Error('only supports bootstrap 5.1.x version');
    }

    //版本号
    const VERSION = '0.0.1';

    //区分模态框,使得弹出模态框唯一
    var i = 0;

    function Modal(options) {
        this.version = VERSION;

        //定义一些默认参数
        this.options = {
            title: "", // 弹窗标题
            body: "", // 内容
            footer: "", // 模态框框底部
            modalClass: "fade", // ".modal"所在div修饰类  比如:fade
            modalDialogClass: "modal-dialog-centered", // ".modal-dialog"所在div修饰类  比如:modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable

            // bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options
            modalOptions: {
                backdrop: true,
                keyboard: true,
                focus: true,
            },

            btnShow: true,
            btnText: 'close',
            btnClass: 'btn-secondary',


            buttons: [],

            // 事件:
            onCreate: null, // 创建模态框时调用回调函数
            onShown: null, // 完全显示模态框框时调用(淡入完成之后)
            onDispose: null, // 模态框关闭时调用
            onSubmit: null // 确认框，按下确认，或者取消后回调

        }

        for (let option in options) {
            this.options[option] = options[option]
        }
        this.id = "bootdialog-" + i;
        i++;
        this.show();
        //事件的触发
        if (this.options.onCreate) {
            this.options.onCreate(this);
        }
    }


    //用于显示模态框
    Modal.prototype.show = function () {

        if (!this.element) {//如果元素不存在,就创建
            this.createContainerElement();
            var modalInstance;
            if (this.options.modalOptions) {
                modalInstance = new bootstrap.Modal(this.element, this.options.modalOptions);
                if (modalInstance) {
                    modalInstance.show();
                }
            } else {
                modalInstance = new bootstrap.Modal(this.element);
                if (modalInstance) {
                    modalInstance.show();
                }
            }
        } else {
            const modalInstance = bootstrap.Modal.getInstance(this.element);
            if (modalInstance) {
                modalInstance.show();
            }
        }

        //判断参数传递显示和隐藏元素
        if (this.options.title) {
            //头部展示
            this.headerElement.style.display = '';
            this.titleElement.innerHTML = this.options.title
        } else {
            this.headerElement.style.display = 'none';
        }

        if (this.options.body) {

            this.bodyElement.style.display = '';
            this.bodyElement.innerHTML = this.options.body
        } else {
            this.bodyElement.style.display = 'none';
        }

        if (this.options.footer) {
            this.footerElement.innerHTML = this.options.footer
        }


        if (this.options.buttons) {

            let btx = '';

            this.options.buttons.some(function (item, index) {
                btx += '<button class="btn ' + item.btnClass + '" data-key="' + index + '" >' + item.text + '</button>';
            });

            this.footerElement.insertAdjacentHTML("afterbegin", btx);//在调用元素内部后面添加一个子元素 即取代了最后的子元素
        }

        if (!this.options.btnShow) {
            var btn = this.footerElement.querySelector('button[data-bs-dismiss=modal]');
            btn.style.display = 'none';
        }

        //iframe
        if (this.options.url) {
            // console.log(this.options.url)

            // var btn = this.footerElement.querySelector('button[data-bs-dismiss=modal]');
            // btn.style.display = 'none';
            var iframe = `<iframe src="${this.options.url}"
                    style="width: 100%;height:70vh"
                    ></iframe>`;
            this.bodyElement.innerHTML = '';
            this.bodyElement.classList.add('p-0');
            this.bodyElement.insertAdjacentHTML("afterbegin", iframe);
            this.dialogElement.classList.remove('modal-dialog-scrollable');

        }

    }

    Modal.prototype.hide = function () {
        const modalInstance = bootstrap.Modal.getInstance(this.element);
        if (modalInstance) {
            modalInstance.hide();
        }
    }


    //Modal原型对象整一个方法用于创建模态框dom元素
    Modal.prototype.createContainerElement = function () {
        //提取出this,否则函数内调用会错乱
        const self = this;

        //给dom设置各种属性
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.setAttribute("class", "modal " + this.options.modalClass);
        this.element.setAttribute("tabindex", "-1");
        this.element.setAttribute("aria-labelledby", this.id);
        this.element.setAttribute("aria-hidden", "true");

        //组合modal
        this.element.innerHTML = `
                <div class="modal-dialog ${this.options.modalDialogClass}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel-${this.options.id}"></h5>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn ${this.options.btnClass}" data-bs-dismiss="modal">${this.options.btnText}</button>
                </div>
            </div>
        </div>
        `;

        //加入到body中
        document.body.appendChild(this.element);




        //分别找到各个组成部分dom对象，备用
        this.dialogElement = this.element.querySelector(".modal-dialog");
        this.titleElement = this.element.querySelector(".modal-title");
        this.headerElement = this.element.querySelector(".modal-header");
        this.bodyElement = this.element.querySelector(".modal-body");
        this.footerElement = this.element.querySelector(".modal-footer");

        //事件监听回调
        this.element.addEventListener('hidden.bs.modal', function (event) {
            self.dispose();
        });

        this.element.addEventListener('shown.bs.modal', function (event) {
            if (self.options.onShown) {
                self.options.onShown(self);
            }
        });
    }


    //移除dom
    Modal.prototype.dispose = function () {
        const modalInstance = bootstrap.Modal.getInstance(this.element);
        if (modalInstance) {
            modalInstance.dispose();
        }
        document.body.removeChild(this.element);
        if (this.options.onDispose) {
            this.options.onDispose(this);
        }
    };


    _window.BootDialog = {


        fire: function (options, option2) {

            if (typeof options === 'undefined') options = {};

            if (typeof options === 'string') {
                options = {
                    body: options,
                    title: (option2) ? option2 : '',
                };
            }

            if (options.buttons) {

                options.onCreate = function (modal) {

                    //涉及到事件委托
                    modal.element.onclick = function (event) {
                        event.preventDefault();
                        var target = event.target;
                        var key = target.dataset.key;

                        if (key !== undefined && target.classList.contains('btn')) {
                            const modalInstance = bootstrap.Modal.getInstance(modal.element);
                            if (modalInstance) {
                                modalInstance.hide();
                            }
                            modal.options.buttons[key].action(modal);
                        }

                    };
                }
            }
            return new Modal(options);
        }

        //alert()

        //config()?
    };

})(window);

