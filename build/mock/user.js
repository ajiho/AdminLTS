import Mock from 'mockjs'
import Api from './uri';


Mock.mock(Api.user, 'get', {
    'data|100-1000': [{
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


// Mock.mock('/user', {
//     'list|5-10': [
//         {
//             'id|+1': 1,
//             'username': '@cname',
//             'email': '@email',
//             'gender': '@boolean',
//             'price': '@integer'
//         }
//     ]
// });