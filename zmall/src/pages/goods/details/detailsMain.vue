<template>
  <div class="details-main ql-editor" v-html="goodsDetails"></div>
</template>

<script>
export default {
  data () {
    return {
      goodsDetails: ''
    }
  },

  created () {
    this.getGoodsDetails()
  },

  mounted () {},

  methods: {
    // 获取商品详情
    getGoodsDetails () {
      this.$axios
        .get('/goodsdetails', {
          params: {
            goods_id: this.$route.query.goodsId
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.goodsDetails = res.data.goodsData.details
          } else {
            this.$message.error(res.data.msg)
            this.$router.replace({ path: '/404' })
          }
        })
    }
  }
}
</script>

<style lang="less">
.details-main {
  margin: 0 50px;
  margin-top: 30px;
}
</style>
