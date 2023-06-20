## 说明

布局插件管理布局，微调bootstrap-admin的相关设置

## 用法

此插件在窗口加载时自动激活。

## 选项

| 选项                     | 类型      | 默认值            | 说明                                                                                                       |
|------------------------|---------|----------------|----------------------------------------------------------------------------------------------------------|
| scrollbarAutoHide      | String  | 'leave'        | 滚动条自动隐藏方式 #https://kingsora.github.io/OverlayScrollbars/ 可用值：'never'、'scroll'、'leave'、'move'             |
| scrollbarAutoHideDelay | Integer | 1300           | 滚动条隐藏时间                                                                                                  |
| preloadDuration        | Integer | 800            | 加载器持续时间                                                                                                  |
| tabPageEnableTheme     | boolean | true           | 子页面是否也进行主题适配                                                                                             |
| theme                  | String  | 'light'        | 页面一进入时默认主题，可用值:'light'、'dark'、'indigo'、'green' 、'blue' 、'yellow' 、'pink' 、'red' 、'orange' 、'cyan'、'teal' |
| themeCacheType         | String  | 'localStorage' | 主题的保存方式可用值:'sessionStorage'、'localStorage'                                                               |

您可以像这样通过数据属性使用任何选项

> 通过数据属性时必须使用短横线命名法(kebab case),它会自动转换成驼峰命名法(camel case)

```html
<body data-theme="dark" data-scrollbar-auto-hide="true" data-tab-page-enable-theme="true">...</body>
```

::: tip
主题逻辑：当主题色被勾选时,刷新页面会应用被勾选中的主题色，当取消勾选时恢复到`theme`选项设定的默认主题色
:::

## 方法

| 方法             | 说明   |
|----------------|------|
| fullscreen     | 全屏   |
| exitFullscreen | 退出全屏 |

例子:

```javascript
 $('body').Layout('fullscreen')
$('body').Layout('exitFullscreen')
```

