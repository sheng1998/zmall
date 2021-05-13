<template>
  <div class="manage-goods-list">
    <div class="xmf-system-flex fzzj">商品管理</div>
    <!-- 商品列表 -->
    <el-card class="goods-list-table">
      <el-row class="addgoods-btn">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
      </el-row>
      <el-table :data="goodsList" stripe style="width: 100%" border>
        <el-table-column prop="date" label="id" width="120" sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="500"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column prop="address" label="图片" align="center">
        </el-table-column>
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
                    @click="editGoods(scope.row)"
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
                    @click="deleteGoods(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <div class="fenye">
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
export default {
  data () {
    return {
      currentPage: 1,
      goodsList: [
        {
          date: '20160502',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '20160504',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 添加商品
    addGoods () {
      console.log('goods')
      // 跳转到商品添加页面
      this.$router.push({ name: 'addgoods' })
    },

    // 编辑商品
    editGoods (goods) {
      console.log(goods)
      // 跳转到商品编辑页面
      this.$router.push({ name: 'editgoods' })
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
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less">
.manage-goods-list {
  .goods-list-table {
    .addgoods-btn {
      margin-bottom: 20px;
    }
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
