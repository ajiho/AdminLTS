/**
 * --------------------------------------------
 * BSA Main.js
 * License MIT
 * --------------------------------------------
 */


import Util from "./Util";
import md5 from "md5";
import util from "./Util";


const TAB_CONTAINER_MOUNT_CLASS = ['h-100', 'd-flex', 'flex-column', 'bsa-tabs'];
const TAB_IFRAME_LEAVE_CLASS = 'out';
const TAB_IFRAME_FADEIN_CLASS = 'fadeIn';
const TAB_ID_KEY = 'data-tab-id';
const TAB_URL_KEY = 'data-tab-url';
const TAB_CACHE_KEY = 'tabs';

const SIDEBARCOLOR_CACHE_KEY = 'sidebarcolor';
const HEADERCOLOR_CACHE_KEY = 'headercolor';


const TAB_LEFT = `<li class="nav-item caret-btn caret-btn-left  border-end" role="presentation"><button class="nav-link" style="width: 50px"><i class="bi bi-caret-left"></i></button></li>`;
const TAB_ROLL_AREA = `<li class="nav-item flex-grow-1 d-flex flex-nowrap align-items-center position-relative" role="presentation"></li>`;
const TAB_ACTIONS = `
                    <li class="nav-item caret-btn border-start dropdown" role="presentation">
                        <button class="nav-link" style="width: 50px" data-bs-toggle="dropdown"><i class="bi bi-caret-down"></i></button>
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
                    </li>
`;
const TAB_RIGHT = `<li class="nav-item caret-btn caret-btn-right  border-start" role="presentation"><button class="nav-link" style="width: 50px"><i class="bi bi-caret-right"></i></button></li>`;

const TAB_UPPER_HALF_TPL = `<ul class="nav nav-pills border flex-nowrap" role="tablist">${TAB_LEFT}${TAB_ROLL_AREA}${TAB_ACTIONS}${TAB_RIGHT}</ul>`;
const TAB_LOWER_HALF_TPL = `<div class="flex-grow-1 position-relative"></div>`;


const TAB_ITEM = `<button class="nav-link  border flex-shrink-0" ${TAB_URL_KEY}="{{url}}"  ${TAB_ID_KEY}="{{id}}" type="button">{{title}}</button>`
const TAB_ITEM_CLOSE = `<button class="nav-link border flex-shrink-0" ${TAB_URL_KEY}="{{url}}" ${TAB_ID_KEY}="{{id}}" type="button">{{title}}<i class="bi bi-x  closetab"></i></button>`

const TAB_IFRAME = `<iframe src="{{url}}" class="w-100 h-100 d-inline-block  ${TAB_IFRAME_LEAVE_CLASS}" ${TAB_ID_KEY}="{{id}}"></iframe>`;


//右键菜单的容器
const TBA_CONTEXTMENU_TPL = `
            <div class="list-group bsa-contextmenu shadow-sm">
                <button type="button" class="list-group-item list-group-item-action refresh">刷新</button>
                <button type="button" class="list-group-item list-group-item-action close">关闭</button>
                <button type="button" class="list-group-item list-group-item-action close-other">关闭其它</button>
            </div>`;


const Default = {
    //控制台广告
    consoleLog: true,
    //tab组件挂载元素
    tabEl: '.bsa-main',
    //默认初始化的tab
    defaultTabs: [],
    //淡入动画
    tabFadein: true,
    //tab缓存
    tabCache: true,
    //点击左侧菜单项后是否立马关闭(仅在iframe模式下有效)
    sideMenuClickClose: false,
    //tab激活展开侧边栏导航对应的位置
    tabActiveOpenInSideMenuLocation: true,
}


//单个tab的默认选项
const tabDefault = {
    //标题
    title: "",
    //连接
    url: '',
    //tab唯一标志
    id: null,
    //是否可以关闭
    close: true
}


class Main {

    constructor(config) {
        //参数合并
        this._config = Object.assign({}, Default, config)
        this._init()
    }

