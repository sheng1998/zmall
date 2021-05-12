// 商品表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let goodSchema = new Schema({
    // 拥有该商品的用户 id
    user_id: {
        type: String,
        required: true
    },
    // 商品名称
    good_name: {
        type: String,
        required: true
    },
    // 商品价格
    good_price: {
        type: Number,
        required: true
    },
    // 月销
    sales: {
        type: Number,
        default: 0
    },
    // 商品图片
    good_img: {
        type: String,
        required: true
    },
    // 商品种类
    good_type: {
        type: String,
        required: true
    },
    // 一级分类
    classification1: {
        type: String,
        required: true
    },
    // 二级分类
    classification2: {
        type: String,
        required: true
    },
    // 添加时间
    add_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Good', goodSchema)