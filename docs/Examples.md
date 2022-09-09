## 基础用法

简单的通知，快速用法,一个参数时表示 body

```javascript
BootstrapNotify.show('欲渡黄河冰塞川，将登太行雪满山');
```

<p>
<button class="pure-button runnable" data-file="1.html">⇲运行示例</button>
</p>

## 携带标题

快速用法，两个参数，参数一表示 内容，参数二 ：标题

```javascript
BootstrapNotify.show('月既不解饮，影徒随我身。', '李白《月下独酌四首·其一》');
```

<p>
<button class="pure-button runnable" data-file="2.html">⇲运行示例</button>
</p>

## 参数也可以是一个对象

```javascript
BootstrapNotify.show({
    header: '李白《渡荆门送别》',
    body: '月下飞天镜，云生结海楼。',
});
```

<p>
<button class="pure-button runnable" data-file="3.html">⇲运行示例</button>
</p>

## 显示和禁用关闭按钮

```javascript
BootstrapNotify.show({
    header: '李白《渡荆门送别》',
    body: '月下飞天镜，云生结海楼。',
    dismissBtnShow: false
});
```

<p>
<button class="pure-button runnable" data-file="4.html">⇲运行示例</button>
</p>

## 永久黏在屏幕上

通过`autohide`属性控制是否自动隐藏

```javascript
BootstrapNotify.show({
    header: '李白《渡荆门送别》',
    body: '月下飞天镜，云生结海楼。',
    dismissBtnShow: false,
    autohide: false,
});
```

<p>
<button class="pure-button runnable" data-file="5.html">⇲运行示例</button>
</p>

## 支持不同的方位弹出

支持的方位有`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

```javascript
BootstrapNotify.show({
    body: '登录成功！！',
    placement: 'top-left'
});
```

<p>
<button class="pure-button runnable" data-file="6.html">⇲运行示例</button>
</p>

## 支持不同的情景模式

支持的情景有`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`

```javascript
BootstrapNotify.show({
    header: '李白《渡荆门送别》',
    body: '月下飞天镜，云生结海楼。',
    dismissBtnShow: false,
    autohide: false,
    type: 'primary'
});
```

<p>
<button class="pure-button runnable" data-file="7.html">⇲运行示例</button>
</p>


## 自定义内容

### 携带图标
[官网查看详情>>>](https://getbootstrap.com/docs/5.1/components/alerts/#icons)


```javascript
BootstrapNotify.show({
    header:`  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>倒车`,
    body: '请注意',
    type: 'danger'
});
```

<p>
<button class="pure-button runnable" data-file="8.html">⇲运行示例</button>
</p>






### 携带图片

```javascript
BootstrapNotify.show({
    body: `
    	<div class="d-flex gap-3">
		<img class="rounded-circle" width="75" height="75" src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=75&q=80">
		<div>
			<h4>Did you know ?</h4>
			<p class="text-secondary">
				Cats can run around 48 kph (30 mph), but only over short distances. A house cat could beat superstar runner Usain Bolt in the 200 meter dash.
			</p>
		</div>
	</div>
    `,
    type: 'danger'
});
```

<p>
<button class="pure-button runnable" data-file="9.html">⇲运行示例</button>
</p>



### 携带按钮并带有回调

```javascript
BootstrapNotify.show({
    body: `
    	<img class="rounded-circle" width="100"  src="https://img2.baidu.com/it/u=1057753685,2671848790&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=485">
		<div>
			<h4 class="text-muted mt-3">王伦在梁山做头领时是否死的冤?</h4>
			<p class="text-secondary">
				<button class='btn btn-danger'>罪不致死</button> <button class='btn btn-success  ms-2'>关闭,不想评价</button>
			</p>
		</div>
    `,
    autohide: false,
    onShow: function (notify) {
        notify.template.onclick = function (event) {
            event.preventDefault();
            if (event.target.classList.contains('btn-danger')) {
                BootstrapNotify.show("你选择了-罪不致死")
            } else if (event.target.classList.contains('btn-success')) {
                notify.hide();
            }
        }
    }
});
```

<p>
<button class="pure-button runnable" data-file="10.html">⇲运行示例</button>
</p>