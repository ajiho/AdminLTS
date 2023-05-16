## 说明

PushMenu插件控制主侧边栏的切换按钮

## 用法

此插件可以作为 jQuery 插件或使用数据 api 激活。

### 数据接口

添加`data-bsa-toggle="pushmenu"`属性激活插件

```html
<li class="bsa-sidebar-toggler" data-bsa-toggle="pushmenu" ></li>
```

### Jquery

```javascript
$('.bsa-sidebar-toggler').PushMenu(options)
```

## 选项

| 选项 | 类型 | 默认值 | 说明 |
|:--:|--|--|--|
|animationSpeed |Number | 300 | 单位:毫秒,侧边栏伸缩时的动画速度 |

 您可以像这样通过数据属性使用任何选项。

```html
<li class="bsa-sidebar-toggler" data-bsa-toggle="pushmenu" data-animation-speed="150" ></li>
```

## 事件

| 事件类型 | 描述 |
|--|--|
|expand.bsa.pushmenu |在侧边栏展开之前触发 |
|expanded.bsa.pushmenu |在侧边栏展开动画执行完毕后触发|
|collapse.bsa.pushmenu |在侧边栏折叠之前触发|
|collapsed.bsa.pushmenu |在侧边栏折叠动画执行完毕后触发|

例子:

```javascript
$(document).on('expand.bsa.pushmenu', handleExpandedEvent)
```

## 方法

| 方法 |  说明 |
|:--:|--|
|toggle  | 在展开和折叠之间切换菜单状态|
|expand  | 展开侧边栏菜单 |
|collapse  |折叠侧边栏菜单 |

例子:

```javascript
$('[data-bsa-toggle="pushmenu"]').PushMenu('toggle')
```