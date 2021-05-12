<template>
  <div class="home">
    <div class="home-nav">
      <xmf-system-left-nav></xmf-system-left-nav>
    </div>
    <el-card class="home-main">
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import xmfSystemLeftNav from '../components/leftNav'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    xmfSystemLeftNav
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
  display: flex;
  overflow: hidden;

  .home-nav {
    height: 100%;
    width: 220px;
  }

  .home-main {
    width: 100%;
    margin: 20px;
    overflow-y: auto;
  }
}
</style>
