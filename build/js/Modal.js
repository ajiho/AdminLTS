let i = 0;
// 默认参数
const Default = {
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

class Modal {

    constructor(config) {
        //参数合并
        this._config = Object.assign({}, Default, config)
        this.id = "bsa-model-" + i;
        i++;
        //展示modal
        this.show();
        //事件触发
        if (this._config.onCreate) {
            this._config.onCreate(this);
        }
    }

    show() {
        if (!this.element) {//如果元素不存在,就创建
            this.createContainerElement();
            let modalInstance;
            if (this._config.modalOptions) {
                modalInstance = new bootstrap.Modal(this.element, this._config.modalOptions);
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
        if (this._config.title) {
            //头部展示
            this.headerElement.style.display = '';
            this.titleElement.innerHTML = this._config.title
        } else {
            this.headerElement.style.display = 'none';
        }

        if (this._config.body) {

            this.bodyElement.style.display = '';
            this.bodyElement.innerHTML = this._config.body
        } else {
            this.bodyElement.style.display = 'none';
        }

        if (this._config.footer) {
            this.footerElement.innerHTML = this._config.footer
        }


        if (this._config.buttons) {

            let btx = '';
            this._config.buttons.some(function (item, index) {
                btx += '<button class="btn ' + item.btnClass + '" data-key="' + index + '" >' + item.text + '</button>';
            });

            this.footerElement.insertAdjacentHTML("afterbegin", btx);//在调用元素内部后面添加一个子元素 即取代了最后的子元素
        }

        if (!this._config.btnShow) {
            var btn = this.footerElement.querySelector('button[data-bs-dismiss=modal]');
            btn.style.display = 'none';
        }

        //iframe
        if (this._config.url) {
            // console.log(this._config.url)

            // var btn = this.footerElement.querySelector('button[data-bs-dismiss=modal]');
            // btn.style.display = 'none';
            var iframe = `<iframe src="${this._config.url}"
                    style="height: calc(100vh - 14rem);" class="w-100"
                    ></iframe>`;
            this.bodyElement.innerHTML = '';
            this.bodyElement.classList.add('p-0');
            this.bodyElement.insertAdjacentHTML("afterbegin", iframe);
            this.dialogElement.classList.remove('modal-dialog-scrollable');

        }
    }


    //Modal原型对象整一个方法用于创建模态框dom元素
    createContainerElement() {
        //提取出this,否则函数内调用会错乱
        const self = this;

        //给dom设置各种属性
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.setAttribute("class", "modal " + this._config.modalClass);
        this.element.setAttribute("tabindex", "-1");
        this.element.setAttribute("aria-labelledby", this.id);
        this.element.setAttribute("aria-hidden", "true");

        //组合modal
        this.element.innerHTML = `
                <div class="modal-dialog ${this._config.modalDialogClass}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel-${this._config.id}"></h5>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn ${this._config.btnClass}" data-bs-dismiss="modal">${this._config.btnText}</button>
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
            if (self._config.onShown) {
                self._config.onShown(self);
            }
        });
    }


    hide() {
        const modalInstance = bootstrap.Modal.getInstance(this.element);
        if (modalInstance) {
            modalInstance.hide();
        }
    }

    dispose() {
        const modalInstance = bootstrap.Modal.getInstance(this.element);
        if (modalInstance) {
            modalInstance.dispose();
        }
        document.body.removeChild(this.element);
        if (this._config.onDispose) {
            this._config.onDispose(this);
        }
    }

}

export default {
    show(op1, op2) {
        if (typeof op1 === 'undefined') op1 = {};

        if (typeof op1 === 'string') {
            op1 = {
                body: op1,
                title: (op2) ? op2 : '',
            };
        }
        return new Modal(op1);
    }
}