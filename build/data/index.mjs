import pkg from '../../package.json' assert { type: "json" };
import bootstrappkg from '../../node_modules/bootstrap/package.json' assert { type: "json" };



export default {
  //年份(用于底部版权)
  year: new Date().getFullYear(),
  //标题
  title: 'bootstrap-admin开源免费响应式后台管理系统模板',
  //描述
  description: 'bootstrap-admin基于bootstrap5的免费开源的响应式后台管理模板',
  //关键词
  keywords: '响应式后台模板,开源免费后台模板,bootstrap5后台管理系统模板',
  //作者
  author: pkg.author,
  version: `v${pkg.version}`,
  bootstrapVersion: `v${bootstrappkg.version}`
}
