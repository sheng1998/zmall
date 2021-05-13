// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Attribute = require('../models/attribute.js')

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

// 导出路由模块
module.exports = router