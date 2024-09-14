// 所有的测试uri在这里统一配置比较好管理
let api = {
  //用户模块
  user: {
    //添加用户
    create: "/user",
    //更新用户
    update: RegExp(/^\/user\/\d+$/),
    //用户列表
    index: RegExp(/\/user(\?.*)?$/),
    //改变用户状态
    changeStatus: RegExp(/^\/user\/ChangeStatus\/\d+$/),
    //给用户发送邮件
    email: RegExp(/^\/user\/email\/\d+$/),
    //删除用户
    delete: RegExp(/^\/user\/\d+$/),
    //批量删除
    delall: "/user/delall",
    //分配角色
    role: RegExp(/^\/user\/role\/\d+$/),
    //重置密码
    repassword: RegExp(/^\/user\/repassword\/\d+$/),
    //用户注册地区数据
    region: "/user/region",
  },

  //登录
  login: "/login",
  //退出
  logout: "/logout",

  //角色模块
  role: {
    //列表
    index: RegExp(/\/role(\?.*)?$/),
    //添加
    create: "/role",
    //修改
    update: RegExp(/^\/role\/\d+$/),
    //删除
    delete: RegExp(/^\/role\/\d+$/),
    //批量删除
    delall: "/role/delall",
    //分配节点
    node: RegExp(/^\/role\/node\/\d+$/),
  },

  //节点模块
  node: {
    //列表
    index: RegExp(/\/node(\?.*)?$/),
    //删除
    delete: RegExp(/^\/node\/\d+$/),
    //添加
    create: "/node",
    //修改
    update: RegExp(/^\/node\/\d+$/),
  },

  //系统
  sys: {
    //网站设置
    website: "/sys/website",
    //邮箱服务
    email: "/sys/email",
  },

  profile: "/profile",

  //修改个人资料
  resetPwd: "/resetPwd",

  //通知列表
  notice: {
    index: RegExp(/\/notice(\?.*)?$/),
    //删除处理
    delall: "/notice/delall",
    //已读处理
    read: "/notice/read",
    //全部已读
    readall: "/notice/readall",
  },
}

export default api
