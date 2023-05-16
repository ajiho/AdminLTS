
## 入门模板

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

<!--这是模拟ajax请求的js文件,生成环境中直接删除本行-->
<script src="../dist/js/bootstrap-admin.mock.js"></script>

</body>
</html>
```


## 开发经验

我们发现所有的页面都有公共的部分,我们可以利用各自后端模板引擎技术把这部分提取为一个基础模板,然后
每个新页面都继承它来进行开发,下面通过php框架laravel的blade模板引擎来说明(因为我也没有其它框架的经验所以下面内容你举一反三理解就行了)

### 1.准备静态资源

我们在laravel框架的`public`目录(对外访问目录)下新建一个`admin`目录
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
<script >
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



