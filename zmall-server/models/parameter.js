// 用户表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let parameterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    titleList: {
        type: String,
        required: true
    },
    sort: {
        type: Number,
        default: 1
    },
    classification: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Parameter', parameterSchema)
