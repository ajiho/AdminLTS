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

    function getParent(el, className = '') {
        let rest = [];
        let targetParent = el.parentNode;
        while (!(targetParent instanceof Document)) {
            if (targetParent.classList.contains(className)) {
                rest.push(targetParent);
            }
            targetParent = targetParent.parentNode;
        }
        return rest;
    }

    window.addEventListener("DOMContentLoaded", function () {


        let msk = 'bsm-mask';


        let eqwewqweq = document.querySelector('.mobile-toggle-menu');

        let sidebarEl = document.querySelector('.bsm-sidebar');
        let bsAdminSidebarWrapper = document.querySelector('.bsm-sidebar-body');


        let timer = null; //定义一个定时器


        let enableClick = true;


        //回到顶部事件委托
        eventDelegate(document.body, 'click', '.back-to-top', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (enableClick === true) {
                enableClick = false;
                //设置一个定时器
                timer = setInterval(function () {

                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let speed = Math.floor(-osTop / 6);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;

                    if (osTop === 0) {
                        enableClick = true;
                        clearInterval(timer);
                    }

                }, 16);

            }
        });


        window.addEventListener('scroll', function (e) {
            //获取滚动条高度
            let originScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //查找该元素是否能找到
            let fdsf = document.querySelector('.back-to-top');

            if (originScrollTop === 0) {
                //清空定时器
                clearInterval(timer);
                enableClick = true;
            } else if (originScrollTop > 300) {
                fdsf !== null ? fdsf.style.display = 'block' : '';
            } else {
                fdsf !== null ? fdsf.style.display = 'none' : '';
            }

        });


        // $(window).on("scroll", function () {
        //     $(this).scrollTop() > 300 ? $(".back-to-top").fadeIn() : $(".back-to-top").fadeOut()
        // });


        // $(".back-to-top").on("click", function () {
        //     return $("html, body").animate({
        //         scrollTop: 0
        //     }, 600);
        // })


        eventDelegate(document.querySelector('.bsa-sidebarcolor-wrap'), 'click', 'div[class^=sidebarcolor]', function (event) {

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


        eventDelegate(document.querySelector('.bsa-headercolor-wrap'), 'click', 'div[class^=headercolor]', function (event) {

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


        document.querySelector('.bsa-switcher-header>.btn-close').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();


            let bsaSwitcherWrapper = document.querySelector('.bsa-switcher-wrapper');
            bsaSwitcherWrapper.classList.remove('open');
        });

        //

        document.querySelector('.bsa-switcher-btn').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();


            let bsaSwitcherWrapper = document.querySelector('.bsa-switcher-wrapper');

            if (!bsaSwitcherWrapper.classList.contains('open')) {
                bsaSwitcherWrapper.classList.add('open')
            } else {
                bsaSwitcherWrapper.classList.remove('open')
            }

        });


        //搜索框关闭
        document.querySelector('.search-bar-box > i:nth-of-type(2)').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            //关闭搜索框
            this.parentNode.parentNode.classList.remove('full-search-bar');
        });

        //搜索打开
        document.querySelector('.bsm-mobile-search-icon').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.search-bar').classList.add('full-search-bar');


        });


        //遮罩层处理
        eventDelegate(document.body, 'click', '.bsm-mask', function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.remove();
            unLockScroll();
            sidebarEl.classList.remove('open');
        });


        //左侧菜单
        eqwewqweq.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            sidebarEl.classList.add('open');
            lockScroll();
            document.body.insertAdjacentHTML('beforeEnd', `<div class="${msk}"></div>`);

        });


        bsAdminSidebarWrapper.addEventListener("transitionend", function (event) {
            let target = event.target;
            if (target.nodeName.toLowerCase() === 'ul') {
                target.style = '';
            }
        });

        eventDelegate(bsAdminSidebarWrapper, 'click', 'a.has-children', function (e) {
            e.preventDefault();
            e.stopPropagation();

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
                    }
                })
            })
        });


    });
})();



