<template>
  <div class="goods-comment">
    <div class="xmf-system-flex fzzj">商品评论管理</div>
    <el-card>
      <!-- 搜索评论 -->
      <el-row class="comment-search-input">
        <el-input
          class="search-input"
          ref="search"
          clearable
          placeholder="搜索评论"
          prefix-icon="el-icon-search"
          v-model="query"
          @keyup.enter.native="getCommentList"
          @blur="getCommentList"
          @input="searchComment"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getCommentList"
          ></el-button>
        </el-input>
      </el-row>

      <!-- 评论列表 -->
      <el-table
        :data="commentList"
        border
        style="width: 100%"
        class="comment-table"
      >
        <!-- 用户评分 -->
        <el-table-column
          prop="comment.stars"
          label="用户评分"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.comment.stars"
              disabled
              text-color="#ff9900"
            >
            </el-rate>
          </template>
        </el-table-column>

        <!-- 评论内容 -->
        <el-table-column
          prop="comment.text"
          label="评论内容"
          min-width="300"
          max-width="400"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="comment-text">
              {{ scope.row.comment.text }}
            </div>
          </template>
        </el-table-column>

        <!-- 评论图片 -->
        <el-table-column label="评论图片" width="150" align="center">
          <template slot-scope="scope">
            <div class="goods-img">
              <el-carousel
                height="40px"
                v-if="scope.row.comment.has_img === 1"
                indicator-position="none"
              >
                <el-carousel-item
                  v-for="item in scope.row.comment.img_list"
                  :key="item"
                >
                  <el-image
                    :src="item"
                    :preview-src-list="scope.row.comment.img_list"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-carousel-item>
              </el-carousel>
              <div v-else>暂无图片</div>
            </div>
          </template>
        </el-table-column>

        <!-- 评论时间 -->
        <el-table-column
          label="评论时间"
          prop="comment.created_time"
          width="160"
          align="center"
          sortable
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="created-time ellipsis">
              {{ scope.row.comment.created_time | fmtdate2 }}
            </div>
          </template>
        </el-table-column>

        <!-- 评论用户 -->
        <el-table-column
          label="评论用户"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="ellipsis">
              {{ scope.row.user.username }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品名称 -->
        <el-table-column
          prop="goods.goods_name"
          label="商品名称"
          width="300"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="goods-name ellipsis">
              {{ scope.row.goods.goods_name }}
            </div>
          </template>
        </el-table-column>

        <!-- 商品属性 -->
        <el-table-column
          prop="comment.goods_attribute"
          label="商品属性"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div class="goods-attribute ellipsis">
              {{ scope.row.comment.goods_attribute }}
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
                @click="deleteComment(scope.row._id)"
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
      // 评论列表
      commentList: [],

      // 搜索内容
      query: '',

      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [5, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 5, // 每页显示数据条数
        totalDate: 0 // 数据总数
      }
    }
  },

  created () {
    this.getCommentList()
  },

  mounted () {},

  methods: {
    // 获取订单数据
    getCommentList () {
      this.$axios
        .get('/comment/list', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber,
            query: this.query
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.pagingForm.totalDate = res.data.totalComment
            this.commentList = res.data.data
          }
        })
    },

    // 搜索评论
    searchComment () {
      this.$debounce.use(
        () => {
          this.getCommentList()
        },
        500,
        true
      )
    },

    // 删除评论
    deleteComment (id) {
      this.$confirm('是否删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get('/delete/comment', { params: { id } }).then(res => {
            if (res.data.status === 200) {
              this.$message.success('删除评论成功！')
              this.getCommentList()
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
      this.getCommentList()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getCommentList()
    }
  }
}
</script>

<style lang="less">
.goods-comment {
  .search-input {
    float: right;
    width: 400px;
    margin-bottom: 20px;
  }

  .comment-table {
    .comment-text {
      font-size: 12px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods-img {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-carousel {
        width: 150px;

        .el-carousel__arrow {
          width: 15px;
          height: 15px;

          i {
            font-size: 12px;
          }
        }
      }

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
