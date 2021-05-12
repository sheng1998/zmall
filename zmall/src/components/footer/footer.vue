<template>
  <div class="footer xmf-flex">
    <div class="copyright">
      <div class="title xmf-flex">
        <!-- 商城图标 -->
        <div class="logo xmf-flex">
          <img src="../../../static/image/logo/logo.png" alt="" />
        </div>

        <!-- 商城名字 -->
        <div class="logo-font xmf-flex">
          <img src="../../../static/image/font_img/font.png" alt="" />
        </div>
      </div>

      <div class="content xmf-flex">
        <div class="item">
          Copyright ©
          该项目使用了大量非开源图片和字体，仅用于学习分享，禁止商用。
        </div>
      </div>
    </div>
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
.footer {
  background-color: #06060b;
  color: #60606d;
  margin-top: 50px;
  height: 100px;
  padding-bottom: 20px;

  .copyright {
    margin: 30px 0 0 80px;
    padding-right: 15%;

    .title {
      margin-bottom: 20px;

      .logo {
        img {
          height: 30px;
        }
      }

      .logo-font {
        margin-left: 10px;

        img {
          height: 30px;
        }
      }
    }

    .item {
      span {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
