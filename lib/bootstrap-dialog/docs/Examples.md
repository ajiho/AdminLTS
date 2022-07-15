## 基础用法
简单的通知，快速用法,一个参数时表示 body
```javascript
BootDialog.fire('这只是一个简单的通知!!');
```
<p>
<button class="pure-button runnable" data-file="1.html">⇲运行示例</button>
</p>



## 携带标题
快速用法，两个参数，参数一表示 内容，参数二 ：标题
```javascript
BootDialog.fire('“先天下之忧而忧，后天下之乐而乐”乎！噫！微斯人，吾谁与归？','岳阳楼记');
```
<p>
<button class="pure-button runnable" data-file="2.html">⇲运行示例</button>
</p>

## 通过配置对象调用
此时optios参数是一个对象

```javascript
BootDialog.fire({
    title: "标题",
    body: "内容",
});
```

<p>
<button class="pure-button runnable" data-file="3.html">⇲运行示例</button>
</p>



## 自定义关闭按钮文字和样式


```javascript
BootDialog.fire({
    title: "标题",
    body: "一些通知内容233",
    btnText: '朕知道了',
    btnClass: 'btn-success'
});
```

<p>
<button class="pure-button runnable" data-file="4.html">⇲运行示例</button>
</p>


## 自定义按钮以及样式
通过自定义按钮，可以用来实现`confirm`的交互效果

```javascript
BootDialog.fire({
    body: "确定删除该用户么？",
    //false:不显示 close按钮
    btnShow: false,
    buttons: [
        {
            text: '确定',
            btnClass: 'btn-success',
            action: function () {
                BootDialog.fire('success');
            }
        },
        {
            text: '一会儿再说',
            btnClass: 'btn-danger',
            action: function () {
                BootDialog.fire('一会儿再说');
            }
        }
    ]
});
```

<p>
<button class="pure-button runnable" data-file="5.html">⇲运行示例</button>
</p>


## iframe弹层
如果存在url参数，那么它会变成一个iframe弹层，这在项目开发中很有用,注意：只要设置了`url`参数，那么`body`参数将是无效的。



```javascript
BootDialog.fire({
    url:'https://stream7.iqilu.com/10339/upload_transcode/202002/16/20200216050645YIMfjPq5Nw.mp4',
    title: "弹层标题",
    body: "确定删除该用户么？",
    //false:不显示 close按钮
    btnShow: true,
    modalDialogClass:'modal-dialog-centered modal-xl',
});
```

<p>
<button class="pure-button runnable" data-file="6.html">⇲运行示例</button>
</p>

## 显示复杂表单并处理输入

可以自定义配置实现类似`prompt`的效果。

```javascript
BootDialog.fire({
    title: 'New message',
    body: `
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Recipient:</label>
                <input type="text" class="form-control" id="recipient-name">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form>
    `,
    
    footer: `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary send-btn">Send message</button>
    `,
    
    onCreate: function (modal) {
    
        modal.element.onclick = function (event) {
        event.preventDefault()
        
        var form = modal.element.querySelector('form');
        
            if (event.target.classList.contains('send-btn')) {
            
                var Recipient = form.querySelector('#recipient-name').value;
                var Message = form.querySelector('#message-text').value;
                var Result = `
                            <b>Recipient</b>:${Recipient} <br/>
                            <b>Message</b>:${Message} <br/>
                        `;
                BootDialog.fire(Result, '返回结果:')
            }
        }
    }
})
```

<p>
<button class="pure-button runnable" data-file="7.html">⇲运行示例</button>
</p>


