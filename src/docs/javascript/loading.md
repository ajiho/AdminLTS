## 说明

根据bootstrap官方组件[spinners](https://getbootstrap.com/docs/5.3/components/spinners/)封装的一个遮罩层插件

## 用法

```javascript
//开启遮罩层
$.loading.show();

//也可以全局指定参数
$.loading.default.color = 'success';

//也可以在用的时候直接指定配置(该配置优先级高于全局配置)
$.loading.show({
    color: 'primary',
});

//关闭遮罩层
$.loading.hide();
```

## 选项

| 选项    | 类型               | 默认值       | 说明                      |
|-------|------------------|-----------|-------------------------|
| color | String           | 'primary' | 颜色                      |
| type  | String           | 'border'  | 类型 grow:实心圈  border:空心圈 |
| size  | String&#124;null | null      | 尺寸                      |

spinner-grow-sm
spinner-border-sm
style="width: 3rem; height: 3rem;"