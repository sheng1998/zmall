// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
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

// 根据商品 id 获取商品
router.get('/goods/byid', (req, res) => {
    Goods.find({
        goods_id: Number(req.query.goods_id)
    }).then(data => {
        res.json({
            data,
            meta: {
                msg: '获取商品成功！',
                status: 200
            }
        })
    })
})

// 获取在售商品列表
router.get('/goods/onsale', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    // reg: 正则表达式
    let {
        page_size,
        data_number,
        query
    } = req.query
    const reg = new RegExp(query, 'i')
    Goods.count({
        $or: [{
            goods_name: {
                $regex: reg
            }
        }],
        is_delete: 0,
        is_sale: 1
    }).then(num => {
        Goods.find({
                $or: [{
                    goods_name: {
                        $regex: reg
                    }
                }],
                is_delete: 0,
                is_sale: 1
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                goods_id: 1
            })
            .exec().then(data => {
                res.json({
                    data: {
                        totalGoods: num,
                        goods_list: data
                    },
                    meta: {
                        msg: '获取在售商品列表成功！',
                        status: 200
                    }
                })
            })
    })
})

// 获取下架商品列表
router.get('/goods/offsale', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    // reg: 正则表达式
    let {
        page_size,
        data_number,
        query
    } = req.query
    const reg = new RegExp(query, 'i')
    Goods.count({
        $or: [{
            goods_name: {
                $regex: reg
            }
        }],
        is_delete: 0,
        is_sale: 0
    }).then(num => {
        Goods.find({
                $or: [{
                    goods_name: {
                        $regex: reg
                    }
                }],
                is_delete: 0,
                is_sale: 0
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                goods_id: 1
            })
            .exec().then(data => {
                res.json({
                    data: {
                        totalGoods: num,
                        goods_list: data
                    },
                    meta: {
                        msg: '获取下架商品列表成功！',
                        status: 200
                    }
                })
            })
    })
})

// 添加商品
router.post('/add/goods', (req, res) => {
    let goodsData = req.body
    let img_list = goodsData.img_list
    let asyncArray = []
    img_list.forEach((item, index) => {
        let path = item
        let newPath = `./uploads/goods/1/${path.split('\\')[1]}`
        asyncArray.push(
            new Promise((reslove, reject) => {
                fs.copyFile(path, newPath, err => {
                    if (err) {
                        reject(err)
                    } else {
                        img_list[index] = `http://127.0.0.1:3002/uploads/goods/${path.split('\\')[1]}`
                        reslove(img_list[index])
                    }
                })
            })
        )
    })

    Promise.all(asyncArray).then((result) => {
        goodsData.img_list = result

        Goods.find().sort({
                goods_id: -1
            })
            .exec().then(data => {
                let goods_id = 0
                if (data.length === 0) {
                    goods_id = 1
                } else {
                    goods_id = data[0].goods_id + 1
                }
                goodsData.goods_id = goods_id
                new Goods(goodsData).save().then(() => {
                    res.json({
                        data: {},
                        meta: {
                            msg: '保存商品数据成功！',
                            status: 200
                        }
                    })
                })
            })
    })
})

// 修改商品状态
router.get('/alter/goods/state', (req, res) => {
    let id = Number(req.query.goods_id)
    let state = req.query.state === 'true' ? 1 : 0
    Goods.findOneAndUpdate({
        goods_id: id
    }, {
        is_sale: state
    }).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '修改商品状态成功！',
                status: 200
            }
        })
    })
})

// 删除商品
router.get('/delete/goods', (req, res) => {
    let id = Number(req.query.id)
    Goods.findOneAndUpdate({
        goods_id: id
    }, {
        is_delete: 1
    }).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '删除商品成功！',
                status: 200
            }
        })
    })
})

// 导出路由模块
module.exports = router