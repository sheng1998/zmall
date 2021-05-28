// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 uuid 包，用户生成唯一文件名和唯一id
let uuid = require('node-uuid')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let User = require('../models/user.js')
let DAddress = require('../models/deliveryAddress')

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

// 获取用户列表
router.get('/userlist', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    // reg: 正则表达式
    let {
        page_size,
        data_number,
        query
    } = req.query
    const reg = new RegExp(query, 'i')
    User.count({
        $or: [{
            name: {
                $regex: reg
            }
        }, {
            username: {
                $regex: reg
            }
        }]
    }).then(num => {
        User.find({
                $or: [{
                    name: {
                        $regex: reg
                    }
                }, {
                    username: {
                        $regex: reg
                    }
                }]
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                username: 1
            })
            .exec().then(data => {
                res.json({
                    totalUser: num,
                    userlist: data,
                    msg: '获取用户列表成功！',
                    status: 200
                })
            })
    })
})

// 修改用户权限
router.get('/alteruserlimit', (req, res) => {
    let {
        user_id,
        limit
    } = req.query
    User.findByIdAndUpdate(user_id, {
        limit
    }).then(() => {
        res.json({
            msg: 'success！',
            status: 200
        })
    })
})

// 获取用户收货信息列表
router.get('/userdeliveryinfo', (req, res) => {
    let user_id = req.query.user_id
    DAddress.find({
        user_id
    }).then(data => {
        res.json({
            addressList: data,
            status: 200,
            msg: '数据获取成功！'
        })
    })
})

// 导出路由模块
module.exports = router