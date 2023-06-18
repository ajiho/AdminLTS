import Mock from 'mockjs'
import Api from './uri';


Mock.mock(Api.user, 'get', {
  'data|10-30': [{
    'id|+1': 1,
    'name': '@cname',
    'username': '@string(6, 12)',
    'gender': '@boolean',
    'phone': '@phone',
    'email': '@email',
    'create_at': '@datetime',
    'status': '@integer(0,1)',
    'role_id': '@integer(0,6)',
  }],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.useradd, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.userdel, 'delete', {
  'data': [],
  'msg': 'success',
  'code': 200,
});


Mock.mock(Api.userrole, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});

Mock.mock(Api.userChangeStatus, 'get', {
  'data': [],
  'msg': 'success',
  'code': 200,
});
