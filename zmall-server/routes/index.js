// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 uuid 包，用户生成唯一文件名和唯一id
let uuid = require('node-uuid')
// 引入 multer 包，处理图片上传请求
let multer = require('multer')

// 引入 path 模块
let path = require('path')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Logo = require('../models/logo')
let Carousel = require('../models/carousel')
let Classification = require('../models/classification.js')
let Attribute = require('../models/attribute.js')
let Goods = require('../models/goods.js')

// 创建路由容器
let router = express.Router()

// 配置文件信息
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filePath = `./tmp_uploads`
        fs.mkdir(filePath, {
            recursive: true
        }, err => {
            if (err) {
                throw err
            } else {
                cb(null, filePath); // 指定文件保存的路径
            }
        })
    },
    filename: function (req, file, cb) {
        let ext = path.parse(file.originalname).ext
        fileName = uuid.v1().split('-').join('') + ext
        cb(null, fileName); // 指定文件保存的文件名
    }
})
let upload = multer({
    storage: storage
})

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

// 处理图片上传请求
router.post('/uploads', upload.single('file'), (req, res, next) => {
    res.json({
        "data": {
            "tmp_path": `${req.file.path}`,
            "url": `http://127.0.0.1:3002/tmp_uploads/${req.file.filename}`
        },
        "meta": {
            "msg": "上传成功",
            "status": 200
        }
    })
    next()
})

// 保存 logo
router.post('/save/logo', (req, res, next) => {
    let path = req.body.url
    let newPath = `./uploads/${path.split('\\')[1]}`
    copyFile(path, newPath, () => {
        new Logo({
            logo_url: `http://127.0.0.1:3002/uploads/${path.split('\\')[1]}`
        }).save().then(() => {
            res.json({
                "data": {},
                "meta": {
                    "msg": "保存成功",
                    "status": 200
                }
            })
            next()
        }).catch(err => {
            res.json({
                "data": {},
                "meta": {
                    "msg": "保存失败！",
                    "status": 500
                }
            })
            next()
        })
    })
})

