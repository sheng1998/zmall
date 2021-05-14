// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Logo = require('../models/logo')

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

// 保存 logo
router.post('/save/logo', (req, res) => {
    let path = req.body.url
    let newPath = `./uploads/logo/${path.split('\\')[1]}`
    copyFile(path, newPath, () => {
        new Logo({
            logo_url: `http://127.0.0.1:3002/uploads/logo/${path.split('\\')[1]}`
        }).save().then(() => {
            res.json({
                data: {},
                meta: {
                    msg: "保存成功",
                    status: 200
                }
            })
        }).catch(err => {
            res.json({
                data: {},
                meta: {
                    msg: "保存失败！",
                    status: 500
                }
            })
        })
    })
})

// 获取 logo 列表
router.get('/get/logo', (req, res) => {
    Logo.find()
        .skip(0)
        .sort({
            created_time: -1
        })
        .limit(10)
        .exec()
        .then(result => {
            res.json({
                data: {
                    logoList: result
                },
                meta: {
                    msg: '获取logo数据成功！',
                    status: 200
                }
            })
        })
})

// 复制图片
function copyFile(oldPath, newPath, callback) {
    fs.copyFile(oldPath, newPath, 0, err => {
        if (err) {
            throw err
        } else if (callback && typeof callback === "function") {
            callback()
        }
    })
}

// 导出路由模块
module.exports = router