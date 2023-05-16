import{_ as n,c as a,o,C as e,a as r}from"./chunks/framework.2d5e76c0.js";const u=JSON.parse('{"title":"插件2","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/loading.md","filePath":"javascript/loading.md"}'),t={name:"javascript/loading.md"},s=e("h1",{id:"插件2",tabindex:"-1"},[r("插件2 "),e("a",{class:"header-anchor",href:"#插件2","aria-label":'Permalink to "插件2"'},"​")],-1),i=e("pre",null,[e("code",null,`//也可以全局指定参数
$.loading.default.color = 'success';



//开启遮罩层
$.loading.show();

//也可以在用的时候直接指定配置，会覆盖全局参数
// $.loading.show({
//     //颜色
//     color: 'primary',
//     //类型 grow:实心圈  border:空心圈
//     type: 'border',
//     //尺寸 要根据类型来判断  spinner-grow-sm spinner-border-sm  或者行内样式来控制：style="width: 3rem; height: 3rem;"
//     size: null
// });
//


//关闭遮罩层
// $.loading.hide();
`)],-1),d=[s,i];function l(c,p,h,_,m,g){return o(),a("div",null,d)}const $=n(t,[["render",l]]);export{u as __pageData,$ as default};
