<template>
  <div class="stock-warning">
    <div class="xmf-system-flex fzzj">库存预警</div>
    <el-table :data="goodsList" style="width: 100%" border>
      <!-- 图片 -->
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <div class="goods-imglist">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击图片可以进行大图预览"
              placement="top-end"
            >
              <el-image
                :src="scope.row.img_list[0]"
                :preview-src-list="scope.row.img_list"
              ></el-image>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <!-- 商品编码-->
      <el-table-column
        prop="_id"
        label="商品编码"
        align="center"
        width="220"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <!-- 名称 -->
      <el-table-column
        prop="goods_name"
        label="商品名称"
        align="center"
        width="300"
        sortable
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <!-- 描述 -->
      <el-table-column
        prop="describe"
        label="商品描述"
        align="center"
        width="300"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <!-- 商品分类 -->
      <el-table-column
        prop="classification"
        label="商品分类"
        align="center"
        width="140"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <!-- 库存 -->
      <el-table-column
        prop="goods_number"
        label="库存（件）"
        width="140"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          <div style="color: tomato;font-size: 18px;">
            {{ scope.row.goods_number }}
          </div>
        </template>
      </el-table-column>

      <!-- 总销量 -->
      <el-table-column
        prop="total_sales"
        label="总销量（件）"
        width="140"
        sortable
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <!-- 价格 -->
      <el-table-column
        prop="price"
        label="价格（元）"
        width="140"
        sortable
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.price | fmtAmount }}元</div>
        </template>
      </el-table-column>

      <!-- 在售状态 -->
      <el-table-column label="在售状态" width="120" align="center">
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

      <!-- 商品添加时间 -->
      <el-table-column
        prop="created_time"
        label="商品添加时间"
        width="160"
        sortable
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.created_time | fmtdate2 }}</div>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" fixed="right" align="center" width="120">
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
                  @click="deleteGoods(scope.row._id)"
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
      let text = goods.onsale ? '上架' : '下架'
      goods.onsale = !goods.onsale
      this.$confirm(`是否要${text}该商品?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/alter/goods/state', {
              params: {
                goods_id: goods._id,
                state: !goods.onsale
              }
            })
            .then(res => {
              let {
                meta: { msg, status }
              } = res.data
              if (status === 200) {
                this.$message.success(`${text}商品成功！`)
                goods.onsale = !goods.onsale
                this.getStockWarningGoods()
              } else {
                goods.onsale = goods.onsale
                this.$message.error(msg)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + text
          })
        })
    },

    // 编辑商品
    toEditGoods (goods) {
      // 跳转到商品编辑页面
      this.$router.push({
        path: `/goods/manage/editgoods?goods_id=${goods._id}`
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
      max-width: 180px;
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

  .fenye {
    margin-top: 20px;
  }
}
</style>
