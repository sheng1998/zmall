<template>
  <div class="shopping-car xmf-fixed-bottom">
    <el-tooltip class="item" effect="dark" content="购物车" placement="left">
      <router-link to="/shoppingcar">
        <div class="shopping-car-icon xmf-flex">
          <span>
            <i class="iconfont icongouwuchekong"></i>
          </span>
        </div>
      </router-link>
    </el-tooltip>
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
.shopping-car {
}
</style>
