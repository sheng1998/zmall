<template>
  <div class="details-parameter">
    <div v-if="parameterData">
      <div
        v-for="item in parameterData"
        :key="item.name"
        class="parameter-list"
      >
        <div class="parameter-list-item">
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-list">
            <div v-for="(item1, index) in item.value" :key="index" class="item">
              <div class="item-list-name">{{ item1.title }}</div>
              <div class="item-list-value">{{ item1.value }}</div>
            </div>
          </div>
        </div>
        <hr style="margin-top: 50px;" />
      </div>
    </div>
    <div v-else class="no-parameter">
      暂无参数
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      parameterData: []
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
            this.parameterData = res.data.goodsData.parameter
            console.log(this.parameterData)
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
.details-parameter {
  margin: 0 50px;
  width: 100%;

  .parameter-list {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;

    .parameter-list-item {
      display: flex;

      .item-name {
        width: 12%;
        font-size: 22px;
        font-weight: 600;
        color: #333333;
      }

      .item-list {
        width: 88%;

        .item {
          display: flex;
          padding: 20px 0;

          .item-list-name {
            width: 150px;
          }

          .item-list-value {
            width: 100%;
            line-height: 20px;
            letter-spacing: 0.8px;
          }
        }
      }
    }
  }

  .no-parameter {
    margin-top: 80px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    font-size: 50px;
    font-weight: 700;
    color: #cccccc;
  }
}
</style>
