<template>
  <div class="nav-top xmf-flex">
    <el-menu class="el-menu-demo nav-menu" mode="horizontal" :router="true">
      <!-- 手机 -->
      <el-menu-item
        index="goods/list?classification=phone"
        class="item"
        @mouseover.native="isDetailsShow = 'phone'"
        @mouseout.native="isDetailsShow = ''"
      >
        <template>
          <div class="phone">
            <span>手机</span>
            <transition name="fade">
              <div
                class="details xmf-flex"
                v-show="isDetailsShow === 'phone' ? true : false"
              >
                <ul class="details-ul">
                  <li
                    v-for="(item, index) in 6"
                    :key="index"
                    class="details-li"
                  >
                    <a href="#">
                      <div class="details-img">
                        <img
                          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/85e44ea2405ff8414148bbde7446b137.png?thumb=1&w=160&h=110&f=webp&q=90"
                          alt=""
                        />
                      </div>
                      <p class="details-title text">1111</p>
                      <p class="details-price text">222</p>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </template>
      </el-menu-item>

      <!-- 平板电脑 -->
      <el-menu-item
        index="goods/list?classification=tablet"
        class="item"
        @mouseover.native="isDetailsShow = 'tablet'"
        @mouseout.native="isDetailsShow = ''"
      >
        <template>
          <div>
            <span>平板电脑</span>
            <transition name="fade">
              <div
                class="details xmf-flex"
                v-show="isDetailsShow === 'tablet' ? true : false"
              >
                <ul class="details-ul">
                  <li
                    v-for="(item, index) in 6"
                    :key="index"
                    class="details-li"
                  >
                    <a href="#">
                      <div class="details-img">
                        <img
                          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a359e9346e3c6ee8c9d8389e3fd9458.png?thumb=1&w=160&h=110&f=webp&q=90"
                          alt=""
                        />
                      </div>
                      <p class="details-title text">1111</p>
                      <p class="details-price text">222</p>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </template>
      </el-menu-item>

      <!-- 笔记本 -->
      <el-menu-item index="3" disabled class="item">笔记本</el-menu-item>

      <el-menu-item index="7" disabled class="item">音响</el-menu-item>
      <el-menu-item index="8" disabled class="item">路由器</el-menu-item>
      <el-menu-item index="9" disabled class="item">显示器</el-menu-item>
      <el-menu-item index="9" disabled class="item">显示器</el-menu-item>
      <el-menu-item index="12" disabled class="item">投影仪</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDetailsShow: ''
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.nav-top {
  height: 48px;
  margin-top: 80px;
  position: relative;

  .el-menu,
  .el-menu-item {
    position: static;
  }

  .nav-menu {
    height: 48px;
    padding: 0;
    margin: 0;

    .item {
      line-height: 48px;
      height: 48px;
      color: #909399;

      &:hover {
        color: #ff6700;
      }

      &:hover .details {
        display: flex;
      }

      .details {
        position: absolute;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.18);
        border-top: 1px solid #e0e0e0;
        left: 0;
        top: 48px;
        height: 250px;
        box-sizing: border-box;
        display: flex;
        z-index: 9999;

        .details-ul {
          padding: 10px 0 20px;
          margin: 0;

          .details-li {
            float: left;
            height: 100%;

            &:not(:last-child) img {
              border-right: 1px solid #e0e0e0;
            }

            .details-img {
              img {
                padding: 0;
                margin: 0;
                height: 130px;
              }
            }

            .text {
              height: 15px;
              font-size: 14px;
              text-align: center;
            }

            .details-title {
              margin: 0 0 5px 0;
              color: #000;
            }

            .details-price {
              color: #ff6700;
            }
          }
        }
      }
    }
  }

  .el-menu-item.is-disabled {
    opacity: 1;
    cursor: pointer;
    color: #909399;
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
