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
  //改变用户状态
  userChangeStatus: RegExp('/userChangeStatus/.*'),


  node: RegExp('/node.*'),
  nodeadd: RegExp('/nodeadd.*'),
  nodeedit: RegExp('/nodeedit.*'),
  nodedel: RegExp('/nodedel.*'),


  role: RegExp('/role.*'),
  roleadd: RegExp('/roleadd.*'),
  rolenode: RegExp('/role/node.*'),
  roleedit: RegExp('/roleedit.*'),

  //消息通知
  msg: RegExp('/msg.*'),

  //tree节点
  ztree: RegExp('/ztree.*'),

  //select2
  select2demo1: RegExp('/select2demo1.*'),
}


export default api;
