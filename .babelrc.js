module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                //为该预设中允许它们的任何插件启用“松散”转换。
                loose: true,
                //尝试将损坏的语法编译为目标浏览器支持的@babel/preset-env最接近的未损坏的现代语法
                bugfixes: true,
                //关闭 esm 转化，统一交由 rollup 处理，防止冲突
                modules: false,
                //
                // useBuiltIns: "usage",
                // corejs:"3.29",
                //始终排除/删除的一组插件
                exclude: ['transform-typeof-symbol'],
                //默认忽略读取.browserslistrc文件
                ignoreBrowserslistConfig:false
            }
        ]
    ],
    // plugins:["@babel/plugin-proposal-object-rest-spread"]
};

