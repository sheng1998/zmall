<template>
  <div class="home">
    <!-- 右下角按钮组 -->
    <xmf-back-top></xmf-back-top>
    <xmf-shopping-car></xmf-shopping-car>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 顶部导航栏 -->
    <!-- <xmf-nav-top></xmf-nav-top> -->
    <xmf-nav></xmf-nav>

    <!-- 轮播图 -->
    <div class="xmf-flex main">
      <el-card class="home-card">
        <!-- <xmf-nav-left></xmf-nav-left> -->
        <xmf-carousel></xmf-carousel>
      </el-card>
    </div>

    <!-- 热销商品区域 -->
    <xmf-hot-goods></xmf-hot-goods>

    <xmf-recommend-goods></xmf-recommend-goods>

    <!-- 猜你喜欢区域 -->
    <xmf-guess-you-like></xmf-guess-you-like>

    <!-- 尾部 -->
    <xmf-footer></xmf-footer>
  </div>
</template>

<script>
import xmfBackTop from '../../components/backTop/backTop'
import xmfShoppingCar from '../../components/shoppingCar/shoppingCar'
import xmfHeader from '../../components/header/header'
import xmfNav from '../../components/home/nav'
import xmfCarousel from '../../components/home/carousel'
import xmfHotGoods from '../../components/home/hotGoods'
import xmfRecommendGoods from '../../components/goods/recommend'
import xmfGuessYouLike from '../../components/home/guessYouLike'
import xmfFooter from '../../components/footer/footer'
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
    xmfNav,
    xmfCarousel,
    xmfHotGoods,
    xmfRecommendGoods,
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
