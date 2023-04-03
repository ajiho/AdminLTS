<h1 align="center">Bootstrap-Admin</h1> 

<p align="center">    
    <b>无论您是用于项目开发、学习、毕设、还是教学视频演示、希望能给个star，这将会是我最大的动力!</b>
</p>
<p align="center">    
    <b>如果对您有所帮助，您可以点右上角 "Star" 收藏一下 ，获取第一时间更新，谢谢！</b>
</p>

## 简介

Bootstrap-Admin基于Bootstrap5.x设计的一个响应式静态后台管理HTML模板,旨在让喜欢用bootstrap开发后台管理系统的程序员有个愉悦的起点。

- [演示](https://ajiho.gitee.io/bootstrap-admin)
- [文档](https://ajiho.gitee.io/bootstrap-admin/docs)
## 交流QQ群

- [群1:284169647](https://jq.qq.com/?_wv=1027&k=WmCK50m5)
- [群2:719667795](https://jq.qq.com/?_wv=1027&k=aQ5vUuVC)


## 特性

- 高度响应式、一站匹配手机、平板、pc
- 界面整体简约、大气、流畅不卡顿
- 集成开发中常用的优秀的开源js插件
- 严格区分Bootstrap-Admin和Bootstrap的样式,Bootstrap-Admin的样式都是以`bsa`开头
- 没有修改Bootstrap底层样式,体验原汁原味的Bootstrap
- 紧跟Bootstrap官方的更新步伐


## 版本对应

|bootstrap-admin版本|bootstrap版本|
|--|--|
|v1.x|v5.1.3|
|v2.x|v5.3.0(开发中)|

## 请我喝杯咖啡



<div align="left">
<img alt="请我喝杯咖啡" src="https://gitee.com/ajiho/bootstrap-admin/raw/2.x/pay.png" height="300" />
</div>


## 目录结构

开发项目时,只需要保留`dist`、`lib`即可

```
├─dist                生产文件目录
│  ├─css                 生产css目录
│  ├───plugins              第三方插件的重写样式目录
│  ├─img                 生产img目录
│  └─js                  生产js目录
├─lib                 外部依赖目录
├─pages               示例页面目录
├─src                 源码目录
│  ├─img                 图片资源
│  ├─js                  js目录
│  └─scss                scss样式目录
├─.browserslistrc     共用目标浏览器配置文件
├─.stylelintrc.json   stylelint配置文件
├─composer.json       composer 定义文件
├─gulpfile.mjs        gulpfile打包配置文件
├─LICENSE.txt         授权说明文件
├─package.json        npm 定义文件
├─README.md           README 文件
```

## 下载

注意:生产环境请使用下面的方式获取bootstrap-admin

### 发布页面

[下载地址](https://gitee.com/ajiho/bootstrap-admin/releases)


### composer

~~~
composer require ajiho/bootstrap-admin
~~~

### npm

~~~
npm i bootstrap-admin
~~~

### yarn
```
yarn add bootstrap-admin
```


### CDN

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/css/bootstrap-admin.min.css">
```
```
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/js/bootstrap-admin.min.js"></script>
```
_**重要提示**: bootstrap-admin的依赖和插件也可以使用cdn,你可以根据bootstrap-admin的目录来找到对应的路径,部分例子如下_

```html
<!--bootstrap-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/bootstrap/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>


<!--jquery-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/jquery/dist/jquery.min.js"></script>


<!--ztree-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-admin/dist/css/plugins/metroStyle.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-admin/lib/@ztree/ztree_v3/js/jquery.ztree.all.min.js"></script>
```


## 设备支持

|Internet Explorer| Chrome |Firefox |Microsoft Edge |Opera |Safari |
|:--:|--|--|--|--|--|
|不支持  |last 2 versions  |last 2 versions  |last 2 versions  |last 2 versions  |last 2 versions  |

## 反馈

开发过程发现有任何问题，欢迎大家提交Issue。