    _init() {

        //广告是否输出
        if (this._config.consoleLog === true) {
            this._advert();
        }

        //事件处理
        this._addEventListener();

        //主题色回显
        this.restoreColor();

        //tab初始化
        this._tabInit();
    }


    restoreColor() {

        let sidebarcolor = localStorage.getItem(SIDEBARCOLOR_CACHE_KEY);
        let headercolor = localStorage.getItem(HEADERCOLOR_CACHE_KEY);
        if (sidebarcolor !== null) {
            document.documentElement.classList.add("color-sidebar", sidebarcolor);
        }
        if (headercolor !== null) {
            document.documentElement.classList.add("color-header", headercolor);
        }
    }


    _tabInit() {
        //容器
        this._tab_container = document.querySelector(this._config.tabEl);
        //检测是否是一个正常的dom元素
        if (this._tab_container instanceof HTMLElement) {


            //继续执行下面的逻辑
            this._tab_container.classList.add(...TAB_CONTAINER_MOUNT_CLASS);
            //加入到容器中
            this._tab_container.insertAdjacentHTML("beforeEnd", `${TAB_UPPER_HALF_TPL}${TAB_LOWER_HALF_TPL}`);
            //单个tab的容器
            this._tab_wraper = this._tab_container.querySelector(`li.flex-grow-1`);
            //单个tab面板的容器
            this._tab_content_wraper = this._tab_container.querySelector(`div.flex-grow-1`);

            //构建右键菜单
            this._buildContextmenu();

            //事件监听
            this._addTabEventListener();

            //tab回显
            this._restoreTabs();
        }
    }

    _restoreTabs() {

        //判断选项是否开启缓存
        if (this._isOpenCacheTab()) {
            //从缓存里面读
            let cacheTabs = this._getCacheTabs();

            if (cacheTabs.length !== 0) {

                //回显缓存中所有的tab
                this._echoCacheAllTabs();


            } else {//缓存没有则加载默认tab
                this._config.defaultTabs.forEach((option) => {
                    this.addTab(option);
                });
            }
        } else {

            //删除缓存
            this._clearCacheTabsAll();

            //然后添加传递进来的默认tab选项
            this._config.defaultTabs.forEach((option) => {
                this.addTab(option);
            });
        }
    }


    /**
     * 回显缓存中的所有tab
     * @private
     */
    _echoCacheAllTabs() {
        //创建两个虚拟节点
        let tabFrag = document.createDocumentFragment();
        // let iframeFrag = document.createDocumentFragment();
        let cacheTabs = this._getCacheTabs();

        //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆
        cacheTabs.forEach((option) => {
            //添加tab
            let tabHTML = option.close ? this._formatString(TAB_ITEM_CLOSE, option) : this._formatString(TAB_ITEM, option);
            tabFrag.appendChild(Util.createNode(tabHTML));

        });

        this._tab_wraper.appendChild(tabFrag);


        //激活tab
        let id = this._getActivatedCacheTabId();
        //激活tab
        this.activeTabById(id);
        //展开对应的左侧区域
        this._openLeftMenuByid(id);
        //滚动到指定的位置
        this.scrollToTabById(id);

    }


    // 清除缓存
    clearCache() {
        localStorage.removeItem(TAB_CACHE_KEY);
        localStorage.removeItem(HEADERCOLOR_CACHE_KEY);
        localStorage.removeItem(SIDEBARCOLOR_CACHE_KEY);
    }

    /**
     * 判断是否开启缓存
     * @private
     */
    _isOpenCacheTab() {
        return this._config.tabCache === true;
    }


    /**
     * 获取缓存中的所有tab
     * @returns {*[]}
     * @private
     */
    _getCacheTabs() {
        let tabs = JSON.parse(localStorage.getItem(TAB_CACHE_KEY));
        if (tabs === null) {
            tabs = [];
        }
        return tabs;
    }


