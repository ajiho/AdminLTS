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
    }],
    'msg': 'success',
    'code': 200,
});


Mock.mock(Api.useradd, 'post', {
  'data': [],
  'msg': 'success',
  'code': 200,
});


