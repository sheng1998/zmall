<template>
  <div class="goods">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <div style="height: 700px;"></div>

    <!-- 尾部 -->
    <xmf-footer></xmf-footer>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../components/home/header'
import xmfFooter from '../../components/home/footer'
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    xmfFixedBottom,
    xmfHeader,
    xmfFooter
  }
}
</script>

<style lang="less">
.goods {
}
</style>
