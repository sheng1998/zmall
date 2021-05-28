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
    // 名字
    name: {
        type: String,
        default: ''
    },
    // 电话
    tel: {
        type: String,
        required: true
    },
    // 权限
    limit: {
        type: Number,
        default: 1,
        enum: [-1, 0, 1] // 0 禁止登陆，1 正常用户，-1 禁止评论
    },
    email: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: 'http://127.0.0.1:3002/uploads/user/avatar.png'
    },
    gender: {
        type: String,
        default: '未知',
        enum: ['未知', '男', '女']
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        default: 0
    },
    default_delivery_address_id: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)
