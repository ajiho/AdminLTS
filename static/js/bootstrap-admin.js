;(function () {


    function getParent(el, className = '') {

        let rest = [];

        let targetParent = el.parentNode;
        while (!(targetParent instanceof Document)) {

            console.log(targetParent);
            if (targetParent.classList.contains(className)) {
                rest.push(targetParent);
            }
            targetParent = targetParent.parentNode;
        }
        return rest;
    }

    window.addEventListener("DOMContentLoaded", function () {
        const bsCollapse = new bootstrap.Collapse('#navbarSupportedContent', {
            toggle: false
        });


        var bsAdminSidebar = document.querySelector('.bs-admin-sidebar');
        var bsAdminMain = document.querySelector('.bs-admin-main');

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
                bsAdminMain.insertAdjacentHTML('beforeEnd', '<div class="lyear-mask-modal"></div>');
            } else {
                mask.remove();
            }

            bsCollapse.hide();


        }, false);


        document.querySelector('.bs-admin-navbar-toggler-toggle').addEventListener('click', function (event) {
            bsCollapse.toggle();

            if (bsAdminSidebar) {
                bsAdminSidebar.classList.remove('bs-admin-sidebar-open');
            }

            let mask = document.querySelector('.lyear-mask-modal');
            if (mask) {
                mask.remove();
            }


        });


        document.body.addEventListener('click', function (event) {
            let target = event.target;

            if (target.classList.contains('lyear-mask-modal')) {


                target.remove();


                if (!bsAdminSidebar.classList.contains('bs-admin-sidebar-open')) {

                    bsAdminSidebar.classList.add('bs-admin-sidebar-open')
                } else {

                    bsAdminSidebar.classList.remove('bs-admin-sidebar-open')
                }


            }

        }, false);


        /*        let transitionendType = null; //1:展开 0 闭合

                //监听
                let sidebarUl = document.querySelectorAll('.bs-admin-sidebar .bs-admin-sidebar-wrapper ul');
                sidebarUl.forEach(function (el, index) {
                    el.addEventListener("transitionend", function () {


                     //   console.log(transitionendType);

                        if (transitionendType === 0) {

                        } else if(transitionendType === 1) {
                            el.style.display = 'none';
                            el.style.height = '';
                        }
                        el.style.overflow = '';

                    }, false);
                });


                document.querySelector('.bs-admin-sidebar-wrapper').addEventListener('click', function (event) {
                    // event.preventDefault();
                    // event.stopPropagation();

                    // console.log(this)
                    let target = event.target;

                    // console.log(target)
                    // has-children

                    if (target.nodeName.toLowerCase() === 'a' && target.classList.contains('has-children')) {


                        target.classList.add('open');

                        //找到当前同级的ul
                        let nextUlElement = target.nextElementSibling;
                        // console.log(getComputedStyle(nextUlElement).height);
                        let tempH = nextUlElement.style.height;
                        console.log(tempH);


                        if ((tempH !== '') || (tempH === '0px')) { //展开

                            transitionendType = 1;

                            let timer = setInterval(function () {
                                clearInterval(timer);
                                // nextUlElement.style.height = 0;
                                nextUlElement.style.cssText = `display:block;height:0;overflow: hidden;`;

                            }, 0);


                        } else {
                            transitionendType = 0;
                            // console.log(nextUlElement);


                            //获取它的物理高度
                            // display:block;position:absolute;z-index:-1000

                            nextUlElement.style.cssText = 'display:block;position:absolute;z-index:-1000';
                            let height = nextUlElement.scrollHeight.toString() + "px";
                            nextUlElement.style.cssText = `display:block;height:0;overflow: hidden;`;

                            //再设置回正常的高度
                            let timer = setInterval(function () {
                                clearInterval(timer);
                                nextUlElement.style.height = height;
                            }, 0);

                        }


                    }

                }, false);*/


        // $('.bs-admin-sidebar-wrapper').on('click', 'a.has-children', function () {
        //
        //
        //     let $nextUlElement = $(this).next();
        //     $nextUlElement.stop().slideToggle(300);
        //     $(this).parent().siblings().find('a.has-children').next().slideUp(300);
        //
        //
        // });


        /*        let transitionendType = null;
                let sidebarUl = document.querySelectorAll('.bs-admin-sidebar .bs-admin-sidebar-wrapper ul');
                sidebarUl.forEach(function (el, index) {
                    el.addEventListener("transitionend", function () {

                        if (transitionendType === 1) {
                            this.style.height = 'auto';
                        }

                    }, false);
                });*/
        let transitionendType = null;
        document.querySelector('.bs-admin-sidebar .bs-admin-sidebar-wrapper')
            .addEventListener("transitionend", function (event) {
                // console.log(this);
                // console.log(event.target);
                let target = event.target;
                if (target.nodeName.toLowerCase() === 'ul') {
                    if (transitionendType === 1) {
                        target.style.height = 'auto';
                    }
                }
            });


        //给默认展开的赋值高度
        // let aaa = document.querySelectorAll('.bs-admin-sidebar .bs-admin-sidebar-wrapper .has-children.open+ul');
        //
        // aaa.forEach((el, index) => {
        //     el.style.height = el.scrollHeight.toString() + "px";
        // })

        document.querySelector('.bs-admin-sidebar-wrapper').addEventListener('click', function (event) {


            let target = event.target;

            if (target.nodeName.toLowerCase() === 'a' && target.classList.contains('has-children')) {

                //找到当前同级的ul
                let nextUlElement = target.nextElementSibling;

                if (!target.classList.contains('open')) {//展开


                    transitionendType = 1;

                    nextUlElement.style.height = 0;

                    target.classList.add('open');

                    let timer = setInterval(function () {
                        clearInterval(timer);
                        nextUlElement.style.height = nextUlElement.scrollHeight.toString() + "px";
                    }, 0);


                } else {
                    nextUlElement.style.height = nextUlElement.scrollHeight.toString() + "px";

                    target.classList.remove('open');
                    transitionendType = null;



                    let timer = setInterval(function () {
                        clearInterval(timer);
                        nextUlElement.style.height = 0;
                    }, 0);

                    // console.log(target)
                    //
                    // target.classList.remove('open');
                    // nextUlElement.style.height = 0;


                }

                //排斥别的菜单进行闭合


                console.log(target.parentNode)


                // $(this).parent().siblings().find('a.has-children').next().slideUp(300);


            }

        }, false)


    });


})();



