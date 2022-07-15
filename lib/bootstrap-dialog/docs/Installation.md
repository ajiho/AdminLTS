# Installation

## npm

```bash
npm i bootdialog --save
```

## 直接在项目中引入脚本
```javascript
<script src="/path/dist/js/bootdialog.min.js"></script>
```


## 快速开始模板
我知道懒惰是人类的天性，所以我贴心的准备了一个快速模板，复制粘贴方便你体验。
```html
<!doctype html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <title>test</title>
</head>
<body>
<button class="btn btn-success" id="btn">按钮</button>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootdialog@0.0.1/dist/js/bootdialog.min.js"></script>
<script>
    var btn = document.querySelector('#btn');
    btn.addEventListener('click', function () {
        //... 
    });
</script>

</body>
</html>
```

[>>>例子](Examples.md)