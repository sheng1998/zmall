// 分类表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let classificationSchema = new Schema({
    // 商品 ID
    good_id: {
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
    }
})

module.exports = mongoose.model('Classification', classificationSchema)
