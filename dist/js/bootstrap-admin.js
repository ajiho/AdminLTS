$(function () {


    //禁止所有的input框记忆
    $('input').each(function (index, element) {
        $(element).attr('AutoComplete', 'off');
    });


    //禁止action为#的无效表单提交
    $(document).on('submit', "form[action='#']", function (e) {
        e.preventDefault();
    })


    //左侧导航过度结束事件
    $(document).on('transitionend', '.bsa-menu ul', function (e) {
        var $targetUl = $(e.target);
        $targetUl.removeAttr('style');
    });


    //主题切换
    $(document).on('click', 'div[class^=bsa-theme-color]', function (e) {
        e.preventDefault();

        let themeVal = [...this.classList].at(-1);
        //存入缓存
        localStorage.setItem('theme', themeVal);
        //修改主题
        $("html").attr('data-bs-theme', themeVal);
        //tab内部也需要修改主题
        if ($('.qtab').length !== 0) {
            Quicktab.get('.qtab').setTabPaneIFrame(function (tabIframes) {
                for (let tabIframe of tabIframes) {
                    if (tabIframe.canAccessIFrame) {
                        $(tabIframe.iframeWindow.document).find('html').attr('data-bs-theme', themeVal);
                    }
                }
            });
        }
    });


    // 监听全屏事件
    $(document).on('fullscreenchange', function () {
        if (document.fullscreenElement == null) {//退出全屏
            $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-fullscreen-exit').addClass('bi-arrows-fullscreen');
        } else {
            $('.bsa-fullscreen-toggler').find('i.bi').removeClass('bi-arrows-fullscreen').addClass('bi-fullscreen-exit');
        }
    })

    //全屏
    $('.bsa-fullscreen-toggler').on('click', function () {
        if ($(this).find('.bi-arrows-fullscreen').length > 0) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen()
        }
    })

    //移动端侧边栏触发器
    $(document).on('click', '.bsa-sidebar-toggler', function (e) {
        e.preventDefault();
        $('.bsa-sidebar').toggleClass('open');
        var $mask = $('.bsa-mask');
        if ($mask.length === 0) {
            $('<div class="bsa-mask"></div>').prependTo('body');
        } else {
            $mask.remove();
        }
    });

    //搜索框关闭
    $(document).on('click', '.bsa-search-close-btn', function (e) {
        e.preventDefault();
        $('.bsa-search-form-wrapper').removeClass('open')
    });

    //搜索框打开
    $(document).on('click', '.bsa-search-form-toggler', function (e) {
        e.preventDefault();
        $('.bsa-search-form-wrapper').addClass('open')
    });

    //遮罩层点击
    $(document).on('click', '.bsa-mask', function (e) {
        e.preventDefault();
        $(this).remove();
        $('.bsa-sidebar').toggleClass('open');
    });


    //导航菜单滚动条插件
    if ($('.bsa-sidebar-body').length !== 0) {
        Scrollbar.init(document.querySelector('.bsa-sidebar-body'));
    }


    //头部下拉菜单滚动条
    $('.bsa-header .card-body').each(function (index, element) {
        Scrollbar.init(element);
    })


    //tab插件初始化
    if ($('.qtab').length !== 0) {
        new Quicktab({
            selector: '.qtab',
            minHeight: '',
            //不设置默认自适应容器高度
            height: '100%',
            //不设置默认自适应容器宽度
            width: '',
            //"sessionStorage","localStorage",null:不缓存每次刷新都会只展示选项tabs里面的tab
            cache: "localStorage",
            //初始化的tab
            tabs: [],
            //全屏功能
            fullscreen: {
                //true:开启全屏 false:关闭全屏
                enable: true,
                fullscreen: function () {
                    $('.bsa-content').addClass('fullscreen');
                },
                exitFullscreen: function () {
                    $('.bsa-content').removeClass('fullscreen');
                },
            },
            //启用tab的右键菜单功能
            enableContextmenu: true,
            //启用鼠标滚动切换tab
            enableMouseWheelToggleTab: false,
            //实例初始化完毕回调，只会执行一次
            onInit: function (e) {
                $('.bsa-menu a').each(function (index, a) {
                    if ($(a).attr('href') === Quicktab.getTabUrl(e.target.getActiveTab())) {
                        a.classList.add('active');
                        _openMenu(a);
                        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).update();
                        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).scrollTo(0, a.offsetTop, 500);
                    }
                });
            },
            //tab被单击事件
            onTabClick: function (e) {
                $allA = $('.bsa-menu a');
                //移除所有的展开和激活状态
                $allA.each(function (index, a) {
                    $(a).removeClass('open active');
                });

                $allA.each(function (index, a) {
                    if ($(a).attr('href') === e.tabUrl) {
                        a.classList.add('active');
                        _openMenu(a);
                        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).update();
                        Scrollbar.get(document.querySelector('.bsa-sidebar-body')).scrollTo(0, a.offsetTop, 500);
                    }
                });
            },
            //tab加载完毕事件
            onTabLoaded: function (e) {
                var ThemeVal = localStorage.getItem('theme');
                $('html').attr('data-bs-theme', ThemeVal);
                if (e.tabIFrame.canAccess) {
                    $(e.tabIFrame.el.contentWindow.document).find('html').attr('data-bs-theme', ThemeVal);
                }
            },
            //tab遮罩层加载完毕的事件
            onTabMaskTransitionend: function () {
                $(".bsa-preloader").fadeOut(800);
            },
        });


        // 左侧导航折叠逻辑(相对于别的后台模板基于jquery的slideUp和slideToggle方法具有更高的性能和css3灵动的效果,超高性能)
        $(document).on('click', '.bsa-menu a:not([target])', function (e) {
            e.preventDefault();
            var $a = $(this);

            if ($a.hasClass('has-children')) {
                var $siblingsUl = $a.siblings('ul');

                //兄弟节点处理
                var $pSiblingsLi = $a.parent().siblings('li');
                var $pSiblingsOpenA = $pSiblingsLi.children('a.has-children.open');


                $pSiblingsOpenA.siblings('ul').each(function (index, element) {
                    $(element).css({'height': $(element).prop('scrollHeight')});
                    $(element).prop('scrollHeight');
                    $(element).css({'height': 0, 'display': 'block'});
                });


                $pSiblingsOpenA.removeClass('open');
                $pSiblingsLi.children('a.active').removeClass('active');


                if (!$a.hasClass('open')) {

                    $a.addClass('open');
                    $siblingsUl.css({'height': 0});
                    $siblingsUl.prop('scrollHeight');
                    $siblingsUl.css({'height': $siblingsUl.prop('scrollHeight')});

                } else {

                    $siblingsUl.css({'height': $siblingsUl.prop('scrollHeight')});
                    $siblingsUl.prop('scrollHeight');
                    $siblingsUl.css({'height': 0, 'display': 'block'});
                    $a.removeClass('open');

                }
            } else {//没有子集

                //移除所有的激活类
                $('.bsa-menu a').each(function (index, a) {
                    $(a).removeClass('active');
                });

                //给当前的a添加激活类
                $a.addClass('active');

                //添加tab处理
                Quicktab.get('.qtab').addTab({
                    title: this.innerText,
                    url: this.getAttribute('href'),
                    close: true,
                });
            }
        });
    }

    //登录页面密码框的显示和隐藏
    $(".bsa-show_hide_password span").on('click', function (event) {
        event.preventDefault();
        var $input = $('.bsa-show_hide_password input');
        var $i = $('.bsa-show_hide_password i');
        if ($input.attr("type") === "text") {
            $input.attr('type', 'password');
            $i.removeClass("bi-eye");
            $i.addClass("bi-eye-slash");
        } else if ($input.attr("type") === "password") {
            $input.attr('type', 'text');
            $i.addClass("bi-eye");
            $i.removeClass("bi-eye-slash");
        }
    });


    $('.bsa-input-search').on('keydown', function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();


            var $val = $.trim($(this).val());
            var $action = $(this).attr('data-bsa-search-action')

            if ($val !== '') {
                Quicktab.get('.qtab').addTab({
                    title: '<i class="bi bi-search"></i><span class="text-danger ms-2">'+$val+'</span>',
                    url: $action + $val,
                    close: true,
                });
            }


        }
    })

    function _openMenu(a) {
        var $ul = $(a).parent().parent();
        let $canOpena = $ul.siblings(a);
        if (!($canOpena.length > 0)) {
            return;
        }
        $canOpena.addClass('open');
        return _openMenu($canOpena);
    }

});