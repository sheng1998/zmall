// 轮播图 表模型设置
let mongoose = require('mongoose')

let Schema = mongoose.Schema

let carouselSchema = new Schema({
    // 轮播图地址
    carousel_url: {
        type: String,
        required: true
    },
    // 轮播图绑定的商品
    goods_id: {
        type: Number,
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

module.exports = mongoose.model('Carousel', carouselSchema)