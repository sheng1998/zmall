<template>
  <div class="to-home xmf-fixed-bottom">
    <el-tooltip class="item" effect="dark" content="返回首页" placement="left">
      <router-link to="/home">
        <div class="to-home-icon xmf-flex">
          <span>
            <i class="iconfont iconfanhuishouye"></i>
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
.to-home {
  bottom: 150px;
}
</style>
