import js from '@eslint/js'
import globals from 'globals'
// import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  //继承eslint的推荐规则
  js.configs.recommended,
  // eslintConfigPrettier,
  ...eslintPluginAstro.configs.recommended,
  {
    //语言选项
    languageOptions: {
      //es6
      ecmaVersion: 2022,
      //类型 module:模块  script:脚本
      sourceType: 'module',
      //全局变量
      globals: {
        ...globals.jquery,
        ...globals.browser,
        ...globals.es2015,
        // 自定义的全局变量
        Quicktab: 'readonly',
        bootstrap: 'readonly',
        OverlayScrollbarsGlobal: 'readonly',
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      // compat
    },
    //具体规则
    rules: {
      'no-var': 2, // 不能使用 var 定义变量
      //临时关闭未使用变量报错
      'no-unused-vars': 0,
      //临时关闭未使用私有变量报错的问题
      'no-unused-private-class-members': 0,
    },
  },
  // eslint flat类型的配置 已经不支持.eslintignore这个配置文件,只支持从eslint.config.mjs或者cli上指定--ignore-pattern配置忽略文件
  //https://github.com/eslint/eslint/issues/17831
  {
    ignores: [
      'src/config',
      'src/docs',
      'src/img',
      'src/script',
      'src/scss',
      'src/view',
    ],
  },
]
