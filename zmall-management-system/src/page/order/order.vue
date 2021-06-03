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
        <el-table-column
          prop="_id"
          label="订单号"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="order-id">
              {{ scope.row._id }}
            </div>
          </template>
        </el-table-column>

        <!-- 订单时间 -->
        <el-table-column
          prop="created_time"
          label="下订时间"
          width="160"
          align="center"
          sortable
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="created-time">
              {{ scope.row.created_time | fmtdate2 }}
            </div>
          </template>
        </el-table-column>

        <!-- 客户昵称 -->
        <el-table-column
          prop="username"
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
              {{ scope.row.goods_info.goods_name }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品图片 -->
        <el-table-column
          label="商品图片"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div class="goods-img">
              <el-image
                :src="scope.row.goods_info.img_list[0]"
                :preview-src-list="scope.row.goods_info.img_list"
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
          prop="goods_attribute"
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
          prop="goods_info.price"
          label="商品单价（元）"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="goods-price ellipsis">
              {{ scope.row.goods_info.price | fmtAmount }}
            </div>
          </template>
        </el-table-column>

        <!-- 购买数量 -->
        <el-table-column
          prop="number"
          label="购买数量（件）"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 实际付款 -->
        <el-table-column
          prop="total_price"
          label="实际付款（元）"
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
          prop="delivery.name"
          label="收货人"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="consignee-name ellipsis">
              {{ scope.row.delivery.name }}
            </div>
          </template>
        </el-table-column>

        <!-- 联系电话 -->
        <el-table-column label="联系电话" width="150" align="center">
          <template slot-scope="scope">
            <div class="contact-number ellipsis">
              {{ scope.row.delivery.phone }}
            </div>
          </template>
        </el-table-column>

        <!-- 收货地址 -->
        <el-table-column
          prop="delivery.address"
          label="收货地址"
          min-width="300"
          center
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="receiving-address ellipsis">
              {{ scope.row.delivery.address }}
            </div>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteOrder(scope.row._id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="fenye" v-if="pagingForm.totalDate > 5">
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
      orderList: [],
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
    this.getOrderList()
  },

  mounted () {},

  methods: {
    // 获取订单数据
    getOrderList () {
      this.$axios
        .get('/order/list', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.pagingForm.totalDate = res.data.totalOrder
            this.orderList = res.data.orderList
          }
        })
    },

    // 删除订单
    deleteOrder (id) {
      this.$confirm('是否删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get('/delete/order', { params: { id } }).then(res => {
            if (res.data.status === 200) {
              this.$message.success('删除订单成功！')
              this.getOrderList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 每页显示条数改变
    handleSizeChange (val) {
      this.pagingForm.dataNumber = val
      this.getOrderList()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getOrderList()
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
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
