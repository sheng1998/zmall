<template>
  <div class="hot-goods">
    <el-card class="hot-goods-card">
      <div class="hot-goods-title">
        <img src="../../static/image/home/hot-goods.png" alt="">
      </div>
      <div class="hot-goods-main xmf-flex">
        <el-card v-for="(item, index) in 6" :key="index" class="goods-card">
          <div class="goods-img">
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/20d36fbaa18625e4fe507af31e4e9f83.jpg?thumb=1&w=200&h=200&f=webp&q=90" alt="">
          </div>
          <div class="goods-title"></div>
          <div class="goods-describe"></div>
          <div class="goods-price"></div>
        </el-card>
      </div>
    </el-card>
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
.hot-goods {
  width: 100%;

  .hot-goods-card {
    margin: 20px 50px;

    .hot-goods-title {
      img {
        width: 150px;
      }
    }
  }
}
</style>
