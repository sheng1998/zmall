<template>
  <div class="shopping-car">
    <!-- 右下角按钮组 -->
    <!-- 返回首页 -->
    <xmf-to-home></xmf-to-home>
    <!--回到顶部 -->
    <div class="back-top">
      <el-backtop :bottom="80" :visibility-height="200" style="dispaly: fixed;">
        <el-tooltip
          class="item"
          effect="dark"
          content="返回顶部"
          placement="left"
        >
          <div class="to-top xmf-flex">
            <span>
              <i class="iconfont iconfanhuidingbu"></i>
            </span>
          </div>
        </el-tooltip>
      </el-backtop>
    </div>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 购物车商品列表 -->
    <div class="shopping-car-list">
      <div style="width: 95%">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <!-- 商品信息 -->
          <el-table-column label="商品信息" min-width="500">
            <template slot-scope="scope">
              <router-link
                :to="'/goods/details/main?goodsId=' + scope.row.goods_id"
                class="xmf-flex-only goods-info"
              >
                <div class="goods_info_img">
                  <el-image :src="scope.row.goods_info.img" alt=""></el-image>
                </div>
                <div class="name-and-describe">
                  <div class="name">
                    {{ scope.row.goods_info.name }}
                  </div>
                  <div class="attribute ellipsis">
                    {{ scope.row.goods_attribute }}
                  </div>
                </div>
              </router-link>
            </template>
          </el-table-column>

          <!-- 单价 -->
          <el-table-column label="单价（元）" width="150">
            <template slot-scope="scope">
              <div class="price">
                <div
                  v-if="scope.row.discount_price !== scope.row.original_price"
                >
                  <div class="original-price">
                    {{ scope.row.original_price | fmtAmount }}
                  </div>
                  <div class="discount-price">
                    {{ scope.row.discount_price | fmtAmount }}
                  </div>
                </div>
                <div v-else>{{ scope.row.price | fmtAmount }}</div>
              </div>
            </template>
          </el-table-column>

          <!-- 数量 -->
          <el-table-column prop="name" label="数量（件）" width="150">
            <template slot-scope="scope">
              <div class="number">
                <el-input-number
                  v-model="scope.row.number"
                  @change="handleChange(scope.row)"
                  :min="1"
                  :max="scope.row.goods_number"
                  size="mini"
                ></el-input-number>
                <div class="kucun">
                  库存：<span>{{ scope.row.goods_number }}</span> 件
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- 金额 -->
          <el-table-column prop="name" label="金额（元）" width="150">
            <template slot-scope="scope">
              <div class="total_price">
                {{ (scope.row.price * scope.row.number) | fmtAmount }}
              </div>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column prop="address" label="操作" width="150">
            <template slot-scope="scope">
              <div>
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteGoods(scope.row)"
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="fenye xmf-flex" v-if="pagingForm.totalDate > 10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagingForm.currentPage"
        :page-sizes="pagingForm.dataNumberArr"
        :page-size="pagingForm.dataNumber"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagingForm.totalDate"
      >
      </el-pagination>
    </div>

    <!-- 底部商品统计信息 -->
    <div class="summary">
      <!-- 已选商品件数 -->
      <div class="all-goods-number">
        已选商品 <span>{{ total_numer }}</span> 件
      </div>
      <!-- 合计 -->
      <div class="total">
        合计： <span>{{ total_price | fmtAmount }} 元</span>
      </div>
      <!-- 结算按钮 -->
      <div class="settlement">
        <el-button
          type="warning"
          @click="dialogFormVisible = true"
          :disabled="multipleSelection.length <= 0"
          >结算</el-button
        >
      </div>
    </div>

    <!-- 商品订单弹窗 -->
    <el-dialog
      title="确认订单"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      class="order-dialog"
    >
      <div>
        <div class="delivery item">
          <div class="title">
            收货人信息：<span
              >（如需修改请前往
              <router-link :to="`/personal?userId=${userId}`"
                >个人中心</router-link
              >
              修改）</span
            >
          </div>
          <div class="delivery-details" v-if="delivery.name">
            <div class="tag">
              <el-tag effect="dark" type="info">默认地址</el-tag>
            </div>
            <div class="name">{{ delivery.name }}</div>
            <div class="address">{{ delivery.address }}</div>
            <div class="phone">{{ delivery.phone }}</div>
          </div>
          <div v-else>
            暂无默认地址，请前往
            <router-link :to="`/personal?userId=${userId}`"
              >个人中心</router-link
            >
            设置默认地址
          </div>
        </div>

        <div class="order item">
          <div class="title">订单详情：</div>
          <div class="order-list">
            <div
              v-for="(item, index) in multipleSelection"
              :key="index"
              class="order-goods"
            >
              <div class="order-goods-info">
                <div class="goods-img">
                  <el-image :src="item.goods_info.img"></el-image>
                </div>
                <div class="goods-name-and-attribute">
                  <div class="goods-name">
                    {{ item.goods_name }}
                  </div>
                  <div class="goods-attribute ellipsis">
                    {{ item.goods_attribute }}
                  </div>
                </div>
              </div>

              <div class="order-goods-classification ellipsis">
                {{ item.classification }}
              </div>

              <div class="order-goods-number xmf-flex">×{{ item.number }}</div>

              <div class="goods-total-price xmf-flex">
                ￥{{ (item.price * item.number) | fmtAmount }}
              </div>
            </div>
          </div>
        </div>

        <div class="type item">
          <div class="title">支付方式：</div>
          <div>
            <span>请选择支付方式：</span>
            <el-radio disabled v-model="radio" label="1">余额支付</el-radio>
          </div>
        </div>

        <div class="statistics">
          <!-- 已选商品件数 -->
          <div class="all-goods-number">
            已选商品 <span>{{ total_numer }}</span> 件
          </div>
          <!-- 合计 -->
          <div class="total">
            合计： <span>{{ total_price | fmtAmount }} 元</span>
          </div>
          <!-- 结算按钮 -->
          <div class="settlement">
            <el-button type="warning" @click="buyGoods">结 算</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import xmfToHome from '../../../components/toHome/toHome'
