<template>
  <div class="hot-goods">
    <el-card class="hot-goods-card">
      <div class="hot-goods-title">
        <img src="../../../static/image/home/hot-goods.png" alt="" />
      </div>
      <div class="hot-goods-main">
        <div class="goods-list">
          <xmf-goods-item
            :goods="goods"
            v-for="goods in goodsList"
            :key="goods._id"
          ></xmf-goods-item>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import xmfGoodsItem from '../goods/goods'
export default {
  data () {
    return {
      goodsList: []
    }
  },

  created () {
    this.getHotGoods()
  },

  mounted () {},

  methods: {
    // 获取热销商品列表
    getHotGoods () {
      this.$axios.get('/hotsalesgoods').then(res => {
        if (res.data.status === 200) {
          this.goodsList = res.data.goodsList
        }
      })
    }
  },

  components: {
    xmfGoodsItem
  }
}
</script>

<style lang="less">
.hot-goods {
  width: 100%;

  .hot-goods-card {
    margin: 20px 50px;

    .hot-goods-title {
      margin-bottom: 10px;

      img {
        width: 150px;
      }
    }
  }
}
</style>
