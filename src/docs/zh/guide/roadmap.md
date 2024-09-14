# 路线图

让`AdminLTS`的核心脱离jQuery的依赖，这样就可以使用专用发送ajax的库(axios等)来代替目前jQuery的`$.ajax`、`$.get`等,
但是本身该项目本身的部分依赖比如核心的表单验证插件(formvalidation)、数据表格(bootstrap-table)、以及比较重要的树形结构插件(ztree)
都还在依赖jQuery，以及本身`AdminLTS`就是服务于后端程序员，大家都比较熟悉jQuery、以及jQuery本身就有一套优秀的dom操作的api，
导致目前还很难和jQuery完全脱钩。AdminLTS未来会提供解决方案并彻底脱离jQuery
