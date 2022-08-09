;(function () {
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
            checkboxes.forEach((el) => {
                el.checked = status;
            })
        });

        //调色板侧边栏
        eventDelegate(document.body, 'click', '.bsa-sidebarcolor-wrap div[class^=sidebarcolor]', function (event) {

            event.preventDefault();
            event.stopPropagation();

            let sidebarcolor = this.getAttribute('class');

            let sidebarcolorList = ["sidebarcolor1", "sidebarcolor2", "sidebarcolor3",
                "sidebarcolor4", "sidebarcolor5", "sidebarcolor6",
                "sidebarcolor7", "sidebarcolor8"];

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
        eventDelegate(document.body, 'click', '.bsa-headercolor-wrap div[class^=headercolor]', function (event) {
            event.preventDefault();
            event.stopPropagation();

            let headercolor = this.getAttribute('class');
            let headercolorList = ["headercolor1", "headercolor2", "headercolor3",
                "headercolor4", "headercolor5", "headercolor6",
                "headercolor7", "headercolor8"];

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


        //调色板打开
        eventDelegate(document.body, 'click', '.bsa-switcher-toggler-btn', function (event) {
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
        eventDelegate(document.body, 'click', '.bsa-search-close-icon', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-search-form-item').classList.remove('open');
        });


        //搜索框打开
        eventDelegate(document.body, 'click', '.bsa-mobile-search-toggler-item', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-search-form-item').classList.add('open');
        });


        //遮罩层点击
        eventDelegate(document.body, 'click', '.bsa-mask', function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.remove();
            unLockScroll();
            document.querySelector('.bsa-sidebar').classList.remove('open');
        });


        //移动端左侧菜单Toggler
        eventDelegate(document.body, 'click', '.bsa-mobile-sidebar-toggler-item', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.bsa-sidebar').classList.add('open');
            lockScroll();
            document.body.insertAdjacentHTML('beforeEnd', `<div class="bsa-mask"></div>`);
        });


        eventDelegate(document.body, 'transitionend', '.bsa-sidebar-body .bsa-menu', function (event) {
            let target = event.target;
            if (target.matches('ul')) {
                target.style = '';
            }
        });


        //左侧菜单展开折叠逻辑
        eventDelegate(document.body, 'click', '.bsa-menu a.has-children', function (event) {
            event.preventDefault();
            event.stopPropagation();
            let el_a_has_children = this;

            if (!el_a_has_children.classList.contains('open')) {//展开
                el_a_has_children.classList.add('open');
                ulOpen(el_a_has_children);
            } else {
                ulClose(el_a_has_children);
            }

            // 兄弟节点处理
            siblings(el_a_has_children.parentNode).forEach((el_li) => {
                Array.from(el_li.children).forEach((item) => {


                    if (item.matches('a.active')) {
                      item.classList.remove('active');
                    }
                    if (item.matches('a.has-children.open')) {

                        ulClose(item);
                    }
                })
            })
        });

        // 给每一个组件div都增加一个查看源码的按钮
        const bsaComponents = document.querySelectorAll('.bsa-component');
        for (const element of bsaComponents) {
            const button = `<button class="bsa-source-button btn bsa-btn-success btn-xs"><i class="bi bi-code"></i></button>`;
            element.insertAdjacentHTML('beforeend', button);
        }

        //复制代码按钮点击事件
        eventDelegate(document.body, 'click', '#bsa-source-modal .bsa-btn-copy', function (event) {
            event.preventDefault();
            if (navigator.clipboard) {
                const code = document.querySelector('#bsa-source-modal').querySelector('.modal-body pre').innerText;
                navigator.clipboard.writeText(code).then(r => console.log('复制失败'));
            }
            bootstrap.Modal.getOrCreateInstance(document.querySelector('#bsa-source-modal')).hide();
        });


        //查看源码按钮点击事件
        eventDelegate(document.body, 'click', '.bsa-source-button', function (event) {
            event.preventDefault();
            event.stopPropagation();
            //1.往body中插入展示代码的模态框，先判断是否存在这个模态框
            const sourceModalHtml = `
            <div id="bsa-source-modal" class="modal fade" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered  modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">源代码</h4>
                            <div class="d-flex align-items-center flex-nowrap gap-2">
                                <button type="button" class="btn bsa-btn-success bsa-btn-copy"><i class="bi bi-clipboard me-1"></i>复制</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <pre class="language-html"><code></code></pre>
                        </div>
                    </div>
                </div>
            </div>
            `;
            let bsaSourceModal = document.querySelector('#bsa-source-modal');
            if (!bsaSourceModal) {
                document.body.insertAdjacentHTML('beforeend', sourceModalHtml);
            }
            //2.获取html
            let html = this.parentNode.innerHTML;
            //3.处理html内容
            html = Prism.highlight(cleanSource(html), Prism.languages.html, 'html');
            //4.赋值给code标签
            document.querySelector('#bsa-source-modal').querySelector('code').innerHTML = html;
            //5.实例化bootstrap模态框并显示
            bootstrap.Modal.getOrCreateInstance(document.querySelector('#bsa-source-modal')).show();

        });


        //bootstrap气泡组件初始化
        [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });

        //bootstrap提示组件初始化
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });


        //============================助手函数============================
        function ulOpen(dom) {
            //找到ul元素
            let ul = dom.nextElementSibling;
            //先计算得到ul它原本的高度
            let ulHeight = ul.scrollHeight + 'px';
            ul.style.cssText = `display:block;height:0;overflow: hidden;`;
            void dom.scrollHeight;
            ul.style.cssText = `display:block;height:${ulHeight};overflow: hidden;`;
        }

        function ulClose(dom) {
            //找到ul元素
            let ul = dom.nextElementSibling;
            //先计算得到ul它原本的高度
            let ulHeight = ul.scrollHeight + 'px';
            ul.style.cssText = `display:block;height:${ulHeight};overflow: hidden;`;
            void dom.scrollHeight;
            ul.style.cssText = `display:block;height:0;overflow: hidden;`;
            dom.classList.remove('open');
        }


        function lockScroll() {
            if (hasScrolled(document.documentElement, 'vertical')) {//如果有滚动条就保持滚动条
                document.body.classList.add('bsa-lock-body-has-scroll');
            } else {
                document.body.classList.add('bsa-lock-body-no-scroll');
            }
            let st = document.scrollingElement.scrollTop;
            window.localStorage.setItem("bsa-scroll-top", st.toString())
            document.body.classList.add('bsa-lock-body');
            document.body.style.top = -st + 'px';


        }


        function unLockScroll() {
            document.body.classList.remove(...['bsa-lock-body', 'bsa-lock-body-has-scroll', 'bsa-lock-body-no-scroll']);
            document.scrollingElement.scrollTop = Number(window.localStorage.getItem("bsa-scroll-top"));
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


        function escapeHtml(html) {
            return html.replace(/×/g, '&times;')
                .replace(/«/g, '&laquo;')
                .replace(/»/g, '&raquo;')
                .replace(/←/g, '&larr;')
                .replace(/→/g, '&rarr;');
        }

        function cleanSource(html) {
            //转义HTML,将行拆分为数组,删除空元素,并移除最后一个元素
            let lines = escapeHtml(html).split('\n').filter(Boolean).slice(0, -1);
            const indentSize = lines[0].length - lines[0].trim().length;
            const re = new RegExp(' {' + indentSize + '}');

            lines = lines.map(line => {
                return re.test(line) ? line.slice(Math.max(0, indentSize)) : line;
            });

            return lines.join('\n');
        }


    });
})();



