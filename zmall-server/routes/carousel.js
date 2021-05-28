// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Carousel = require('../models/carousel')
let Goods = require('../models/goods.js')

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

// 获取轮播图数据
router.get('/carousel', (req, res) => {
    Carousel.find().sort({
            last_modify_time: -1
        })
        .exec()
        .then(result => {
            let asyncArray = []
            result.forEach(item => {
                asyncArray.push(
                    new Promise((reslove, reject) => {
                        Goods.findById(item.goods_id).then(data => {
                            reslove({
                                goods_id: data.goods_id,
                                goods_name: data.goods_name,
                                _id: item._id,
                                carousel_url: item.carousel_url,
                                last_modify_time: item.last_modify_time
                            })
                        }).catch(err => {
                            if (err) {
                                reject(err)
                            }
                        })
                    })
                )
            })

            Promise.all(asyncArray).then((result) => {
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
})

// 处理轮播图上传请求
router.post('/uploads/carousel', (req, res) => {
    let goods_id = req.body.goods_id
    let path = req.body.tmp_path
    let newPath = `uploads/carousel/${path.split('\\')[1]}`
    copyFile(path, `./${newPath}`, () => {
        new Carousel({
            carousel_url: `http://127.0.0.1:3002/${newPath}`,
            goods_id: goods_id
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

// 置顶轮播图
router.post('/top/carousel', (req, res) => {
    let id = req.body.id
    Carousel.findByIdAndUpdate(id, {
        last_modify_time: new Date
    }).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '置顶轮播图成功！',
                status: 200
            }
        })
    })
})

// 删除轮播图
router.post('/delete/carousel', (req, res) => {
    Carousel.findByIdAndDelete(req.body.id).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '删除轮播图成功！',
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