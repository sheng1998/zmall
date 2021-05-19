<template>
  <div class="goods-order">
    <div class="xmf-system-flex fzzj">订单管理</div>
    <el-card>
      <el-table
        :data="orderList"
        border
        style="width: 100%"
        class="order-table"
      >
        <!-- 订单号 -->
        <el-table-column label="订单号" width="180" align="center">
          <template slot-scope="scope">
            <div class="order-id">
              {{ scope.row.order_id }}
            </div>
          </template>
        </el-table-column>

        <!-- 订单时间 -->
        <el-table-column label="下订时间" width="160" align="center">
          <template slot-scope="scope">
            <div class="created-time">
              {{ scope.row.created_time | fmtdate2 }}
            </div>
          </template>
        </el-table-column>

        <!-- 客户昵称 -->
        <el-table-column
          label="客户昵称"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="username ellipsis">
              {{ scope.row.username }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品名称 -->
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="300"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="goods-name ellipsis">
              {{ scope.row.goods_name }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品图片 -->
        <el-table-column
          prop="name"
          label="商品图片"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div class="goods-img ellipsis">
              <el-image
                :src="scope.row.goods_img"
                :preview-src-list="scope.row.goods_imglist"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>

        <!-- 商品属性 -->
        <el-table-column
          prop="name"
          label="商品属性"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="goods-attribute ellipsis">
              {{ scope.row.goods_attribute }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品单价 -->
        <el-table-column
          prop="name"
          label="商品单价（元）"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div class="goods-price ellipsis">
              {{ scope.row.goods_price | fmtAmount }}
            </div>
          </template>
        </el-table-column>

        <!-- 购买数量 -->
        <el-table-column
          prop="goods_number"
          label="购买数量"
          width="80"
          align="center"
        >
        </el-table-column>

        <!-- 实际付款 -->
        <el-table-column
          label="实际付款"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="total-price ellipsis">
              {{ scope.row.total_price | fmtAmount }}
            </div>
          </template>
        </el-table-column>

        <!-- 收货人 -->
        <el-table-column
          label="收货人"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="consignee-name ellipsis">
              {{ scope.row.consignee_name }}
            </div>
          </template>
        </el-table-column>

        <!-- 联系电话 -->
        <el-table-column label="联系电话" width="120" align="center">
          <template slot-scope="scope">
            <div class="contact-number ellipsis">
              {{ scope.row.contact_number }}
            </div>
          </template>
        </el-table-column>

        <!-- 收货地址 -->
        <el-table-column
          label="收货地址"
          min-width="300"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="receiving-address ellipsis">
              {{ scope.row.receiving_address }}
            </div>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template>
            <el-row>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="fenye" v-if="pagingForm.totalDate > 10">
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
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 订单列表
      orderList: [
        {
          order_id: '05191323564312060134',
          created_time: '2016-05-03',
          username: '王小虎王小虎王小虎王小虎',
          goods_name: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路',
          goods_img:
            'http://127.0.0.1:3002/uploads/goods/test/869db930b54011ebbb3677c245962c19.jpg',
          goods_imglist: [
            'http://127.0.0.1:3002/uploads/goods/test/869db930b54011ebbb3677c245962c19.jpg'
          ],
          goods_attribute: '我是属性我是属性我是属性我是属性',
          goods_price: 12999.0,
          goods_number: 2,
          total_price: 12999 * 20,
          consignee_name: '王小虎王小虎王小虎王小虎',
          receiving_address:
            '广东省湛江市麻章区海大路1号广东海洋大学西区海思B220 庄值升收货你啊活呢啦啦啦啦啦啦啦啦绿',
          contact_number: '18475140601'
        },
        {
          order_id: '21051913235643060134',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [5, 10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 5, // 每页显示数据条数
        totalDate: 0 // 数据总数
      }
    }
  },

  created () {
    // this.$axios.get('/order/list')
  },

  mounted () {},

  methods: {
    // 获取订单数据
    getOrder () {
      console.log('111')
    },

    // 每页显示条数改变
    handleSizeChange (val) {
      this.pagingForm.dataNumber = val
      this.getOrder()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getOrder()
    }
  }
}
</script>

<style lang="less">
.goods-order {
  .order-table {
    .goods-img {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 40px;
        width: auto;
      }
    }

    .goods-attribute {
      color: #b0b0b0;
    }
  }
}
</style>
