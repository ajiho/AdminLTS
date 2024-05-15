import Mock from 'mockjs'
import Api from './uri'

Mock.mock(Api.ztree, 'post', {
  'data|2-10': [
    {
      'id|+1': 1,
      name: '@cname',
      isParent: '@boolean',
    },
  ],
  msg: 'success',
  code: 200,
})
