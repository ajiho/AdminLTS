import { defineConfig } from 'vitepress'

import jsonData from '../../versions.json'

export const en = defineConfig({
  lang: 'en-US',
  description: 'PHP Weather Component Based on Gaode API',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/en/guide/': { base: '/en/guide/', items: sidebarGuide() },
      '/en/api/': {
        base: '/en/api/',
        items: sidebarApi(),
      },
    },

    editLink: {
      pattern: 'https://github.com/ajiho/think-weather/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} ajiho`,
    },

    outline: {
      level: 'deep',
    },
  },
})

function nav() {
  return [
    {
      text: 'Guide',
      link: '/en/guide/what-is-it',
      activeMatch: '/en/guide/',
    },
    {
      text: 'API',
      link: '/en/api/methods',
      activeMatch: '/en/api/',
    },
    { text: 'Examples', link: '/en/examples' },
    { text: 'Sponsor', link: '/en/sponsor' },
    { text: 'Migrate', link: '/en/migrate' },
    {
      text: jsonData.currently, //版本号,请勿手动更改，该版本号会在release任务中自动更新
      items: [
        {
          text: 'CHANGELOG',
          link: 'https://github.com/ajiho/think-weather/blob/main/CHANGELOG.md',
          target: '_blank',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/ajiho/think-weather/blob/main/.github/contributing.md',
          target: '_blank',
        },
        {
          items: [{ text: 'All versions', link: '/en/versions' }],
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'introduce',
      items: [
        { text: 'What is it?', link: 'what-is-it' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'FAQ', link: 'faq' },
      ],
    },
  ]
}

function sidebarApi() {
  return [
    {
      text: 'API',
      items: [
        { text: 'Methods', link: 'methods' },
        { text: 'Events', link: 'events' },
        { text: 'Options', link: 'options' },
        { text: 'Localizations', link: 'localizations' },
      ],
    },
  ]
}

export const search = {
  en: {},
}
