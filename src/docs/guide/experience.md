## 模板继承

我们发现所有的页面都有公共的部分,我们可以利用各自`后端模板引擎技术`把这部分提取为一个基础模板,然后
每个新页面都继承它来进行开发,这样就会非常便利和高效

> 什么是后端模板引擎技术？

| 语言      | 模板引擎                                               |
|---------|----------------------------------------------------|
| PHP     | Blade、Smarty、Twig、Laravel Blade、Volt、ThinkTemplate |
| Java    | JSP、FreeMarker、Thymeleaf、Velocity、Pebble           |
| Python  | Jinja2、Django Template、Mako、Chameleon、Tornado      |
| Ruby    | ERB、Haml、Slim、Liquid、Mustache                      |
| Node.js | EJS、Pug（原名Jade）、Handlebars、Nunjucks、Swig           |
| Go      | html/template、 text/template、 Jet、 Pongo2、 Amber   |

### 1.准备静态资源

我们在laravel框架(因为我也没有太多其它框架的经验所以下面内容你举一反三理解就行了)的`public`目录(对外访问目录)
下新建一个`admin`目录
然后我们把下载下来的bootstrap-admin目录中的dist、lib目录直接丢里面

### 2.准备基础模板

创建目录`resources\views\admin\common`目录,然后新建一个名为`base.blade.php`的模板

```html
<!doctype html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="icon" href="/admin/dist/img/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/admin/dist/img/favicon-16x16.png" sizes="16x16" type="image/png">
    <meta name="keywords" content="响应式后台模板,开源免费后台模板,Bootstrap5后台管理系统模板">
    <meta name="description" content="bootstrap-admin基于bootstrap5的免费开源的响应式后台管理模板">
    <meta name="author" content="ajiho">
    <link rel="stylesheet" href="/admin/lib/bootstrap-icons/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/admin/lib/bootstrap/dist/css/bootstrap.min.css">
    @yield('css')
    <link rel="stylesheet" href="/admin/dist/css/bootstrap-admin.min.css">
    @yield('mycss')
    <title>bootstrap-admin开源免费响应式后台管理系统模板</title>
</head>
<body class="bg-body-tertiary py-3">
<div class="container-fluid">
    @yield('cnt')
</div>

<script src="/admin/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="/admin/lib/jquery/dist/jquery.min.js"></script>
@yield('js')
<script src="/admin/dist/js/bootstrap-admin.min.js"></script>
<script src="/admin/dist/js/app.js"></script>
@yield('myjs')
</body>
</html>
```

### 2.在子页面中直接继承它,然后根据需要在对应的区块拓展内容

```html
@extends('admin.common.base')

@section('css')
{{-- bootstrap-table插件所需样式 --}}
<link rel="stylesheet" href="/admin/lib/bootstrap-table/dist/bootstrap-table.min.css">
@endsection

@section('cnt')
<div class="card border-0 shadow-sm">
    <div class="card-body">
        <table id="table"></table>
    </div>
</div>
@endsection

@section('js')
<script src="/admin/lib/bootstrap-table/dist/bootstrap-table.min.js"></script>
@endsection

@section('myjs')
<script>
    $('#table').bootstrapTable({
        //列
        columns: [
            {
                field: 'id',
                title: 'Item ID'
            },
            {
                field: 'name',
                title: 'Item Name'
            },
            {
                field: 'price',
                title: 'Item Price'
            }
        ],
        //数据
        data: [
            {
                id: 1,
                name: 'Item 1',
                price: '$1'
            },
            {
                id: 2,
                name: 'Item 2',
                price: '$2'
            }
        ]
    })
</script>
@endsection

```

## 关于表单提交

对于任何表单的提交,建议都使用ajax来进行提交,因为很多传统的表单提交就是一提交不管成功还是失败都跳转到一个新的提示页面再跳转
回来，如果说表单内容较少，而且提交成功了还好说,假如你的项目比较复杂,需要填的内容比较多，用户认真的填了很长的一个表单准备开开心心的提交之后，你
给整一个跳转提示某个表单项内容长度不够，然后此时表单数据已经被你的跳转操作把表单内容清空了，此时用户肯定心里想c**。

因此,一个表单验证插件是必不可少的，bootstrap-admin集成了`formvalidation`表单验证插件，它很好用，可惜的是作者现在
已经收费了，不过在比较早的开源版本中对bootstrap3的支持还是可以的，但是bootstrap-admin是基于bootstrap5的,有很多
地方原本是不适配的，被我微调之后已经可以使用了,所以我们看到该插件是在build/formvalidation目录下的(不像别的插件通过npm来安装的)，如果以后还有精力
我可能会重新开一个仓库对`formvalidation`进行维护，暂时先这样用着吧
