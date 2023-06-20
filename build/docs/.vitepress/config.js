import {defineConfig} from 'vitepress'


export default defineConfig({

  // 整个网页的标题
  title: 'bootstrap-admin官方文档',
  //网页的语言
  lang: 'zh',
  base: '/docs/',
  outDir: '../../docs',
  //网页的描述
  description: "bootstrap5的开源免费的后台模板",
  //头部配置
  head: [
    [
      'link',
      {rel: 'icon', href: '/docs/favicon-32x32.png', type: 'image/png'}
    ],
    [
      'link',
      {rel: 'icon', href: '/docs/favicon-16x16.png', type: 'image/png'}
    ],
  ],
  //主题相关的配置
  themeConfig: {
    //网站标题 设置为false则不显示标题，siteTitle设置化后会覆盖外层的title siteTitle不设置则会使用上面的title
    siteTitle: 'bootstrap-admin',
    // 图标
    logo: '/favicon-32x32.png',
    //右边的toc上面的标题
    outlineTitle: '文章目录',
    //deep显示h1-h6
    outline: 'deep',
    //顶部导航配置
    nav: [
      {text: '指南', link: '/guide/', activeMatch: '/guide/'},
      {text: '插件', link: '/javascript/', activeMatch: '/javascript/'},
      {
        text: '版本',
        items: [
          {
            text: '2.0.1',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V2.0.1'
          },
          {
            text: '2.0.0',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V2.0.0'
          },
          {
            text: '1.1.0',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V1.1.0'
          },
          {
            text: '1.0.2',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V1.0.2'
          },
          {
            text: '1.0.1',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V1.0.1'
          },
          {
            text: '1.0.0',
            link: 'https://gitee.com/ajiho/bootstrap-admin/releases/tag/V1.0.0'
          },
        ],
      },
      {text: '演示', link: 'https://www.bootstrap-admin.top/'},
    ],

    // 侧边栏配置
    sidebar: {

      '/guide/': [
        {
          text: '快速开始',
          items: [
            {text: '介绍', link: '/guide/'},
            {text: '快速上手', link: '/guide/quick-start'},
            {text: '开发经验', link: '/guide/experience'},
            {text: '依赖项和插件', link: '/guide/Dependencies'},
            {text: '浏览器支持', link: '/guide/BrowserSupport'},
            {text: '拓展助手', link: '/guide/Helpers'},
            {text: '常见问题', link: '/guide/Faq'},
            {text: '开源协议', link: '/guide/License'},
          ],
        },
      ],

      '/javascript/': [
        {
          text: 'javascript',
          items: [
            {text: 'layout', link: '/javascript/'},
            {text: 'loading', link: '/javascript/loading'},
            {text: 'modal', link: '/javascript/modal'},
            {text: 'toast', link: '/javascript/toast'},
            {text: 'push-menu', link: '/javascript/push-menu'},
            {text: 'sidebar', link: '/javascript/sidebar'},
            {text: 'navbar-search', link: '/javascript/navbar-search'},
          ],
        },
      ],
    },

    // 封面底部的版权
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 ajiho. All right reserved'
    },

    //社交链接配置
    socialLinks: [
      {
        icon: {
          svg: `<svg  width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 2000 2000"><path d="M898 1992q183 0 344-69.5t283-191.5q122-122 191.5-283t69.5-344q0-183-69.5-344T1525 477q-122-122-283-191.5T898 216q-184 0-345 69.5T270 477Q148 599 78.5 760T9 1104q0 183 69.5 344T270 1731q122 122 283 191.5t345 69.5zm199-400H448q-17 0-30.5-14t-13.5-30V932q0-89 43.5-163.5T565 649q74-45 166-45h616q17 0 30.5 14t13.5 31v111q0 16-13.5 30t-30.5 14H731q-54 0-93.5 39.5T598 937v422q0 17 14 30.5t30 13.5h416q55 0 94.5-39.5t39.5-93.5v-22q0-17-14-30.5t-31-13.5H842q-17 0-30.5-14t-13.5-31v-111q0-16 13.5-30t30.5-14h505q17 0 30.5 14t13.5 30v250q0 121-86.5 207.5T1097 1592z"/></svg>`
        },
        link: 'https://gitee.com/ajiho/bootstrap-admin'
      }
    ],
    //页面底部的编辑此页面
    editLink: {
      pattern: 'https://gitee.com/ajiho/bootstrap-admin/tree/2.x/build/docs/:path',
      text: '在Gitee上编辑此页面'
    },

    //最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最近更新时间',
    //启用本地搜索
    search: {
      provider: 'local'
    },
  },
  markdown: {
    config(md) {
      // 添加DemoBlock插槽
      // md.use(demoBlockPlugin);
    }
  }
})
