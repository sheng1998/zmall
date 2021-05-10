<template>
  <div class="login xmf-flex">
    <el-card class="login-card">
      <div class="top">
        <div class="login-img">
          <el-image
            src="../../../static/image/login/bg-01.jpg"
            alt=""
            fit="cover"
          ></el-image>
        </div>
        <div class="title xmf-flex">登 录</div>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">
        <el-form label-position="right" label-width="80px" :model="form">
          <el-form-item label="用户名" class="username">
            <el-input
              v-model="form.username"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" class="password">
            <el-input
              type="password"
              show-password
              clearable
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录按钮 -->
      <div class="login-btn">
        <el-row class="xmf-flex">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button class="register-btn" type="warning">
            <router-link to="/register">注册</router-link>
          </el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    toLogin () {
      if (this.form.username.trim() === '') {
        this.$message.error('用户名不能为空！')
      } else if (this.form.password.trim() === '') {
        this.$message.error('密码不能为空！')
      } else {
        console.log('登录成功！')
      }
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
      font-size: 30px;
      height: 160px;
      width: 100%;
      color: rgb(230, 241, 132);
      font-weight: 900;
    }
  }

  .login-form {
    margin: 50px 0;
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
