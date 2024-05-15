## 💡 简介

bootstrap-admin是基于bootstrap(5.1.3+)
设计的一个响应式纯静态通用后台管理HTML模板,它可以适用于任何后端语言,任何项目的后台管理、只要你有bootstrap的一点点基础就可以轻松上手。旨在让喜欢用bootstrap开发后台管理系统的程序员有个愉悦的起点。

## 🗺️ 背景

简单交代一下背景，现在都是全面在拥抱前端框架(国内vue)
,但是开发一个小系统的后台管理的时候,原本一个后端人员可以用各自后端语言的模板引擎去渲染(curd)
就完事了，现在为了跟上现代化，连一个很小的后台管理都要用vue,那么你的开发成本又增加了,你需要先学会vue的基本语法还有vue全家桶(
vue-cli、vue-router、vuex)、以及一套前端的ui库吧,比如element ui、element plus(vue3),同时前端现在更新换代特别快

- vue-cli->vite
- vuex->pinia
- vue2->vue3(typescript)

我想这是部分后端人员不愿意面对的,或者说内心是有一点点抵触的，同时我看了一下国内很多后台管理系统都喜欢那种IFrame+多Tab的模式,但是样式却比较古老,
国外开源的后台模板样式虽然好看，但是都是点击刷新一整个页面的，因此在两者之间bootstrap-admin找到了一个平衡点。



> 根据我个人的经验来看，很多项目是这样的，后台是用这种模板搭建的，客户端多半是(uniapp、微信小程序)

> 也许一个小项目的后台管理在不分离的情况下会更加得心应手。


## ⭐ 关于IFrame+多Tab效果

bootstrap-admin的iframe+多tab效果的驱动来源于bootstrap-admin的官方出品的[bootstrap-quicktab](https://gitee.com/ajiho/bootstrap-quicktab),
一个iframe多tab的后台管理系统要想体验好，tab插件的设计要足够强大才行，如果和tab有关的任何优化和建议,可以去bootstrap-quicktab仓库提交issues,顺便求一波star

## 💬 交流

- [Q群1:284169647](https://jq.qq.com/?_wv=1027&k=WmCK50m5)
- [Q群2:719667795](https://jq.qq.com/?_wv=1027&k=aQ5vUuVC)

## 🌱 版本对应

| bootstrap-admin版本 | bootstrap版本 |
|-------------------|-------------|
| v1.x	             | v5.1.3      |
| v2.x	             | v5.3.0      |

## 📁 目录结构

开发您的项目时,只需要保留`dist`、`lib`、`pages`目录以及入口HTML文件`index.html`即可

```
├─build               构建目录
├─dist                生产文件目录
│  ├─css                 生产css目录
│  ├─img                 生产img目录
│  └─js                  生产js目录
├─docs                文档目录
├─lib                 外部依赖目录
├─pages               示例页面目录
├─.babelrc.js         Babel 插件、预设、转换配置文件
├─.browserslistrc     共用目标浏览器配置文件
├─.stylelintrc.json   stylelint配置文件
├─.eslintrc.js        eslint配置文件
├─composer.json       composer 定义文件
├─gulpfile.mjs        gulpfile打包配置文件
├─rollup.config.js    rollup打包配置文件
├─index.html          主页面(入口文件)
├─404.html            404页面(静态文件托管平台所需页面,无视即可)
├─LICENSE.txt         授权说明文件
├─package.json        npm 定义文件
├─README.md           README 文件
├─...
├─...
```

## 🚩 本地开发调试运行

如果你需要为bootstrap-admin贡献代码,或是你发现了一些问题需要重新编译dist文件，
您需要 Node.js/npm，然后克隆/下载 repo：

- npm ci
- npm run build(编译css/js文件、以及压缩img文件)
- npm run serve(默认开启一个服务可以访问页面,端口默认9999)

<img src="/npm-run-serve.png">


::: tip
真机调试:如果您的移动设备和serve端处于同一个无线网环境下就可以直接访问第二个地址在线预览和调试查看响应式效果
:::

一些别的指令的解释:

- npm run css(单独编译scss文件)
- npm run js(单独编译js文件)
- npm run css-fix([在可能的情况下自动修复规则报告的问题](https://stylelint.io/user-guide/cli/#--fix))

更多开发指令请查看`gulpfile.mjs`文件



## 💖 捐赠

开源不易,如果你觉得此项目的发展日后可以用上,或此时对你已有帮助,请支持我,让我继续前行

<div style="display: flex;flex-wrap: wrap">
    <img src="/ali_pay.png">
    <img src="/wechat_pay.png">
</div>




