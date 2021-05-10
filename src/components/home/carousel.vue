<template>
  <div class="carousel xmf-flex">
    <!-- 轮播图 -->
    <el-carousel class="carousel" height="400px" :interval="5000">
      <el-carousel-item v-for="item in 4" :key="item" class="carousel-item">
      </el-carousel-item>
    </el-carousel>
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
.carousel {
  position: relative;

  // 轮播图相关
  .carousel {
    display: inline-block;
    width: 100%;

    .carousel-item {
      &:nth-child(5) {
        background-color: cyan;
      }
      &:nth-child(6) {
        background-color: greenyellow;
      }
      &:nth-child(3) {
        background-color: pink;
      }
      &:nth-child(4) {
        background-color: yellow;
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