    /**
     * 清空缓存中所有的tab
     * @private
     */
    _clearCacheTabsAll() {
        localStorage.removeItem(TAB_CACHE_KEY);
    }


    //构建右键菜单
    _buildContextmenu() {
        //加入到body
        document.body.insertAdjacentHTML("beforeEnd", TBA_CONTEXTMENU_TPL);
        //找到这个容器
        this._contextmenu_wraper = document.querySelector(`.bsa-contextmenu`);

    }


    /**
     * 通过id同时激活和展开左侧的菜单
     * @param id
     * @private
     */
    _openLeftMenuByid(id) {

        if (this._config.tabActiveOpenInSideMenuLocation === true) {

            //展开左侧指定区域
            let tabId = id;

            //先把所有的激活状态移除和闭合掉
            document.querySelectorAll('.bsa-sidebar-body > ul a').forEach((a) => {
                a.classList.remove(...['open', 'active'])
            })


            //找到当前tab的左侧菜单项目,激活、展开
            document.querySelectorAll('.bsa-sidebar-body > ul a').forEach((a) => {
                let url = md5(a.getAttribute('href'));
                if (url === tabId) {
                    a.classList.add('active');
                    this._openMenu(a);

                    document.querySelector('.bsa-sidebar-body').scrollTo({
                        top: a.offsetTop,
                        behavior: "auto"
                    })
                }
            })

        }
    }

