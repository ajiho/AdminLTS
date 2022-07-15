# bootdialog.js

![MIT协议](https://img.shields.io/badge/license-MIT-red)
![version](https://img.shields.io/badge/version-0.0.1-red)
[![star](https://gitee.com/x852/bootdialog/badge/star.svg?theme=dark)](https://gitee.com/ken678/YZNCMS/stargazers)
[![fork](https://gitee.com/x852/bootdialog/badge/fork.svg?theme=dark)](https://gitee.com/ken678/YZNCMS/members)

[![x852/bootdialog](https://gitee.com/x852/bootdialog/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/x852/bootdialog)


`bootdialog.js`是一个小型JavaScript库，它允许您使用引导模式创建编程对话框，而无需担
心创建、管理或删除任何必需的DOM元素或JavaScript事件处理程序。

## 优点
- 无jquery依赖
- 轻量(5k)
- 使用简单
- 支持bootstrap5模态框所有特性。



# 为什么封装？
bootstrap5的模态框是一个非常精美的组件，但是使用它会让我很生气，因为必须写下面一大串代码。🤬
```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```


相比我更喜欢这样使用它
```javascript
BootDialog.fire('Here are some things');
```


!> 如果你喜欢的话，可以给个star，是对我最大的鼓励。

![logo](https://img1.baidu.com/it/u=2480053121,200270007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)
