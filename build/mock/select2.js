import Mock from 'mockjs';
import Api from './uri';

Mock.mock(Api.select2demo1, 'get', {
  'data|10-30': [{
    'id|+1': 1,
    'name': '@cname',
    'sentence': '@csentence',
    'description': '@cparagraph()' ,//描述
    'content': '@cword(10,15)',
    'create_at': '@datetime',
  }],
  'msg': 'success',
  'code': 200,
});
