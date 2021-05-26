<template>
  <div class="goods-order">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 购物车商品列表 -->
    <div class="order-list">
      <!-- 表头部分 -->
      <div class="table-top xmf-flex-only">
        <div class="goods header-td xmf-flex">宝贝</div>
        <div class="price header-td xmf-flex">单价</div>
        <div class="number header-td xmf-flex">数量</div>
        <div class="total_price header-td xmf-flex">实际付款</div>
        <div class="operation header-td xmf-flex">操作</div>
      </div>

      <!-- 表格内容 -->
      <div class="table-body" v-if="orderList.length > 0">
        <div
          class="table-tr"
          v-for="order in orderList"
          :key="order.order_number"
        >
          <!-- 订单时间和订单号 -->
          <div class="top">
            <span class="order-time">{{ order.order_time | fmtdate }}</span>
            <span class="order-title">订单号：</span>
            <span class="order-number">{{ order.order_number }}</span>
          </div>

          <!-- 订单商品信息 -->
          <div class="body xmf-flex-only">
            <!-- 商品图片等信息 -->
            <div class="goods xmf-flex-only">
              <div class="goods-img">
                <el-image :src="order.goods_info.img" alt=""></el-image>
              </div>
              <div class="name-and-attribute">
                <div class="goods-name">
                  {{ order.goods_info.name }}
                </div>
                <div class="goods-attribute">
                  {{ order.goods_info.attributes }}
                </div>
              </div>
            </div>

            <!-- 价格 -->
            <div class="price xmf-flex">
              <div v-if="order.discount_price !== order.original_price">
                <div class="original-price">
                  {{ order.original_price | fmtAmount }} 元
                </div>
                <div class="discount-price">
                  {{ order.discount_price | fmtAmount }} 元
                </div>
              </div>
              <div v-else>{{ order.price | fmtAmount }} 元</div>
            </div>

            <!-- 数量 -->
            <div class="number xmf-flex">
              {{ order.number }}
            </div>

            <!-- 实际付款 -->
            <div class="total_price xmf-flex">{{ order.total_price | fmtAmount }} 元</div>

            <!-- 操作 -->
            <div class="operation xmf-flex">
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteGoods(order.order_id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="xmf-flex no-order" v-else>暂无订单</div>
    </div>

    <!-- 分页 -->
    <div class="fenye xmf-flex" v-if="orderList.length > 5">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import xmfFixedBottom from '../../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../../components/header/header'
export default {
  data () {
    return {
      orderList: [
        {
          order_id: '1283605970670855585',
          created_time: '2021-05-10 12:30:22',
          goods_info: {
            img:
              'https://res8.vmallres.com/shopdcGray/shopdc/pic/7684c590-be75-4cac-bdb1-74d167f6a728.png',
            name:
              'HUAWEI FreeBuds 3 无线耳机（陶瓷白）麒麟A1芯片 主动降噪 快充长续航',
            attributes: '陶瓷白/有线充版'
          },
          price: 899.00,
          discount_price: 899.00,
          original_price: 899.00,
          number: 1,
          total_price: 899.00,
          order_time: '2021-02-10 13:12:09',
          order_number: '1293678699427855585'
        },
        {
          order_id: '5270648131388855585',
          created_time: '2021-04-25 20:10:12',
          goods_info: {
            img:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d47f7ecaa04d92bf2790d4a5d53d9099.png',
            name:
              '黑鲨4 Pro',
            attributes: '8+256GB/墨海黑'
          },
          price: 4299.00,
          discount_price: 4299.00,
          original_price: 4599.00,
          number: 1,
          total_price: 4299.00,
          order_time: '2021-05-10 11:34:23',
          order_number: '58293678699427855585'
        }
      ],
      currentPage: 1
    }
  },
  created () {
    let userId = this.$route.query.userId
    let loginInfo = this.$mycookie.get('loginInfo')
    if (loginInfo && JSON.parse(loginInfo).user_id === userId) {
      console.log(1)
    } else {
      this.$message.warning('登录信息过期，或用户不存在！')
      this.$router.replace({path: '/404'})
    }
  },
  mounted () {},
  methods: {
    // 删除订单
    deleteGoods (id) {
      console.log(id)
      this.$confirm('是否删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 55
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {
    xmfFixedBottom,
    xmfHeader
  }
}
</script>

<style lang="less">
.goods-order {
  .order-list {
    margin: 80px;
    margin-bottom: 0;

    .table-top {
      background-color: #f5f5f5;
      border: 1px solid #e8e8e8;
      font-size: 15px;

      .header-td {
        height: 42px;
      }

      .goods {
        width: 50%;
        padding: 0 10px;
      }

      .price {
        width: 15%;
      }

      .number {
        width: 10%;
      }

      .total_price {
        width: 15%;
      }

      .operation {
        width: 10%;
      }
    }

    .table-body {
      margin-top: 20px;

      .table-tr {
        margin-bottom: 20px;
        border: 1px solid #66b6ff;

        .top {
          background-color: #eaf8ff;
          padding: 12px 0;
          padding-bottom: 5px;
          font-size: 14px;
          border-bottom: 1px solid #daf3ff;

          .order-time {
            margin-left: 20px;
            margin-right: 10px;
            font-weight: 700;
          }
        }

        .body {
          padding: 5px 0;

          .goods {
            width: 50%;
            padding: 0 10px;

            .goods-img {
              margin-right: 10px;

              img {
                width: 80px;
                height: 80px;
              }
            }

            .name-and-attribute {
              display: flex;
              justify-content: space-between;
              flex-direction: column;

              .goods-attribute {
                font-size: 14px;
                color: #9e9e9e;
                height: 20px;
                display: flex;
                align-items: center;
              }
            }
          }

          .price {
            text-align: center;
            width: 15%;

            .original-price {
              color: #9c9c9c;
              text-decoration: line-through;
            }
          }

          .number {
            width: 10%;
            text-align: center;
          }

          .total_price {
            width: 15%;
            text-align: center;
          }

          .operation {
            width: 10%;
            text-align: center;
          }
        }
      }
    }

    .no-order {
      font-size: 30px;
      margin-top: 20px;
      color: #9e9e9e;
    }
  }

  .fenye {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
</style>
