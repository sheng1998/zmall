// 商品表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let addressSchema = new Schema({
    divisionId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    children: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Address', addressSchema)