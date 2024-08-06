# 贡献指南

首先感谢使用`AdminLTS`,如果您想做出贡献,这里有一些指导


## 拉取请求


- 如果是添加一个新功能:

  - 请提供一个添加此功能的必要理由，理想情况下，您应该先开一个issues讨论并一致同意然后再进行处理，我不想让你的努力白费

- 如果是修复一个Bug:

  - 在PR中提供bug的详细说明，最好能有更加清楚的演示，包括但不限于(线上演示地址，视频，图片).

- 在处理 PR 时可以有多个小的提交 - GitHub 可以在合并之前自动压缩它们

- 提交信息必须遵循[常规提交规范](https://conventionalcommits.org)



## 开发设置

你需要安装 [pnpm](https://pnpm.io)

然后运行:

```sh
$ pnpm install
```

依赖安装完毕后您会自动注册一些git-hook钩子,在您提交代码前会自动对代码格式和提交信息做检查



## 开发环境




推荐您使用[vscode](https://code.visualstudio.com)进行编码,并安装以下拓展获得最佳的编码体验


- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

---

> [!TIP]
> `EditorConfig for VS Code` 拓展在vscode编辑上有一点小bug,
建议您把`Files: Auto Save`改成 `onFocusChange`





## 实时预览


```sh
$ pnpm dev
```

执行上述命令后，访问http://localhost:4321并尝试修改源代码。您将获得实时更新
