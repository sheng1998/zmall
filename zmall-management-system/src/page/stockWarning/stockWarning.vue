<template>
  <div class="stock-warning">
    <el-table :data="goodsList" stripe style="width: 100%" border>
      <!-- 名称 -->
      <el-table-column prop="goods_name" label="名称" align="center" sortable>
      </el-table-column>

      <!-- 图片 -->
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <div class="goods-imglist">
            <el-carousel
              trigger="click"
              height="50px"
              :interval="5000"
              indicator-position="none"
            >
              <el-carousel-item v-for="img in scope.row.img_list" :key="img">
                <el-image
                  fit="cover"
                  :src="img"
                  :preview-src-list="scope.row.img_list"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>
      </el-table-column>

      <!-- 库存 -->
      <el-table-column
        prop="goods_number"
        label="库存"
        width="100"
        sortable
        align="center"
      >
      </el-table-column>

      <!-- 月销 -->
      <el-table-column
        prop="monthly_sales"
        label="月销量"
        width="100"
        sortable
        align="center"
      >
      </el-table-column>

      <!-- 总销量 -->
      <el-table-column
        prop="total_sales"
        label="总销量"
        width="100"
        sortable
        align="center"
      >
      </el-table-column>

      <!-- 价格 -->
      <el-table-column
        prop="price"
        label="价格"
        width="100"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.price | fmtAmount }}元</div>
        </template>
      </el-table-column>

      <!-- 是否上架 -->
      <el-table-column label="是否上架" width="120" align="center">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.onsale"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(scope.row)"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <div>
            <el-row>
              <!-- 编辑商品 -->
              <el-tooltip
                class="item"
                effect="light"
                content="编辑商品信息"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  plain
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="toEditGoods(scope.row)"
                ></el-button>
              </el-tooltip>

              <!-- 删除商品 -->
              <el-tooltip
                class="item"
                effect="light"
                content="删除该商品"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteGoods(scope.row.goods_id)"
                ></el-button>
              </el-tooltip>
            </el-row>
          </div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [],
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
    this.getStockWarningGoods()
  },
  mounted () {},
  methods: {
    // 获取库存预警商品
    getStockWarningGoods () {
      this.$store.dispatch('getWarningGoodsNumber')
      this.$axios
        .get('/stockwarning/goodslist', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber
          }
        })
        .then(res => {
          let goodsList = res.data.goods_list
          if (res.data.meta.status === 200) {
            this.pagingForm.totalDate = res.data.totalGoods
            goodsList.forEach(item => {
              item.onsale = item.is_sale === 1
            })
            this.goodsList = goodsList
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
    },

    // 编辑商品上架状态
    changeState (goods) {
      goods.onsale = true
      this.$confirm('是否要下架该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          goods.onsale = false
          this.$axios
            .get('/alter/goods/state', {
              params: {
                goods_id: goods.goods_id,
                state: false
              }
            })
            .then(res => {
              let {
                meta: { msg, status }
              } = res.data
              if (status === 200) {
                this.$message.success('下架商品成功！')
                this.getStockWarningGoods()
              } else {
                goods.onsale = true
                this.$message.error(msg)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          })
        })
    },

    // 编辑商品
    toEditGoods (goods) {
      // 跳转到商品编辑页面
      this.$router.push({
        path: `/goods/manage/editgoods?goods_id=${goods.goods_id}`
      })
    },

    // 删除商品
    deleteGoods (id) {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get('/delete/goods', { params: { id } }).then(res => {
            let {
              meta: { msg, status }
            } = res.data
            if (status === 200) {
              this.$message.success('删除商品成功！')
              this.getStockWarningGoods()
            } else {
              this.$message.error(msg)
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
      this.getStockWarningGoods()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getStockWarningGoods()
    }
  }
}
</script>

<style lang="less">
.stock-warning {
  .goods-imglist {
    img {
      height: 50px;
      width: auto;
    }
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
