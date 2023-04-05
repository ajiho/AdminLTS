$(function () {



    $(document).on('click', '.refresh-btn', function () {
        var $button = $(this);

        //找到iframe
        var iframe = $button.parent().siblings().find('iframe');

        iframe[0].contentWindow.location.reload();


    })
    $(document).on('click', '.close-btn', function () {
        var $button = $(this);

        var h = $button.parents('.abcd').attr('data-height');



        $button.parents('.abcd').remove();
        $('html').removeClass('run');

        //得到原来的高度
        $(document).scrollTop(h);

    })

    $(document).on('click', '.run-btn', function () {
        var $button = $(this);
        var st = $(document).scrollTop();

        //禁止滚动
        $('html').addClass('run');


        //得到url
        var src = $button.attr('data-file');
        let domStr =
            `<div class="abcd" data-height="${st}">
                        <div class="header">
                        <button class="pure-button refresh-btn">刷新<i class="bi bi-arrow-clockwise"></i></button>
                        <button class="pure-button close-btn">关闭<i class="bi bi-x"></i></button>
                        </div>
                        <div class="body">
                        <iframe src="example/${src}" width="100%" height="100%" style="display: block;margin: 0"></iframe>
                        </div>
                        </div>`;

        $button.after(domStr);
    });

})