<template>
  <el-header class="my-home-header" style="height: 50px;">
    <el-row style="height: 100%;">
      <!-- 商城图标 -->
      <el-col :span="5" class="my-home-logo xmf-flex">
        <img src="../../../static/image/logo/logo.png" alt="" />
      </el-col>

      <!-- 商城名字 -->
      <el-col :span="5" class="logo-font">
        <img src="../../../static/image/font_img/font.png" alt="" />
      </el-col>

      <!-- 搜索框 -->
      <el-col :offset="5" :span="8">
        <div class="search">
          <el-input
            placeholder="Search"
            v-model="searcVal"
            prefix-icon="el-icon-search"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>

      <!-- 位置 -->
      <el-col :span="2" class="to-center">
        <span style="margin-right: 5px;">
          <i class="el-icon-location"></i>
        </span>
        <span class="ellipsis">位置信息位置信息位置信息位置信息</span>
      </el-col>

      <!-- 登录注册 -->
      <el-col :span="2" class="to-center login-message" v-if="!isLogin">
        <div>
          <router-link to="/login">登录</router-link>
          <span>/</span>
          <router-link to="/register">注册</router-link>
        </div>
      </el-col>

      <!-- 个人中心 -->
      <el-col :span="2" class="to-center login-message" v-if="isLogin">
        <span>
          <router-link to="personal">个人中心</router-link>
        </span>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      searcVal: '',
      isLogin: false
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.my-home-header {
  background-color: #f5f5f5;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  color: #666666;
  z-index: 99999;

  a {
    color: #666666;
  }

  .my-home-logo {
    width: 40px;
    height: 50px;
    border-radius: 10px;

    img {
      width: 35px;
      height: 35px;
    }
  }

  .logo-font {
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;

    img {
      width: auto;
      height: 35px;
    }
  }

  .to-center {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .search {
    margin-top: 5px;
    margin-right: 20px;
  }

  .login-message {
    text-align: right;
    margin-left: 10px;
  }
}
</style>
