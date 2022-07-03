;(function () {


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
            while (!el.matches(selector)) {
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


        const bsCollapse = new bootstrap.Collapse('.bs-admin-navbar-collapse', {
            toggle: false
        });

        let bsAdminSidebar = document.querySelector('.bs-admin-sidebar');
        let bsAdminMain = document.querySelector('.bs-admin-main');

        document.querySelector('.bs-admin-sidebar-toggle').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!bsAdminSidebar.classList.contains('bs-admin-sidebar-open')) {

                bsAdminSidebar.classList.add('bs-admin-sidebar-open')
            } else {

                bsAdminSidebar.classList.remove('bs-admin-sidebar-open')
            }

            let mask = document.querySelector('.lyear-mask-modal');
            if (!mask) {
                bsAdminMain.insertAdjacentHTML('beforeEnd', '<div class="bs-admin-mask"></div>');
            } else {
                mask.remove();
            }

            bsCollapse.hide();


        }, false);


        document.querySelector('.bs-admin-navbar-toggler-toggle').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            bsCollapse.toggle();

            if (bsAdminSidebar) {
                bsAdminSidebar.classList.remove('bs-admin-sidebar-open');
            }

            let mask = document.querySelector('.bs-admin-mask');
            if (mask) {
                mask.remove();
            }
        });


        document.body.addEventListener('click', function (event) {
            let target = event.target;

            if (target.classList.contains('bs-admin-mask')) {

                target.remove();

                if (!bsAdminSidebar.classList.contains('bs-admin-sidebar-open')) {

                    bsAdminSidebar.classList.add('bs-admin-sidebar-open')
                } else {

                    bsAdminSidebar.classList.remove('bs-admin-sidebar-open')
                }
            }

        }, false);


        document.querySelector('.bs-admin-sidebar .bs-admin-sidebar-wrapper')
            .addEventListener("transitionend", function (event) {
                let target = event.target;
                if (target.nodeName.toLowerCase() === 'ul') {
                    target.style = '';
                }
            });
        let bsAdminSidebarWrapper = document.querySelector('.bs-admin-sidebar-wrapper');
        bsAdminSidebarWrapper.addEventListener('click', function (e) {

            let el = e.target
            while (el && !el.matches('a.has-children')) {
                el = el.parentNode
                if (bsAdminSidebarWrapper === el) {
                    el = null
                }
            }
            if (el) {
                e.preventDefault();
                //回调函数
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
                let pnode = el.parentNode;
                let sbs = siblings(pnode);
                sbs.forEach((el, index) => {
                    Array.from(el.children).forEach((el, index) => {
                        if(el.matches('a.has-children.open')){
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
            }
        });


    });


})();



