## 🛠️ 安装

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

## 🌻 入门模板

通过入门模板可以观察到大概需要那些css、js文件，以及引入都是有顺序关系的。

```html
<!doctype html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="icon" href="../dist/img/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="../dist/img/favicon-16x16.png" sizes="16x16" type="image/png">
    <meta name="keywords" content="响应式后台模板,开源免费后台模板,Bootstrap5后台管理系统模板">
    <meta name="description" content="bootstrap-admin基于bootstrap5的免费开源的响应式后台管理模板">
    <meta name="author" content="ajiho">
    <link rel="stylesheet" href="../lib/bootstrap-icons/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../lib/bootstrap/dist/css/bootstrap.min.css">

    <!--    插件css引入位置,放这里是因为bootstrap-admin.css文件中有对插件样式的覆盖-->

    <link rel="stylesheet" href="../dist/css/bootstrap-admin.min.css">
    <title>bootstrap-admin开源免费响应式后台管理系统模板</title>
</head>
<body class="bg-body-tertiary py-3">
<div class="container-fluid">
    <!--    每个子页面内容区域-->
</div>

<script src="../lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="../lib/jquery/dist/jquery.min.js"></script>


<!--js插件引入位置,放这里是bootstrap-admin.min.js文件中可能包含插件的引用-->

<script src="../dist/js/bootstrap-admin.min.js"></script>
<script src="../dist/js/app.js"></script>

<!--这是模拟ajax请求的js文件,生产环境中直接删除本行-->
<script src="../dist/js/bootstrap-admin.mock.js"></script>

</body>
</html>
```

