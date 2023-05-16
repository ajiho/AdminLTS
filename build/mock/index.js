import Mock from 'mockjs'

//拓展
import './extend';


//Mock的配置延时设置
Mock.setup({
    timeout: '600-800'
})



//导入各种mock模拟
import './login';
import './user';
import './logout';
