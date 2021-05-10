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
            prefix-icon="iconfont iconyonghuming"
            placeholder="用户名"
          ></el-input>

          <!-- 密码 -->
          <el-input
            class="item"
            type="password"
            show-password
            clearable
            v-model="form.password1"
            prefix-icon="iconfont iconmima"
            placeholder="密码"
          ></el-input>

          <!-- 确认密码 -->
          <el-input
            class="item"
            type="password"
            show-password
            clearable
            v-model="form.password2"
            prefix-icon="iconfont iconmima"
            placeholder="再次输入密码"
          ></el-input>

          <!-- 电话 -->
          <el-input
            class="item"
            v-model="form.tel"
            clearable
            prefix-icon="iconfont icondianhua"
            placeholder="电话"
          ></el-input>

          <!-- 邮箱 -->
          <el-input
            class="item"
            v-model="form.email"
            clearable
            prefix-icon="iconfont icontubiao209"
            placeholder="邮箱"
          ></el-input>

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
        password1: '',
        password2: '',
        tel: '',
        email: ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    toRegister () {
      if (this.form.username.trim() === '') {
        this.$message.error('用户名不能为空！')
      } else if (this.form.username.trim().indexOf(' ') !== -1) {
        this.$message.error('用户名不能含有空白字符！')
      } else if (this.form.password1.trim() === '') {
        this.$message.error('密码不能为空！')
      } else if (this.form.password1.trim().indexOf(' ') !== -1) {
        this.$message.error('密码不能含有空白字符！')
      } else if (this.form.password1 !== this.form.password2) {
        this.$message.error('两次输入密码不一致！')
      } else {
        console.log('注册成功！')
      }
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
            color: #fff;
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
