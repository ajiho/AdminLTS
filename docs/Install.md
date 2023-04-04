有多种安装`bootstrap-admin`的方法,始终建议从gitee下载最新版本,以获得无错误和最新功能。

!> 注意:生产环境请使用下面的方式获取bootstrap-admin

### 发布页面

[下载地址](https://gitee.com/ajiho/bootstrap-admin/releases)


### composer

~~~bash
composer require ajiho/bootstrap-admin
~~~

### npm

~~~bash
npm i bootstrap-admin
~~~

### yarn

```bash
yarn add bootstrap-admin
```


### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/css/bootstrap-admin.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/js/bootstrap-admin.min.js"></script>
```

_**重要提示**: bootstrap-admin的依赖和插件也可以使用cdn,你可以根据bootstrap-admin的目录来找到对应的路径,部分例子如下_

```html
<!--bootstrap-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/bootstrap/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>


<!--jquery-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/jquery/dist/jquery.min.js"></script>


<!--ztree-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/css/plugins/metroStyle.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/@ztree/ztree_v3/js/jquery.ztree.all.min.js"></script>
```