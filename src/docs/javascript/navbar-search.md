## 说明

导航栏搜索插件

## 用法

此插件可以作为 jQuery 插件或使用数据 api 激活。

### 数据接口

添加`data-bsa-toggle="navbar-search"`属性激活侧边栏逻辑

```html
<div class="bsa-search-form-wrapper" data-bsa-toggle="navbar-search">...</div>
```

### Jquery

```javascript
'.bsa-search-form-wrapper'.NavbarSearch(options)
```

## 选项

| 选项       | 类型    | 默认值                       | 说明                               |
| ---------- | ------- | ---------------------------- | ---------------------------------- |
| trigger    | String  | `'.bsa-search-form-toggler'` | 导航栏搜索的触发器(移动端显示)     |
| closeReset | boolean | false                        | 是否关闭搜索框时重置内容           |
| data-\*    | any     |                              | 其它拓展数据通过`data-*`的方式传递 |

您可以像这样通过数据属性使用任何选项。

```html
<div
  class="bsa-search-form-wrapper"
  data-bsa-toggle="navbar-search"
  data-close-reset="false"
  data-action="pages/search.html"
  data-params='{"type":"article","user":"admin2"}'
>
  ...
</div>
```

## 事件

|         事件类型         | 描述                                        |
| :----------------------: | ------------------------------------------- |
| search.bsa.navbar-search | 搜索时触发的事件,回车键、点击搜索图标时触发 |

例子:

```javascript
//头部搜索框处理(不需要可以删除,不明白的可以看bootstrap-admin官方文档)
$(document).on('search.bsa.navbar-search', function (e, inputValue, data) {
  //先得到请求地址,组合后大概是这样pages/search.html?keyword=dsadsa&type=article&user=admin2
  let url = data.action + '?keyword=' + inputValue + '&' + $.param(data.params)

  //然后通过tab打开一个搜索结果的窗口
  Quicktab.get('.qtab').addTab({
    title:
      '<i class="bi bi-search"></i><span class="text-danger ms-2">' +
      inputValue +
      '</span>',
    url: url,
    close: true,
  })
})
```

## 方法

|  方法  | 说明                               |
| :----: | ---------------------------------- |
| toggle | 在打开和关闭之间切换导航搜索的状态 |
|  open  | 打开搜索框                         |
| close  | 关闭搜索框                         |

例子:

```javascript
$('[data-bsa-toggle="navbar-search"]').NavbarSearch('toggle')
```
