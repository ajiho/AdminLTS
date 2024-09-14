export default {
  extends: [
    "stylelint-config-twbs-bootstrap",
    "stylelint-config-prettier-scss",
  ],
  // 报告stylelint-disable配置对象中的规则不匹配的注释
  reportInvalidScopeDisables: true,
  // 报告stylelint-disable和任何要禁用的lint不匹配的注释
  reportNeedlessDisables: true,
  overrides: [
    {
      files: ["**/*.scss"],
      rules: {
        "declaration-no-important": null,
        "declaration-property-value-disallowed-list": {
          border: "none",
          outline: "none",
        },
        "function-disallowed-list": ["calc", "lighten", "darken"],
        "keyframes-name-pattern": null,
        "property-disallowed-list": [
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-right-radius",
          "border-bottom-left-radius",
          "transition",
        ],
        "scss/dollar-variable-default": [
          true,
          {
            ignore: "local",
          },
        ],
        "scss/selector-no-union-class-name": true,
        "selector-max-class": null,
        "selector-max-combinators": null,
        "selector-max-compound-selectors": null,
        "selector-max-id": null,
        "selector-max-specificity": null,
        "selector-max-type": null,
        "selector-no-qualifying-type": null,
        // 解决不支持color.scale等函数命名参数等问题
        "scss/at-function-named-arguments":null,

        // 解决和prettier冲突问题--begin
        "@stylistic/string-quotes": null,
        "@stylistic/number-leading-zero": null,
        "@stylistic/declaration-colon-newline-after": null,
        "@stylistic/value-list-comma-space-after": null,
        "@stylistic/indentation": null,
        "@stylistic/value-list-comma-newline-after": null,
        // 解决和prettier冲突问题--end
      },
    },
  ],
}
