import Mock from 'mockjs'
import './extend'
import Utils from './utils/index'
import Api from './api'
import { roleList, userList, nodeList, noticeList } from './data/index'

//模拟ajax的延时操作
Mock.setup({
  timeout: '300-800',
})

//用户列表数据
Mock.mock(Api.user.index, 'get', Utils.template(userList, 50))

//改变用户状态
Mock.mock(Api.user.changeStatus, 'get', Utils.template())

//给用户发送邮件
Mock.mock(Api.user.email, 'post', Utils.template())

//分配角色
Mock.mock(Api.user.role, 'post', Utils.template())

//用户重置密码
Mock.mock(Api.user.repassword, 'put', Utils.template())

//添加用户
Mock.mock(Api.user.create, 'post', Utils.template())

//更新用户
Mock.mock(Api.user.update, 'put', Utils.template())

//删除用户
Mock.mock(Api.user.delete, 'delete', Utils.template())

//批量删除
Mock.mock(Api.user.delall, 'delete', Utils.template())

//登录
Mock.mock(Api.login, 'post', Utils.template())

//退出
Mock.mock(Api.logout, 'get', Utils.template())

//角色列表
Mock.mock(
  Api.role.index,
  'get',
  Utils.template(() => roleList),
)

//添加角色
Mock.mock(Api.role.create, 'post', Utils.template())

//修改角色
Mock.mock(Api.role.update, 'put', Utils.template())

//删除角色
Mock.mock(Api.role.delete, 'delete', Utils.template())

//批量删除
Mock.mock(Api.role.delall, 'delete', Utils.template())

// 角色分配节点
Mock.mock(Api.role.node, 'post', Utils.template())

//节点列表
Mock.mock(
  Api.node.index,
  'get',
  Utils.template(() => nodeList),
)

//删除节点
Mock.mock(Api.node.delete, 'delete', Utils.template())
//添加节点
Mock.mock(Api.node.create, 'post', Utils.template())

//修改节点
Mock.mock(Api.node.update, 'put', Utils.template())

//网站设置
Mock.mock(Api.sys.website, 'put', Utils.template())
//邮箱服务
Mock.mock(Api.sys.email, 'put', Utils.template())

//个人资料修改
Mock.mock(Api.profile, 'put', Utils.template())

//个人密码修改
Mock.mock(Api.resetPwd, 'put', Utils.template())

//通知列表
Mock.mock(Api.notice.index, 'get', Utils.template(noticeList, 50))

//删除通知
Mock.mock(Api.notice.delall, 'delete', Utils.template())

//已读处理
Mock.mock(Api.notice.read, 'put', Utils.template())
//全部已读
Mock.mock(Api.notice.readall, 'put', Utils.template())
