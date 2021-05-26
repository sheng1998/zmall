// 用户表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let deliverySchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address_front: {
        type: String,
        required: true
    },
    address_after: {
        type: String,
        required: true
    },
    address_list_id: {
        type: Array,
        required: true
    },
    is_default: {
        type: Number,
        required: true,
        default: 0,
        enum: [0, 1]
    }
})

module.exports = mongoose.model('delivery', deliverySchema)
