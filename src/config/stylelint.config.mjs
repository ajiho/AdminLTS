export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  // 报告stylelint-disable配置对象中的规则不匹配的注释
  reportInvalidScopeDisables: true,
  // 报告stylelint-disable和任何要禁用的lint不匹配的注释
  reportNeedlessDisables: true,
  overrides: [
    {
      files: ['**/*.scss'],
      rules: {
        'declaration-no-important': null,
        'declaration-property-value-disallowed-list': {
          border: 'none',
          outline: 'none',
        },
        'function-disallowed-list': ['calc', 'lighten', 'darken'],
        'keyframes-name-pattern': null,
        'property-disallowed-list': [
          'border-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'transition',
        ],
        'scss/dollar-variable-default': [
          true,
          {
            ignore: 'local',
          },
        ],
        'scss/selector-no-union-class-name': true,
        'selector-max-class': null,
        'selector-max-combinators': null,
        'selector-max-compound-selectors': null,
        'selector-max-id': null,
        'selector-max-specificity': null,
        'selector-max-type': null,
        'selector-no-qualifying-type': null,
        // 无视优先级顺序(因为有大量嵌套)
        'no-descending-specificity': null,
        // always(必须加上引号)|never(不能带引号)
        'function-url-quotes': 'always',
        // 操作符后面允许空行,否则会和prettier产生冲突 https://www.npmjs.com/package/stylelint-config-standard-scss
        'scss/operator-no-newline-after': null,
      },
    },
  ],
}
