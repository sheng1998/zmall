<template>
  <div class="fixed-bottom">
    <xmf-back-top></xmf-back-top>
    <xmf-shopping-car></xmf-shopping-car>
    <xmf-to-home></xmf-to-home>
  </div>
</template>

<script>
import xmfBackTop from '../backTop/backTop'
import xmfShoppingCar from '../shoppingCar/shoppingCar'
import xmfToHome from '../toHome/toHome'
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
    xmfToHome
  }
}
</script>

<style lang="less"></style>
