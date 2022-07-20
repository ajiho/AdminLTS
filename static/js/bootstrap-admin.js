;(function () {


    let scrollTop;

    function lockScroll() {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add('bsa-lock-scroll');
        document.body.style.top = -scrollTop + 'px';
    }

    function unLockScroll() {
        document.body.classList.remove('bsa-lock-scroll');
        document.scrollingElement.scrollTop = scrollTop;
    }


    function siblings(el) {
        let a = [];    //保存所有兄弟节点
        let p = el.parentNode.children; //获取父级的所有子节点

        for (let i = 0; i < p.length; i++) {  //循环
            if (p[i].nodeType === 1 && p[i] !== el) {  //如果该节点是元素节点与不是这个节点本身
                a.push(p[i]);      // 添加到兄弟节点里
            }
        }
        return a;
    }

    function eventDelegate(element, eventType, selector, fn) {
        element.addEventListener(eventType, e => {
            let el = e.target;
            // 当点击的元素不为li本⾝的时候，⽐如说span，就找⽗级是否为li
            while (el instanceof HTMLElement && !el.matches(selector)) {
                // 不断向上找⽗级元素，判断是否有li标签
                if (element === el) {
                    // 直到找到代理元素就不执⾏委托
                    el = null;
                    break;
                }
                el = el.parentNode;
            }
            el && fn.call(el, e, el);
        })
        return element;
    }

    function getParent(el, selector = '') {
        let rest = [];
        let targetParent = el.parentNode;
        while (!(targetParent instanceof Document)) {
            if (targetParent.matches(selector)) {
                rest.push(targetParent);
            }
            targetParent = targetParent.parentNode;
        }
        return rest;
    }

    // 判断是否有滚动条
    function hasScrolled(element, direction) {
        if (direction === 'vertical') {
            return element.scrollHeight > element.clientHeight;
        } else if (direction === 'horizontal') {
            return element.scrollWidth > element.clientWidth;
        }
    }

    window.addEventListener("DOMContentLoaded", function () {

        //禁止所有的input记忆
        document.querySelectorAll('input').forEach((e, i) => {
            e.setAttribute("AutoComplete", "off");
        });


        //全选
        eventDelegate(document.body, 'change', '.check-all', function (event) {
            let target = event.target;
            let pTable = getParent(target, 'table')[0];
            let checkboxes = pTable.querySelectorAll("input[type='checkbox']");
            let status = target.checked;
            checkboxes.forEach((el, index) => {
                el.checked = status;
            })
        });

        eventDelegate(document.body, 'click', '.bsa-sidebarcolor-wrap div[class^=sidebarcolor]', function (event) {

            event.preventDefault();
            event.stopPropagation();

            let sidebarcolor = this.getAttribute('class');
            document.documentElement.classList.add("color-sidebar", sidebarcolor);

            let sidebarcolorList = ["sidebarcolor1", "sidebarcolor2", "sidebarcolor3",
                "sidebarcolor4", "sidebarcolor5", "sidebarcolor6",
                "sidebarcolor7", "sidebarcolor8"];
            sidebarcolorList.splice(sidebarcolorList.indexOf(sidebarcolor), 1);
            document.documentElement.classList.remove(...sidebarcolorList);
        });


        eventDelegate(document.body, 'click', '.bsa-headercolor-wrap div[class^=headercolor]', function (event) {
            event.preventDefault();
            event.stopPropagation();

            let headercolor = this.getAttribute('class');
            document.documentElement.classList.add("color-header", headercolor);
            let headercolorList = ["headercolor1", "headercolor2", "headercolor3",
                "headercolor4", "headercolor5", "headercolor6",
                "headercolor7", "headercolor8"];
            headercolorList.splice(headercolorList.indexOf(headercolor), 1);
            document.documentElement.classList.remove(...headercolorList);
        });


        //调色板打开
        eventDelegate(document.body, 'click', '.bsa-switcher .bsa-switcher-toggler-btn', function (event) {
            event.preventDefault();
            event.stopPropagation();

            let bsaSwitcher = document.querySelector('.bsa-switcher');
            if (!bsaSwitcher.classList.contains('open')) {
                bsaSwitcher.classList.add('open')
            } else {
                bsaSwitcher.classList.remove('open')
            }
        });


        //搜索框关闭
        eventDelegate(document.body, 'click', '.bsa-search-box .bsa-search-close-icon', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-search-bar-item').classList.remove('open');
        });


        //搜索框打开
        eventDelegate(document.body, 'click', '.bsa-mobile-search-item', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-search-bar-item').classList.add('open');
        });


        //遮罩层点击
        eventDelegate(document.body, 'click', '.bsa-mask', function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.remove();
            unLockScroll();
            document.querySelector('.bsa-sidebar').classList.remove('open');
        });


        //左侧菜单
        eventDelegate(document.body, 'click', '.bsa-header .bsa-mobile-sidebar-item', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-sidebar').classList.add('open');
            lockScroll();
            document.body.insertAdjacentHTML('beforeEnd', `<div class="bsa-mask"></div>`);
        });


        eventDelegate(document.body, 'transitionend', '.bsa-sidebar-body .bsa-menu', function (event) {
            let target = event.target;
            if (target.nodeName.toLowerCase() === 'ul') {
                target.style = '';
            }
        });

        eventDelegate(document.body, 'click', '.bsa-sidebar-body .bsa-menu a.has-children', function (event) {
            event.preventDefault();
            event.stopPropagation();
            let el = this;
            if (!el.classList.contains('open')) {//展开
                el.classList.add('open');
                //先计算得到它原本的高度
                let ulHeight = el.nextElementSibling.scrollHeight + 'px';
                //1.动态设置高度为0
                el.nextElementSibling.style.cssText = `display:block;height:0;overflow: hidden;`;
                void el.scrollHeight;
                el.nextElementSibling.style.cssText = `display:block;height:${ulHeight};overflow: hidden;`;
            } else {
                let ulHeight = el.nextElementSibling.scrollHeight + 'px';
                el.classList.remove('open');
                //1.动态设置高度
                el.nextElementSibling.style.cssText = `display:block;height:${ulHeight};overflow: hidden;`;
                //重新读取属性让css重排
                void el.scrollHeight;
                //2.设置为0
                el.nextElementSibling.style.cssText = `display:block;height:0;overflow: hidden;`;
            }

            // 兄弟节点处理
            let pNode = el.parentNode;
            let sbs = siblings(pNode);
            sbs.forEach((el, index) => {
                Array.from(el.children).forEach((el, index) => {
                    if (el.matches('a.has-children.open')) {
                        let ulHeight = el.nextElementSibling.scrollHeight + 'px';
                        el.classList.remove('open');
                        //1.动态设置高度
                        el.nextElementSibling.style.cssText = `display:block;height:${ulHeight};overflow: hidden;`;
                        //重新读取属性让css重排
                        void el.scrollHeight;
                        //2.设置为0
                        el.nextElementSibling.style.cssText = `display:block;height:0;overflow: hidden;`;
                    } else if (el.matches('a.active')) {
                        el.classList.remove('active');
                    }
                })
            })
        });

    });
})();



