// 订单表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let shopcarSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    goods_id: {
        type: Schema.Types.ObjectId,
        ref: 'goods',
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    goods_attribute: {
        type: String
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

module.exports = mongoose.model('shopcar', shopcarSchema)