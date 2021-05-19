// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 获取验证码需要用到的包
const svgCaptcha = require('svg-captcha');
// md5 加密包
let md5 = require("md5");

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let User = require('../models/user')
let LoginStatus = require('../models/loginStatus')
let Logo = require('../models/logo')
let Carousel = require('../models/carousel')
let Classification = require('../models/classification.js')

// 创建路由容器
let router = express.Router()
// 临时保存验证码
let IDENTIFYINGCODE = null
// 加密字符串
let SECRECYSTRING = 'if("xmf"==="xmf"){console.log("this is the xmf-server!")}'

// 处理跨域请求
router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", "http://localhost:8888");

    // 允许多个域名跨域
    const originList = [
        'http://localhost:8888',
        'http://127.0.0.1:8888',
        'http://127.0.0.1:8886'
    ]
    if (req.headers.origin && originList.includes(req.headers.origin.toLocaleLowerCase())) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }

    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

// 获取单个 logo
router.get('/api/private/get/logo', (req, res) => {
    Logo.find()
        .skip(0)
        .sort({
            created_time: -1
        })
        .limit(1)
        .exec()
        .then(result => {
            res.json({
                data: {
                    url: result[0].logo_url,
                    status: 200
                }
            })
        })
})

// 获取轮播图数据
router.get('/api/private/carousel', (req, res) => {
    Carousel.find().sort({
            last_modify_time: -1
        })
        .exec()
        .then((result) => {
            res.json({
                data: {
                    carouselList: result
                },
                meta: {
                    msg: '获取轮播图数据成功！',
                    status: 200
                }
            })
        })
})

// 获取分类列表
router.get('/api/private/get/classification', (req, res) => {
    Classification.find()
        .sort({
            last_modify_time: -1
        })
        .exec()
        .then(result => {
            res.json({
                data: {
                    class_list: result
                },
                meta: {
                    msg: '获取分类列表成功！',
                    status: 200
                }
            })
        })
})

// 获取验证码
router.get('/api/private/get/identifying-code', (req, res) => {
    let captcha = svgCaptcha.create({
        inverse: false, // 翻转颜色 
        fontSize: 36, // 字体大小
        noise: 2, // 噪声线条数 
        width: 120, // 宽度 
        height: 40, // 高度
        size: 4, // 验证码长度
        ignoreChars: '0oi1OIl', // 验证码字符中排除 0oi1OIl
        color: false, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        // background: '#ffffff' // 验证码图片背景颜色
    })
    req.session = captcha.text.toLowerCase() // 保存到session,忽略大小写 
    // console.log(req.session) //生成的验证码
    IDENTIFYINGCODE = req.session //生成的验证码

    res.cookie('captcha', IDENTIFYINGCODE, {
        maxAge: 60000,
        httpOnly: true
    }) //保存到cookie 方便前端调用验证
    res.setHeader('Content-Type', 'image/svg+xml')
    res.write(String(captcha.data))
    res.end()
})

router.get('/api/private/yzm', (req, res) => {
    res.json({
        yzm: IDENTIFYINGCODE
    })
})

// 处理前端登录请求
router.post('/api/private/login', (req, res) => {
    let {
        username,
        password
    } = req.body
    password = md5(md5(password + SECRECYSTRING) + SECRECYSTRING)
    if (username[0] !== '1') {
        User.findOne({
            username: username
        }).then(data => {
            if (data) {
                User.findOne({
                    username,
                    password
                }).then(result => {
                    if (result) {
                        let code = md5(result._id) + md5(username) + md5(password)
                        new LoginStatus({
                            username,
                            password,
                            user_id: result._id,
                            code
                        }).save().then(() => {
                            res.json({
                                data: {
                                    loginInfo: {
                                        code,
                                        username,
                                        user_id: result._id,
                                        message: '三小时后自动过期！'
                                    }
                                },
                                meta: {
                                    msg: '登陆成功！',
                                    status: 200
                                }
                            })
                        })
                    } else {
                        res.json({
                            data: {},
                            meta: {
                                msg: '登陆失败，密码错误！',
                                status: 201
                            }
                        })
                    }
                })
            } else {
                res.json({
                    data: {},
                    meta: {
                        msg: '登陆失败，用户不存在！',
                        status: 201
                    }
                })
            }
        })
    } else {
        User.findOne({
            tel: username
        }).then(data => {
            if (data) {
                User.findOne({
                    tel: username,
                    password
                }).then(result => {
                    if (result) {
                        let code = md5(result._id) + md5(username) + md5(password)
                        new LoginStatus({
                            username,
                            password,
                            user_id: result._id,
                            code
                        }).save().then(() => {
                            res.json({
                                data: {
                                    loginInfo: {
                                        code,
                                        username,
                                        user_id: result._id,
                                        message: '三小时后自动过期！'
                                    }
                                },
                                meta: {
                                    msg: '登陆成功！',
                                    status: 200
                                }
                            })
                        })
                    } else {
                        res.json({
                            data: {},
                            meta: {
                                msg: '登陆失败，密码错误！',
                                status: 201
                            }
                        })
                    }
                })
            } else {
                res.json({
                    data: {},
                    meta: {
                        msg: '登陆失败，用户不存在！',
                        status: 201
                    }
                })
            }
        })
    }
})

