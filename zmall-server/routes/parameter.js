// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Parameter = require('../models/parameter.js')

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

// 根据商品分类获取参数列表
router.get('/get/parameter/with/classification', (req, res) => {
    Parameter.find({
        classification: req.query.classification
    }).sort({
        sort: 1
    }).then(data => {
        res.json({
            parameterList: data,
            msg: 'success!',
            status: 200
        })
    })
})

// 根据商品分类和参数描述获取参数值
router.get('/parametervalue/with/parametername', (req, res) => {
    let {
        classification,
        parametername
    } = req.query
    Parameter.findOne({
        classification,
        name: parametername
    }).then(data => {
        res.json({
            parametervalue: data,
            msg: 'success!',
            status: 200
        })
    })
})

// 根据商品分类添加或修改分类参数
router.post('/editparameter/with/classification', (req, res) => {
    let {
        classification,
        name,
        titleList
    } = req.body
    Parameter.findOne({
        classification,
        name
    }).then(data => {
        if (data) {
            Parameter.findOneAndUpdate({
                classification,
                name
            }, {
                titleList
            }).then(() => {
                res.json({
                    msg: 'success!',
                    status: 200
                })
            })
        } else {
            Parameter.count({
                classification
            }).then(num => {
                new Parameter({
                    sort: num + 1,
                    name,
                    titleList,
                    classification
                }).save().then(() => {
                    res.json({
                        msg: 'success!',
                        status: 200
                    })
                })
            })
        }
    })
})

// 根据商品分类和分类参数描述删除分类参数
router.get('/deleteparameter', (req, res) => {
    let {
        name,
        classification
    } = req.query
    Parameter.findOneAndRemove({
        name,
        classification
    }).then(() => {
        res.json({
            msg: 'success!',
            status: 200
        })
    })
})

// 导出路由模块
module.exports = router