<template>
  <div class="goods-list">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 面包屑 -->
    <div class="xmf-breadcrumb">
      <xmf-bread-crumb :breadcrumb="breadcrumb"></xmf-bread-crumb>
    </div>

    <!-- 分类和商品属性 -->
    <el-card class="classification-sort-card">
      <div class="classification-and-sort">
        <!-- 分类名 -->
        <div class="classification item1">
          <div class="title">分类：</div>
          <div class="classification-body">
            <span
              v-for="classification in classification"
              :key="classification._id"
            >
              <router-link
                :to="
                  `/goods/list?classification=${classification.class_name}${
                    $route.query.query === undefined
                      ? ''
                      : '&query=' + $route.query.query
                  }`
                "
              >
                {{ classification.class_name }}
              </router-link>
            </span>
          </div>
        </div>

        <!-- 排序 -->
        <div class="sort item1">
          <div class="title">排序：</div>
          <div class="sort-body">
            <el-checkbox-group v-model="sortList">
              <!-- 综合排序 -->
              <el-checkbox
                class="item"
                label="total_sales"
                @change="changeSort('total_sales')"
                :checked="true"
              >
                综合
              </el-checkbox>

              <!-- 最新排序 -->
              <el-checkbox
                class="item"
                label="created_time"
                @change="changeSort('created_time')"
              >
                最新
              </el-checkbox>

              <!-- 价格排序 -->
              <el-checkbox
                class="item"
                label="price"
                @change="changeSort('price')"
              >
                <template>
                  <div class="price">
                    <span class="price-title" @click="priceSort('toggle')"
                      >价格</span
                    >
                    <div class="price-icon">
                      <span @click="priceSort(true)">
                        <i
                          class="el-icon-caret-top"
                          :class="{ grey: !isPriceUp, blue: isPriceUp }"
                        ></i>
                      </span>
                      <span @click="priceSort(false)">
                        <i
                          class="el-icon-caret-bottom"
                          :class="{ grey: isPriceUp, blue: !isPriceUp }"
                        ></i>
                      </span>
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 商品列表 -->
    <el-card class="goods-list" v-if="goodsList.length > 0">
      <xmf-goods-item
        :goods="goods"
        v-for="goods in goodsList"
        :key="goods._id"
      ></xmf-goods-item>
    </el-card>

    <div class="no-goods" v-else>
      没有找到相关宝贝，请尝试切换其他关键字搜索。
    </div>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../components/header/header'
import xmfBreadCrumb from '../../components/breadcrumb/breadcrumb'
import xmfGoodsItem from '../../components/goods/goods'

export default {
  data () {
    return {
      // 商品列表
      goodsList: [],
      classCheckList: [],

      // 分类
      classification: [],
      sortList: [],

      // 价格排序
      isPriceUp: false,

      // 面包屑
      breadcrumb: [],

      // 排序
      sort: 'total_sales'
    }
  },

  created () {
    // 处理面包屑
    this.handleBreadcrumb()
    // 获取商品分类
    this.getClassification()
    // 获取商品列表
    this.getSearchGoodsList()
  },

  mounted () {},

  methods: {
    // 处理面包屑
    handleBreadcrumb () {
      if (this.$route.query.query && this.$route.query.query !== '') {
        this.breadcrumb = [
          {
            name: '商品搜索：' + this.$route.query.query,
            path: '#'
          }
        ]
      } else if (
        this.$route.query.classification &&
        this.$route.query.classification !== ''
      ) {
        this.breadcrumb = [
          {
            name: '商品分类：' + this.$route.query.classification,
            path: '#'
          }
        ]
      } else {
        this.breadcrumb = [
          {
            name: '商品列表',
            path: '#'
          }
        ]
      }
    },

    // 获取商品分类
    getClassification () {
      this.$axios.get('/get/classification').then(res => {
        if (res.data.meta.status === 200) {
          this.classification = res.data.data.class_list
        }
      })
    },

    // 获取商品搜索结果
    getSearchGoodsList () {
      this.$axios
        .get('/searchgoods', {
          params: {
            classification: this.$route.query.classification,
            query: this.$route.query.query,
            sort: this.sort
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.goodsList = res.data.goodsList
          }
        })
    },

    // 改变排序
    changeSort (value) {
      this.sortList = []
      this.sortList.push(value)
      if (this.sort !== value && value !== 'price') {
        this.sort = value
        this.getSearchGoodsList()
      }
    },

    // 根据价格排序
    priceSort (flag) {
      if (flag === 'toggle') {
        this.isPriceUp = !this.isPriceUp
      } else {
        this.isPriceUp = flag
      }
      this.sort = this.isPriceUp ? 'priceup' : 'pricedown'
      this.getSearchGoodsList()
    }
  },

  watch: {
    // 监听路由变化
    $route: {
      handler () {
        this.getSearchGoodsList()
        this.handleBreadcrumb()
        // 深度监听，同时也可监听到param参数变化
      },
      deep: true,
      // 代表在wacth里声明了true之后会立即先去执行handler方法
      immediate: false
    }
  },

  components: {
    xmfFixedBottom,
    xmfHeader,
    xmfBreadCrumb,
    xmfGoodsItem
  }
}
</script>

<style lang="less">
.goods-list {
  .el-card__body {
    padding: 0;
  }

  .xmf-breadcrumb {
    margin-bottom: 15px;
    padding-top: 80px;
    margin-left: 50px;
  }

  .classification-sort-card {
    margin: 0 50px;

    .classification-and-sort {
      margin: 10px 25px 20px 25px;

      .item1 {
        padding: 15px 0;
        border-bottom: 1px solid #ddd;

        &:not(:first-child) {
          white-space: nowrap;
        }

        .title {
          display: inline-block;
          font-size: 15px;
          min-width: 80px;
        }

        .item-checkbox {
          display: inline-block;
        }

        .el-checkbox__label {
          padding-left: 3px;
        }

        .item {
          display: inline-block;
          font-size: 14px;
          min-width: 60px;

          &:not(:last-child) {
            margin-right: 20px;
          }
        }

        .sort-body {
          display: inline-block;

          .el-checkbox-group {
            display: inline-block;
          }

          .el-checkbox__inner {
            display: none;
          }

          .el-checkbox__label {
            padding-left: 0;
          }

          .price {
            display: flex;
            .price-icon {
              display: flex;
              flex-flow: column;
              flex-wrap: wrap;

              span {
                margin: 0 3px;
                width: 0;
                height: 0;

                i {
                  font-size: 10px;
                  position: absolute;
                }

                .el-icon-caret-bottom {
                  top: 6px;
                }
              }
            }
          }
        }

        .is-checked {
          color: #409eff;

          .blue {
            color: #409eff;
          }

          .grey {
            color: #606266;
          }
        }
      }
    }

    .classification {
      display: flex;

      .classification-body span {
        display: inline-block;
        font-size: 14px;
        color: #606266;
        margin-bottom: 5px;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 35px;
        }
      }
    }
  }

  .goods-list {
    margin: 30px 50px 0 50px;
  }

  .no-goods {
    margin-top: 80px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
    color: #cccccc;
  }
}
</style>
