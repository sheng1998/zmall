<template>
  <div class="home">
    <xmf-header></xmf-header>
    <xmf-nav-top></xmf-nav-top>
    <div class="xmf-flex main">
      <el-card class="home-card">
        <xmf-nav-left></xmf-nav-left>
      </el-card>
    </div>
    <xmf-seckill></xmf-seckill>
    <xmf-hot-goods></xmf-hot-goods>
  </div>
</template>

<script>
import xmfHeader from '../../components/header'
import xmfNavTop from '../../components/navigationTop'
import xmfNavLeft from '../../components/navigationLeft'
import xmfSeckill from '../../components/seckill'
import xmfHotGoods from '../../components/hotGoods'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    xmfHeader,
    xmfNavTop,
    xmfNavLeft,
    xmfSeckill,
    xmfHotGoods
  }
}
</script>

<style lang="less">
.home {
  .home-card {
    width: 100%;
    margin: 0 50px;
  }
}
</style>
