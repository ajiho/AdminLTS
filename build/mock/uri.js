// 所有的测试uri在这里统一配置比较好管理

let api = {
    //登录
    login: RegExp('/login.*'),
    //退出登录
    logout: RegExp('/logout.*'),
    //用户列表
    user: RegExp('/user.*'),
}


export default api;