import xmfHeader from '../../../components/header/header'
export default {
  data () {
    return {
      userId: '',
      tableData: [],
      multipleSelection: [],

      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 10, // 每页显示数据条数
        totalDate: 0 // 数据总数
      },

      dialogFormVisible: false,
      radio: '1',
      delivery: {
        name: '',
        address: '',
        phone: ''
      }
    }
  },

  created () {
    if (this.$mycookie.get('loginInfo')) {
      this.userId = JSON.parse(this.$mycookie.get('loginInfo')).user_id
      this.getShopCarGoodsList()
      this.$axios
        .get('/user/default/address', {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          let data = res.data.addressInfo
          if (data) {
            this.delivery.name = data.name
            this.delivery.address = data.address_front + data.address_after
            this.delivery.phone = data.phone
          }
        })
    } else {
      this.$notify.error({
        title: '错误',
        message: '您还未登录或登录信息已过期',
        duration: 5000,
        offset: 100
      })
      this.$router.replace({ path: '/404' })
    }
  },

  mounted () {},

  methods: {
    // 获取购物车数据
    getShopCarGoodsList () {
      this.$axios
        .get('getgoodscarlist', {
          params: {
            user_id: this.userId,
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.goodsList
            this.pagingForm.totalDate = res.data.totalGoods
          } else {
            this.$message.error(res.data.msg)
            this.$router.replace({ path: '/404' })
          }
        })
    },

    // 改变商品数量
    handleChange (goods) {
      this.$axios
        .get('/changenumber', {
          params: {
            id: goods.id,
            number: goods.number
          }
        })
        .then(res => {
          if (res.data.status !== 200) {
            this.getShopCarGoodsList()
          }
        })
    },

    // 删除商品
    deleteGoods (goods) {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/deletegoods/fromcar', {
              params: {
                id: goods.id
              }
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功！',
                  offset: 55
                })
                this.getShopCarGoodsList()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 55
          })
        })
    },

    // 选种商品
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    // 每页显示条数改变
    handleSizeChange (val) {
      this.pagingForm.dataNumber = val
      this.getShopCarGoodsList()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getShopCarGoodsList()
    },

    // 购买商品
    buyGoods () {
      if (this.delivery.name === '') {
        return this.$message({
          message: '请先选择收货地址！',
          type: 'info',
          offset: 80
        })
      }
      let goodsList = []
      this.multipleSelection.forEach(item => {
        goodsList.push({
          goods_id: item.goods_id,
          number: item.number,
          goods_attribute: item.goods_attribute,
          car_id: item.id
        })
      })
      let form = {
        goods_list: goodsList,
        user_id: this.userId,
        delivery: this.delivery
      }
      this.$axios.post('/setuporder', form).then(res => {
        if (res.data.status === 200) {
          this.dialogFormVisible = false
          this.$alert('购买成功！！', '购买成功', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              this.getShopCarGoodsList()
            }
          })
        } else {
          this.dialogFormVisible = false
          this.$alert(res.data.msg, '购买失败', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    }
  },

  computed: {
    // 商品总件数
    total_numer: function () {
      return this.multipleSelection.length
    },
    // 总金额
    total_price: function () {
      let totalPrice = 0
      this.multipleSelection.forEach(item => {
        totalPrice += item.price * item.number
      })
      return totalPrice
    }
  },

  components: {
    xmfToHome,
    xmfHeader
  }
}
</script>

