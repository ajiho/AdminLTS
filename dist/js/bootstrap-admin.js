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

    // 左侧导航折叠逻辑(相对于别的后台模板基于jquery的slideUp和slideToggle方法具有更高的性能和css3灵动的效果,超高性能)
    $(document).on('click', '.bsa-menu a.has-children', function (e) {
        e.preventDefault();

        var $a = $(this);
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
    });

    //主题切换
    $(document).on('click', 'div[class^=bsa-theme-color]', function (e) {
        e.preventDefault();

        let theme = [...this.classList].at(-1);
        //存入缓存
        localStorage.setItem('theme', theme);
        //修改主题
        $("html").attr('data-bs-theme',theme);
        //tab内部也需要修改
        qtab.setTabPaneIFrame(function (tabIframes) {
            for (let tabIframe of tabIframes) {
                if (tabIframe.canAccessIFrame) {
                    tabIframe.iframeWindow.document.querySelector('html').setAttribute('data-bs-theme', theme);
                }
            }
        });
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
        var qtab = new Quicktab({
            selector: '.qtab',
            //最小高度默认值为222px;
            minHeight: '',
            //不设置默认自适应容器高度
            height: '100%',
            //不设置默认自适应容器宽度
            width: '',
            //"sessionStorage","localStorage",null:不缓存每次刷新都会只展示选项tabs里面的tab
            cache: "localStorage",
            //初始化的tab
            tabs: [],
            // true:开启全屏功能  false:关闭全屏功能
            enableFullscreen: true,
            //启用tab的右键菜单功能
            enableContextmenu: true,
            //启用鼠标滚动切换tab
            enableMouseWheelToggleTab: false
        }).on('loadingTransitionend', function (e) {
            // console.log("加载层淡出过度完毕");
            //loading层关闭
            $(".bsa-preloader").fadeOut(800);
        }).on('iframeLoaded', function (e) {


            console.log('还会载入？')

            var localTheme = localStorage.getItem('theme');
            $('html').attr('data-bs-theme', localTheme);
            e.ifContentWindow.document.querySelector('html').setAttribute('data-bs-theme', localTheme);
        });


        $(document).on('click', '.bsa-menu a:not(.has-children):not([target])', function (e) {
            e.preventDefault();
            var url = this.getAttribute('href');
            var title = this.innerText;

            qtab.addTab({
                title,
                url,
                close: true,
            });

        });


    }


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


});