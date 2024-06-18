/*!
 * bootstrap-admin v2.0.1 (https://github.com/ajiho/bootstrap-admin)
 * Copyright 2023-2024 ajiho
 * license MIT
 */

(function (Mock) {
    'use strict';

    // 拓展mockjs
    Mock.Random.extend({
      phone: function () {
        const phonePrefixs = ['132', '135', '189']; // 自己写前缀哈
        return phonePrefixs[Mock.Random.integer(0, 1)] + Mock.mock(/\d{8}/); //Number()
      }
    });

    var Utils = {
      template(tpl = {}, count = 1) {
        const retData = {
          msg: 'success',
          code: 200
        };
        if (typeof tpl === 'function') {
          retData['data'] = tpl();
        } else {
          retData[`data|${count}`] = [tpl];
        }
        return retData;
      },
      convertToFlatNodes(nodeList, id = 1, parentId = 0, result = [], childrenKey = 'children') {
        nodeList.forEach(node => {
          const newNode = {
            id,
            pid: parentId,
            ...node
          };
          result.push(newNode);
          if (node[childrenKey] && node[childrenKey].length > 0) {
            id = this.convertToFlatNodes(node[childrenKey], id + 1, newNode.id, result, childrenKey);
          }
          id++;
        });
        return id;
      }
    };

    let api = {
      //用户模块
      user: {
        //添加用户
        create: '/user',
        //更新用户
        update: RegExp(/^\/user\/\d+$/),
        //用户列表
        index: RegExp(/\/user(\?.*)?$/),
        //改变用户状态
        changeStatus: RegExp(/^\/user\/ChangeStatus\/\d+$/),
        //给用户发送邮件
        email: RegExp(/^\/user\/email\/\d+$/),
        //删除用户
        delete: RegExp(/^\/user\/\d+$/),
        //批量删除
        delall: '/user/delall',
        //分配角色
        role: RegExp(/^\/user\/role\/\d+$/),
        //重置密码
        repassword: RegExp(/^\/user\/repassword\/\d+$/),
        //用户注册地区数据
        region: '/user/region'
      },
      //登录
      login: '/login',
      //退出
      logout: '/logout',
      //角色模块
      role: {
        //列表
        index: RegExp(/\/role(\?.*)?$/),
        //添加
        create: '/role',
        //修改
        update: RegExp(/^\/role\/\d+$/),
        //删除
        delete: RegExp(/^\/role\/\d+$/),
        //批量删除
        delall: '/role/delall',
        //分配节点
        node: RegExp(/^\/role\/node\/\d+$/)
      },
      //节点模块
      node: {
        //列表
        index: RegExp(/\/node(\?.*)?$/),
        //删除
        delete: RegExp(/^\/node\/\d+$/),
        //添加
        create: '/node',
        //修改
        update: RegExp(/^\/node\/\d+$/)
      },
      //系统
      sys: {
        //网站设置
        website: '/sys/website',
        //邮箱服务
        email: '/sys/email'
      },
      profile: '/profile',
      //修改个人资料
      resetPwd: '/resetPwd',
      //通知列表
      notice: {
        index: RegExp(/\/notice(\?.*)?$/),
        //删除处理
        delall: '/notice/delall',
        //已读处理
        read: '/notice/read',
        //全部已读
        readall: '/notice/readall'
      }
    };

    const roleData = [{
      name: '经理',
      create_at: '@datetime'
    }, {
      name: '组长',
      create_at: '@datetime'
    }, {
      name: '研发组长',
      create_at: '@datetime'
    }, {
      name: '客服',
      create_at: '@datetime'
    }, {
      name: '文章审核员',
      create_at: '@datetime'
    }, {
      name: '销售',
      create_at: '@datetime'
    }];
    const roleList = roleData.map((role, index) => {
      return {
        id: index + 1,
        ...role
      };
    });

    const userList = {
      'id|+1': 1,
      name: '@cname',
      username: '@string(6, 12)',
      gender: '@boolean',
      phone: '@phone',
      email: '@email',
      create_at: '@datetime',
      status: '@integer(0,1)',
      role_id: '@integer(0,6)'
    };

    // type:页面类型 0:目录 1:页面 2:按钮
    // is_menu:0:否 1:是
    let nodeList = [{
      route_name: '',
      name: '权限管理',
      icon: 'bi bi-person-lock',
      type: 0,
      is_menu: 1,
      create_at: '@datetime',
      children: [{
        route_name: 'admin.user.index',
        name: '用户列表',
        icon: '',
        type: 1,
        is_menu: 1,
        create_at: '@datetime',
        children: [{
          route_name: 'admin.user.create',
          name: '添加用户',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.store',
          name: '添加用户',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.role',
          name: '分配角色',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.edit',
          name: '编辑用户',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.update',
          name: '用户更新',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.edit',
          name: '查看用户',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.destroy',
          name: '用户删除',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.export',
          name: '用户导出',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.import',
          name: '用户导入',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.resetPwd',
          name: '重置密码',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.status',
          name: '用户状态',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }]
      }, {
        route_name: 'admin.role.index',
        name: '角色列表',
        icon: '',
        type: 1,
        is_menu: 1,
        create_at: '@datetime',
        children: [{
          route_name: 'admin.role.create',
          name: '添加角色',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.role.store',
          name: '添加角色',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.role.node',
          name: '分配节点',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.role.edit',
          name: '编辑角色',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.role.update',
          name: '角色更新',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.user.destroy',
          name: '角色删除',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }]
      }, {
        route_name: 'admin.node.index',
        name: '节点列表',
        icon: '',
        type: 1,
        is_menu: 1,
        create_at: '@datetime',
        children: [{
          route_name: 'admin.node.create',
          name: '添加节点',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.node.store',
          name: '添加节点',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }]
      }]
    }, {
      route_name: '',
      name: '文章管理',
      icon: 'bi bi-book',
      type: 0,
      is_menu: 1,
      create_at: '@datetime',
      children: [{
        route_name: 'admin.article.index',
        name: '文章列表',
        icon: '',
        type: 1,
        is_menu: 1,
        create_at: '@datetime',
        children: [{
          route_name: 'admin.article.create',
          name: '添加文章',
          icon: '',
          type: 1,
          is_menu: 0,
          create_at: '@datetime'
        }, {
          route_name: 'admin.article.store',
          name: '添加文章',
          icon: '',
          type: 2,
          is_menu: 0,
          create_at: '@datetime'
        }]
      }]
    }];
    const flatNodes = [];
    Utils.convertToFlatNodes(nodeList, 1, 0, flatNodes);

    const noticeList = {
      'id|+1': 1,
      title: '@ctitle(10, 30)',
      create_at: '@datetime'
    };

    const province = [{
      name: '北京市'
    }, {
      name: '天津市'
    }, {
      name: '河北省'
    }, {
      name: '山西省'
    }, {
      name: '内蒙古自治区'
    }, {
      name: '辽宁省'
    }, {
      name: '吉林省'
    }, {
      name: '黑龙江省'
    }, {
      name: '上海市'
    }, {
      name: '江苏省'
    }, {
      name: '浙江省'
    }, {
      name: '安徽省'
    }, {
      name: '福建省'
    }, {
      name: '江西省'
    }, {
      name: '山东省'
    }, {
      name: '河南省'
    }, {
      name: '湖北省'
    }, {
      name: '湖南省'
    }, {
      name: '广东省'
    }, {
      name: '广西壮族自治区'
    }, {
      name: '海南省'
    }, {
      name: '重庆市'
    }, {
      name: '四川省'
    }, {
      name: '贵州省'
    }, {
      name: '云南省'
    }, {
      name: '西藏自治区'
    }, {
      name: '陕西省'
    }, {
      name: '甘肃省'
    }, {
      name: '青海省'
    }, {
      name: '宁夏回族自治区'
    }, {
      name: '新疆维吾尔自治区'
    }, {
      name: '台湾省'
    }, {
      name: '香港特别行政区'
    }, {
      name: '澳门特别行政区'
    }, {
      name: '南海诸岛'
    }];

    // 遍历数组，为每个对象添加 value 字段并赋值为随机数
    province.forEach(function (item) {
      item.value = Math.floor(Math.random() * 10000) + 1; // 生成1到10000之间的随机数
    });

    // 按照 value 字段从高到低排序
    province.sort(function (a, b) {
      return b.value - a.value;
    });

    //模拟ajax的延时操作
    Mock.setup({
      timeout: '300-800'
    });

    //用户列表数据
    Mock.mock(api.user.index, 'get', Utils.template(userList, 50));

    //改变用户状态
    Mock.mock(api.user.changeStatus, 'get', Utils.template());

    //给用户发送邮件
    Mock.mock(api.user.email, 'post', Utils.template());

    //分配角色
    Mock.mock(api.user.role, 'post', Utils.template());

    //用户重置密码
    Mock.mock(api.user.repassword, 'put', Utils.template());

    //添加用户
    Mock.mock(api.user.create, 'post', Utils.template());

    //更新用户
    Mock.mock(api.user.update, 'put', Utils.template());

    //删除用户
    Mock.mock(api.user.delete, 'delete', Utils.template());

    //批量删除
    Mock.mock(api.user.delall, 'delete', Utils.template());

    //用户注册地区数据
    Mock.mock(api.user.region, 'get', Utils.template(() => province));

    //登录
    Mock.mock(api.login, 'post', Utils.template());

    //退出
    Mock.mock(api.logout, 'get', Utils.template());

    //角色列表
    Mock.mock(api.role.index, 'get', Utils.template(() => roleList));

    //添加角色
    Mock.mock(api.role.create, 'post', Utils.template());

    //修改角色
    Mock.mock(api.role.update, 'put', Utils.template());

    //删除角色
    Mock.mock(api.role.delete, 'delete', Utils.template());

    //批量删除
    Mock.mock(api.role.delall, 'delete', Utils.template());

    // 角色分配节点
    Mock.mock(api.role.node, 'post', Utils.template());

    //节点列表
    Mock.mock(api.node.index, 'get', Utils.template(() => flatNodes));

    //删除节点
    Mock.mock(api.node.delete, 'delete', Utils.template());
    //添加节点
    Mock.mock(api.node.create, 'post', Utils.template());

    //修改节点
    Mock.mock(api.node.update, 'put', Utils.template());

    //网站设置
    Mock.mock(api.sys.website, 'put', Utils.template());
    //邮箱服务
    Mock.mock(api.sys.email, 'put', Utils.template());

    //个人资料修改
    Mock.mock(api.profile, 'put', Utils.template());

    //个人密码修改
    Mock.mock(api.resetPwd, 'put', Utils.template());

    //通知列表
    Mock.mock(api.notice.index, 'get', Utils.template(noticeList, 50));

    //删除通知
    Mock.mock(api.notice.delall, 'delete', Utils.template());

    //已读处理
    Mock.mock(api.notice.read, 'put', Utils.template());
    //全部已读
    Mock.mock(api.notice.readall, 'put', Utils.template());

})(Mock);
//# sourceMappingURL=bootstrap-admin.mock.js.map
