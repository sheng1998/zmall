// 用户表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let statusSchema = new Schema({
    // 用户名
    username: {
        type: String,
        required: true
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LoginStatus', statusSchema)
