## 说明

基于bootstrap的modal组件封装的一个插件,modal本身就具有的强大响应式效果，也许你在别的项目可能使用过`layer`弹层插件
,但是那个响应式并没有那么强大，这里我根据bootstrap官方的modal组件封装了一个简单的弹层,它不需要你配置弹层的大小,同时
你可以配置`modal`组件的所有特性,也更和`bootstrap-admin`保持一致的风格。

## 用法

```javascript
$.modal({
    body: '这是一个简单的alert框',
})
```

## 选项

|        选项        | 类型       | 默认值                                               | 说明                                                                                                |
|:----------------:|----------|---------------------------------------------------|---------------------------------------------------------------------------------------------------|
|  btnCancelText   | String   | '取消'                                              | 取消按钮的文本                                                                                           |
|  btnCancelClass  | String   | 'btn-light'                                       | 取消按钮的class                                                                                        |
|    btnOKText     | String   | '确定'                                              | ok按钮的文本                                                                                           |
|    btnOKClass    | String   | 'btn-primary'                                     | ok按钮的class                                                                                        |
|        ok        | Function | null                                              | ok按钮的回调                                                                                           |
|    cancelBtn     | Boolean  | false                                             | 是否显示取消按钮,默认不显示                                                                                    |
|      cancel      | Function | null                                              | 取消按钮的回调                                                                                           |
|      title       | String   | ''                                                | 模态框的标题，url参数不为空且title为'',则title为url路径                                                             |
|       body       | String   | ''                                                | 模态框的内容部分                                                                                          |
|     btnAlign     | String   | 'right'                                           | 底部按钮区域对齐方式                                                                                        |
|     btnSize      | String   | ''                                                | 底部按钮区域的大小统一设置                                                                                     |
|     buttons      | Array    | null                                              | 如果设置为 [] 则表示底部按钮区域不显示,数组的元素是对象                                                                    |
|    modalClass    | String   | 'fade'                                            | ".modal"所在div修饰类  比如:fade                                                                         |
| modalDialogClass | String   | 'modal-dialog-centered modal-sm'                  | ".modal-dialog"所在div修饰类  比如:modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable |
|   modalOptions   | {}       | `{ backdrop: true, keyboard: true, focus: true }` | bootstrap模态框选项参考:https://getbootstrap.com/docs/5.3/components/modal/#options                      |
|       url        | String   | ''                                                | iframe的src路径，设置后会覆盖body参数                                                                         |
|      onShow      | Function | null                                              | show调用实例方法时会立即触发此事件                                                                               |
|     onShown      | Function | null                                              | 当动画完全执行完毕时触发此事件                                                                                   |
|      onHide      | Function | null                                              | hide调用实例方法时会立即触发此事件。                                                                              |
|     onHidden     | Function | null                                              | 当模态框完成对用户隐藏时会触发此事件                                                                                |

## 案例

### alert

```html
dsasda
```

### confirm

```html
dsasda
```


::: tip
确认框用的频率特别高，这里特别封装了一个简约用法,免配置快速生成一个confirm框
:::


```html
dsasda
```

### prompt

### iframe弹层




