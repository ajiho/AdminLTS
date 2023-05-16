//================封装的公共方法===============================


/**
 * 在modal框中新打开一个窗口用于添加数据
 * @param url 路由地址
 * @param title 模态框标题，不填默认为url地址
 * @private
 */
function _open(url, title = '') {
    $.modal({
        url: url,
        title: title,
        //禁用掉底部的按钮区域
        buttons: [],
        modalDialogClass:'modal-dialog-centered modal-lg'
    })
}

//=================================================


// Tips:开发技巧,建议后端统一返回格式:{code:403 msg:'登录过期,重新登录' data:[]}

// 统一设置
$.ajaxSetup({
    timeout: 5000, //超时时间:5秒
    //请求头防止csrf攻击(参考php框架laravel)
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    //返回类型(这里设置后页面上的就可以不用设置了)
    dataType: 'json'
});


// 添加全局 AJAX 事件处理器
$(document).ajaxSend(function (event, xhr, options) {
    // 这里可以处理请求发送前的操作
    //开启遮罩层
    $.loading.show({delay: 400});
});


$(document).ajaxSuccess(function (event, xhr, options) {
    // 这里可以处理请求成功返回的操作，参数 xhr 是 XMLHttpRequest 对象，options 是 AJAX 请求选项对象
    let response = JSON.parse(xhr.responseText);

    switch (response.code) {
        case 200://请求正确,这里根据选择要不要给出什么提示信息
            console.log(response.msg)
            break;

        case 403://登录过期,跳转到登录页面
            location.replace('/login');
            break;

        default://其它报错只给提示
            console.log("错误:" + response.msg)
            return false;
    }

});


$(document).ajaxError(function (event, xhr, options, thrownError) {
    // 这里可以处理请求失败的操作，参数 thrownError 是捕获到的错误
    console.log('ajaxError')
});


// 可选添加请求结束后的总体处理
$(document).ajaxComplete(function (event, xhr, options) {

    // 这里可以处理所有请求完成的操作(比如我们可以关闭遮罩层、让form表单恢复重置等,在这里设置就不需要在ajaxError,ajaxSuccess写两遍了)

    //请求完毕后关闭loading层
    $.loading.hide();

    //请求结束后 让formValidation表单验证插件的提交按钮变成可点击
    // $('form').formValidation('disableSubmitButtons', false)
    //如果要同时重置表单把注释打开
    // $(form).formValidation('resetForm', true)

});




