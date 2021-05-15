<template>
  <div class="manage-goods-list-offsale">
    <div class="xmf-system-flex fzzj">已下架商品列表</div>
    <!-- 商品列表 -->
    <el-card class="goods-list-table">
      <el-row class="addgoods-search-input">
        <el-input
          class="search-input"
          ref="search"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @keyup.enter.native="searchGoods"
          @blur="searchGoods"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoods"
          ></el-button>
        </el-input>
      </el-row>
      <el-table :data="goodsList" stripe style="width: 100%" border>
        <!-- 名称 -->
        <el-table-column prop="goods_name" label="名称" align="center" sortable>
        </el-table-column>

        <!-- 图片 -->
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <div class="offsale-goods-imglist">
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
    </el-card>

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
      // 搜索框内容
      searchValue: '',
      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [5, 10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 5, // 每页显示数据条数
        totalDate: 0, // 数据总数
        query: '' // 查询内容
      },
      goodsList: []
    }
  },

  created () {
    this.getOffSaleGoodsList()
    this.$nextTick(() => {
      this.$refs.search.$refs.input.focus()
    })
  },

  mounted () {},

  methods: {
    // 获取商品列表
    getOffSaleGoodsList () {
      this.$axios
        .get('/goods/offsale', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber,
            query: this.pagingForm.query
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

    // 搜索商品
    searchGoods () {
      if (this.pagingForm.query !== this.searchValue) {
        this.pagingForm.query = this.searchValue
        this.getOffSaleGoodsList()
      }
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
                this.$message.success('上架商品成功！')
                this.$store.dispatch('getWarningGoodsNumber')
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
    .search-input {
      float: right;
      width: 400px;
      margin-bottom: 20px;
    }

    .offsale-goods-imglist {
      img {
        height: 50px;
        width: auto;
      }
    }
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
