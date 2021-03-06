// 订单表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let orderSchema = new Schema({
    goods_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    goods_attribute: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    delivery: {
        type: Object,
        required: true
    },
    goods_info: {
        type: Object,
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

module.exports = mongoose.model('Order', orderSchema)