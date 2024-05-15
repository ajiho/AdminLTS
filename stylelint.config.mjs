export default {
  //继承
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order"
  ],
  rules: {
    // 无视优先级顺序(因为有大量嵌套)
    'no-descending-specificity': null,
    // always(必须加上引号)|never(不能带引号) 
    'function-url-quotes': 'always',
    // 操作符后面允许空行,否则会和prettier产生冲突 https://www.npmjs.com/package/stylelint-config-standard-scss
    'scss/operator-no-newline-after': null
  },
}
