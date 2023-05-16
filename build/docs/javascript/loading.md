# 插件2



    //也可以全局指定参数
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