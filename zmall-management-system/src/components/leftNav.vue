<template>
  <div class="left-nav">
    <el-menu
      default-active="/home/manage/logo"
      class="el-menu-vertical-demo"
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
          <span>商城logo管理</span>
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
        <!-- 添加商品 -->
        <el-menu-item index="/goods/manage/addgoods">
          <i class="el-icon-s-tools"></i>
          <span>添加商品</span>
        </el-menu-item>

        <!-- 上架商品列表 -->
        <el-menu-item index="/goods/manage/list">
          <i class="el-icon-s-tools"></i>
          <span>商品列表</span>
        </el-menu-item>

        <!-- 下架商品列表 -->
        <el-menu-item index="/goods/manage/list/offsale">
          <i class="el-icon-s-tools"></i>
          <span>商品列表(已下架)</span>
        </el-menu-item>

        <!-- 商品分类管理 -->
        <el-menu-item index="/goods/manage/classification">
          <i class="el-icon-s-tools"></i>
          <span>商品分类管理</span>
        </el-menu-item>

        <!-- 商品属性管理 -->
        <el-menu-item index="/goods/manage/attribute">
          <i class="el-icon-s-tools"></i>
          <span>商品属性管理</span>
        </el-menu-item>

        <!-- 商品评论管理 -->
        <el-menu-item index="/goods/manage/comment">
          <i class="el-icon-s-tools"></i>
          <span>商品评论管理</span>
        </el-menu-item>
      </el-submenu>

      <!-- 用户管理 -->
      <el-menu-item index="/manage/user">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <!-- 数据统计 -->
      <el-menu-item index="/manage/statistics">
        <i class="el-icon-setting"></i>
        <span slot="title">数据统计</span>
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
  methods: {}
}
</script>

<style lang="less">
.left-nav {
  height: 100%;
  overflow-y: auto;
  width: 210px;

  .el-menu {
    height: 100%;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
