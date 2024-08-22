import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

import { search as zhSearch } from './zh.mjs'
import { search as enSearch } from './en.mjs'

export const shared = defineConfig({
  // 标题
  title: 'AdminLTS',

  base: '/docs/',
  outDir: '../../dist/docs',

  rewrites: {
    'zh/:rest*': ':rest*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    image: {
      lazyLoading: true,
    },
    lineNumbers: true,
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },

  head: [['link', { rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }]],

  themeConfig: {
    logo: { src: '/logo-mini.svg', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ajiho/AdminLTS' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            ...zhSearch.zh,
          },
          ...enSearch,
        },
      },
    },
  },
})
