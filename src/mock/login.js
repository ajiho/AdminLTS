import Mock from 'mockjs'
import Api from './uri'

Mock.mock(Api.login, 'post', {
  'data|5-10': [
    {
      'id|+1': 1,
      username: '@cname',
      email: '@email',
      gender: '@boolean',
      price: '@integer',
    },
  ],
  msg: '登录成功',
  code: 200,
})
