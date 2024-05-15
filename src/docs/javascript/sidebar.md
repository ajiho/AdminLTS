## 说明

侧边栏插件,用于控制侧边栏

## 用法

此插件可以作为 jQuery 插件或使用数据 api 激活。

### 数据接口

添加`data-bsa-toggle="sidebar"`属性激活侧边栏逻辑

```html

<ul class="bsa-menu" data-bsa-toggle="sidebar">
    <li>
        <a href="welcome.html">
            <i class="bi bi-house"></i>首页
        </a>
    </li>
    <li>
        <a href="javascript:" class="has-children">
            <i class="bi bi-pencil-square"></i>xx管理
        </a>
        <ul>
            <li>
                <a href="list.html">xx列表</a>
            </li>
        </ul>
    </li>
</ul>
```

### Jquery

```javascript
$('.bsa-menu').Sidebar(options)
```

## 选项

|       选项       | 类型      | 默认值   | 说明                         |
|:--------------:|---------|-------|----------------------------|
|   clickClose   | boolean | false | 点击菜单后是否自动关闭侧边栏             |
| animationSpeed | Number  | 150   | 单位:毫秒,展开闭合菜单时的动画速度,最小值:150 |
|   accordion    | boolean | true  | 是否启用手风琴模式                  |

您可以像这样通过数据属性使用任何选项。

```html

<ul data-bsa-toggle="sidebar" data-accordion="true" data-animation-speed="150">...</ul>
```

## 事件

|         事件类型          | 描述        |
|:---------------------:|-----------|
| expanded.bsa.sidebar  | 在子菜单展开后触发 |
| collapsed.bsa.sidebar | 在子菜单折叠后触发 |

例子:

```javascript
$(document).on('expanded.bsa.sidebar', handleExpandedEvent)
```

