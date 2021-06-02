let mongoose = require('mongoose')

let Schema = mongoose.Schema

let commentSchema = new Schema({
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
    text: {
        type: String,
        required: true
    },
    img_list: {
        type: Array
    },
    has_img: {
        type: Number,
        default: 0,
        enum: [1, 0]
    },
    stars: {
        type: Number,
        required: true
    },
    shopkeeper_comment: {
        type: Object
    },
    praise: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Comment', commentSchema)