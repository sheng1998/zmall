<template>
  <div class="nav-left xmf-flex">
    <!-- 左侧导航菜单 -->
    <el-menu class="el-menu-demo nav-menu" mode="vertical">
      <!-- 液晶电视 -->
      <el-menu-item index="11" class="item" disabled>
        <template>
          <div class="">
            <div class="item-text">
              <span>液晶电视</span>
            </div>

            <!-- 右侧内容区域 -->
            <transition name="fade">
              <div class="details">
                <ul class="details-ul">
                  <li
                    v-for="(item, index) in 20"
                    :key="index"
                    class="details-li"
                  >
                    <a href="#" class="details-li-a">
                      <div class="details-img">
                        <img
                          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/85e44ea2405ff8414148bbde7446b137.png?thumb=1&w=160&h=110&f=webp&q=90"
                          alt=""
                        />
                      </div>
                      <div class="details-title ellipsis">
                        111111111111111111111111111111111111111111
                        111111111111111111111111111111111111111111
                        111111111111111111111111111111111111111111
                        111111111111111111111111111111111111111111
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </template>
      </el-menu-item>

      <!-- 手机 / 运营商 / 数码 -->
      <el-menu-item index="12" class="item" disabled>
        <template>
          <div>
            <div class="item-text">
              <span>手机</span>
              <span>/</span>
              <span>运营商</span>
              <span>/</span>
              <span>数码</span>
            </div>
          </div>
        </template>
      </el-menu-item>

      <el-menu-item index="4" class="item" disabled>
        <template>
          <div>
            <div class="item-text">
              <span>电脑</span>
              <span>/</span>
              <span>显示器</span>
            </div>
          </div>
        </template>
      </el-menu-item>

      <el-menu-item
        v-for="(item, index) in 7"
        :key="index"
        index="5"
        class="item"
        disabled
      >
        <template>
          <div>
            <div class="item-text">
              <span>冰箱</span>
              <span>/</span>
              <span>洗衣机</span>
            </div>
          </div>
        </template>
      </el-menu-item>
    </el-menu>

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
.nav-left {
  position: relative;

  .el-menu,
  .el-menu-item {
    position: static;
  }

  // 左侧导航菜单
  .nav-menu {
    background-color: #545c64;
    display: inline-block;
    width: 182px;

    .item {
      display: block;
      color: #fff;
      height: 40px;
      line-height: 40px;

      &:hover {
        background: #ff6700 !important;
      }

      &:hover .details {
        display: flex;
      }

      .item-text {
        span:not(:first-child) {
          margin-left: 5px;
        }
      }

      .details {
        position: absolute;
        top: 0;
        left: 182px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        z-index: 9999;
        background-color: #fff;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.18);
        border: 1px solid #e0e0e0;
        max-height: 400px;
        overflow: hidden;
        overflow-y: scroll;
        cursor: default;
        display: none;

        .details-ul {
          width: 100%;
          margin: 20px;

          .details-li {
            float: left;
            width: 20%;
            margin: 5px 20px;

            .details-li-a {
              display: flex;
              align-items: center;
              cursor: pointer;

              &:hover {
                color: #ff6700;
              }

              .details-img {
                width: 80px;
                height: 80px;

                img {
                  width: 80px;
                  height: 80px;
                }
              }
            }
          }
        }
      }
    }
  }

  .el-menu-item.is-disabled {
    opacity: 1;
    cursor: pointer;
  }

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
