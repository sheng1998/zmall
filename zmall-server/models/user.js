// 用户表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let userSchema = new Schema({
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
    // 电话
    telephone: {
        type: String,
        required: true
    },
    // 权限
    limit: {
        type: Number,
        default: 1,
        enum: [-1, 0, 1, 2]
    },
    avatar: {
        type: String,
        required: true,
        default: '../public/img/userAvatar/avatar1.jpg'
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)
