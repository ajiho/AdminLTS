//========================================================================

//封装的公共方法(这里可以存放你自己封装的一些公共函数)

/**
 * 将字符串中的双引号转义为 HTML 实体 &quot;
 * @param {string} str - 需要转义的字符串
 * @return {string} 转义后的字符串
 */
function escapeDoubleQuotes(str) {
  return str.replace(/"/g, "&quot;")
}

//============================================================================

// 内置插件的统一配置,比如loading、modal、toasts
$.toasts.default.delay = 1500
$.modal.default.centered = true
$.modal.default.btnAlign = "center"
$.modal.default.loading = true

// 配置进度条插件的小球不要显示
top.NProgress.configure({ showSpinner: false })

//============================================================================

//发送ajax前的统一设置

$.ajaxSetup({
  //超时时间:5秒
  timeout: 5000,
  //请求头添加参数
  headers: {
    //请求头防止csrf攻击(参考php框架laravel)
    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
  },
  //统一返回类型
  dataType: "json",
})

//============================================================================

/**
 * ajax的一些事件监听
 * Tips:建议后端对于ajax请求返回统一json格式,方便我们处理业务逻辑
 * 这里的状态码是我们自己的业务上的code,不是http请求的status那个code
 * 比如:
 * {code:403 msg:'登录过期,重新登录' data:[]}
 * {code:200 msg:'' data:[{...},{...}]}
 * {code:10001 msg:'文章缩略图上传错误' data:[]}
 * 这样我们只要检测到code等于403我们就直接 location.replace('login') 跳转登录页
 */

/**
 * AJAX请求开始时触发
 */
$(document).on("ajaxSend", function (event, jqXHR, ajaxOptions) {
  //进度条开始
  top.NProgress.start()
})

/**
 * AJAX请求完成时(成功或失败)触发
 */
$(document).on("ajaxComplete", function (event, jqXHR, ajaxOptions) {
  //进度条结束
  top.NProgress.done()
})

/**
 * AJAX请求失败时触发
 */
$(document).on("ajaxError", function (event, jqXHR, ajaxSettings, thrownError) {
  //处理网络错误
  let msg = ""
  const status = jqXHR.status
  switch (status) {
    case 401:
      msg = "token过期"
      break
    case 403:
      msg = "无权访问"
      break
    case 404:
      msg = "请求地址错误"
      break
    case 500:
      msg = "服务器出现问题"
      break
    default:
      msg = "无网络"
  }

  //通知
  $.toasts({
    placement: "top-center",
    type: "danger",
    body: msg,
  })
})