// 获取 logo 列表
router.get('/get/logo', (req, res, next) => {
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

// 获取轮播图数据
router.get('/carousel', (req, res) => {
    Carousel.find({
            is_delete: 0
        }).sort({
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

// 处理轮播图上传请求
router.post('/uploads/carousel', (req, res) => {
    let path = req.body.tmp_path
    let newPath = `./uploads/carousel/${path.split('\\')[1]}`
    copyFile(path, newPath, () => {
        Carousel.find({
                is_delete: 0
            }).sort({
                carousel_order: -1
            })
            .exec()
            .then(result => {
                let carousel_order = 1
                if (result.length > 0) {
                    carousel_order = result[0].carousel_order + 1
                }
                return new Carousel({
                    carousel_url: `http://127.0.0.1:3002/uploads/carousel/${path.split('\\')[1]}`,
                    carousel_order
                }).save()
            }).then(() => {
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
    Carousel.findByIdAndUpdate(req.body.id, {
        is_delete: 1
    }).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '删除轮播图成功！',
                status: 200
            }
        })
    })
})

// 获取在售商品列表
router.get('/goods/onsale', (req, res) => {
    Goods.find({
            is_delete: 0,
            is_sale: 1
        }).sort({
            last_modify_time: -1
        })
        .exec().then(data => {
            console.log(data)
            res.json({
                data: {
                    goods_list: data
                },
                meta: {
                    msg: '获取在售商品列表成功！',
                    status: 200
                }
            })
        })
})

// 获取下架商品列表
router.get('/goods/offsale', (req, res) => {
    Goods.find({
            is_delete: 0,
            is_sale: 0
        }).sort({
            last_modify_time: -1
        })
        .exec().then(data => {
            console.log(data)
            res.json({
                data: {
                    goods_list: data
                },
                meta: {
                    msg: '获取下架商品列表成功！',
                    status: 200
                }
            })
        })
})

// 添加商品
router.post('/add/goods', (req, res) => {
    let goodsData = req.body
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

// 获取所有属性
router.get('/get/attribute', (req, res) => {
    Attribute.find()
        .sort({
            belong_classification: -1
        })
        .exec()
        .then(data => {
            let attribute_list = data.map(item => {
                return {
                    _id: item._id,
                    attribute_name: item.attribute_name,
                    attribute_value: item.attribute_value,
                    children: item.attribute_value.split(','),
                    belong_classification: item.belong_classification
                }
            })
            res.json({
                data: {
                    attribute_list
                },
                meta: {
                    msg: '获取属性成功！',
                    status: 200
                }
            })
        })
})

// 根据属性所属分类获取属性
router.get('/get/attribute/withclass', (req, res) => {
    Attribute.find({
            belong_classification: req.query.belong_classification
        })
        .then(data => {
            let attribute_list = data.map(item => {
                return {
                    id: item._id,
                    attribute_name: item.attribute_name,
                    attribute_value: item.attribute_value,
                    children: item.attribute_value.split(',')
                }
            })
            res.json({
                data: {
                    attribute_list
                },
                meta: {
                    msg: '获取属性成功！',
                    status: 200
                }
            })
        })
})

// 添加属性
router.post('/add/attribute', (req, res) => {
    let {
        attribute_name,
        attribute_value,
        class_value
    } = req.body
    attribute_value = [...new Set(attribute_value.split(','))].join(',')
    Attribute.findOne({
        attribute_name,
        belong_classification: class_value
    }).then(data => {
        if (data) {
            res.json({
                data: {},
                meta: {
                    msg: '属性名重复，不允许添加该属性！',
                    status: 201
                }
            })
        } else {
            new Attribute({
                attribute_name,
                attribute_value,
                belong_classification: class_value
            }).save().then(() => {
                res.json({
                    data: {},
                    meta: {
                        msg: '添加属性成功！',
                        status: 200
                    }
                })
            })
        }
    })
})

// 修改属性
router.post('/alter/attribute', (req, res) => {
    let {
        id,
        attribute_name,
        attribute_value,
        class_value
    } = req.body
    attribute_value = [...new Set(attribute_value.split(','))].join(',')
    Attribute.findOne({
        attribute_name,
        belong_classification: class_value
    }).then(data => {
        if (data) {
            Attribute.findById(id).then(data => {
                if (data.attribute_name !== attribute_name) {
                    res.json({
                        data: {},
                        meta: {
                            msg: '属性名重复，不允许修改为该属性名！',
                            status: 201
                        }
                    })
                } else {
                    Attribute.findByIdAndUpdate(id, {
                        attribute_name,
                        attribute_value,
                        belong_classification: class_value
                    }).then(() => {
                        res.json({
                            data: {},
                            meta: {
                                msg: '修改属性成功！',
                                status: 200
                            }
                        })
                    })
                }
            })
        } else {
            Attribute.findByIdAndUpdate(id, {
                attribute_name,
                attribute_value,
                belong_classification: class_value
            }).then(() => {
                res.json({
                    data: {},
                    meta: {
                        msg: '修改属性成功！',
                        status: 200
                    }
                })
            })
        }
    })
})

// 添加属性值
router.post('/add/attribute/value', (req, res) => {
    let {
        id,
        value
    } = req.body
    Attribute.findById(id).then(data => {
        let attribute_value = data.attribute_value.split(',')
        attribute_value.push(value)
        attribute_value = [...new Set(attribute_value)].join(',')
        Attribute.findByIdAndUpdate(id, {
            attribute_value
        }).then(() => {
            res.json({
                data: {},
                meta: {
                    msg: '添加属性值成功！',
                    status: 200
                }
            })
        })
    })
})

// 删除属性值
router.post('/delete/attribute/value', (req, res) => {
    let {
        id,
        value
    } = req.body
    Attribute.findById(id).then(data => {
        let attribute_value = data.attribute_value.split(',')
        attribute_value.splice(attribute_value.indexOf(value), 1)
        attribute_value = attribute_value.join(',')
        Attribute.findByIdAndUpdate(id, {
            attribute_value
        }).then(() => {
            res.json({
                data: {},
                meta: {
                    msg: '删除属性值成功！',
                    status: 200
                }
            })
        })
    })
})

// 删除属性
router.post('/delete/attribute', (req, res) => {
    let id = req.body.id
    Attribute.findByIdAndDelete(id).then(() => {
        res.json({
            data: {},
            meta: {
                msg: '删除属性成功！',
                status: 200
            }
        })
    })
})

/**
 * *************************************
 * 以下为商城前台api
 * *************************************
 */

// 获取单个 logo
router.get('/api/private/get/logo', (req, res, next) => {
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
            next()
        })
})

// 获取轮播图数据
router.get('/api/private/carousel', (req, res) => {
    Carousel.find({
            is_delete: 0
        }).sort({
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


/**
 * *************************************
 * 其他方法
 * *************************************
 */
// 复制图片
function copyFile(oldPath, newPath, callback) {
    fs.copyFile(oldPath, newPath, 0, err => {
        if (err) {
            throw err
        } else {
            callback()
        }
    })
}

// 导出路由模块
module.exports = router