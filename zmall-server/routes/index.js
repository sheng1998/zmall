// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 获取验证码需要用到的包
const svgCaptcha = require('svg-captcha');
// md5 加密包
let md5 = require("md5");
// 引入 fs 模块
let fs = require('fs');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27018/zmall')
let User = require('../models/user')
let Goods = require('../models/goods')
let LoginStatus = require('../models/loginStatus')
let Logo = require('../models/logo')
let Carousel = require('../models/carousel')
let Classification = require('../models/classification.js')
let Address = require('../models/address.js')
let Delivery = require('../models/deliveryAddress')
let Shopcar = require('../models/shopcar')
let Order = require('../models/order')
let Comment = require('../models/comment')

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
        'http://localhost:8886',
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
                    password,
                    limit: 0
                }).then((user) => {
                    if (user) {
                        res.json({
                            data: {},
                            meta: {
                                msg: '该用户禁止登陆！',
                                status: 201
                            }
                        })
                    } else {

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

// 处理注册请求
router.post('/api/private/register', (req, res) => {
    let {
        username,
        tel,
        password
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

    if (username[0] === '1') {
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

// 获取省市县地址级联信息
router.get('/api/private/address', (req, res) => {
    Address.find().then(data => {
        res.json({
            address: data,
            status: 200,
            msg: '获取地址信息成功！'
        })
    })
})

// 根据 id 获取用户信息
router.get('/api/private/userinfo', (req, res) => {
    let id = req.query.id
    User.findById(id).then(data => {
        if (data) {
            res.json({
                userinfo: {
                    name: data.name,
                    email: data.email,
                    gender: data.gender,
                    username: data.username,
                    tel: data.tel,
                    avatar: data.avatar,
                    delivery_info_list: data.delivery_info_list,
                    balance: data.balance,
                    default_delivery_address_id: data.default_delivery_address_id
                },
                status: 200
            })
        } else {
            res.json({
                status: 201,
                msg: '用户不存在！'
            })
        }
    }).catch(err => {
        if (err) {
            res.json({
                status: 201,
                msg: '用户不存在！'
            })
        }
    })
})

// 修改用户头像
router.post('/api/private/alteravatar', (req, res) => {
    let {
        user_id,
        avatar
    } = req.body
    User.findByIdAndUpdate(user_id, {
        avatar
    }).then(() => {
        res.json({
            msg: '修改头像成功！',
            status: 200
        })
    })
})

// 修改密码
router.post('/api/private/alterpassword', (req, res) => {
    let {
        id,
        passwordForm: {
            original_password,
            new_password
        }
    } = req.body
    let password = new_password
    // 密码校验
    let passwordReg1 = /\s/g
    let passwordReg2 = /[^\x00-\xff]/g
    if (password.length < 8 || password.length > 30) {
        // 密码长度 8-30
        res.json({
            msg: '密码长度必需控制在8-30个字符之间！',
            status: 201
        })
    } else if (passwordReg1.test(password) || passwordReg2.test(password)) {
        res.json({
            msg: '密码含有非法字符！',
            status: 201
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
                msg: '密码强度太低(密码中必需含有字母、数字、特殊符号的两种以上！)',
                status: 201
            })
        } else {
            password = md5(md5(original_password + SECRECYSTRING) + SECRECYSTRING)
            new_password = md5(md5(new_password + SECRECYSTRING) + SECRECYSTRING)
            User.findById(id).then(data => {
                if (data.password !== password) {
                    res.json({
                        msg: '原密码输入不正确！',
                        status: 201
                    })
                } else {
                    User.findByIdAndUpdate(id, {
                        password: new_password
                    }).then(() => {
                        res.json({
                            msg: '修改密码成功！',
                            status: 200
                        })
                    })
                }
            })
        }
    }
})

// 根据用户id保存收货地址
router.post('/api/private/savedeliveryinfo', (req, res) => {
    let {
        id,
        delivery_info
    } = req.body
    let telReg = /^1((3[0-9])|(4(1|[4-9]))|(5[5-9])|(6(2|[5-7]))|(7([0-3]|[5-8]))|(8[0-9])|(9[189]))[0-9]{8}$/
    if (!telReg.test(delivery_info.phone)) {
        // 手机号码校验 (/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
        res.json({
            msg: '手机号格式输入错误(必需要11位数，禁止含有除数字外其他字符)！',
            status: 201
        })
    } else {
        User.findById(id).then(data => {
            if (!data) {
                res.json({
                    msg: '用户不存在！',
                    status: 201
                })
            } else {
                new Delivery({
                    user_id: id,
                    name: delivery_info.name,
                    phone: delivery_info.phone,
                    address_front: delivery_info.address_front,
                    address_after: delivery_info.address_after,
                    address_list_id: delivery_info.address_list_id
                }).save(() => {
                    res.json({
                        msg: '保存成功！',
                        status: 200
                    })
                })
            }
        })
    }
})

// 根据id 获取收货地址列表
router.get('/api/private/deliveryinfolist', (req, res) => {
    let user_id = req.query.user_id
    Delivery.find({
        user_id
    }).then(data => {
        res.json({
            addressList: data,
            status: 200,
            msg: '数据获取成功！'
        })
    })
})

// 根据用户id修改收货地址
router.post('/api/private/alterdeliveryinfo', (req, res) => {
    let {
        id,
        delivery_info
    } = req.body
    let telReg = /^1((3[0-9])|(4(1|[4-9]))|(5[5-9])|(6(2|[5-7]))|(7([0-3]|[5-8]))|(8[0-9])|(9[189]))[0-9]{8}$/
    if (!telReg.test(delivery_info.phone)) {
        // 手机号码校验 (/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
        res.json({
            msg: '手机号格式输入错误(必需要11位数，禁止含有除数字外其他字符)！',
            status: 201
        })
    } else {
        Delivery.findByIdAndUpdate(id, {
            name: delivery_info.name,
            phone: delivery_info.phone,
            address_front: delivery_info.address_front,
            address_after: delivery_info.address_after,
            address_list_id: delivery_info.address_list_id
        }).then(() => {
            res.json({
                msg: '修改成功！',
                status: 200
            })
        })
    }
})

// 删除地址
router.get('/api/private/deletedeliveryInfo', (req, res) => {
    let id = req.query.id
    Delivery.findByIdAndRemove(id).then(() => {
        res.json({
            msg: '删除成功！',
            status: 200
        })
    })
})

// 设置默认地址
router.get('/api/private/setdefault', (req, res) => {
    let {
        user_id,
        address_id
    } = req.query
    User.findByIdAndUpdate(user_id, {
        default_delivery_address_id: address_id
    }).then(() => {
        res.json({
            msg: '设为默认成功！',
            status: 200
        })
    })
})

// 保存个人信息
router.post('/api/private/saveuserinfo', (req, res) => {
    let {
        id,
        userinfo: {
            name,
            email,
            gender,
            tel,
            avatar
        }
    } = req.body
    let telReg = /^1((3[0-9])|(4(1|[4-9]))|(5[5-9])|(6(2|[5-7]))|(7([0-3]|[5-8]))|(8[0-9])|(9[189]))[0-9]{8}$/
    // 邮箱校验 ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
    // 只允许英文字母、数字、下划线、英文句号、以及中划线组成
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

    if (tel.trim() === '' || !telReg.test(tel)) {
        // 手机号码校验 (/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
        res.json({
            msg: '手机号输入错误(必需要11位数，禁止含有除数字外其他字符)！',
            status: 201
        })
    } else if (email.trim() !== '' && !emailReg.test(email)) {
        res.json({
            msg: '邮箱输入不规范！',
            status: 201
        })
    } else {
        User.findById(id).then(data => {
            if (!data) {
                res.json({
                    status: 201,
                    msg: '用户ID不存在！'
                })
            } else if (data.tel === tel) {
                User.findByIdAndUpdate(id, {
                    name,
                    email,
                    gender,
                    tel,
                    avatar
                }).then(() => {
                    res.json({
                        msg: '保存成功！',
                        status: 200
                    })
                })
            } else {
                User.findOne({
                    tel
                }).then(result => {
                    if (result) {
                        res.json({
                            msg: '手机号已经被注册！',
                            status: 201
                        })
                    } else {
                        User.findByIdAndUpdate(id, {
                            name,
                            email,
                            gender,
                            tel,
                            avatar
                        }).then(() => {
                            res.json({
                                msg: '保存成功！',
                                status: 200
                            })
                        })
                    }
                })
            }
        })
    }
})

// 校验用户名
router.get('/api/private/checkusername', (req, res) => {
    let username = req.query.username
    if (username[0] === '1') {
        res.json({
            data: {},
            meta: {
                msg: '用户名首位禁止为数字 1！',
                status: 201
            }
        })
    } else if (username.length > 12) {
        res.json({
            data: {},
            meta: {
                msg: '用户名太长,要12字以内！',
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
    } else {
        User.findOne({
            username
        }).then(data => {
            if (data) {
                res.json({
                    msg: '用户名已经被注册！',
                    status: 201
                })
            } else {
                res.json({
                    msg: 'success!',
                    status: 200
                })
            }
        })
    }

})

// 校验手机号
router.get('/api/private/checkphone', (req, res) => {
    let tel = req.query.tel
    let id = req.query.id || ''
    let telReg = /^1((3[0-9])|(4(1|[4-9]))|(5[5-9])|(6(2|[5-7]))|(7([0-3]|[5-8]))|(8[0-9])|(9[189]))[0-9]{8}$/
    if (!telReg.test(tel)) {
        // 手机号码校验 (/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
        res.json({
            msg: '手机号格式输入错误(必需要11位数，禁止含有除数字外其他字符)！',
            status: 201
        })
    } else {
        if (id && tel) {
            User.findById(id).then(data => {
                if (data.tel !== tel) {
                    User.findOne({
                        tel
                    }).then(data => {
                        if (data) {
                            res.json({
                                msg: '手机号已经被注册！',
                                status: 201
                            })
                        }
                    })
                } else {
                    res.json({
                        msg: 'success!',
                        status: 200
                    })
                }
            })
        } else if (tel) {
            User.findOne({
                tel
            }).then(data => {
                if (data) {
                    res.json({
                        msg: '手机号已经被注册！',
                        status: 201
                    })
                } else {
                    res.json({
                        msg: 'success!',
                        status: 200
                    })
                }
            })
        }
    }
})

// 校验邮箱
router.get('/api/private/checkemail', (req, res) => {
    let email = req.query.email
    // 邮箱校验 ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
    // 只允许英文字母、数字、下划线、英文句号、以及中划线组成
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (email.trim() !== '' && !emailReg.test(email)) {
        res.json({
            msg: '邮箱输入不规范！',
            status: 201
        })
    } else {
        res.json({
            msg: 'success!',
            status: 200
        })
    }
})


/**
 * **************************************************
 * 商品相关功能接口
 * **************************************************
 */
// 根据id获取商品数据
router.get('/api/private/goodsdetails', (req, res) => {
    Goods.findById(req.query.goods_id).then(data => {
        if (data) {
            res.json({
                goodsData: data,
                msg: 'success!',
                status: 200
            })
        } else {
            res.json({
                msg: '商品ID不存在',
                status: 201
            })
        }
    })
})

// 获取热销商品数据
router.get('/api/private/hotsalesgoods', (req, res) => {
    Goods.find({
            is_delete: 0,
            is_sale: 1
        })
        .sort({
            total_sales: -1
        })
        .limit(30)
        .then(goods => {
            res.json({
                goodsList: goods,
                msg: 'success!',
                status: 200
            })
        })
})

// 获取分类商品推荐列表
router.get('/api/private/recommendgoods', (req, res) => {
    let goodsList = []
    Goods.find({
            classification: '手机',
            is_delete: 0,
            is_sale: 1
        })
        .sort({
            created_time: -1
        })
        .limit(10)
        .then(goods1 => {
            goodsList.push({
                title: '手机',
                goods_list: goods1
            })
            Goods.find({
                    classification: '笔记本',
                    is_delete: 0,
                    is_sale: 1
                })
                .sort({
                    created_time: -1
                })
                .limit(10)
                .then(goods2 => {
                    goodsList.push({
                        title: '笔记本',
                        goods_list: goods2
                    })
                    Goods.find({
                            classification: '平板电脑',
                            is_delete: 0,
                            is_sale: 1
                        })
                        .sort({
                            created_time: -1
                        })
                        .limit(10)
                        .then(goods3 => {
                            goodsList.push({
                                title: '平板电脑',
                                goods_list: goods3
                            })
                            res.json({
                                goodsList,
                                msg: 'success!',
                                status: 200
                            })
                        })
                })
        })
})

// 商品搜索
router.get('/api/private/searchgoods', (req, res) => {
    let {
        classification,
        query,
        sort
    } = req.query
    const reg = new RegExp(query, 'i')
    let sortDirection = -1
    if (!sort) {
        sort = 'total_sales'
    } else if (sort.toLowerCase() === 'createdtime' || sort.toLowerCase() === 'created_time') {
        sort = 'created_time'
    } else if (sort.toLowerCase() === 'priceup' || sort.toLowerCase() === 'price_up') {
        sort = 'price'
        sortDirection = 1
    } else if (sort.toLowerCase() === 'pricedown' || sort.toLowerCase() === 'price_down') {
        sort = 'price'
        sortDirection = -1
    } else {
        sort = 'total_sales'
    }

    if (classification) {
        Goods.find({
                classification,
                is_delete: 0,
                is_sale: 1,
                $or: [{
                    goods_name: {
                        $regex: reg
                    }
                }, {
                    describe: {
                        $regex: reg
                    }
                }, {
                    classification: {
                        $regex: reg
                    }
                }]
            })
            .sort({
                [sort]: sortDirection
            })
            .then(data => {
                res.json({
                    goodsList: data,
                    msg: 'success!',
                    status: 200
                })
            })
    } else {
        Goods.find({
                is_delete: 0,
                is_sale: 1,
                $or: [{
                    goods_name: {
                        $regex: reg
                    }
                }, {
                    describe: {
                        $regex: reg
                    }
                }, {
                    classification: {
                        $regex: reg
                    }
                }]
            })
            .sort({
                [sort]: sortDirection
            })
            .then(data => {
                res.json({
                    goodsList: data,
                    msg: 'success!',
                    status: 200
                })
            })
    }

})

/**
 * **************************************************
 * 购物车相关功能接口
 * **************************************************
 */

// 将商品添加至购物车
router.get('/api/private/addgoods/tocar', (req, res) => {
    let {
        user_id,
        goods_id,
        goods_attribute,
        number
    } = req.query
    number = Number(number)

    // 判断用户是否存在
    User.findById(user_id).then(user => {
        if (user) {
            // 判断商品是否存在
            Goods.findById(goods_id).then(goods => {
                if (goods) {
                    // 判断商品库存是否足够
                    if (number > Number(goods.goods_number)) {
                        return res.json({
                            msg: '商品库存不足！',
                            status: 201
                        })
                    }
                    // 判断该商品是否存在该用户的购物车列表中
                    Shopcar.findOne({
                        user_id,
                        goods_id,
                        goods_attribute
                    }).then(item => {
                        if (item) {
                            // 判断商品库存是否足够
                            if (Number(item.number) + number > Number(goods.goods_number)) {
                                return res.json({
                                    msg: '商品库存不足！',
                                    status: 201
                                })
                            }
                            // 如果存在就增加购物车列表里商品的数量
                            Shopcar.findOneAndUpdate({
                                user_id,
                                goods_id,
                                goods_attribute
                            }, {
                                number: Number(item.number) + number
                            }).then(() => {
                                res.json({
                                    msg: 'success!',
                                    status: 200
                                })
                            })
                        } else {
                            // 如果不存在就添加至购物车列表
                            new Shopcar({
                                user_id,
                                goods_id,
                                goods_attribute,
                                number
                            }).save().then(() => {
                                res.json({
                                    msg: 'success!',
                                    status: 200
                                })
                            })
                        }
                    })
                } else {
                    res.json({
                        msg: '商品不存在！',
                        status: 201
                    })
                }
            })
        } else {
            res.json({
                msg: '用户ID错误！',
                status: 201
            })
        }
    })
})

// 获取用户购物车列表
router.get('/api/private/getgoodscarlist', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    let {
        user_id,
        page_size,
        data_number
    } = req.query

    // 判断用户是否存在
    User.findById(user_id).then(user => {
        if (user) {
            Shopcar.count({
                user_id
            }).then(num => {
                // 获取商品图片列表、名称、描述、单价、折扣价、原价、_id
                Shopcar.find({
                        user_id
                    })
                    .skip(parseInt((page_size - 1) * data_number))
                    .limit(parseInt(data_number))
                    .sort({
                        last_modify_time: -1
                    })
                    .exec()
                    .then(shop => {
                        let asyncArr = []
                        shop.forEach(item => {
                            asyncArr.push(
                                new Promise((resolve, reject) => {
                                    Goods.findById(
                                            item.goods_id
                                        )
                                        .then(goods => {
                                            resolve({
                                                id: item._id,
                                                goods_id: goods._id,
                                                goods_name: goods.goods_name,
                                                describe: goods.describe,
                                                price: goods.price,
                                                img_list: goods.img_list,
                                                goods_number: goods.goods_number,
                                                classification: goods.classification,
                                                original_price: goods.original_price,
                                                discount_price: goods.discount_price,
                                                is_delete: goods.is_delete,
                                                is_sale: goods.is_sale,
                                                number: item.number,
                                                goods_attribute: item.goods_attribute,
                                                created_time: item.created_time,
                                                last_modify_time: item.last_modify_time,
                                                goods_info: {
                                                    img: goods.img_list[0],
                                                    name: goods.goods_name
                                                }
                                            })
                                        }).catch(err => {
                                            if (err) {
                                                reject(err)
                                            }
                                        })
                                })
                            )
                        })

                        Promise.all(asyncArr).then(result => {
                            let goodsData = result.sort((a, b) => {
                                return b.last_modify_time - a.last_modify_time
                            })
                            res.json({
                                totalGoods: num,
                                goodsList: goodsData,
                                msg: 'success!',
                                status: 200
                            })
                        })
                    })
            })


        } else {
            res.json({
                msg: '用户未登录，或登录信息已过期！',
                status: 201
            })
        }
    })
})

// 删除用户购物车商品
router.get('/api/private/deletegoods/fromcar', (req, res) => {
    Shopcar.findByIdAndDelete(req.query.id).then(() => {
        res.json({
            msg: 'success!',
            status: 200
        })
    })
})

// 修改购物车商品数量
router.get('/api/private/changenumber', (req, res) => {
    Shopcar.findByIdAndUpdate(req.query.id, {
        number: req.query.number
    }).then(() => {
        res.json({
            msg: 'success!',
            status: 200
        })
    })
})

/**
 * **************************************************
 * 订单相关功能接口
 * **************************************************
 */

// 创建订单
router.post('/api/private/setuporder', (req, res) => {
    let {
        user_id,
        goods_list,
        delivery
    } = req.body
    let asyncArray1 = []

    // 查询商品余量、单价、总价
    goods_list.forEach(item => {
        asyncArray1.push(
            new Promise((resolve, reject) => {
                Goods.findById(item.goods_id).then(data => {
                    if (data.is_delete === 1 || data.is_sale === 0) {
                        reject('商品已经失效！')
                    } else {
                        resolve({
                            goods_id: data._id,
                            goods_name: data.goods_name,
                            goods_number: data.goods_number,
                            price: data.price,
                            flag: data.goods_number >= item.number,
                            total_price: data.price * item.number
                        })
                    }
                })
            })
        )
    })

    Promise.all(asyncArray1).then(result => {
        let flag = true
        let totalPrice = 0
        let mygoods = []
        result.forEach((item, index1) => {
            totalPrice += item.total_price
            if (!item.flag) {
                flag = false
            }
            let myIndex = -1
            mygoods.forEach((goods, index2) => {
                if (goods.goods_id.toString() === item.goods_id.toString()) {
                    myIndex = index2
                }
            })
            if (myIndex === -1) {
                mygoods.push({
                    goods_id: item.goods_id,
                    number: goods_list[index1].number
                })
            } else {
                mygoods[myIndex].number += goods_list[index1].number
            }
        })

        if (!flag) {
            res.json({
                msg: '商品库存不足',
                status: 202
            })
        } else {
            let asyncArray2 = []
            mygoods.forEach(item => {
                asyncArray2.push(
                    new Promise((resolve, reject) => {
                        Goods.findById(item.goods_id).then(goods => {
                            if (goods.goods_number < item.number) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                    })
                )
            })

            Promise.all(asyncArray2).then(result1 => {
                let flag = true
                result1.forEach(item => {
                    if (!item) {
                        flag = false
                    }
                })

                if (!flag) {
                    res.json({
                        msg: '商品库存不足',
                        status: 202
                    })
                } else {
                    User.findById(user_id).then(user => {
                        if (user.balance < totalPrice) {
                            res.json({
                                msg: '您的余额不足！',
                                status: 201
                            })
                        } else {
                            let asyncArray3 = []
                            let date = new Date()
                            goods_list.forEach((goods, index) => {
                                asyncArray3.push(
                                    new Promise((resolve, reject) => {
                                        // 查询商品数量和商品销量
                                        Goods.findById(goods.goods_id).then(data => {
                                            let goods_number = data.goods_number - goods.number
                                            let total_sales = data.total_sales + goods.number
                                            // 商品数量减少、销量增加
                                            Goods.findByIdAndUpdate(goods.goods_id, {
                                                goods_number,
                                                total_sales
                                            }).then(() => {
                                                // 查询用户余额
                                                User.findById(user_id).then(user => {
                                                    let balance = user.balance - (goods.number * data.price)
                                                    // 修改用户余额
                                                    User.findByIdAndUpdate(user_id, {
                                                        balance
                                                    }).then(() => {
                                                        // 创建订单
                                                        new Order({
                                                            user_id,
                                                            goods_id: goods.goods_id,
                                                            goods_attribute: goods.goods_attribute,
                                                            number: goods.number,
                                                            price: result[index].price,
                                                            total_price: result[index].total_price,
                                                            created_time: date,
                                                            delivery: delivery,
                                                            // 用户订单的数据需要保留购买时商品的内容
                                                            goods_info: {
                                                                goods_name: data.goods_name,
                                                                img_list: data.img_list,
                                                                describe: data.describe,
                                                                price: data.price,
                                                                discount_price: data.discount_price,
                                                                original_price: data.original_price
                                                            }
                                                        }).save().then(() => {
                                                            // 删除购物车数据
                                                            if (goods.car_id) {
                                                                Shopcar.findByIdAndDelete(goods.car_id).then(() => {
                                                                    resolve()
                                                                })
                                                            } else {
                                                                resolve()
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                )
                            })

                            Promise.all(asyncArray3).then(data => {
                                res.json({
                                    msg: 'success!',
                                    status: 200
                                })
                            })
                        }
                    })
                }
            })
        }
    }).catch(err => {
        if (err) {
            res.json({
                msg: '购买失败，商品已经失效！',
                status: 202
            })
        }
    })
})

// 获取订单列表
router.get('/api/private/order', (req, res) => {
    // page_size: 页码
    // data_number: 数据条数
    let {
        user_id,
        page_size,
        data_number
    } = req.query
    // 判断用户是否存在
    User.findById(user_id).then(user => {
        if (user) {
            Order.count({
                user_id,
                is_delete: 0
            }).then(num => {
                Order.find({
                        user_id,
                        is_delete: 0
                    })
                    .skip(parseInt((page_size - 1) * data_number))
                    .limit(parseInt(data_number))
                    .sort({
                        created_time: -1
                    })
                    .exec()
                    .then(order => {
                        res.json({
                            totalGoods: num,
                            msg: 'success!',
                            status: 200,
                            orderList: order
                        })
                    })
            })
        } else {
            res.json({
                msg: '用户未登录，或登录信息已过期！',
                status: 201
            })
        }
    })
})

// 删除订单
router.get('/api/private/delete/order/byid', (req, res) => {
    Order.findByIdAndUpdate(req.query.id, {
        is_delete: 1
    }).then(() => {
        res.json({
            msg: 'success!',
            status: 200
        })
    })
})

/**
 * **************************************************
 * 用户地址相关功能接口
 * **************************************************
 */

// 获取用户默认收货地址
router.get('/api/private/user/default/address', (req, res) => {
    let id = req.query.user_id
    User.findById(id).then(user => {
        if (user) {
            let default_delivery_address_id = user.default_delivery_address_id
            if (!default_delivery_address_id) {
                return res.json({
                    addressInfo: null,
                    msg: '该用户尚未设置默认地址！',
                    status: 200
                })
            }
            Delivery.findById(default_delivery_address_id).then(data => {
                res.json({
                    addressInfo: data,
                    msg: 'success!',
                    status: 200
                })
            })
        } else {
            res.json({
                msg: '用户ID错误！',
                status: 201
            })
        }
    })
})

/**
 * **************************************************
 * 商品评论相关功能接口
 * **************************************************
 */

// 用户提交评论
router.post('/api/private/make/comment', (req, res) => {
    let {
        user_id,
        goods_id,
        goods_attribute,
        comments: {
            text,
            stars,
            img_list
        }
    } = req.body
    let COMMENTIMGDIR = `uploads/comments/${goods_id}/`
    // 创建目录
    fs.mkdir(`./${COMMENTIMGDIR}`, {
        recursive: true
    }, err => {
        if (err) {
            throw err
        }
    })
    User.findById(user_id).then(user => {
        if (user.limit === 1) {
            Comment.find({
                user_id,
                goods_id
            }).then(comment => {
                let asyncArray = []
                // 遍历文件列表，将临时保存的评论图片复制到永久保存的目录去
                img_list.forEach((item, index) => {
                    let path = item
                    let newPath = `${COMMENTIMGDIR}${path.split('\\')[1]}`
                    asyncArray.push(
                        new Promise((reslove, reject) => {
                            fs.copyFile(path, `./${newPath}`, err => {
                                if (err) {
                                    reject(err)
                                } else {
                                    img_list[index] = `http://127.0.0.1:3002/${newPath}`
                                    reslove(img_list[index])
                                }
                            })
                        })
                    )
                })

                if (asyncArray.length > 0) {
                    Promise.all(asyncArray).then(result => {
                        new Comment({
                            user_id,
                            goods_id,
                            goods_attribute,
                            text,
                            stars,
                            has_img: 1,
                            img_list: result
                        }).save().then(() => {
                            res.json({
                                msg: 'success!',
                                status: 200
                            })
                        })
                    })
                } else {
                    new Comment({
                        user_id,
                        goods_id,
                        goods_attribute,
                        text,
                        stars
                    }).save().then(() => {
                        res.json({
                            msg: 'success!',
                            status: 200
                        })
                    })
                }
            })
        } else if (user.limit === -1) {
            res.json({
                msg: '您已被禁止评论！',
                status: 201
            })
        } else {
            res.json({
                msg: '登录信息过期或该用户不存在！',
                status: 201
            })
        }
    })
})

// 获取评论导航
router.get('/api/private/commentnav', (req, res) => {
    let goods_id = req.query.id
    let commentNav = []
    Comment.count({
            goods_id,
            is_delete: 0
        })
        .then(num1 => {
            commentNav.push({
                name: '全部',
                value: 'totalComment',
                number: num1
            })
            return Comment.count({
                goods_id,
                is_delete: 0,
                stars: 5
            })
        })
        .then(num2 => {
            commentNav.push({
                name: '五星好评',
                value: 'goodCommentNum',
                number: num2
            })
            return Comment.count({
                goods_id,
                is_delete: 0,
                has_img: 1
            })
        })
        .then(num3 => {
            commentNav.push({
                name: '有图',
                value: 'hasImgCommentNum',
                number: num3
            })
            return Comment.count({
                goods_id,
                is_delete: 0,
                stars: {
                    "$lte": 2
                }
            })
        })
        .then(num4 => {
            commentNav.push({
                name: '差评',
                value: 'negativeCommentNum',
                number: num4
            })
            res.json({
                commentNav,
                msg: 'success!',
                status: 200
            })
        })
})

// 获取商品评论
router.get('/api/private/get/comment', (req, res) => {
    let id = req.query.id
    let sort = req.query.sort
    if (sort === '五星好评') {
        Comment.find({
            goods_id: id,
            is_delete: 0,
            stars: 5
        }).then(data => {
            let asyncArray = []
            data.forEach(item => {
                asyncArray.push(
                    new Promise((resolve, reject) => {
                        User.findById(item.user_id).then(user => {
                            resolve({
                                comment: item,
                                user: {
                                    name: user.name,
                                    avatar: user.avatar
                                }
                            })
                        })
                    })
                )
            })

            Promise.all(asyncArray).then(result => {
                res.json({
                    commentList: result,
                    msg: 'success!',
                    status: 200
                })
            })
        })
    } else if (sort === '有图') {
        Comment.find({
            goods_id: id,
            is_delete: 0,
            has_img: 1
        }).then(data => {
            let asyncArray = []
            data.forEach(item => {
                asyncArray.push(
                    new Promise((resolve, reject) => {
                        User.findById(item.user_id).then(user => {
                            resolve({
                                comment: item,
                                user: {
                                    name: user.name,
                                    avatar: user.avatar
                                }
                            })
                        })
                    })
                )
            })

            Promise.all(asyncArray).then(result => {
                res.json({
                    commentList: result,
                    msg: 'success!',
                    status: 200
                })
            })
        })
    } else if (sort === '差评') {
        Comment.find({
            goods_id: id,
            is_delete: 0,
            stars: {
                "$lte": 2
            }
        }).then(data => {
            let asyncArray = []
            data.forEach(item => {
                asyncArray.push(
                    new Promise((resolve, reject) => {
                        User.findById(item.user_id).then(user => {
                            resolve({
                                comment: item,
                                user: {
                                    name: user.name,
                                    avatar: user.avatar
                                }
                            })
                        })
                    })
                )
            })

            Promise.all(asyncArray).then(result => {
                res.json({
                    commentList: result,
                    msg: 'success!',
                    status: 200
                })
            })
        })
    } else {
        Comment.find({
            goods_id: id,
            is_delete: 0
        }).then(data => {
            let asyncArray = []
            data.forEach(item => {
                asyncArray.push(
                    new Promise((resolve, reject) => {
                        User.findById(item.user_id).then(user => {
                            resolve({
                                comment: item,
                                user: {
                                    name: user.name,
                                    avatar: user.avatar
                                }
                            })
                        })
                    })
                )
            })

            Promise.all(asyncArray).then(result => {
                res.json({
                    commentList: result,
                    msg: 'success!',
                    status: 200
                })
            })
        })
    }
})

// 导出路由模块
module.exports = router