<style lang="less">
.shopping-car {
  .shopping-car-list {
    display: flex;
    justify-content: center;
    padding-top: 80px;
    margin-bottom: 50px;

    thead {
      tr {
        &:first-child {
          position: relative;

          &::after {
            content: '全选';
            position: absolute;
            top: 17px;
            left: 26px;
            font-size: 13px;
          }
        }
      }
    }

    .goods-info {
      .goods_info_img {
        img {
          width: 80px;
          height: 80px;
        }
      }

      .name-and-describe {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-left: 10px;
        height: 80px;

        .name {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .attribute {
          width: 500px;
          color: #cccccc;
          font-size: 14px;
        }
      }
    }

    .price {
      .original-price {
        color: #9c9c9c;
        text-decoration: line-through;
      }
    }

    .number {
      .el-input-number.el-input-number--mini {
        width: 100px;
      }
    }

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }

    .kucun {
      font-size: 12px;
      margin: 0 auto;
      span {
        color: #f40;
      }
    }
  }

  .summary {
    height: 50px;
    width: 100%;
    background-color: #e5e5e5;
    position: fixed;
    z-index: 99;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .all-goods-number {
      span {
        color: #f40;
        font-weight: 700;
        font-size: 22px;
      }
    }

    .total {
      margin-left: 30px;

      span {
        color: #f40;
        font-weight: 700;
        font-size: 22px;
      }
    }

    .settlement {
      margin-left: 30px;
      margin-right: 50px;

      button {
        color: white;
        background-color: #f40;
        padding: 8px 20px;

        span {
          font-size: 16px;
          font-weight: 900;
        }
      }
    }
  }

  .back-top {
    .to-top {
      width: 100%;
      height: 100%;
      background-color: #fafafa;
      border-radius: 50%;
      color: #fff;
      font-size: 20px;
      border: 1px solid #fafafa;

      i {
        color: #409eff;
        font-size: 20px;
        font-weight: 700;
      }
    }

    .el-backtop {
      z-index: 99999;
    }
  }

  .fenye {
    margin-top: 30px;
    margin-bottom: 80px;
  }

  .order-dialog {
    .el-dialog {
      width: 960px;
    }

    .el-dialog__body {
      border-top: 1px solid #9c9c9c;
      padding: 10px 20px;

      .item {
        background-color: #f6f6f6;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;

        .title {
          font-weight: 700;
          font-size: 14px;
          color: black;
          margin-bottom: 10px;
        }

        .order-goods {
          display: flex;

          &:not(:last-child) {
            margin-bottom: 15px;
          }

          .order-goods-info {
            display: flex;
            width: 470px;

            img {
              height: 50px;
              width: auto;
              min-width: 50px;
            }

            .goods-name-and-attribute {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .goods-name {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }

              .goods-attribute {
                color: #cccccc;
                font-size: 0.8em;
                width: 350px;
              }
            }
          }

          .order-goods-classification {
            width: 150px;
            text-align: center;
            margin: auto 0;
          }

          .order-goods-number {
            width: 80px;
          }

          .goods-total-price {
            width: 200px;
            color: #f40;
            font-weight: 700;
          }
        }
      }

      .delivery {
        .title {
          span {
            font-size: 0.8em;
          }
        }

        a {
          color: #409eff;
          text-decoration: underline;
        }

        .delivery-details {
          display: flex;
          align-items: center;

          div:not(:last-child) {
            margin-right: 20px;
          }

          .el-tag {
            height: 22px;
            line-height: 22px;
            padding: 0 10px;
          }
        }
      }

      .order {
        .order-list {
          max-height: 200px;
          overflow: hidden;
          overflow-y: scroll;
        }

        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
      }

      .type {
        .el-radio__input.is-disabled .el-radio__inner,
        .el-radio__input.is-disabled + span.el-radio__label {
          cursor: pointer;
          color: black;
        }
      }

      .statistics {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .all-goods-number {
          margin-right: 20px;
        }

        .total {
          margin-right: 20px;
          span {
            color: #f40;
            font-weight: 700;
          }
        }

        .settlement {
          button {
            padding: 6px 15px;
          }
        }
      }
    }
  }

  .el-dialog__wrapper {
    z-index: 999992 !important;
  }

  .v-modal {
    z-index: 999991 !important;
  }
}
</style>
