// 所有的测试uri在这里统一配置比较好管理

let api = {
  //登录
  login: RegExp('/login.*'),
  //退出登录
  logout: RegExp('/logout.*'),
  //用户列表
  user: RegExp('/user.*'),
  useradd: RegExp('/useradd.*'),
  userdel: RegExp('/user/.*'),
  //分配角色
  userrole: RegExp('/user/role.*'),


  node: RegExp('/node.*'),
  nodeadd: RegExp('/nodeadd.*'),


  role: RegExp('/role.*'),
  roleadd: RegExp('/roleadd.*'),
  rolenode: RegExp('/role/node.*'),


  //tree节点
  ztree: RegExp('/ztree.*'),
}


export default api;
