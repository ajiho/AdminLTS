import { defineConfig } from "vitepress";

import jsonData from "../../versions.json";

export const en = defineConfig({
  lang: "en-US",
  description:
    "AdminLTS is a responsive, pure static, universal backend management HTML template designed based on Bootstrap (5.1.3+)",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/reference/": {
        base: "/en/reference/",
        items: sidebarReference(),
      },
    },
    editLink: {
      pattern: "https://github.com/ajiho/AdminLTS/tree/master/src/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2022-${new Date().getFullYear()} ajiho`,
    },

    outline: {
      level: "deep",
    },
  },
});

function nav() {
  return [
    {
      text: "Guide",
      link: "/en/guide/what-is-it",
      activeMatch: "/en/guide/",
    },
    {
      text: "Reference",
      link: "/en/reference/util",
      activeMatch: "/en/reference/",
    },
    { text: "Demo", link: "https://www.adminlts.com/" },
    { text: "Migrate", link: "/en/migrate" },
    {
      text: jsonData.currently, //版本号,请勿手动更改
      items: [
        {
          text: "Changelog",
          link: "https://github.com/ajiho/AdminLTS/blob/master/CHANGELOG.md",
          target: "_blank",
        },
        {
          text: "Contributing",
          link: "https://github.com/ajiho/AdminLTS/blob/master/.github/CONTRIBUTING.md",
          target: "_blank",
        },
        {
          items: [{ text: "All versions", link: "/en/versions" }],
        },
      ],
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "Introduction",
      items: [
        { text: "What is AdminLTS？", link: "what-is-it" },
        { text: "Road Map", link: "roadmap" },
        { text: "Getting Started", link: "getting-started" },
        { text: "Experience", link: "experience" },
        { text: "Dependencies", link: "dependencies" },
        { text: "Browser Support", link: "browser-support" },
        { text: "License", link: "license" },
        { text: "Faq", link: "faq" },
      ],
    },
  ];
}

function sidebarReference() {
  return [
    {
      text: "Reference",
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
  ];
}

export const search = {
  en: {},
};
