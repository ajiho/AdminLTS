import Mock from 'mockjs'
import Api from './uri'


Mock.mock(Api.logout, 'post', {
    'data': [],
    'msg': '退出成功',
    'code': 200,
});