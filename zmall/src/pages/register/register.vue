<template>
  <div class="register">
    <div class="content xmf-flex">
      <div class="register-container">
        <div class="register-img xmf-flex">
          <el-image
            fit="cover"
            src="../../../static/image/register/register.png"
          ></el-image>
        </div>

        <!-- 注册表单 -->
        <div class="register-form">
          <!-- 用户名 -->
          <el-input
            class="item"
            v-model="form.username"
            clearable
            maxlength="10"
            required
            prefix-icon="iconfont iconyonghuming"
            placeholder="用户名"
          ></el-input>

          <!-- 密码 -->
          <el-input
            class="item"
            type="password"
            show-password
            clearable
            required
            maxlength="30"
            v-model="form.password"
            prefix-icon="iconfont iconmima"
            placeholder="密码"
          ></el-input>

          <!-- 确认密码 -->
          <el-input
            class="item"
            type="password"
            show-password
            clearable
            required
            maxlength="30"
            v-model="form.password2"
            prefix-icon="iconfont iconmima"
            placeholder="再次输入密码"
          ></el-input>

          <!-- 手机 -->
          <el-input
            class="item"
            v-model="form.tel"
            clearable
            maxlength="11"
            required
            prefix-icon="iconfont icondianhua"
            placeholder="手机号码"
          ></el-input>

          <!-- 验证码 -->
          <div class="code">
            <el-input
              class="code-input"
              v-model="form.code"
              required
              maxlength="4"
              placeholder="验证码"
            ></el-input>
            <div class="code-contain" @click="getCode">
              <el-image
                fit="cover"
                :src="codeImgUrl"
              ></el-image>
            </div>
          </div>

          <el-button class="register-btn" @click="toRegister">注 册</el-button>
        </div>

        <div class="bottom">
          <router-link to="login">前往登录</router-link>
          <router-link to="/">去首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        password2: '',
        tel: '',
        code: ''
      },
      codeImgUrl: 'http://127.0.0.1:3002/api/private/get/identifying-code'
    }
  },
  created () {
    this.getCode()
  },
  mounted () {},
  methods: {
    // 前往注册
    toRegister () {
      if (this.form.username.trim() === '') {
        this.$message.error('用户名不能为空！')
      } else if (this.form.username.trim().indexOf(' ') !== -1) {
        this.$message.error('用户名不能含有空白字符！')
      } else if (this.form.password.trim() === '') {
        this.$message.error('密码不能为空！')
      } else if (this.form.password.trim().indexOf(' ') !== -1) {
        this.$message.error('密码不能含有空白字符！')
      } else if (this.form.password2.trim() === '') {
        this.$message.error('请再次输入密码！')
      } else if (this.form.password !== this.form.password2) {
        this.$message.error('两次输入密码不一致！')
      } else if (this.form.tel.trim() === '') {
        this.$message.error('手机号码不能为空！')
      } else if (this.form.code.trim() === '') {
        this.$message.error('请输入验证码！')
      } else {
        // 这里应该写校验信息的，可以减少后台请求，降低服务器压力
        // 但是后台也写好了，这里为了减少代码了所以没写
        this.$axios.post('/register', this.form).then(res => {
          let {
            meta: { status, msg }
          } = res.data

          if (status === 200) {
            this.$message.success('注册成功，自动跳转至登录页面。')
            this.$router.push({ name: 'login' })
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
    }
  }
}
</script>

<style lang="less">
.register {
  height: 100%;
  width: 100%;
  background-image: url('../../../static/image/register/background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    height: 100%;
    width: 100%;

    .register-container {
      border: 1px solid #fff;
      border-radius: 20px;
      padding: 10px 20px;
      width: 420px;

      .register-img {
        padding: 10px 0 30px 0;
        img {
          width: 200px;
        }
      }

      .register-form {
        .item {
          margin-bottom: 20px;
          border-radius: 20px;

          ::-webkit-input-placeholder {
            color: rgb(182, 174, 174);
          }

          .el-input__inner {
            border-radius: 20px;
            padding-left: 36px;
            background-color: transparent;
            color: #fff;
            border: 1px solid #fff;
          }

          .el-input__prefix {
            padding: 0 8px;
            i {
              color: #fff;
            }
          }
        }

        .code {
          display: flex;
          margin-bottom: 20px;

          .code-input {
            margin-right: 10px;
            input {
              background-color: transparent;
              color: #fff;
              border: 1px solid #fff;
            }
          }

          .code-contain {
            width: 120px;
            height: 40px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
          }
        }

        .register-btn {
          width: 100%;
          border-radius: 20px;
          padding: 14px 0;
          font-size: 16px;

          span {
            font-weight: 900;
          }
        }
      }

      .bottom {
        display: flex;
        padding: 30px 20px 10px 20px;
        justify-content: space-between;

        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
