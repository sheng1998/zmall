<template>
  <div class="my-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        <a
          class="bc-a"
          v-if="item.path && item.path !== '#'"
          :href="item.path"
          >{{ item.name }}</a
        >
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  props: ['breadcrumb']
}
</script>

<style lang="less">
.my-breadcrumb {
  .bc-a {
    cursor: pointer !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    color: #303133 !important;
  }
}
</style>
