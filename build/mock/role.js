import Mock from 'mockjs'
import Api from './uri';


Mock.mock(Api.role, 'get', {
  'data': [
    {
      'id': 1,
      'name': '经理',
      'create_at': '@datetime'
    },
    {
      'id': 2,
      'name': '组长',
      'create_at': '@datetime'
    },
    {
      'id': 3,
      'name': '研发组长',
      'create_at': '@datetime'
    },
    {
      'id': 4,
      'name': '客服',
      'create_at': '@datetime'
    },
    {
      'id': 5,
      'name': '文章审核员',
      'create_at': '@datetime'
    },
    {
      'id': 6,
      'name': '销售',
      'create_at': '@datetime'
    },
  ],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.roleadd, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.roleedit, 'put', {
  'data': [],
  'msg': 'success',
  'code': 200,
});

Mock.mock(Api.rolenode, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});

