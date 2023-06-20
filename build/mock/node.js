import Mock from 'mockjs'
import Api from './uri';


Mock.mock(Api.node, 'get', {
  'data': [
    {
      'id': 1,
      'pid': 0,
      'route_name': '',
      'name': '权限管理',
      'icon': 'bi bi-person-lock',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 2,
      'pid': 1,
      'route_name': 'admin.user.index',
      'name': '用户列表',
      'icon': '',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 3,
      'pid': 1,
      'route_name': 'admin.role.index',
      'name': '角色列表',
      'icon': '',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 4,
      'pid': 1,
      'route_name': 'admin.node.index',
      'name': '节点列表',
      'icon': '',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 5,
      'pid': 1,
      'route_name': 'admin.user.create',
      'name': '添加用户显示',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 6,
      'pid': 1,
      'route_name': 'admin.user.store',
      'name': '添加用户处理',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 7,
      'pid': 1,
      'route_name': 'admin.role.create',
      'name': '添加角色显示',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 8,
      'pid': 1,
      'route_name': 'admin.role.store',
      'name': '添加角色处理',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 9,
      'pid': 1,
      'route_name': 'admin.node.create',
      'name': '添加节点显示',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 10,
      'pid': 1,
      'route_name': 'admin.node.store',
      'name': '添加节点处理',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
    {
      'id': 11,
      'pid': 0,
      'route_name': '',
      'name': '文章管理',
      'icon': 'bi bi-book',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 12,
      'pid': 11,
      'route_name': 'admin.article.index',
      'name': '文章列表',
      'icon': '',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 13,
      'pid': 11,
      'route_name': 'admin.article.create',
      'name': '添加文章显示',
      'icon': '',
      'is_menu': 1,
      'create_at': '@datetime'
    },
    {
      'id': 14,
      'pid': 11,
      'route_name': 'admin.article.store',
      'name': '添加文章处理',
      'icon': '',
      'is_menu': 0,
      'create_at': '@datetime'
    },
  ],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.nodeadd, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.nodeedit, 'put', {
  'data': [],
  'msg': 'success',
  'code': 200,
});

Mock.mock(Api.nodedel, 'delete', {
  'data': [],
  'msg': 'success',
  'code': 200,
});

