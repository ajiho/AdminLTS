export default {
  presets: [
    [
      "@babel/preset-env",
      {
        //是否忽略browserslistrc配置
        ignoreBrowserslistConfig: false,
        // 使用 "loose" 模式编译 ES2015+ 中的代码,允许生成与严格模式代码不完全相同的代码
        loose: true,
        //启用针对已知 Bug 的修复程序
        bugfixes: true,
        //禁止转换为其他类型的模块
        modules: false,
        //排除对typeof Symbol 表达式转换，因为目前的环境已经支持 Symbol 类型
        exclude: ["transform-typeof-symbol"],
      },
    ],
  ],
}
