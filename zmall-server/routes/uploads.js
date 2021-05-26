// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 uuid 包，用户生成唯一文件名和唯一id
let uuid = require('node-uuid')
// 引入 multer 包，处理图片上传请求
let multer = require('multer')

// 引入 path 模块
let path = require('path')
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')

// 创建路由容器
let router = express.Router()

// 配置文件信息
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filePath = `./tmp_uploads`
        fs.mkdir(filePath, { // 创建目录
            recursive: true
        }, err => {
            if (err) {
                throw err
            } else {
                cb(null, filePath); // 指定文件保存的路径
            }
        })
    },
    filename: function (req, file, cb) {
        let ext = path.parse(file.originalname).ext //获取文件后缀
        fileName = uuid.v1().split('-').join('') + ext // 用uuid生成一个不重复的id作为文件名
        cb(null, fileName); // 指定文件保存的文件名
    }
})
let upload = multer({
    storage: storage // 挂在配置
})

// 配置文件信息
let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        let filePath = `./uploads/user`
        fs.mkdir(filePath, { // 创建目录
            recursive: true
        }, err => {
            if (err) {
                throw err
            } else {
                cb(null, filePath); // 指定文件保存的路径
            }
        })
    },
    filename: function (req, file, cb) {
        let ext = path.parse(file.originalname).ext //获取文件后缀
        fileName = uuid.v1().split('-').join('') + ext // 用uuid生成一个不重复的id作为文件名
        cb(null, fileName); // 指定文件保存的文件名
    }
})
let upload2 = multer({
    storage: storage2 // 挂在配置
})

// 处理跨域请求
router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
})

// 处理图片上传请求
router.post('/uploads', upload.single('file'), (req, res, next) => {
    res.json({
        "data": {
            "tmp_path": `${req.file.path}`,
            "url": `http://127.0.0.1:3002/tmp_uploads/${req.file.filename}`
        },
        "meta": {
            "msg": "上传成功",
            "status": 200
        }
    })
    next()
})

// 处理用户头像上传请求
router.post('/uploads/useravatar', upload2.single('file'), (req, res, next) => {
    res.json({
        url: `http://127.0.0.1:3002/uploads/user/${req.file.filename}`,
        msg: "上传成功",
        status: 200
    })
    next()
})

// 导出路由模块
module.exports = router