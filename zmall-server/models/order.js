// 订单表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let orderSchema = new Schema({
    // 订单号
    order_id: {
        type: String,
        required: true
    },
    goods_id: {
        type: String,
        required: true
    },
    // 客户名称
    username: {
        type: String,
        required: true
    },
    goods_name: {
        type: String,
        required: true
    },
    goods_img: {
        type: String,
        required: true
    },
    goods_attribute: {
        type: String,
        required: true
    },
    goods_price: {
        type: Number,
        required: true
    },
    goods_original_price: {
        type: Number,
        required: true
    },
    goods_discount_price: {
        type: Number,
        required: true
    },
    goods_number: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    consignee_name: {
        type: String,
        required: true
    },
    receiving_address: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    is_delete: {
        type: Number,
        default: 0,
        enum: [1, 0] // 0 未删除， 1 已经删除
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Attribute', attributeSchema)