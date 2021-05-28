// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Goods = require('../models/goods.js')
let Carousel = require('../models/carousel')

// 商品图片保存地址
let GOODSIMGPATH = 'uploads/goods/'

// 创建路由容器
let router = express.Router()

// 处理跨域请求
router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", "http://localhost:8888");

    // 允许多个域名跨域
    const originList = [
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
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

// 根据商品 id 获取商品
router.get('/goods/byid', (req, res) => {
    Goods.findById(req.query.goods_id).then(data => {
        res.json({
            data,
            meta: {
                msg: '获取商品成功！',
                status: 200
            }
        })
    })
})

// 获取所有商品的商品id、名称以及图片列表
router.get('/goods/onlyname', (req, res) => {
    Goods.find({
        is_delete: 0,
        is_sale: 1
    }).then(data => {
        let goods_list = []
        data.forEach(item => {
            goods_list.push({
                goods_id: item._id,
                goods_name: item.goods_name,
                img_list: item.img_list
            })
        })
        res.json({
            data: {
                goods_list: goods_list
            },
            meta: {
                msg: '获取商品成功信息！',
                status: 200
            }
        })
    })
})

// 根据商品名称模糊查询商品信息
router.get('/goods/withname', (req, res) => {
    let query = req.query.query
    const reg = new RegExp(query, 'i')
    Goods.find({
        $or: [{
            goods_name: {
                $regex: reg
            }
        }, {
            classification: {
                $regex: reg
            }
        }],
        is_delete: 0,
        is_sale: 1
    }).then(data => {
        let goods_list = []
        data.forEach(item => {
            goods_list.push({
                goods_id: item._id,
                goods_name: item.goods_name,
                img_list: item.img_list
            })
        })
        res.json({
            data: {
                goods_list: goods_list
            },
            meta: {
                msg: '获取商品成功信息！',
                status: 200
            }
        })
    })
})

// 获取在售商品列表(可搜索)
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
        }, {
            describe: {
                $regex: reg
            }
        }, {
            classification: {
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
                }, {
                    describe: {
                        $regex: reg
                    }
                }, {
                    classification: {
                        $regex: reg
                    }
                }],
                is_delete: 0,
                is_sale: 1
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                created_time: -1
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

