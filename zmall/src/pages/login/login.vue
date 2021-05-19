<template>
  <div class="login xmf-flex">
    <!-- 返回首页 -->
    <xmf-to-home></xmf-to-home>

    <!-- 登录区域 -->
    <el-card class="login-card">
      <div class="top">
        <div class="login-img">
          <el-image
            src="../../../static/image/login/bg-01.jpg"
            alt=""
            fit="cover"
          ></el-image>
        </div>
        <div class="title xmf-flex fzzj">登 录</div>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">
        <el-form label-position="right" label-width="80px" :model="form">
          <el-form-item label="用户名" class="username">
            <el-input
              v-model="form.username"
              clearable
              required
              maxlength="12"
              placeholder="请输入用户名/手机号码"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" class="password">
            <el-input
              type="password"
              show-password
              clearable
              maxlength="30"
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="验证码" class="code">
            <el-input
              class="code-input"
              v-model="form.code"
              required
              maxlength="4"
              placeholder="验证码"
            ></el-input>
            <div class="code-contain" @click="getCode">
              <el-image fit="cover" :src="codeImgUrl" @load="yzm"></el-image>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录按钮 -->
      <div class="login-btn">
        <el-row class="xmf-flex">
          <el-button class="register-btn" type="warning">
            <router-link to="/register">去注册</router-link>
          </el-button>
          <el-button type="success" @click="toLogin">立即登录</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import xmfToHome from '../../components/toHome/toHome'
export default {
  data () {
    return {
      form: {
        username: '小庄',
        password: '123456aaa',
        code: ''
      },
      codeImgUrl: 'http://127.0.0.1:3002/api/private/get/identifying-code'
    }
  },
  created () {
    this.getCode()
  },
  mounted () {},

  components: {
    xmfToHome
  },

  methods: {
    // 去登录
    toLogin () {
      if (this.form.username.trim() === '') {
        this.$message.error('用户名/手机号码不能为空！')
      } else if (this.form.password.trim() === '') {
        this.$message.error('密码不能为空！')
      } else if (this.form.code.trim() === '') {
        this.$message.error('请填写验证码！')
      } else {
        let yzm = this.$mycookie.get('captcha')
        if (this.form.code !== yzm) {
          this.$message.error('验证码错误！')
          this.getCode()
          return
        }
        this.$axios.post('/login', this.form).then(res => {
          let {
            data,
            meta: { status, msg }
          } = res.data

          if (status === 200) {
            this.$mycookie.set(
              'loginInfo',
              JSON.stringify(data.loginInfo),
              3 * 60 * 60
            )
            this.$message({
              type: 'success',
              message: '登录成功，自动跳转至首页。',
              offset: 80
            })
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error(msg)
            this.getCode()
          }
        })
      }
    },

    // 获取验证码
    getCode () {
      this.codeImgUrl =
        'http://127.0.0.1:3002/api/private/get/identifying-code?' + new Date()
    },

    yzm () {
      this.$axios.get('/yzm').then(res => {
        this.$mycookie.set('captcha', res.data.yzm)
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background-color: #ebeeef;
  height: 100%;

  .login-card {
    width: 600px;
  }

  .top {
    position: relative;

    .login-img {
      opacity: 0.5;
    }

    .title {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 60px;
      height: 160px;
      width: 100%;
      color: rgb(230, 241, 132);
      font-weight: 900;
    }
  }

  .login-form {
    margin: 50px 0;

    .code {
      .el-form-item__content {
        display: flex;
      }

      .code-contain {
        margin-left: 10px;
        width: 120px;
        height: 40px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }

  .login-btn {
    .register-btn {
      margin-left: 50px;
    }

    a {
      color: #fff;
    }
  }
}
</style>