    //tab的事件监听
    _addTabEventListener() {

        let _this = this;


        //其它任意元素生成tab
        Util.delegate(document.body, 'click', '[data-bsa-tab-url][data-bsa-tab-title]', function (e) {
            e.preventDefault();

            let url = this.getAttribute('data-bsa-tab-url');
            let title = this.getAttribute('data-bsa-tab-title');
            _this.addTab({
                title,
                url,
                close: true,
            });

        });

        //适配左侧菜单点击生成tab
        Util.delegate(document.body, 'click', '.bsa-sidebar-body > ul a:not(.has-children):not([target])', function (event) {
            event.preventDefault();
            let a = this;
            //得到当前a链接的href
            let url = a.getAttribute('href');
            let title = a.innerText;


            _this.addTab({
                title,
                url,
                close: true,
            });

            if (_this._config.sideMenuClickClose === true) {
                if (screen.availWidth < 992) {
                    _this.closeSideMenu();
                }
            }


        });


        //点击tab处理
        Util.delegate(_this._tab_wraper, 'click', 'button.nav-link', function () {

            let id = this.getAttribute(TAB_ID_KEY);
            _this.scrollToTabById(id);
            _this.activeTabById(id);
            _this._openLeftMenuByid(id);

        }, '.closetab');


        //tab关闭
        Util.delegate(_this._tab_wraper, 'click', '.closetab', function () {
            // self.closeTabByPageId(pageid);
            // console.log(this.parentNode)
            _this.closeTabById(this.parentNode.getAttribute(TAB_ID_KEY));

        });

        //tab右键
        Util.delegate(_this._tab_wraper, 'contextmenu', 'button.nav-link', function (e) {
            e.preventDefault();

            let tab = this;
            let id = tab.getAttribute(TAB_ID_KEY);


            //同时查看是否需要显示关闭选项
            if (_this._canRemoveTabById(id)) {
                _this._contextmenu_wraper.querySelector('.close').style.display = 'block';
            } else {
                _this._contextmenu_wraper.querySelector('.close').style.display = 'none';
            }

            _this._contextmenu_wraper.style.top = `${e.clientY}px`;
            _this._contextmenu_wraper.style.left = `${e.clientX}px`;
            _this._contextmenu_wraper.style.display = 'block';

            //同时给iframe窗口禁用所有的鼠标事件
            _this._tab_container.classList.add('pen');

            //获取dw的示例对象
            let tabActionsDropdown = bootstrap.Dropdown.getOrCreateInstance(_this._tab_container.querySelector('ul>li.dropdown>button'));
            tabActionsDropdown.hide();

            //把所有的id都给遍历给右键菜单的每一项
            _this._contextmenu_wraper.querySelectorAll('button.list-group-item').forEach(function (item) {
                item.setAttribute(TAB_ID_KEY, id);
            })

        }, '.closetab');


        //点击任何区域左键单击都关闭
        document.addEventListener('click', function () {
            _this._closeTabsContextmenu();
        })

        //监听窗口变化也要让右键菜单消失
        window.addEventListener('resize', Util.debounce(function () {
            _this._closeTabsContextmenu();
        }, 60))


        //更多操作的下拉菜单
        const tabActionsDropdown = _this._tab_container.querySelector('ul>li.dropdown>button');
        tabActionsDropdown.addEventListener('show.bs.dropdown', event => {
            _this._tab_container.classList.add('pen2');
        })
        //更多操作下拉菜单关闭移除
        tabActionsDropdown.addEventListener('hide.bs.dropdown', event => {
            _this._tab_container.classList.remove('pen2');
        })


        //tab右键刷新左击处理
        Util.delegate(_this._contextmenu_wraper, 'click', '.refresh', function (e) {
            e.preventDefault();
            _this._contextmenuRefresh(this);
        });

        //tab右键刷新右击处理
        Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.refresh', function (e) {
            e.preventDefault();
            _this._contextmenuRefresh(this);
        });


        //右键菜单-关闭左击处理
        Util.delegate(_this._contextmenu_wraper, 'click', '.close', function (e) {
            e.preventDefault();
            _this._contextmenuClose(this)

        });

        //右键菜单-关闭右击处理
        Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.close', function (e) {
            e.preventDefault();
            _this._contextmenuClose(this)

        });


        //右键菜单-关闭其它左击处理
        Util.delegate(_this._contextmenu_wraper, 'click', '.close-other', function (e) {
            e.preventDefault();
            _this._contextmenuCloseOther(this)

        });

        //右键菜单-关闭其它右击处理
        Util.delegate(_this._contextmenu_wraper, 'contextmenu', '.close-other', function (e) {
            e.preventDefault();
            _this._contextmenuCloseOther(this)
        });


        //左滑动按钮被单击
        Util.delegate(_this._tab_container, 'click', '.caret-btn-left', function () {
            _this._tab_wraper.scrollLeft = _this._tab_wraper.scrollLeft - _this._tab_wraper.offsetWidth;
        });


        //右滑动按钮被单击
        Util.delegate(_this._tab_container, 'click', '.caret-btn-right', function () {
            _this._tab_wraper.scrollLeft = _this._tab_wraper.scrollLeft + _this._tab_wraper.offsetWidth;
        });


        //回到当前
        Util.delegate(_this._tab_container, 'click', '.rollback-current', function () {
            _this.scrollToTabById(_this.getActivatedTabId());
        });


        //刷新当前
        Util.delegate(_this._tab_container, 'click', '.refresh-current', function () {
            _this._refreshTabById(_this.getActivatedTabId());
        });

        //关闭当前
        Util.delegate(_this._tab_container, 'click', '.close-current', function () {

            //得到当前激活的id
            let id = _this.getActivatedTabId();
            if (_this._canRemoveTabById(id)) {//判断能不能删除
                _this.closeTabById(id)
            }
        });


        //关闭其它
        Util.delegate(_this._tab_container, 'click', '.close-other', function () {
            _this._closeAllTabExceptForId(_this.getActivatedTabId());
        });


        //关闭全部
        Util.delegate(_this._tab_container, 'click', '.close-all', function () {
            _this.closeAllTabs();
        });


    }


    /**
     * 右键菜单-刷新按钮-处理程序
     * @private
     */
    _contextmenuRefresh(element) {
        this._refreshTabById(element.getAttribute(TAB_ID_KEY));
        this._closeTabsContextmenu()
    }

    /**
     * 右键菜单-关闭按钮-处理程序
     * @private
     */
    _contextmenuClose(element) {
        this.closeTabById(element.getAttribute(TAB_ID_KEY));
        this._closeTabsContextmenu()

    }

    /**
     * 右键菜单-关闭其它按钮-处理程序
     * @private
     */
    _contextmenuCloseOther(element) {
        this._closeAllTabExceptForId(element.getAttribute(TAB_ID_KEY));
        this._closeTabsContextmenu()

    }


    /**
     * 关闭所有的tab
     */
    closeAllTabs() {

        this._tab_wraper.querySelectorAll('button.nav-link').forEach((tab) => {
            let id = tab.getAttribute(TAB_ID_KEY);

            if (this._canRemoveTabById(id)) {

                this._removeTabById(id);

            }
        });

        //选中那些禁止删除的取第一个,将其激活
        let firstTab = this._tab_wraper.firstChild;
        if (firstTab instanceof HTMLElement) {
            this.activeTabById(firstTab.getAttribute(TAB_ID_KEY));
        }

    }


    /**
     * 关闭除了传递进来的id的所有tab
     * @param id
     * @private
     */
    _closeAllTabExceptForId(id) {

        this._tab_wraper.querySelectorAll('button.nav-link').forEach((tab) => {

            let forEachId = tab.getAttribute(TAB_ID_KEY);

            if (forEachId !== id && this._canRemoveTabById(forEachId)) {//如果不相等，且tab可以被删除的情况下
                this._removeTabById(forEachId);
            }
        });
    }


    /**
     * 通过id直接删除tab(包括iframe)
     * @param id
     * @private
     */
    _removeTabById(id) {
        let tab = this.findTabById(id);
        let ifr = this.findIframeById(id);
        tab.remove();
        this._removeCacheTabById(id);
        if (ifr instanceof HTMLElement) {
            ifr.remove();
        }

    }


    /**
     * 根据id刷新tab
     * @param id
     * @private
     */
    _refreshTabById(id) {

        let iframe = this.findIframeById(id);
        if (!(iframe instanceof HTMLElement)) {//如果没有就加入iframe

            //添加iframe
            let tab = this.findTabById(id);
            this._addIframeByTab(tab)

        } else {//如果有就正常刷新逻辑

            if (this._config.tabFadein === true) {//查看是否需要淡入
                iframe.classList.remove('fadeIn');
                void iframe.offsetWidth;
                iframe.contentWindow.location.reload();
                iframe.classList.add('fadeIn');
            } else {
                iframe.contentWindow.location.reload();
            }
        }


    }


    //关闭TAB的右键菜单
    _closeTabsContextmenu() {
        this._contextmenu_wraper.style.display = 'none';
        this._tab_container.classList.remove('pen');
    }


    /**
     * 根据id判断能否删除
     * @param id
     * @returns {boolean}
     * @private
     */
    _canRemoveTabById(id) {
        let result = false;
        if (this.findTabById(id).querySelector(".bi-x") instanceof HTMLElement) {
            result = true;
        }
        return result;
    }


    /**
     * 删除缓存中的tab
     * @param id
     * @private
     */
    _removeCacheTabById(id) {
        let cacheTabs = this._getCacheTabs();
        cacheTabs.forEach((tab, index) => {
            if (tab.id === id) {
                cacheTabs.splice(index, 1)
            }
        })
        //重新设置回去
        localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }


    /**
     * 通过id关闭tab选项卡
     * @param id
     */
    closeTabById(id) {

        let tab = this.findTabById(id);
        if (tab.classList.contains('active')) {//判断是否是激活的tab
            //把active传递给其它的tab
            let willActiveId = null;
            if (tab.nextElementSibling instanceof HTMLElement) {//后面有tab
                //得到后面tab的pageid作为将要激活的tab id
                willActiveId = tab.nextElementSibling.getAttribute(TAB_ID_KEY);
            } else if (tab.previousElementSibling instanceof HTMLElement) { //看看前面是否有tab

                willActiveId = tab.previousElementSibling.getAttribute(TAB_ID_KEY);
            }

            //先删除再滚动
            this._removeTabById(id)
            if (willActiveId) {//如果该id存在就激活

                //激活
                this.activeTabById(willActiveId);
            }

        } else {

            this._removeTabById(id)
        }


    }


    //添加tab
    addTab(option) {

        if (this._tab_container instanceof HTMLElement) {

            //参数合并
            option = Object.assign({}, tabDefault, option)
            option.id = md5(option.url);


            if (this.findTabById(option.id) === null) {//如果没有则添加

                //添加tab
                let tabHTML = option.close ? this._formatString(TAB_ITEM_CLOSE, option) : this._formatString(TAB_ITEM, option);
                this._tab_wraper.insertAdjacentHTML("beforeEnd", tabHTML);

                //添加iframe
                let iframeHTML = this._formatString(TAB_IFRAME, option)
                let iframeDom = util.createNode(iframeHTML);
                //判断是否需要加淡入动画
                if (this._config.tabFadein === true) {
                    iframeDom.classList.add(TAB_IFRAME_FADEIN_CLASS);
                }
                this._tab_content_wraper.appendChild(iframeDom);


                //同时也添加进缓存
                if (this._isOpenCacheTab()) {
                    this._addTabToCache(option);
                }
            }

            //滚动到该位置
            this.scrollToTabById(option.id)
            //激活tab
            this.activeTabById(option.id);

        }
    }


    /**
     * 激活缓存中的tab
     * @param id
     * @private
     */
    _activeCacheTabById(id) {
        //激活前删除所有的激活样式
        let cacheTabs = this._getCacheTabs();
        cacheTabs.forEach((option) => {
            option.active = option.id === id;
        });
        localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }


    /**
     * 添加tab进缓存
     * @param option
     * @private
     */
    _addTabToCache(option) {
        //先取
        let cacheTabs = this._getCacheTabs();
        //追加属性 active
        option.active = false;
        cacheTabs.push(option)
        //重新设置回去
        localStorage.setItem(TAB_CACHE_KEY, JSON.stringify(cacheTabs));
    }


    /**
     * 得到当前激活tab的id
     * @returns {null}
     */
    getActivatedTabId() {
        let id = null;
        this._tab_wraper.querySelectorAll('button.nav-link').forEach(btn => {
            if (btn.classList.contains('active')) {
                id = btn.getAttribute(TAB_ID_KEY);
            }
        })
        return id;
    }


    /**
     * 获取缓冲中激活的tab
     * @returns {null}
     * @private
     */
    _getActivatedCacheTabId() {
        let id = null;
        let cacheTabs = this._getCacheTabs();
        cacheTabs.forEach((option) => {
            if (option.hasOwnProperty('active') && option.active === true) {
                id = option.id;
            }
        })
        return id;

    }


    /**
     * 得到当前激活tab
     * @returns {null}
     */
    getActivatedTab() {
        let tab = null;
        this._tab_wraper.querySelectorAll('button.nav-link').forEach(btn => {
            if (btn.classList.contains('active')) {
                tab = btn;
            }
        })
        return tab;
    }


    /**
     * 通过tab添加iframe
     * @private
     */
    _addIframeByTab(tabEl) {
        //添加iframe
        let option = {id: tabEl.getAttribute(TAB_ID_KEY), url: tabEl.getAttribute(TAB_URL_KEY)};
        let iframeHTML = this._formatString(TAB_IFRAME, option)
        let iframeDom = util.createNode(iframeHTML);
        //判断是否需要加淡入动画
        if (this._config.tabFadein === true) {
            iframeDom.classList.add(TAB_IFRAME_FADEIN_CLASS);
        }
        this._tab_content_wraper.appendChild(iframeDom);
    }

    /**
     * 通过id激活tab
     * @param id
     */
    activeTabById(id) {


        //同时激活缓存中的tab选项
        if (this._isOpenCacheTab()) {
            this._activeCacheTabById(id);
        }

        //激活前删除所有的激活样式
        this._tab_wraper.querySelectorAll('button.nav-link').forEach(function (btnEl) {
            btnEl.classList.remove('active');
        })


        //把所有的iframe都移除出去
        this._tab_content_wraper.querySelectorAll('iframe').forEach(function (iframeEl) {
            iframeEl.classList.add(TAB_IFRAME_LEAVE_CLASS);
        });

        //给当前tab添加激活样式
        let tab = this.findTabById(id);
        tab.classList.add('active');


        //把当前面板激活
        let iframe = this.findIframeById(id);
        if (!(iframe instanceof HTMLElement)) {
            this._addIframeByTab(tab)
        }

        //再次查找iframe并激活
        this.findIframeById(id).classList.remove(TAB_IFRAME_LEAVE_CLASS)

        //滚动到指定tab
        // this.scrollToTabById(id);

    }


    _openMenu(a) {
        let ul = a.parentNode.parentNode
        let aHasChildren = Util.siblings(ul, 'a.has-children')[0];
        if (!(aHasChildren instanceof HTMLElement)) {
            return;
        }
        aHasChildren.classList.add('open');
        return this._openMenu(aHasChildren);

    }


    /**
     * 通过id滚动到指定的tab
     * @param id
     */
    scrollToTabById(id) {
        let tab = this.findTabById(id);
        // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
        this._tab_wraper.scrollLeft = tab.offsetLeft - this._tab_wraper.offsetWidth / 2 + tab.offsetWidth / 2;
        //关闭右键菜单
        this._closeTabsContextmenu();
    }


    /**
     * 通过id找到iframe
     * @param id
     * @returns {null}
     */
    findIframeById(id) {
        let results = null;
        this._tab_content_wraper.querySelectorAll('iframe').forEach((iframeEl) => {
            if (iframeEl.getAttribute(TAB_ID_KEY) === id) {
                results = iframeEl;
            }
        });
        return results;
    }


    /**
     * 通过id找到tab
     * @param id
     * @returns {null}
     */
    findTabById(id) {
        let results = null;
        this._tab_wraper.querySelectorAll('button.nav-link').forEach((btnEl) => {
            if (btnEl.getAttribute(TAB_ID_KEY) === id) {
                results = btnEl;
            }
        });
        return results;
    }


    /**
     * 格式化模板数据
     * @param str
     * @param data
     * @returns {*}
     * @private
     */
    _formatString(str, data) {
        return str.replace(/{{(\w+)}}/g, function (matchingStr, group1) {
            return data[group1];
        });

    }


    //事件监听
    _addEventListener() {
        let _this = this;


        //清空缓存
        Util.delegate(document.body, 'click', '.bsa-clear-cache', function (e) {
            e.preventDefault();
            _this.clearCache();
        });


        //左侧菜单展开必须移除style
        Util.delegate(document.body, 'transitionend', '.bsa-sidebar-body > ul', function (event) {
            let target = event.target;
            if (target.matches('ul')) {
                target.removeAttribute('style');
            }
        });

        //左侧菜单展开折叠逻辑
        Util.delegate(document.body, 'click', '.bsa-sidebar-body > ul a.has-children', function (event) {
            event.preventDefault();
            let a = this;
            if (!(a.classList.contains('open'))) {//展开
                a.classList.add('open');
                _this._menuToggle(a, 1);
            } else {
                _this._menuToggle(a, 0);
                a.classList.remove('open');
            }
            // 兄弟节点处理
            Util.siblings(a.parentNode).forEach((li) => {

                let openA = li.querySelector('a.has-children.open');
                if (openA instanceof HTMLElement) {
                    _this._menuToggle(openA, 0);
                    openA.classList.remove('open');
                }

                let activeA = li.querySelector('a.active');
                if (activeA instanceof HTMLElement) {
                    activeA.classList.remove('active');
                }


            })
        });


        //调色板侧边栏
        Util.delegate(document.body, 'click', 'div[class^=sidebarcolor]', function (event) {
            event.preventDefault();
            let sidebarcolor = this.getAttribute('class');

            let sidebarcolorList = [];
            for (let i = 0; i < 8; i++) {
                sidebarcolorList.push(`sidebarcolor${i + 1}`);
            }

            if (sidebarcolor === "sidebarcolor0") {
                //从缓存中移除
                localStorage.removeItem(SIDEBARCOLOR_CACHE_KEY);
                document.documentElement.classList.remove("color-sidebar");
                sidebarcolorList.map(function (item) {
                    document.documentElement.classList.remove(item);
                });
            } else {
                //存入缓存
                localStorage.setItem(SIDEBARCOLOR_CACHE_KEY, sidebarcolor);
                document.documentElement.classList.add("color-sidebar", sidebarcolor);
                sidebarcolorList.splice(sidebarcolorList.indexOf(sidebarcolor), 1);
                document.documentElement.classList.remove(...sidebarcolorList);
            }
        });


        //调色板头部
        Util.delegate(document.body, 'click', 'div[class^=headercolor]', function (event) {
            event.preventDefault();

            let headercolor = this.getAttribute('class');
            let headercolorList = [];
            for (let i = 0; i < 8; i++) {
                headercolorList.push(`headercolor${i + 1}`);
            }

            if (headercolor === "headercolor0") {
                //删除缓存
                localStorage.removeItem(HEADERCOLOR_CACHE_KEY);
                document.documentElement.classList.remove("color-header");
                headercolorList.map(function (item) {
                    document.documentElement.classList.remove(item);
                });
            } else {
                //存入缓存
                localStorage.setItem(HEADERCOLOR_CACHE_KEY, headercolor);
                document.documentElement.classList.add("color-header", headercolor);
                headercolorList.splice(headercolorList.indexOf(headercolor), 1);
                document.documentElement.classList.remove(...headercolorList);
            }
        });


        //搜索框关闭
        Util.delegate(document.body, 'click', '.bsa-search-close-btn', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-search-form-wrapper').classList.remove('open');
        });

        //搜索框打开
        Util.delegate(document.body, 'click', '.bsa-search-form-toggler', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-search-form-wrapper').classList.add('open');
        });

        //移动端左侧菜单Toggler
        Util.delegate(document.body, 'click', '.bsa-sidebar-toggler', function (event) {
            event.preventDefault();
            document.querySelector('.bsa-sidebar').classList.add('open');
            document.body.insertAdjacentHTML('beforeEnd', `<div class="bsa-mask"></div>`);
        });

        //遮罩层点击
        Util.delegate(document.body, 'click', '.bsa-mask', function (event) {
            event.preventDefault();
            _this.closeSideMenu();
        });


    }


    /**
     * 关闭侧边栏的菜单
     * @private
     */
    closeSideMenu() {
        document.querySelector('.bsa-mask').remove();
        document.querySelector('.bsa-sidebar').classList.remove('open');
    }

    _menuToggle(element, type) {
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


    //广告输出
    _advert() {
        console.log("\n" +
            "   ___  _______ \n" +
            "  / _ )/ __/ _ |\n" +
            " / _  |\\ \\/ __ |\n" +
            "/____/___/_/ |_|\n" + "\n作者:ajiho\n" + "描述:基于bootstrap5.x设计的一个纯静态开源免费的响应式后台管理HTML模板，旨在快速让喜欢用bootstrap开发后台的程序员有个轻松愉悦的起点。\n无论您是用于项目开发、学习、还是教学演示、希望能给个star，这将会是我最大的动力!\n" + "Gitee开源地址:https://gitee.com/ajiho/bootstrap-admin\n");
    }

}


export default Main