// 邮箱校验 ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
// 只允许英文字母、数字、下划线、英文句号、以及中划线组成
// let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/


// 处理注册请求
router.post('/api/private/register', (req, res) => {
    let {
        username,
        tel,
        password,
        code
    } = req.body

    let password2 = md5(md5(password + SECRECYSTRING) + SECRECYSTRING)

    // 手机号校验
    /*
     * 号段总结:
     * 130-139
     * 141、144-149
     * 155-159
     * 162、165-167
     * 170-173、175-178
     * 180-189
     * 191、198、199
     */
    let telReg = /^1((3[0-9])|(4(1|[4-9]))|(5[5-9])|(6(2|[5-7]))|(7([0-3]|[5-8]))|(8[0-9])|(9[189]))[0-9]{8}$/

    // 密码校验
    let passwordReg1 = /\s/g
    let passwordReg2 = /[^\x00-\xff]/g

    if (code.toLowerCase() !== IDENTIFYINGCODE) {
        res.json({
            data: {},
            meta: {
                msg: '验证码不正确，请重新输入！',
                status: 201
            }
        })
    } else if (username[0] === '1') {
        res.json({
            data: {},
            meta: {
                msg: '注册失败，用户名首位禁止为数字 1！',
                status: 201
            }
        })
    } else if (username.length > 12) {
        res.json({
            data: {},
            meta: {
                msg: '注册失败，用户名太长,要12字以内！',
                status: 201
            }
        })
    } else if ((/\s/g).test(username)) {
        res.json({
            data: {},
            meta: {
                msg: '用户名含有非法字符，请重新输入！',
                status: 201
            }
        })
    } else if (!telReg.test(tel)) {
        // 手机号码校验 (/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
        res.json({
            data: {},
            meta: {
                msg: '注册失败，手机号输入错误(必需要11位数，禁止含有除数字外其他字符)！',
                status: 201
            }
        })
    } else if (password.length < 8 || password.length > 30) {
        // 密码长度 8-30
        res.json({
            data: {},
            meta: {
                msg: '密码长度必需控制在8-30个字符之间！',
                status: 201
            }
        })
    } else if (passwordReg1.test(password) || passwordReg2.test(password)) {
        res.json({
            data: {},
            meta: {
                msg: '密码含有非法字符！',
                status: 201
            }
        })
    } else {
        // 密码强度校验
        let strength = 0
        if ((/[a-zA-Z]/g).test(password)) {
            strength += 1
        }
        if ((/[\d]/g).test(password)) {
            strength += 1
        }
        if ((/[!@#$%^&*()_+=[\]{}\\|;:'",<>.?\/-]/g).test(password)) {
            strength += 1
        }

        if (strength < 2) {
            res.json({
                data: {},
                meta: {
                    msg: '密码强度太低(密码中必需含有字母、数字、特殊符号的两种以上！)',
                    status: 201
                }
            })
        } else {
            User.findOne({
                username
            }).then(data => {
                if (data) {
                    res.json({
                        data: {},
                        meta: {
                            msg: '注册失败，用户名已存在！',
                            status: 201
                        }
                    })
                } else {
                    User.findOne({
                        tel
                    }).then(data => {
                        if (data) {
                            res.json({
                                data: {},
                                meta: {
                                    msg: '注册失败，电话号码已注册！',
                                    status: 201
                                }
                            })
                        } else {
                            new User({
                                username,
                                password: password2,
                                tel
                            }).save().then(() => {
                                res.json({
                                    data: {},
                                    meta: {
                                        msg: '注册成功！',
                                        status: 200
                                    }
                                })
                            })
                        }
                    })
                }
            })
        }
    }
})

// 获取登录状态
router.get('/api/private/islogin', (req, res) => {
    let code = req.query.code
    LoginStatus.findOne({
        code: code
    }).then(data => {
        if (data) {
            res.json({
                isLogin: true,
                status: 200
            })
        } else {
            res.json({
                isLogin: false,
                status: 201
            })
        }
    })
})

// 根据 id 获取用户信息
router.get('/api/private/userinfo', (req, res) => {
    let id = req.query.id
    User.findById(id).then(data => {
        res.json({
            userinfo: data,
            status: 200
        })
    })
})

// 导出路由模块
module.exports = router