# options

| 选项 |默认值 | 描述 |
|--|--|--|
| title | "" |弹窗标题 |
| body | "" |内容 |
| footer | "" | 模态框框底部内容 |
| modalClass | fade | ".modal"所在div修饰类  比如:fade |
| modalDialogClass |modal-dialog-centered | ".modal-dialog"所在div修饰类  比如:modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable |
| modalOptions | {backdrop: true,keyboard: true,focus: true} | bootstrap模态框选项参考:https://getbootstrap.com/docs/5.1/components/modal/#options |
| btnShow | true |是否显示关闭按钮 |
| btnText | close |关闭按钮自定义文本 |
| btnClass | btn-secondary |关闭按钮样式类名 |
| buttons | [] | 自定义按钮数组,元素是按钮 [配置对象](#buttons) |

!> 下面是对上面一些参数的进一步说明

## buttons
按钮配置对象格式如下
```
{
        text: '确定',
        btnClass: 'btn-success',
        action: function () {
          BootDialog.fire('success');
    }
}
```


