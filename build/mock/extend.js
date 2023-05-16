import Mock from 'mockjs'

// 拓展mockjs
Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
        return phonePrefixs[Mock.Random.integer(0,1)] + Mock.mock(/\d{8}/) //Number()
    }
})
