# bootstrap-admin

基于bootstrap5.1.x和iframe的一个静态的后台管理模板。旨在让喜欢bootstrap的后端程序员可以快速项目开发。


## zIndex

navbar:1030
sidebar:1020
mask(遮罩层):1010


## 说明


~~~
<a href="javascript:" class="has-children open"><i class="fa-solid fa-baby-carriage"></i>其它页面</a>
~~~
在含有`.has-children`类名的侧边栏a链接中添加`.open` 类表示默认展开该菜单

~~~
<li><a href="blank2.html" data-target-iframe data-defaultpage>登录页面</a></li>
~~~

含有`data-target-iframe`属性的a链接表示默认在右侧的iframe中打开,如果不加则表示正常的a链接，会在父窗口中进行正常跳转。
含有`data-defaultpage`属性的a链接表示 右侧iframe的默认页面。

