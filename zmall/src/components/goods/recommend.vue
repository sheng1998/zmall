<template>
  <div class="recommend-goods">
    <el-card
      class="recommend-goods-card"
      v-for="(item, index) in goodsList"
      :key="index"
    >
      <div class="recommend-classification">{{ item.title }}</div>
      <div class="recommend-goods-main">
        <div class="recommend-goods-list">
          <xmf-goods-item
            :goods="goods"
            v-for="goods in item.goods_list"
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
    this.getRecommendGoods()
  },

  mounted () {},

  methods: {
    // 获取热销商品列表
    getRecommendGoods () {
      this.$axios.get('/recommendgoods').then(res => {
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
.recommend-goods {
  width: 100%;

  .recommend-classification {
    font-size: 30px;
    font-weight: 700;
    font-family: FZZJ, Georgia, 'Times New Roman', Times, serif;
  }

  .recommend-goods-card {
    margin: 20px 50px;
  }
}
</style>
