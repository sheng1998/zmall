// 商品表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let goodsSchema = new Schema({
    // 商品 id
    goods_id: {
        type: Number,
        required: true
    },
    // 商品名称
    goods_name: {
        type: String,
        required: true
    },
    // 商品描述
    describe: {
        type: String,
        required: true
    },
    // 商品价格
    price: {
        type: Number,
        required: true
    },
    // 商品原价
    original_price: {
        type: Number,
        required: true
    },
    // 商品折扣价
    discount_price: {
        type: Number,
        required: true
    },
    // 商品数量
    goods_number: {
        type: Number,
        required: true
    },
    // 商品分类
    classification: {
        type: String,
        required: true
    },
    // 商品图片列表
    img_list: {
        type: Array,
        required: true
    },
    // 商品详情
    details: {
        type: String
    },
    // 商品属性
    attribute: {
        type: Array,
        required: true
    },
    // 商品参数
    parameter: {
        type: Object
    },
    // 商品是否已经删除
    is_delete: {
        type: Number,
        default: 0,
        enum: [1, 0] // 0 未删除， 1 已经删除
    },
    // 商品是否上架
    is_sale: {
        type: Number,
        default: 1,
        enum: [1, 0] // 0 未上架、已经下架， 1 已经上架
    },
    // 月销
    monthly_sales: {
        type: Number,
        default: 0
    },
    // 总销量
    total_sales: {
        type: Number,
        default: 0
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    },
    // 最后一次修改的时间
    last_modify_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Good', goodsSchema)