import $ from 'jquery'


export default {
    //判断是否为主页面
    isIndex() {
        return ($('.bsa-header').length !== 0 && $('.bsa-sidebar').length !== 0)
    }
}