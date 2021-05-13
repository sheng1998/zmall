<template>
  <div class="nav-top xmf-flex">
    <el-menu class="el-menu-demo nav-menu" mode="horizontal" :router="true">
      <el-menu-item
        :index="'goods/list?classification=' + item.class_path"
        class="item"
        v-for="item in class_list"
        :key="item._id"
      >
        {{ item.class_name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDetailsShow: '',
      class_list: []
    }
  },
  created () {
    this.$axios.get('/get/classification').then(res => {
      if (res.data.meta.status === 200) {
        this.class_list = res.data.data.class_list
      }
    })
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.nav-top {
  height: 48px;
  margin-top: 80px;
  position: relative;

  .el-menu,
  .el-menu-item {
    position: static;
  }

  .nav-menu {
    height: 48px;
    padding: 0;
    margin: 0;

    .item {
      line-height: 48px;
      height: 48px;
      color: #909399;

      &:hover {
        color: #ff6700;
      }
    }
  }
}
</style>
