<template>
  <div class="manage-goods-list-offsale">
    <div class="xmf-system-flex fzzj">已下架商品列表</div>
    <!-- 商品列表 -->
    <el-card class="goods-list-table">
      <el-table :data="goodsList" stripe style="width: 100%" border>
        <!-- 商品id -->
        <el-table-column
          prop="goods_id"
          label="商品id"
          width="120"
          sortable
          align="center"
        >
        </el-table-column>

        <!-- 名称 -->
        <el-table-column prop="goods_name" label="名称" align="center" sortable>
        </el-table-column>

        <!-- 图片 -->
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <div class="onsale-goods-imglist">
              <el-carousel trigger="click" height="200px" :interval="5000">
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
    </el-card>

    <!-- 分页 -->
    <div class="fenye" v-if="pagingForm.totalDate > 1">
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
      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [1, 2, 4, 6, 8, 10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 1, // 每页显示数据条数
        totalDate: 0 // 数据总数
      },
      goodsList: []
    }
  },

  created () {
    this.getOffSaleGoodsList()
  },

  mounted () {},

  methods: {
    // 获取商品列表
    getOffSaleGoodsList () {
      this.$axios
        .get('/goods/offsale', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber
          }
        })
        .then(res => {
          let status = res.data.meta.status
          let msg = res.data.meta.msg
          let data = res.data.data
          if (status === 200) {
            data.goods_list.forEach(item => {
              item.onsale = false
            })
            this.pagingForm.totalDate = data.totalGoods
            this.goodsList = data.goods_list
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 编辑商品上架状态
    changeState (goods) {
      goods.onsale = false
      this.$confirm('是否要上架该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          goods.onsale = true
          this.$axios
            .get('/alter/goods/state', {
              params: {
                goods_id: goods.goods_id,
                state: true
              }
            })
            .then(res => {
              let {
                meta: { msg, status }
              } = res.data
              if (status === 200) {
                this.$message.success('下架商品成功！')
                this.getOffSaleGoodsList()
              } else {
                goods.onsale = false
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
      console.log(goods)
      // 跳转到商品编辑页面
      this.$router.push({ name: 'editgoods' })
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
              this.getOffSaleGoodsList()
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
      this.getOffSaleGoodsList()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getOffSaleGoodsList()
    }
  }
}
</script>

<style lang="less">
.manage-goods-list-offsale {
  .goods-list-table {
    .onsale-goods-imglist {
      .el-carousel__button {
        display: none;
      }
      img {
        height: 200px;
        width: auto;
      }
    }
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
