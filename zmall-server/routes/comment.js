// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let Comment = require('../models/comment')
let Goods = require('../models/goods')
let User = require('../models/user.js')

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

// 获取评论列表
router.get('/comment/list', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    let {
        page_size,
        data_number,
        query
    } = req.query
    const reg = new RegExp(query, 'i')

    Comment.count({
        $or: [{
            text: {
                $regex: reg
            }
        }],
        is_delete: 0
    }).then(num => {
        Comment.find({
                $or: [{
                    text: {
                        $regex: reg
                    }
                }],
                is_delete: 0
            })
            .skip(parseInt((page_size - 1) * data_number))
            .limit(parseInt(data_number))
            .sort({
                created_time: -1
            })
            .exec()
            .then(data => {
                let asyncArray = []
                data.forEach(item => {
                    asyncArray.push(
                        new Promise((resolve, reject) => {
                            User.findById(item.user_id).then(user => {
                                Goods.findById(item.goods_id).then(goods => {
                                    resolve({
                                        _id: item._id,
                                        user,
                                        goods,
                                        comment: item
                                    })
                                })
                            })
                        })
                    )
                })

                Promise.all(asyncArray).then(result => {
                    res.json({
                        totalComment: num,
                        data: result,
                        msg: 'success!',
                        status: 200
                    })
                })
            })
    })
})

// 删除评论信息
router.get('/delete/comment', (req, res) => {
    Comment.findByIdAndUpdate(req.query.id, {
        is_delete: 1
    }).then(() => {
        res.json({
            msg: 'success!',
            status: 200
        })
    })
})

// 导出路由模块
module.exports = router