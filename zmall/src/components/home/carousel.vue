<template>
  <div class="carousel xmf-flex">
    <!-- 轮播图 -->
    <el-carousel class="carousel" height="400px" :interval="5000">
      <el-carousel-item v-for="item in carouselList" :key="item._id" class="carousel-item">
        <router-link :to="'/goods/details?goodsId=' + item.goods_id">
          <el-image :src="item.carousel_url"></el-image>
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselList: []
    }
  },
  created () {
    this.$axios.get('/carousel').then(res => {
      this.carouselList = res.data.data.carouselList
    })
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.carousel {
  position: relative;

  // 轮播图相关
  .carousel {
    display: inline-block;
    width: 100%;

    .carousel-item {
      .el-image {
        width: 100%;
      }

      img {
        width: 100%;
        height: 400px;
      }
    }

    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
</style>
