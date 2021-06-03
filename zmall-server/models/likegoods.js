// 订单表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let likegoodsSchema = new Schema({
    query: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LikeGoods', likegoodsSchema)