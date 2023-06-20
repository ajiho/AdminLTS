//================封装的公共方法===============================

// 这里可以存你自己封装的一些公共函数

//=================================================

//一些全局插件的统一配置
$.loading.default.type = 'border';
$.loading.default.color = 'success';


//发送ajax前的统一设置
$.ajaxSetup({
  //超时时间:5秒
  timeout: 5000,
  //请求头添加参数
  headers: {
    //请求头防止csrf攻击(参考php框架laravel)
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  //统一返回类型
  dataType: 'json'
});

/**
 * ajax的一些统一处理
 * Tips:建议后端对于ajax请求返回统一json格式,方便我们处理业务逻辑
 * 这里的状态码是我们自己的业务上的code,不是http请求的status那个code
 * 比如:
 * {code:403 msg:'登录过期,重新登录' data:[]}
 * {code:200 msg:'' data:[{...},{...}]}
 * {code:10001 msg:'文章缩略图上传错误' data:[]}
 * 这样我们只要检测到403我们就直接返回登录页
 */


$(document).ajaxStart(function() {

});

$(document).ajaxStop(function() {

});

// ajax的每一次请求结束,成功失败都会执行
$(document).ajaxComplete(function (event, xhr, options) {
  //可以加你自己的处理逻辑

});


