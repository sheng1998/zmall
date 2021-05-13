// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Classification = require('../models/classification.js')

// 创建路由容器
let router = express.Router()

// 处理跨域请求
router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
})

// 获取分类列表
router.get('/get/classification', (req, res) => {
    Classification.find()
        .sort({
            last_modify_time: -1
        })
        .exec()
        .then(result => {
            res.json({
                data: {
                    class_list: result
                },
                meta: {
                    msg: '获取分类列表成功！',
                    status: 200
                }
            })
        })
})

// 添加分类
router.post('/add/classification', (req, res) => {
    Classification.findOne({
        class_name: req.body.class_name
    }).then(data => {
        if (data) {
            res.json({
                data: {},
                meta: {
                    msg: '添加分类失败，分类名已存在！',
                    status: 201
                }
            })
        } else {
            new Classification({
                class_name: req.body.class_name,
                class_path: req.body.class_path
            }).save().then(
                res.json({
                    data: {},
                    meta: {
                        msg: '添加分类成功！',
                        status: 200
                    }
                })
            )
        }
    })
})

// 修改分类
router.post('/alter/classification', (req, res) => {
    let {
        id,
        class_name,
        class_path
    } = req.body

    Classification.findOne({
        class_name
    }).then(data => {
        if (data) {
            Classification.findById(id).then(data => {
                if (data.class_name !== class_name) {
                    res.json({
                        data: {},
                        meta: {
                            msg: '修改分类失败，分类名已存在！',
                            status: 201
                        }
                    })
                } else {
                    Classification.findByIdAndUpdate(id, {
                        class_name,
                        class_path
                    }).then(() => {
                        res.json({
                            data: {},
                            meta: {
                                msg: '修改分类成功！',
                                status: 200
                            }
                        })
                    })
                }
            })
        } else {
            Classification.findByIdAndUpdate(id, {
                class_name,
                class_path
            }).then(() => {
                res.json({
                    data: {},
                    meta: {
                        msg: '修改分类成功！',
                        status: 200
                    }
                })
            })
        }
    })
})

// 置顶分类参数
router.post('/top/classification', (req, res) => {
    let id = req.body.id
    Classification.findByIdAndUpdate(id, {
        last_modify_time: new Date
    }).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '置顶分类参数成功！',
                status: 200
            }
        })
    })
})

// 删除分类
router.post('/delete/classification', (req, res) => {
    let id = req.body.id
    Classification.findByIdAndDelete(id).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '删除分类成功！',
                status: 200
            }
        })
    })
})

// 导出路由模块
module.exports = router