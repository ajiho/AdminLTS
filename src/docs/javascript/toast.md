## 说明

根据bootstrap官方组件[toasts](https://getbootstrap.com/docs/5.3/components/toasts/)
和[progress](https://getbootstrap.com/docs/5.3/components/progress/)封装的一个消息通知插件

## 用法

```javascript
$.toasts({
  //配色方案 primary secondary success danger warning info dark light
  type: 'danger',
  // autohide: false,
  title: '这是标题',
  image: '../dist/img/favicon-16x16.png',
  //鼠标移入进度条暂停
  hoverProgressPause: true,
  //toast是否添加关闭按钮
  btnClose: true,

  content: '系统错误~',
  placement: 'top-left',
  delay: 5000,
  subTitle: '11分钟前aaa',
  body: `这是简单的内容`,
  animation: true,
  autohide: true,
})
```

## 选项

| 选项               | 类型           | 默认值      | 说明                                                                                 |
| ------------------ | -------------- | ----------- | ------------------------------------------------------------------------------------ |
| hoverProgressPause | Boolean        | true        | 鼠标移入进度条暂停                                                                   |
| btnClose           | Boolean        | true        | toast是否添加关闭按钮                                                                |
| title              | String         | ''          | 标题                                                                                 |
| content            | String         | ''          | 内容部分,该配置会和title和body互斥                                                   |
| image              | String         | ''          | 头部的img的src属性                                                                   |
| imageHeight        | String         | ''          | 图片的高度                                                                           |
| imageAlt           | String         | ''          | 图片的alt属性                                                                        |
| subTitle           | String         | ''          | 头部的副标题                                                                         |
| body               | String         | ''          | 正文内容此选项完全可以自定义body的内容                                               |
| zIndex             | Integer        | 1081        | toast容器的堆叠顺序                                                                  |
| animation          | Boolean        | true        | 将过渡应用到toast                                                                    |
| autohide           | Boolean        | true        | 自动隐藏toast                                                                        |
| delay              | Integer        | 5000        | 延迟隐藏toast(单位:毫秒)                                                             |
| placement          | String         | 'top-right' | 方位值,支持的方位参考:https://getbootstrap.com/docs/5.3/components/toasts/#placement |
| type               | String         | 'primary'   | 情景色                                                                               |
| onShow             | null、function | null        | show调用实例方法时会立即触发此事件                                                   |
| onShown            | null、function | null        | 当 toast 对用户可见时会触发此事件                                                    |
| onHide             | null、function | null        | hide调用实例方法时会立即触发此事件                                                   |
| onHidden           | null、function | null        | 当 toast 完成对用户隐藏时将触发此事件                                                |

## 方法

| 方法 | 说明         |
| ---- | ------------ |
| hide | 关闭消息通知 |

例子:

```javascript
//它的返回的是一个taost实例
let instance = $.toasts({
  type: 'success',
  content: '登录成功',
  autohide: false,
  btnClose: false,
})

// 当你配置 autohide:false,且 btnClose:false 页面上没有任何可以关闭toast的按钮时该方法很有用
// 关闭toast
instance.hide()
```
