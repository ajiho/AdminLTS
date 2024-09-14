import { defineConfig } from "vitepress"

import jsonData from "../../versions.json"

export const zh = defineConfig({
  lang: "zh-Hans",
  description:
    "AdminLTS是基于bootstrap(5.1.3+)设计的一个响应式纯静态通用后台管理HTML模板",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": {
        base: "/reference/",
        items: sidebarReference(),
      },
    },

    editLink: {
      pattern: "https://github.com/ajiho/AdminLTS/tree/master/src/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2022-${new Date().getFullYear()} ajiho`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
      level: "deep",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    notFound: {
      title: "找不到页面",
      quote: "如果你不改变方向，并且一直走下去，你最终会到达现在前进的地方",
      linkLabel: "回到首页",
      linkText: "带我回家",
    },
  },
})

function nav() {
  return [
    {
      text: "指南",
      link: "/guide/what-is-it",
      activeMatch: "/guide/",
    },
    {
      text: "参考",
      link: "/reference/util",
      activeMatch: "/reference/",
    },
    { text: "演示", link: "https://www.adminlts.com/" },
    {
      text: jsonData.currently, //版本号,请勿手动更改
      items: [
        {
          text: "变更日志",
          link: "https://github.com/ajiho/AdminLTS/blob/master/CHANGELOG.md",
          target: "_blank",
        },
        {
          text: "贡献指南",
          link: "https://github.com/ajiho/AdminLTS/blob/master/.github/CONTRIBUTING.md",
          target: "_blank",
        },
        {
          items: [{ text: "所有版本", link: "/versions" }],
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: "介绍",
      items: [
        { text: "什么是AdminLTS？", link: "what-is-it" },
        { text: "路线图", link: "roadmap" },
        { text: "快速开始", link: "getting-started" },
        { text: "开发经验", link: "experience" },
        { text: "依赖和插件", link: "dependencies" },
        { text: "迁移指南", link: "migrate" },
        { text: "浏览器支持", link: "browser-support" },
        { text: "未来计划", link: "future-plans" },
        { text: "开源协议", link: "license" },
        { text: "常见问题", link: "faq" },
      ],
    },
  ]
}

function sidebarReference() {
  return [
    {
      text: "参考",
      items: [
        { text: "util", link: "util" },
        {
          text: "javascript",
          base: "/reference/javascript-",
          items: [
            { text: "fullscreen", link: "fullscreen" },
            { text: "iframe", link: "iframe" },
            { text: "initializer", link: "initializer" },
            { text: "loading", link: "loading" },
            { text: "modal", link: "modal" },
            { text: "navbar-search", link: "navbar-search" },
            { text: "password-toggle", link: "password-toggle" },
            { text: "push-menu", link: "push-menu" },
            { text: "scrollbar", link: "scrollbar" },
            { text: "scrolltop", link: "scrolltop" },
            { text: "tab", link: "tab" },
            { text: "table", link: "table" },
            { text: "toasts", link: "toasts" },
            { text: "treeview", link: "treeview" },
          ],
        },
      ],
    },
  ]
}

export const markdown = {
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息",
  },
}

export const search = {
  zh: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },

        noResultsText: "无法找到相关结果",
        resetButtonTitle: "重置搜索",
        displayDetails: "显示详情视图",
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
}
