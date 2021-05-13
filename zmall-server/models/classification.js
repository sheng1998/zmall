// 分类表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let classSchema = new Schema({
    // 分类名
    class_name: {
        type: String,
        required: true
    },
    // 分类路径
    class_path: {
        type: String,
        required: true
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

module.exports = mongoose.model('Class', classSchema)