// 获取下架商品列表(可搜索)
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
        }, {
            describe: {
                $regex: reg
            }
        }, {
            classification: {
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
                }, {
                    describe: {
                        $regex: reg
                    }
                }, {
                    classification: {
                        $regex: reg
                    }
                }],
                is_delete: 0,
                is_sale: 0
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                created_time: -1
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
    let goodsName = goodsData.goods_name.trim()
    goodsName = goodsName.replace(/[`\\?、╲/*'"‘“”’<>|]/ig, '')
    if (goodsName === '') {
        goodsName = '商品图片'
    }
    fs.mkdir(`./uploads/goods/${goodsName}`, { // 创建目录
        recursive: true
    }, err => {
        if (err) {
            throw err
        }
    })

    let img_list = goodsData.img_list
    let asyncArray = []

    img_list.forEach((item, index) => {
        let path = item
        let newPath = `${GOODSIMGPATH}${goodsName}/${path.split('\\')[1]}`
        asyncArray.push(
            new Promise((reslove, reject) => {
                fs.copyFile(path, `./${newPath}`, err => {
                    if (err) {
                        reject(err)
                    } else {
                        img_list[index] = `http://127.0.0.1:3002/${newPath}`
                        reslove(img_list[index])
                    }
                })
            })
        )
    })

    Promise.all(asyncArray).then((result) => {
        goodsData.img_list = result
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

// 修改商品状态
router.get('/alter/goods/state', (req, res) => {
    let id = req.query.goods_id
    let state = req.query.state === 'true' ? 1 : 0
    if (state === 0) {
        Carousel.findOne({
            goods_id: id
        }).then(data => {
            if (data) {
                res.json({
                    data: {},
                    meta: {
                        msg: '下架商品状态失败，该商品绑定了首页轮播图，请先删除绑定的轮播图再执行下架操作！',
                        status: 201
                    }
                })
            } else {
                Goods.findByIdAndUpdate(id, {
                    is_sale: state,
                    last_modify_time: new Date
                }).then(() => {
                    res.json({
                        data: {},
                        meta: {
                            msg: '修改商品状态成功！',
                            status: 200
                        }
                    })
                })
            }
        })
    } else {
        Goods.findByIdAndUpdate(id, {
            is_sale: state,
            last_modify_time: new Date
        }).then(() => {
            res.json({
                data: {},
                meta: {
                    msg: '修改商品状态成功！',
                    status: 200
                }
            })
        })
    }
})

// 删除商品
router.get('/delete/goods', (req, res) => {
    let id = req.query.id
    Carousel.findOne({
        goods_id: id
    }).then(data => {
        if (data) {
            res.json({
                data: {},
                meta: {
                    msg: '删除商品失败，该商品绑定了首页轮播图，请先删除绑定的轮播图再执行删除商品操作！',
                    status: 201
                }
            })
        } else {
            Goods.findByIdAndUpdate(id, {
                is_delete: 1,
                last_modify_time: new Date
            }).then(() => {
                res.json({
                    data: {},
                    meta: {
                        msg: '删除商品成功！',
                        status: 200
                    }
                })
            }).catch(err => {
                if (err) {
                    res.json({
                        data: {},
                        meta: {
                            msg: '删除商品失败！',
                            status: 201
                        }
                    })
                }
            })
        }
    }).catch(err => {
        if (err) {
            res.json({
                data: {},
                meta: {
                    msg: '删除商品失败！',
                    status: 201
                }
            })
        }
    })
})

// 修改商品信息
router.post('/edit/goods', (req, res) => {
    let {
        goods_id,
        goods_form
    } = req.body

    let goodsName = req.body.goods_form.goods_name.trim()
    goodsName = goodsName.replace(/[`\\?、╲/*'"‘“”’<>|]/ig, '')
    if (goodsName === '') {
        goodsName = '商品图片'
    }
    fs.mkdir(`./uploads/goods/${goodsName}`, { // 创建目录
        recursive: true
    }, err => {
        if (err) {
            throw err
        }
    })

    let asyncArray = []
    goods_form.img_list.forEach((item, index) => {
        if (item.includes('/tmp_uploads/')) {
            let path = item.split('http://127.0.0.1:3002/')[1]
            let newPath = `${GOODSIMGPATH}${goodsName}/${item.split('/tmp_uploads/')[1]}`
            asyncArray.push(
                new Promise((reslove, reject) => {
                    fs.copyFile(path, `./${newPath}`, err => {
                        if (err) {
                            reject(err)
                        } else {
                            goods_form.img_list[index] = `http://127.0.0.1:3002/${newPath}`
                            reslove()
                        }
                    })
                })
            )
        }
    })

    Promise.all(asyncArray).then(() => {
        Goods.findByIdAndUpdate(goods_id, {
            goods_name: goods_form.goods_name,
            describe: goods_form.describe,
            price: Number(goods_form.price),
            original_price: Number(goods_form.original_price),
            discount_price: Number(goods_form.discount_price),
            goods_number: Number(goods_form.goods_number),
            classification: goods_form.classification,
            img_list: goods_form.img_list,
            details: goods_form.details,
            attribute: goods_form.attribute,
            parameter: goods_form.parameter,
            last_modify_time: new Date
        }).then(() => {
            res.json({
                data: {},
                meta: {
                    msg: '修改商品成功！',
                    status: 200
                }
            })
        })
    })





})

// 获取库存预警信息
router.get('/stockwarning', (req, res) => {
    Goods.find({
        goods_number: {
            $lt: 100
        },
        is_delete: 0
    }).then(data => {
        res.json({
            warning_goods_number: data.length,
            goods_list: data,
            meta: {
                msg: '获取库存预警信息成功！',
                status: 200
            }
        })
    })
})

// 分页获取库存预警商品列表
router.get('/stockwarning/goodslist', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    // reg: 正则表达式
    let {
        page_size,
        data_number
    } = req.query
    Goods.count({
        goods_number: {
            $lt: 100
        },
        is_delete: 0
    }).then(num => {
        Goods.find({
                goods_number: {
                    $lt: 100
                },
                is_delete: 0
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                goods_number: 1,
                created_time: -1
            })
            .exec().then(data => {
                res.json({
                    totalGoods: num,
                    goods_list: data,
                    meta: {
                        msg: '获取库存预警商品列表成功！',
                        status: 200
                    }
                })
            })
    })
})

// 导出路由模块
module.exports = router