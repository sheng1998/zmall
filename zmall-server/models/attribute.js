// 属性表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let attributeSchema = new Schema({
    // 属性名
    attribute_name: {
        type: String,
        required: true
    },
    // 所属分类
    belong_classification: {
        type: String,
        required: true
    },
    // 属性值
    attribute_value: {
        type: String,
        required: true
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Attribute', attributeSchema)
