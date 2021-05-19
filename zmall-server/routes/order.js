// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 uuid 包，用户生成唯一文件名和唯一id
let uuid = require('node-uuid')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')

// 创建路由容器
let router = express.Router()

// 处理跨域请求
router.all("*", function (req, res, next) {
    // 允许多个域名跨域
    const originList = [
        'http://localhost:8888',
        'http://127.0.0.1:8888',
        'http://localhost:8886',
        'http://127.0.0.1:8886'
    ]
    if (req.headers.origin && originList.includes(req.headers.origin.toLocaleLowerCase())) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }

    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
})

// 获取订单列表
router.get('/order/list', (req, res) => {
    console.log(uuid.v4().split('-').join('').substring(0, 20))
})


// 导出路由模块
module.exports = router