<template>
  <div class="my-goods">
    <el-card shadow="hover" class="my-goods-card">
      <router-link to="/">
        <div class="img xmf-flex" :class="{ shadow: goods.number === 0 }">
          <el-image fit="cover" :src="goods.img">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 100px;"></i>
            </div>
          </el-image>
          <div v-if="goods.number === 0" class="out-of-stock">暂时缺货</div>
        </div>
        <div class="content">
          <div class="title ellipsis">{{ goods.title }}</div>
          <div class="describe ellipsis">
            {{ goods.describe }}
          </div>
          <div
            v-if="goods.discountPrice !== goods.originalPrice"
            class="price xmf-flex"
          >
            <div class="discount-price">{{ goods.discountPrice }}元</div>
            <div class="original-price">{{ goods.originalPrice }}元</div>
          </div>
          <div v-else class="price xmf-flex">
            <div class="now-price">{{ goods.price }}元</div>
          </div>
          <div v-if="comment" class="order-message">
            <div class="comment">{{ goods.comment || 0 }} 人评论</div>
            <div class="praise">{{ goods.praise || 0 }}% 好评</div>
          </div>
        </div>
      </router-link>
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
  methods: {},
  props: ['goods', 'comment']
}
</script>

<style lang="less">
.my-goods {
  width: 20%;
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
  border: 1px;

  .my-goods-card {
    padding: 15px;

    .img {
      position: relative;

      &.shadow {
        opacity: 0.5;
      }

      .out-of-stock {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        width: 100%;
      }
    }

    .content {
      .title {
        margin: 8px 0;
        font-size: 14px;
        text-align: center;
      }
      .describe {
        margin: 8px 0;
        text-align: center;
        font-size: 12px;
        color: #b0b0b0;
      }

      .price {
        font-size: 15px;
        color: #ff6700;

        .discount-price {
          color: #ff6700;
        }

        .original-price {
          color: #999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }

      .order-message {
        display: flex;
        justify-content: center;
        font-size: 12px;
        margin-top: 10px;

        div:nth-child(2) {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
