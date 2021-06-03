<template>
  <el-header class="my-home-header" style="height: 50px;">
    <el-row style="height: 100%;">
      <!-- 商城图标 -->
      <el-col :span="5" class="my-home-logo xmf-flex">
        <router-link to="/">
          <el-avatar :size="40" :src="logo_url">
            <img
              src="http://127.0.0.1:3002/uploads/user/error-avatar/0fc7d20532fdaf769a25683617711.png"
            />
          </el-avatar>
        </router-link>
      </el-col>

      <!-- 商城名字 -->
      <el-col :span="5" class="logo-font">
        <router-link to="/">
          <img src="../../../static/image/font_img/font.png" alt=""
        /></router-link>
      </el-col>

      <!-- 搜索框 -->
      <el-col :offset="7" :span="8">
        <div class="search">
          <el-input
            placeholder="Search"
            v-model="searchValue"
            prefix-icon="el-icon-search"
            @keyup.enter.native="searchGoodsList"
            @blur="searchGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchGoodsList"
            ></el-button>
          </el-input>
        </div>
      </el-col>

      <!-- 登录注册 -->
      <el-col :span="2" class="to-center login-message" v-if="!isLogin">
        <div>
          <router-link to="/login">登录</router-link>
          <span>/</span>
          <router-link to="/register">注册</router-link>
        </div>
      </el-col>

      <!-- 头像 -->
      <el-col
        :span="2"
        class="to-center login-message my-avatar"
        v-if="isLogin"
      >
        <el-dropdown :hide-on-click="false">
          <el-avatar :size="40" :src="user_avatar">
            <img
              src="http://127.0.0.1:3002/uploads/user/error-avatar/0fc7d20532fdaf769a25683617711.png"
            />
          </el-avatar>
          <el-dropdown-menu slot="dropdown" class="my-dropdown">
            <el-dropdown-item>
              <router-link :to="personalUrl">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="orderUrl">我的订单</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      // 搜索内容
      searchValue: '',
      query: '',

      // 是否已经登录
      isLogin: false,

      // logo
      logo_url:
        'http://127.0.0.1:3002/uploads/logo/2f6938c0c02511eb96fbc19a36612af3.png',

      personalUrl: '',
      orderUrl: '',
      user_id: '',
      user_avatar: ''
    }
  },

  created () {
    this.searchValue = this.$route.query.query || ''
    this.query = this.searchValue
    this.judgingLoginStatus()
    this.$axios.get('/get/logo').then(res => {
      this.logo_url = res.data.data.url
    })
  },

  mounted () {},

  methods: {
    // 判断登录状态
    judgingLoginStatus () {
      let loginInfo = this.$mycookie.get('loginInfo')
      if (!loginInfo) {
        this.isLogin = false
        return false
      }
      let code = JSON.parse(loginInfo).code
      this.$axios.get('/islogin', { params: { code } }).then(res => {
        if (res.data.isLogin === true) {
          this.isLogin = true
          this.user_id = JSON.parse(loginInfo).user_id
          this.personalUrl = '/personal?userId=' + this.user_id
          this.orderUrl = '/goods/order?userId=' + this.user_id
          this.getUserAvater()
        } else {
          this.isLogin = false
          this.user_id = ''
          this.personalUrl = ''
        }
      })
    },

    // 根据用户id查询用户头像
    getUserAvater () {
      // console.log('avater')
      this.$axios
        .get('/userinfo', {
          params: {
            id: this.user_id
          }
        })
        .then(res => {
          this.user_avatar = res.data.userinfo.avatar
        })
    },

    // 退出登录
    logout () {
      this.$mycookie.remove('loginInfo')
      this.$message({
        type: 'success',
        message: '退出登录成功，自动跳转至登录页面。',
        offset: 80
      })
      this.$router.push({ name: 'login' })
    },

    // 搜索商品
    searchGoodsList () {
      let str = this.$route.query.classification
        ? `classification=${this.$route.query.classification}&`
        : ''
      if (this.searchValue !== '' && this.query !== this.searchValue) {
        this.query = this.searchValue
        this.$router.push({
          path: '/goods/list?' + str + 'query=' + this.query
        })
      } else if (this.searchValue === '' && this.query !== this.searchValue) {
        this.$router.push({
          path: '/goods/list?' + str
        })
      }
    },

    // 在商品列表页面查找
    searchGoods () {
      if (this.$route.path === '/goods/list') {
        this.$debounce.use(
          () => {
            let str = this.$route.query.classification
              ? `classification=${this.$route.query.classification}&`
              : ''
            if (this.searchValue !== '' && this.query !== this.searchValue) {
              this.query = this.searchValue
              this.$router.push({
                path: '/goods/list?' + str + 'query=' + this.query
              })
            } else if (
              this.searchValue === '' &&
              this.query !== this.searchValue
            ) {
              this.$router.push({
                path: '/goods/list?' + str
              })
            }
          },
          500,
          true
        )
      }
    }
  }
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

    .el-avatar {
      background-color: transparent;
    }
  }

  .my-avatar {
    .el-avatar {
      background-color: transparent;
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

.el-dropdown-menu {
  a {
    font-size: 14px;
    color: #606266;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    &:hover a {
      color: #409eff;
    }
  }
}

.my-dropdown {
  .el-dropdown-menu__item {
    padding: 0;

    a {
      display: inline-block;
      padding: 0 20px;
      margin: 0;
    }

    div {
      display: inline-block;
      padding: 0 20px;
      margin: 0;
    }
  }
}
</style>
