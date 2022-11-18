;(function (undefined) {
    "use strict"
    var _global;

    //构造函数
    function BSA(options) {
        this._init(options);
    }

    BSA.prototype._init = function (options) {
        //插件初始化
        this.tabs = new BootstrapTabs({
            selector: '.bsa-main'
        });
        //系统初始化
        this._systemInit()
        //bsa的事件监听初始化
        this._addEventListener();
        //bsa模板适配tab插件
        this._tabPluginInit();

    }

    //设置头部颜色
    BSA.prototype.hello = function (options) {
        console.log("hello");
    }

    //设置侧边栏颜色
    BSA.prototype.setTheme = function (options) {
        console.log("hello");
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
        delegate(document.body, 'click', '.bsa-sidebar-body > ul a.has-children', function (event) {
            event.preventDefault();

            let a_has_children = this;

            if (!(a_has_children.classList.contains('open'))) {//展开
                a_has_children.classList.add('open');
                self._menuToggle(a_has_children, 1);
            } else {
                self._menuToggle(a_has_children, 0);
                a_has_children.classList.remove('open');
            }

            // 兄弟节点处理
            siblings(a_has_children.parentNode).forEach((li) => {
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

    }

    /**
     * tab插件适配bsa模板相关逻辑
     * @private
     */
    BSA.prototype._tabPluginInit = function () {

        let self = this;

        //必须每个a链接都绑定一个自己的id
        document.querySelectorAll('.bsa-sidebar-body > ul a:not(.has-children):not([target])').forEach(function (aEl) {
            aEl.dataset.pageid = guid();
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
        module.exports = new BSA();
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return new BSA();
        });
    } else {
        !('BSA' in _global) && (_global.BSA = new BSA());
    }
}());