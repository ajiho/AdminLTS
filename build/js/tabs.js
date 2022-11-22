/*!
 * bootstrap-tabs.js
 * Author: ajiho
 * License: MIT
 */
;(function (undefined) {
    "use strict"
    var _global;

    //区分模态框,使得弹出模态框唯一
    var i = 0;

    //构造函数
    function BootstrapTabs(options) {
        this._init(options);
    }


    //初始化
    BootstrapTabs.prototype._init = function (options) {


        //插件默认参数
        this.options = {
            selector: null,
            default: [],
        }


        for (let option in options) {
            this.options[option] = options[option]
        }


        //命名空间
        this.namespace = 'BootstrapTabs';

        //缓存tab的key
        this.tabsCacheKey = 'bstabs';


        //id,保证实例化多个对象的时候不冲突
        this.id = this.namespace + i;
        i++;

        //检测选择器必须传递
        if (this.options.selector === null) {
            throw new Error('Selector is required');
        }


        //获取当前容器
        let containerEl = document.querySelector(this.options.selector);
        if (!containerEl instanceof HTMLElement) {
            throw new Error('Invalid selector');
        }

        //容器
        this.container = containerEl;
        this._buildStyle();
        //构建容器内容
        this._buildContainer();
        //事件监听
        this._addEventListener();
        //tab回显
        this._restoreTabs();

    }


    //回显tabs
    BootstrapTabs.prototype._restoreTabs = function () {


        let self = this;

        //从缓存里面读
        let cacheTabs = this._getTabsFromCache();


        if (cacheTabs.length !== 0) { //从缓存里echo

            let activeTemp = null;

            cacheTabs.forEach(function (item) {
                // self.addTabs(item)
                //这里应该仅仅是添加tab
                self._addLazyTabs(item);

                //滚动到指定区域
                // self.scrollToTab(self.findTab(item.id));

                //找到特定选项卡
                if (item.hasOwnProperty('active') && item.active === true) {

                    activeTemp = item;

                }
                //滚动到指定区域
                self.scrollToTab(self.findTab(item.id));


            });

            if (activeTemp !== null) {
                //激活特定选项卡
                let tab = self.tabWraper.querySelector(`li[data-pageid="${activeTemp.id}"]`);
                tab.children[0].classList.add('active');
                //滚动到激活区域
                self.scrollToTab(self.findTab(activeTemp.id));


                //激活惰性tab的面板
                self._activeLazyTab(activeTemp.id, activeTemp.url);


            }

        } else {
            console.log('初始化默认数据')
        }
    }


    //addTabs
    BootstrapTabs.prototype.addTabs = function (options, refreshPage) {

        //默认选项
        var defaultTabOptions = {
            id: guid(),
            title: "新页面",
            close: true,
        };

        //参数合并
        for (let option in options) {
            defaultTabOptions[option] = options[option]
        }

        //参数合并
        options = defaultTabOptions;


        if (this.findTabPanel(options.id) === null) {

            let tabTemplate = `
        <li class="nav-item  flex-shrink-0" role="presentation" data-pageid="${options.id}">
                                <button class="nav-link border" type="button" role="tab">
                                        ${options.title}
                                </button>
                            </li>
        `
            //是否允许关闭
            if (options.close) {
                tabTemplate = `
                    <li class="nav-item  flex-shrink-0" role="presentation" data-pageid="${options.id}">
                                <button class="nav-link border" type="button" role="tab">
                                        ${options.title}
                                    <i class="bi bi-x ms-2 closetab"></i>
                                </button>
                            </li>
        `
            }


            //加入tab
            this.tabWraper.insertAdjacentHTML("beforeEnd", tabTemplate);
            let tabPanelTemplate = `
                     <div class="h-100 tab-pane" data-pageid="${options.id}" role="tabpanel" tabindex="0">
                        <iframe src="${options.url}" class="w-100 h-100"></iframe>
                    </div>
        `;
            this.tabContentWraper.insertAdjacentHTML("beforeEnd", tabPanelTemplate);


        }


        //同步存缓存里面
        if (this._inCache(options.id) === null) {

            //先取
            let cacheTabs = this._getTabsFromCache();

            //追加属性 active
            options.active = false;
            cacheTabs.push(options)

            //重新设置回去
            this._setTabsCache(cacheTabs);
        }

        //激活tab
        this.activeTabByPageId(options.id);

        //激活缓存里对应的tab
        this._activeCaCheTabByPageId(options.id);

        if (refreshPage === true) {
            this.refreshTabById(options.id, options.url);
        }

    }


    //激活惰性tab的面板
    BootstrapTabs.prototype._activeLazyTab = function (pageID, url) {
        let self = this;
        let tabPanel = self.findTabPanel(pageID);
        let iframe = tabPanel.querySelector('iframe');

        if (!(iframe instanceof HTMLElement)) {//不存在就添加

            let iframeTemplate = `<iframe src="${url}" class="w-100 h-100"></iframe>`;
            tabPanel.insertAdjacentHTML("beforeEnd", iframeTemplate);
            //激活样式
            tabPanel.classList.add(...['active', 'show']);
        }
    }


    //激活缓存里面的项目
    BootstrapTabs.prototype._activeCaCheTabByPageId = function (pageID) {


        //激活前删除所有的激活样式
        let cacheTabs = this._getTabsFromCache();
        cacheTabs.forEach(function (tab) {
            tab.active = tab.id === pageID;
        });

        //再重新设置回去
        this._setTabsCache(cacheTabs);


    }


    //从缓存里取菜单
    BootstrapTabs.prototype._getTabsFromCache = function () {
        let tabsData = JSON.parse(localStorage.getItem(this.tabsCacheKey));
        if (tabsData === null) {
            tabsData = [];
        }
        return tabsData;
    }


    //设置tabs缓存
    BootstrapTabs.prototype._setTabsCache = function (tabsArr) {
        localStorage.setItem(this.tabsCacheKey, JSON.stringify(tabsArr));
    }


    //添加lazy的tab
    BootstrapTabs.prototype._addLazyTabs = function (options) {

        let tabTemplate = `
        <li class="nav-item  flex-shrink-0" role="presentation" data-pageid="${options.id}" >
                                <button class="nav-link border" type="button" role="tab">
                                        ${options.title}
                                </button>
                            </li>
        `
        //是否允许关闭
        if (options.close) {
            tabTemplate = `
                    <li class="nav-item  flex-shrink-0" role="presentation" data-pageid="${options.id}">
                                <button class="nav-link border" type="button" role="tab">
                                        ${options.title}
                                    <i class="bi bi-x ms-2 closetab"></i>
                                </button>
                            </li>
        `
        }

        //加入tab
        this.tabWraper.insertAdjacentHTML("beforeEnd", tabTemplate);

        let tabPanelTemplate = `
                     <div class="h-100 tab-pane" data-pageid="${options.id}" role="tabpanel" tabindex="0" data-url="${options.url}">
                 
                    </div>
        `;
        this.tabContentWraper.insertAdjacentHTML("beforeEnd", tabPanelTemplate);


    }


    //判断缓存里是否已经存在这个tab
    BootstrapTabs.prototype._inCache = function (pageid) {

        let ret = null;
        let ss = JSON.parse(localStorage.getItem('menus'));
        if (ss !== null) {
            ss.forEach(function (item) {
                if (item.id === pageid) {
                    ret = item;
                }
            })
        }
        return ret;
    }


    //激活当前tab
    BootstrapTabs.prototype.activeTabByPageId = function (pageId) {

        let self = this;

        //激活前删除所有的激活样式
        this.tabWraper.querySelectorAll('li button').forEach(function (btnEl) {
            btnEl.classList.remove('active');
        })

        this.tabContentWraper.querySelectorAll('div.tab-pane').forEach(function (panelEl) {
            panelEl.classList.remove(...['active', 'show']);
        })

        //激活tab
        let tab = this.tabWraper.querySelector(`li[data-pageid="${pageId}"]`);
        tab.children[0].classList.add('active');

        //激活面板
        let tabPanel = self.findTabPanel(pageId);
        //获取url
        let url = tabPanel.dataset.url;
        let iframe = tabPanel.querySelector('iframe');
        if (!(iframe instanceof HTMLElement)) {//不存在就添加
            let iframeTemplate = `<iframe src="${url}" class="w-100 h-100"></iframe>`;
            tabPanel.insertAdjacentHTML("beforeEnd", iframeTemplate);
        }
        //激活样式
        tabPanel.classList.add(...['active', 'show']);

        //滚动到指定tab
        this.scrollToTab(tab);


    }


    //滚动到指定tab
    BootstrapTabs.prototype.scrollToTab = function (element) {
        // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
        this.tabWraper.scrollLeft = element.offsetLeft - this.tabWraper.offsetWidth / 2 + element.offsetWidth / 2;
    }


    //根据pageid找到该TAB的dom
    BootstrapTabs.prototype.findTab = function (pageId) {
        let results = null;
        this.tabWraper.querySelectorAll('li.nav-item').forEach((tab) => {
            if (this.getPageId(tab) === pageId) {
                results = tab;
            }
        });
        return results;
    }


    //查找该tab面板
    BootstrapTabs.prototype.findTabPanel = function (pageId) {
        let results = null;
        this.tabContentWraper.querySelectorAll('div.tab-pane').forEach((tabPane) => {
            if (this.getPageId(tabPane) === pageId) {
                results = tabPane;
            }
        });
        return results;
    }


    //根据tab(就是每个li元素)
    BootstrapTabs.prototype.getPageId = function (element) {
        return element.dataset.pageid;
    }


    //样式构建
    BootstrapTabs.prototype._buildStyle = function () {
        let styleEl = document.querySelector(`style[namespace="${this.namespace}"]`);
        if (!(styleEl instanceof HTMLStyleElement)) {
            let style = document.createElement('style');
            style.setAttribute('namespace', this.namespace);
            style.textContent = `
                    .${this.namespace} li.nav-item.flex-grow-1.overflow-hidden > ul {
                        /* 可以使窗口平稳滚动 */
                        scroll-behavior: smooth;
                        overflow: auto;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    /*谷歌浏览器*/
                    .${this.namespace} li.nav-item.flex-grow-1.overflow-hidden > ul::-webkit-scrollbar {
                        display: none;
                    }
                    .${this.namespace} .closetab:hover {
                        color: #dc3545;
                    }
            `;
            document.head.appendChild(style);
        }
    }


    //构建容器
    BootstrapTabs.prototype._buildContainer = function () {

        //给容器增加样式
        this.container.classList.add(...['h-100', 'd-flex', 'flex-column', this.namespace, this.id]);

        //结构
        let template = `
                <!--tab区域-->
                <ul class="nav nav-pills border flex-nowrap">

                    <!--左侧按钮-->
                    <li class="nav-item border-end flex-shrink-0">
                        <button class="nav-link leftbtn" type="button" role="tab"><i class="bi bi-caret-left"></i>
                        </button>
                    </li>

                    <!--tab区域-->
                    <li class="nav-item flex-grow-1 overflow-hidden">
                        <ul class="nav  nav-pills position-relative flex-nowrap" role="tablist">

                        </ul>
                    </li>

                    <!--操作区域-->
                    <li class="nav-item border-start flex-shrink-0">
                        <div class="dropdown">
                            <button class="nav-link" data-bs-toggle="dropdown" type="button" role="tab">
                                <i class="bi bi-caret-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button class="dropdown-item rollback-current" type="button">回到当前</button>
                                </li>
                                <li>
                                    <button class="dropdown-item refresh-current" type="button">刷新当前</button>
                                </li>
                                <li>
                                    <button class="dropdown-item close-current" type="button">关闭当前</button>
                                </li>
                                <li>
                                    <button class="dropdown-item close-other" type="button">关闭其他</button>
                                </li>
                                <li>
                                    <button class="dropdown-item close-all" type="button">关闭全部</button>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <!--向右滑动按钮-->
                    <li class="nav-item border-start flex-shrink-0">
                        <button class="nav-link rightbtn" type="button" role="tab"><i class="bi bi-caret-right"></i>
                        </button>
                    </li>
                </ul>
                    
                <!--tab内容区域-->
                <div class="tab-content flex-grow-1">

                </div>
        `;

        //加入到容器中
        this.container.insertAdjacentHTML("beforeEnd", template);

        //查找dom备用避免后面疯狂的查找

        //单个tab的容器
        this.tabWraper = this.container.querySelector(`li.nav-item.flex-grow-1.overflow-hidden>ul`);
        //单个tab面板的容器
        this.tabContentWraper = this.container.querySelector(`.tab-content`);
        //向左滚动的btn
        this.leftBtn = this.container.querySelector('.leftbtn');
        //用于向右滚动的btn
        this.rightBtn = this.container.querySelector('.rightbtn');
    }


    //事件监听绑定
    BootstrapTabs.prototype._addEventListener = function () {
        console.log('事件注册完毕');

        let self = this;

        //事件监听点击tab触发
        delegate(self.tabWraper, 'click', 'li button.nav-link', function () {
            self.activeTabByPageId(self.getPageId(this.parentNode));
            self._activeCaCheTabByPageId(self.getPageId(this.parentNode));
        }, '.closetab');


        //事件监听点击tab触发关闭图标
        delegate(self.tabWraper, 'click', '.closetab', function () {
            let pageid = self.getPageId(this.parentNode.parentNode);
            self.closeTabByPageId(pageid);
        });


        //左边按钮被单击
        delegate(self.container, 'click', '.leftbtn', function () {
            self.tabWraper.scrollLeft = self.tabWraper.scrollLeft - self.tabWraper.offsetWidth;

        });

        //右边按钮被单击
        delegate(self.container, 'click', '.rightbtn', function () {
            self.tabWraper.scrollLeft = self.tabWraper.scrollLeft + self.tabWraper.offsetWidth;
        });


        //监听tab容器滚动事件
        this.tabWraper.addEventListener('scroll', () => {
            //可视区域的宽度
            let clientWidth = this.tabWraper.clientWidth;
            //滚动条在x轴的滚动距离
            let scrollLeft = this.tabWraper.scrollLeft;
            //内容可视区域的高度加上溢出（滚动）的距离
            let scrollWidth = this.tabWraper.scrollWidth;


            //最右边,保留2px是减少为了兼容误差，否则哪怕滚动到最右侧它不会执行逻辑
            if (parseInt(scrollWidth) - parseInt(clientWidth + scrollLeft) < 2) {
                this.rightBtn.classList.add('disabled');
            }

            if (parseInt(scrollWidth) - parseInt(clientWidth + scrollLeft) >= 2) {
                this.rightBtn.classList.remove('disabled');
            }

            if (scrollLeft === 0) {//最左边
                this.leftBtn.classList.add('disabled');
            }

            if (scrollLeft > 0) {
                this.leftBtn.classList.remove('disabled');
            }
        });


        //回到当前
        delegate(self.container, 'click', '.rollback-current', function () {
            self.activeTabByPageId(self.getActivePageId());
        });


        //刷新当前
        delegate(self.container, 'click', '.refresh-current', function () {
            self.refreshTabById(self.getActivePageId());
        });

        //关闭当前
        delegate(self.container, 'click', '.close-current', function () {
            self.closeCurrentTab();
        });

        //关闭其它
        delegate(self.container, 'click', '.close-other', function () {
            self.closeExceptByPageid(self.getActivePageId());
        });

        //关闭全部
        delegate(self.container, 'click', '.close-all', function () {
            self.closeAllTabs();
        });
    }


    //关闭所有tab
    BootstrapTabs.prototype.closeAllTabs = function () {
        let self = this;
        self.tabWraper.querySelectorAll('li.nav-item').forEach(function (tab) {
            if (tab.querySelector('.bi-x') instanceof HTMLElement) {

                let pageid = self.getPageId(tab);
                self.closeTabOnly(pageid);

                //从缓存中删除
                self._closeCacheTabByPageId(pageid);

            }
        });

        //选中那些禁止删除的取第一个,将其激活
        let willActiveTab = self.tabWraper.querySelectorAll('li')[0];
        if (willActiveTab instanceof HTMLElement) {

            let pageid = self.getPageId(willActiveTab);

            self.activeTabByPageId(pageid);

            //从缓存中激活某项
            self._activeCaCheTabByPageId(pageid)


        }
    }


    //关闭除了传入id的所有的tab
    BootstrapTabs.prototype.closeExceptByPageid = function (pageId) {
        let self = this;
        self.tabWraper.querySelectorAll('li.nav-item').forEach(function (tab) {
            let pid = self.getPageId(tab);
            if (pid !== pageId) {
                self.closeTabOnly(pid);
                self._closeCacheTabByPageId(pid);
            }
        })
    }


    //仅仅是关闭tab
    BootstrapTabs.prototype.closeTabOnly = function (pageId) {
        this.findTab(pageId).remove();
        this.findTabPanel(pageId).remove();
    }

    //关闭当前激活tab
    BootstrapTabs.prototype.closeCurrentTab = function () {
        //得到当前激活的id
        let pageId = this.getActivePageId();
        if (this.canRemoveTab(pageId)) {//判断能不能删除
            this.closeTabByPageId(pageId);

        }
    }


    //根据id判断当前tab能否删除
    BootstrapTabs.prototype.canRemoveTab = function (pageId) {

        let result = false;
        if (this.findTab(pageId).querySelector(".bi-x") instanceof HTMLElement) {
            result = true;
        }
        return result;
    }


    /**
     * 根据pageID刷新当前tab
     * @param pageId 页面id
     * @param url 新的url地址
     */
    BootstrapTabs.prototype.refreshTabById = function (pageId, url) {
        let iframe = this.findTabPanel(pageId).querySelector('iframe');
        if (url) {
            iframe.setAttribute('src', url);
        } else {
            // http://quanzhan.applemei.com/webStack/TlRjd013PT0=
            iframe.contentWindow.location.reload()
        }
    }


    //得到当前激活的tab
    BootstrapTabs.prototype.getActivePageId = function () {
        let pageid = null;
        let tabInsideBtns = this.tabWraper.querySelectorAll('li.nav-item button.nav-link');
        //遍历看看是否包含.active
        tabInsideBtns.forEach(btn => {
            if (btn.classList.contains('active')) {
                pageid = this.getPageId(btn.parentNode);
            }
        })
        return pageid;
    }


    //通过 pageid 关闭tab
    BootstrapTabs.prototype.closeTabByPageId = function (pageid) {

        let tab = this.findTab(pageid);
        let tabPanel = this.findTabPanel(pageid);


        //判断当前tab是否处于活动状态
        if (tab.children[0].classList.contains('active')) {//是激活的tab
            //把active传递给其它的tab

            //将要要激活的pageid
            let willPageId = null;

            if (tab.nextElementSibling instanceof HTMLElement) {//后面有tab
                //得到后面tab的pageid作为将要激活的tab id
                willPageId = this.getPageId(tab.nextElementSibling);
            } else if (tab.previousElementSibling instanceof HTMLElement) { //看看前面是否有tab
                willPageId = this.getPageId(tab.previousElementSibling);
            }


            if (willPageId) {//如果该id存在就激活
                //先删除再滚动
                tab.remove();
                tabPanel.remove();

                //从缓存中关闭
                this._closeCacheTabByPageId(pageid);
                this.activeTabByPageId(willPageId);
                //激活特定项目
                this._activeCaCheTabByPageId(willPageId);

            }
        }

        tab.remove();
        tabPanel.remove();

        this._closeCacheTabByPageId(pageid);


    }


    //从缓存中删除tab菜单
    BootstrapTabs.prototype._closeCacheTabByPageId = function (pageid) {
        //删除缓存中对应的tab
        let cacheTabs = this._getTabsFromCache();

        for (let i = 0; i < cacheTabs.length; i++) {
            if (cacheTabs[i].id === pageid) {
                cacheTabs.splice(i, 1)
            }
        }
        //存入缓存
        this._setTabsCache(cacheTabs);
    }


    // 最后将插件对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = BootstrapTabs;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return BootstrapTabs;
        });
    } else {
        !('BootstrapTabs' in _global) && (_global.BootstrapTabs = BootstrapTabs);
    }
}());