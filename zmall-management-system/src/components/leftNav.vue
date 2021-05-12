<template>
  <div class="left-nav">
    <el-menu
      default-active="/home/manage/logo"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <!-- 首页管理 -->
      <el-submenu index="home">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>首页管理</span>
        </template>
        <!-- 商场logo管理 -->
        <el-menu-item index="/home/manage/logo">
          <i class="el-icon-s-tools"></i>
          <span>商场logo管理</span>
        </el-menu-item>

        <!-- 首页轮播图管理 -->
        <el-menu-item index="/home/manage/carousel">
          <i class="el-icon-s-tools"></i>
          <span>轮播图管理</span>
        </el-menu-item>

        <!-- 首页导航栏管理 -->
        <el-menu-item index="/home/manage/nav">
          <i class="el-icon-s-tools"></i>
          <span>导航栏管理</span>
        </el-menu-item>
      </el-submenu>

      <!-- 商品管理 -->
      <el-submenu index="goods">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商品管理</span>
        </template>
        <!-- 商品列表 -->
        <el-menu-item index="/goods/manage/list">
          <i class="el-icon-s-tools"></i>
          <span>商品列表</span>
        </el-menu-item>

        <!-- 首页轮播图管理 -->
        <el-menu-item index="carousel">
          <i class="el-icon-s-tools"></i>
          <span>轮播图管理</span>
        </el-menu-item>

        <!-- 首页导航栏管理 -->
        <el-menu-item index="nav">
          <i class="el-icon-s-tools"></i>
          <span>导航栏管理</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>首页管理</span>
        </template>

        <!-- 首页导航栏管理 -->
        <el-submenu index="2-4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>轮播图管理</span>
          </template>
          <el-menu-item index="2-4-1">
            <i class="el-icon-s-tools"></i>
            选项1
          </el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
.left-nav {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>
