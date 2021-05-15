// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Logo = require('../models/logo')
let Carousel = require('../models/carousel')
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

// 获取单个 logo
router.get('/api/private/get/logo', (req, res) => {
    Logo.find()
        .skip(0)
        .sort({
            created_time: -1
        })
        .limit(1)
        .exec()
        .then(result => {
            res.json({
                data: {
                    url: result[0].logo_url,
                    status: 200
                }
            })
        })
})

// 获取轮播图数据
router.get('/api/private/carousel', (req, res) => {
    Carousel.find().sort({
            last_modify_time: -1
        })
        .exec()
        .then((result) => {
            res.json({
                data: {
                    carouselList: result
                },
                meta: {
                    msg: '获取轮播图数据成功！',
                    status: 200
                }
            })
        })
})

// 获取分类列表
router.get('/api/private/get/classification', (req, res) => {
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

// 导出路由模块
module.exports = router