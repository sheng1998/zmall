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
      <div style="width: 80%">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <!-- 商品信息 -->
          <el-table-column label="商品信息">
            <template slot-scope="scope">
              <div class="xmf-flex-only goods_info">
                <div class="goods_info_img">
                  <el-image :src="scope.row.goods_info.img" alt=""></el-image>
                </div>
                <div>
                  <div class="name">
                    {{ scope.row.goods_info.name }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- 单价 -->
          <el-table-column label="单价" width="150">
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
          <el-table-column prop="name" label="数量" width="150">
            <template slot-scope="scope">
              <div class="number">
                <el-input-number
                  v-model="scope.row.number"
                  @change="handleChange"
                  :min="1"
                  label="描述文字"
                  size="mini"
                ></el-input-number>
              </div>
            </template>
          </el-table-column>

          <!-- 金额 -->
          <el-table-column prop="name" label="金额" width="150">
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

    <div class="fenye xmf-flex" v-if="tableData.length > 0">
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

    <!-- 底部商品统计信息 -->
    <div class="summary">
      <!-- 已选商品件数 -->
      <div class="all-goods-number">
        已选商品 <span>{{ total_numer }}</span> 件
      </div>
      <!-- 合计 -->
      <div class="total">
        合计： <span>{{ total_price }} 元</span>
      </div>
      <!-- 结算按钮 -->
      <div class="settlement">
        <el-button type="warning">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import xmfToHome from '../../../components/toHome/toHome'
import xmfHeader from '../../../components/header/header'
export default {
  data () {
    return {
      tableData: [
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i4/1071273746/O1CN01gOaT7E1dXiFRCyajb_!!1071273746.jpg_80x80.jpg',
            name: '小西瓜种子种籽黄心黄瓤阳台四季盆栽无籽孑南方嫁接麒麟8424苗秧'
          },
          price: 12.1,
          discount_price: 12.1,
          original_price: 12.1,
          number: 1
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        },
        {
          goods_info: {
            img:
              'https://img.alicdn.com/bao/uploaded/i2/2978398582/O1CN01Jt84H82DGbge9vArJ_!!2978398582.jpg_80x80.jpg',
            name: '中国香港港版港货黄道益活络油原装代购正品跌打损伤舒筋活络50ml'
          },
          price: 75.0,
          discount_price: 75.0,
          original_price: 128.0,
          number: 1,
          total_price: 75.0
        }
      ],
      multipleSelection: [],
      currentPage: 1
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleChange () {
      console.log('change')
    },

    // 删除商品
    deleteGoods (goods) {
      console.log(goods)
      this.$confirm('是否删除该商品?', '提示', {
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

    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
    margin-top: 80px;

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

    .goods_info {
      .goods_info_img {
        img {
          width: 80px;
          height: 80px;
        }
      }

      .name {
        margin-left: 10px;
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
}
</style>
