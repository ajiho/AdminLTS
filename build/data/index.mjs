import pkg from '../../package.json' assert { type: "json" };
import bootstrappkg from '../../node_modules/bootstrap/package.json' assert { type: "json" };



export default {
  //年份(用于底部版权)
  year: new Date().getFullYear(),
  //标题
  title: 'adminlts基于bootstrap5的开源免费响应式后台管理系统模板',
  //描述
  description: '零门槛/响应式/清爽/极简',
  //关键词
  keywords: '响应式后台模板,开源免费后台模板,bootstrap5后台管理系统模板',
  //作者
  author: pkg.author,
  version: `v${pkg.version}`,
  bootstrapVersion: `v${bootstrappkg.version}`
}
