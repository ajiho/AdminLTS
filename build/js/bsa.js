;(function (undefined) {
    "use strict"
    var _global;


    //单例模式
    var instance;

    //对象字面量创建一个对象
    var BootstrapAdmin = {
        init: function (options) {
            if (!instance) instance = new BSA(options);
            return instance;
        }
    };

    //BSA构造函数
    function BSA(options) {
        this._init(options);
    }

    BSA.prototype._init = function (options) {

        //默认选项
        this.options = {
            //是否关闭控制台的广告输出
            consoleAdvert: true,

            //是否禁用所有的input自动记忆功能

            //是否禁用无效表单提交

            //是否全局开启bootstrap的气泡组件功能

            //是否全局开启bootstrap的提示组件功能

            //移动端时点击左侧菜单后是否立马关闭菜单
        };

        //参数合并
        for (let option in options) {
            this.options[option] = options[option]
        }
        //规定tab插件实例名称为tabs
        this.tabs = null;
        //系统初始化
        this._systemInit()
        //bsa的事件监听初始化
        this._addEventListener();
        //tab插件初始化
        this._tabPluginInit('.bsa-main');
    }

    //初始化方法
    BSA.prototype.init = function (options) {
        console.log(options);
    }
    //设置侧边栏颜色
    BSA.prototype.setTheme = function (options) {
        console.log("我也可以直接调用setTheme");
    }

    //bsa其它插件事件处理
    BSA.prototype._addEventListener = function () {

        let self = this;
        //左侧菜单展开折叠逻辑
        delegate(document.body, 'transitionend', '.bsa-sidebar-body > ul', function (event) {
            let target = event.target;
            if (target.matches('ul')) {
                target.removeAttribute('style');
            }
        });

        delegate(document.body, 'click', '.bsa-sidebar-body > ul a', function (event) {
            let a = this;
            if (a.matches('.has-children')) {
                event.preventDefault();
                if (!(a.classList.contains('open'))) {//展开
                    a.classList.add('open');
                    self._menuToggle(a, 1);
                } else {
                    self._menuToggle(a, 0);
                    a.classList.remove('open');
                }
            }
            // 兄弟节点处理
            siblings(a.parentNode).forEach((li) => {
                Array.from(li.children).forEach((item) => {
                    if (item.matches('a.active')) {
                        item.classList.remove('active');
                    }
                    if (item.matches('a.has-children.open')) {
                        self._menuToggle(item, 0);
                        item.classList.remove('open');
                    }
                })
            })
        });
        //调色板侧边栏
        delegate(document.body, 'click', 'div[class^=sidebarcolor]', function (event) {
            event.preventDefault();
            let sidebarcolor = this.getAttribute('class');


            let sidebarcolorList = [];
            for (let i = 0; i < 8; i++) {
                sidebarcolorList.push(`sidebarcolor${i + 1}`);
            }

            if (sidebarcolor === "sidebarcolor0") {
                document.documentElement.classList.remove("color-sidebar");
                sidebarcolorList.map(function (item) {
                    document.documentElement.classList.remove(item);
                });
            } else {
                document.documentElement.classList.add("color-sidebar", sidebarcolor);
                sidebarcolorList.splice(sidebarcolorList.indexOf(sidebarcolor), 1);
                document.documentElement.classList.remove(...sidebarcolorList);
            }
        });
        //调色板头部
        delegate(document.body, 'click', 'div[class^=headercolor]', function (event) {
            event.preventDefault();

            let headercolor = this.getAttribute('class');
            let headercolorList = [];
            for (let i = 0; i < 8; i++) {
                headercolorList.push(`headercolor${i + 1}`);
            }

            if (headercolor === "headercolor0") {
                document.documentElement.classList.remove("color-header");
                headercolorList.map(function (item) {
                    document.documentElement.classList.remove(item);
                });
            } else {
                document.documentElement.classList.add("color-header", headercolor);
                headercolorList.splice(headercolorList.indexOf(headercolor), 1);
                document.documentElement.classList.remove(...headercolorList);
            }
        });

        //搜索框关闭
        delegate(document.body, 'click', '.bsa-search-close-btn', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-search-form-wrapper').classList.remove('open');
        });

        //搜索框打开
        delegate(document.body, 'click', '.bsa-search-form-toggler', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-search-form-wrapper').classList.add('open');
        });

        //移动端左侧菜单Toggler
        delegate(document.body, 'click', '.bsa-sidebar-toggler', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-sidebar').classList.add('open');
            document.body.insertAdjacentHTML('beforeEnd', `<div class="bsa-mask"></div>`);
        });


        //遮罩层点击
        delegate(document.body, 'click', '.bsa-mask', function (event) {
            event.preventDefault();
            this.remove();
            document.querySelector('.bsa-sidebar').classList.remove('open');
        });


    }


    /**
     * 系统杂项初始化包括bootstrap的插件启用
     * @private
     */
    BSA.prototype._systemInit = function () {

        //优化:使无效表单禁止提交
        document.querySelectorAll('form:not([action]),form[action="#"]').forEach(function (form) {
            form.addEventListener('submit', event => {
                event.preventDefault();
            });
        });

        //禁止所有的input记忆输入内容
        document.querySelectorAll('input').forEach((e) => {
            e.setAttribute("AutoComplete", "off");
        });

        //bootstrap气泡组件初始化
        [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });
        //bootstrap提示组件初始化
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });

        if (this.options.consoleAdvert === true) {
            this._advertLog();
        }

    }


    BSA.prototype._advertLog = function () {


        console.log("\n" +
            "   ___  _______ \n" +
            "  / _ )/ __/ _ |\n" +
            " / _  |\\ \\/ __ |\n" +
            "/____/___/_/ |_|\n" + "\n作者:ajiho\n" + "描述:基于bootstrap5.x设计的一个纯静态开源免费的响应式后台管理HTML模板，旨在快速让喜欢用bootstrap开发后台的程序员有个轻松愉悦的起点。\n无论您是用于项目开发、学习、还是教学演示、希望能给个star，这将会是我最大的动力!\n" + "Gitee开源地址:https://gitee.com/ajiho/bootstrap-admin\n");
    }


    /**
     * tab插件适配bsa模板相关逻辑
     * @private
     */
    BSA.prototype._tabPluginInit = function (selector) {

        let self = this;
        let tabEl = document.querySelector(selector);
        if (tabEl instanceof HTMLElement) {
            //tab插件初始化
            this.tabs = new BootstrapTabs({
                selector: selector
            });
            //必须每个a链接都绑定一个自己的id
            document.querySelectorAll('.bsa-sidebar-body > ul a:not(.has-children):not([target])').forEach(function (aEl) {
                let pageid = aEl.dataset.pageid;
                if (pageid === undefined) {//如果自己设置pageid就不再自动设置
                    aEl.dataset.pageid = guid();
                }
            });

            //给带有.active的添加到右边的tab
            document.querySelectorAll('.bsa-sidebar-body > ul a.active:not(.has-children):not([target])').forEach((el) => {
                //得到当前a链接的href
                let url = el.getAttribute('href');
                let title = el.innerText;
                let pageId = el.dataset.pageid;
                self.tabs.addTabs({
                    id: pageId,
                    title: title,
                    close: true,
                    url: url,
                });
            });

            //a链接不带有target属性的才匹配
            delegate(document.body, 'click', '.bsa-sidebar-body > ul a:not(.has-children):not([target])', function (event) {
                event.preventDefault();
                //得到当前a链接的href
                let url = this.getAttribute('href');
                let title = this.innerText;
                let pageId = this.dataset.pageid;
                self.tabs.addTabs({
                    id: pageId,
                    title: title,
                    close: true,
                    url: url,
                });
            });
        }


    }


    /**
     *
     * @param element 需要传入a的dom
     * @param type 1:展开 0:闭合
     * @private
     */
    BSA.prototype._menuToggle = function (element, type) {
        //找到ul元素
        let ul = element.nextElementSibling;
        //先计算得到ul可滚动的高度scrollHeight
        let ulSh = ul.scrollHeight + 'px';
        if (type === 1) {
            ul.style.cssText = 'display:block;height:0;overflow: hidden;';
            void element.scrollHeight;
            ul.style.cssText = `display:block;height:${ulSh};overflow: hidden;`;
        } else if (type === 0) {
            ul.style.cssText = `display:block;height:${ulSh};overflow: hidden;`;
            void element.scrollHeight;
            ul.style.cssText = `display:block;height:0;overflow: hidden;`;
        }
    }


    // 最后将插件对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = BootstrapAdmin;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return BootstrapAdmin;
        });
    } else {
        !('BootstrapAdmin' in _global) && (_global.BootstrapAdmin = BootstrapAdmin);
    }
}());