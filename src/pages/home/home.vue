<template>
  <div class="home">
    <!-- 右下角按钮组 -->
    <xmf-back-top></xmf-back-top>
    <xmf-shopping-car></xmf-shopping-car>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 顶部导航栏 -->
    <xmf-nav-top></xmf-nav-top>

    <!-- 侧边导航栏 -->
    <div class="xmf-flex main">
      <el-card class="home-card">
        <xmf-nav-left></xmf-nav-left>
      </el-card>
    </div>

    <!-- 秒杀区域 -->
    <xmf-seckill></xmf-seckill>

    <!-- 热销商品区域 -->
    <xmf-hot-goods></xmf-hot-goods>

    <!-- 猜你喜欢区域 -->
    <xmf-guess-you-like></xmf-guess-you-like>

    <!-- 尾部 -->
    <xmf-footer></xmf-footer>
  </div>
</template>

<script>
import xmfBackTop from '../../components/backTop/backTop'
import xmfShoppingCar from '../../components/shoppingCar/shoppingCar'
import xmfHeader from '../../components/home/header'
import xmfNavTop from '../../components/home/navigationTop'
import xmfNavLeft from '../../components/home/navigationLeft'
import xmfSeckill from '../../components/home/seckill'
import xmfHotGoods from '../../components/home/hotGoods'
import xmfGuessYouLike from '../../components/home/guessYouLike'
import xmfFooter from '../../components/home/footer'
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    xmfBackTop,
    xmfShoppingCar,
    xmfHeader,
    xmfNavTop,
    xmfNavLeft,
    xmfSeckill,
    xmfHotGoods,
    xmfGuessYouLike,
    xmfFooter,
    xmfFixedBottom
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
