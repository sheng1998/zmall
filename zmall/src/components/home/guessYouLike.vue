<template>
  <div class="guess-you-like" v-if="goodsList.length > 0">
    <el-card class="like-card">
      <div class="like-goods-title">
        <img src="../../../static/image/home/guess-you-like.png" alt="" />
      </div>
      <div class="like-goods-main">
        <div class="goods-list">
          <xmf-goods-item
            :goods="goods"
            v-for="goods in goodsList"
            :key="goods.id"
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
    let loginInfo = this.$mycookie.get('loginInfo')
    let userId = ''
    if (loginInfo) {
      userId = JSON.parse(loginInfo).user_id
      this.$axios
        .get('/guessyoulike', {
          params: {
            user_id: userId
          }
        })
        .then(res => {
          this.goodsList = res.data.goodsList
          console.log(res.data.goodsList)
        })
    }
  },

  mounted () {},

  methods: {},

  components: {
    xmfGoodsItem
  }
}
</script>

<style lang="less">
.guess-you-like {
  width: 100%;

  .like-card {
    margin: 0 50px;

    .like-goods-title {
      margin-bottom: 10px;

      img {
        width: 180px;
      }
    }
  }
}
</style>
