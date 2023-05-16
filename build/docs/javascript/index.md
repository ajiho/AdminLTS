## 说明

布局插件管理布局，微调bootstrap-admin的相关设置



## 用法

此插件在窗口加载时自动激活。



## 选项

| 选项 | 类型 | 默认值 | 说明 |
|--|--|--|--|
|scrollbarAutoHide |boolean | `true` | 滚动条是否鼠标移出后自动隐藏 |
|preloadDuration |Integer | 800 | 遮罩层加载时长 |
|themeOnTabPage |boolean | `true`  | 子页面是否也进行主题适配 |

 您可以像这样通过数据属性使用任何选项。

```html
<body data-scrollbar-auto-hide="true" data-theme-on-tab-page="true">...</body>
```


## 方法

| 方法 |  说明 |
|--|--|
|fullscreen  | 全屏 |
|exitFullscreen  | 退出全屏 |


例子:

```javascript
 $('body').Layout('fullscreen')
 $('body').Layout('exitFullscreen')
```

