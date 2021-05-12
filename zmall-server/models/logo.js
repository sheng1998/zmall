// lkogo 表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let logoSchema = new Schema({
    // logo url
    logo_url: {
        type: String,
        required: true
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Logo', logoSchema)
