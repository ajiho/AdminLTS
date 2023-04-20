<h1 align="center">Bootstrap-Admin</h1> 

<p align="center">    
    <b>无论您是用于项目开发、学习、毕设、还是教学视频演示、希望能给个star，这将会是我最大的动力!</b>
</p>
<p align="center">    
    <b>如果对您有所帮助，您可以点仓库右上角 "Star" 收藏一下 ，获取第一时间更新，谢谢！</b>
</p>

## 说明

bootstrap-admin是基于bootstrap(5.1.3+)设计的一个响应式纯静态后台管理HTML模板,它可以适用于任何后端语言,只要你有bootstrap的一点点基础就可以轻松上手。
旨在让喜欢用bootstrap开发后台管理系统的程序员有个愉悦的起点。


## 交流

- [Q群1:284169647](https://jq.qq.com/?_wv=1027&k=WmCK50m5)
- [Q群2:719667795](https://jq.qq.com/?_wv=1027&k=aQ5vUuVC)

## 特性

- 高度响应式、一站匹配手机、平板、pc
- 界面整体简约、大气、流畅不卡顿
- 集成开发中常用的优秀的开源js插件
- 严格区分bootstrap-admin和bootstrap的样式,bootstrap-admin的样式都是以`bsa`开头
- 没有修改bootstrap底层样式,体验原汁原味的bootstrap
- 紧跟bootstrap官方的更新步伐

## 版本对应

| bootstrap-admin版本 | bootstrap版本 |
|-------------------|-------------|
| v1.x              | v5.1.3      |
| v2.x(开发中)         | v5.3.0-alpha3 |


## 目录结构

开发项目时,只需要保留`dist`、`lib`即可

```
├─dist                生产文件目录
│  ├─css                 生产css目录
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
├─index.html          主页面
├─LICENSE.txt         授权说明文件
├─package.json        npm 定义文件
├─README.md           README 文件
```

## 由来

简单交代一下背景，现在都是全面在拥抱前端框架(国内vue)
,但是开发一个小系统的后台管理的时候,原本一个后端人员可以用各自后端语言的模板引擎去渲染(curd)就完事了,
现在为了跟上现代化，连一个很小的后台管理都要用vue,那么你的开发成本又增加了,你需要先学会vue的基本语法还有vue全家桶(
vue-cli、vue-router、vuex)、以及
一套前端的ui库吧,比如element ui、element plus(vue3),同时前端现在更新换代特别快

- vue-cli->vite
- vuex->pinia
- vue2->vue3(typescript)

我想这是部分后端人员不愿意面对的,或者说内心是有一点点抵触的，同时我看了一下国内很多后台管理系统都喜欢那种**iframe+多tab的模式**,但是样式却比较古老,
国外开源的后台模板样式虽然好看，但是都是点击刷新一整个页面的，因此在两者之间`bootstrap-admin`找到了一个平衡点。

!> 注意:作者的意思并不是说不学前端那一套了,还是鼓励让更多的偏向后端的程序员去多接触一些东西,成为真正的全栈大牛

## 捐赠

开源不易,如果对你有帮助,请支持我

![支付宝收款码](./dist/img/ali_pay.png)
![微信收款码](./dist/img/wechat_pay.png)

## 鸣谢

- [笔下光年](https://gitee.com/yinqi)
  设计后台模板的想法来自于他的[Light-Year-Admin-Template](https://gitee.com/yinqi/Light-Year-Admin-Template)
- [AdminLTE](https://github.com/ColorlibHQ/AdminLTE)从中借鉴了一些思路