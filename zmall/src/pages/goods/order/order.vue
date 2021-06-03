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
            <span class="order-time">{{ order.created_time | fmtdate }}</span>
            <span class="order-title">订单号：</span>
            <span class="order-number">{{ order._id }}</span>
          </div>

          <!-- 订单商品信息 -->
          <div class="body xmf-flex-only">
            <!-- 商品图片等信息 -->
            <router-link
              :to="'/goods/details/main?goodsId=' + order.goods_id"
              class="goods xmf-flex-only"
            >
              <div class="goods-img">
                <el-image
                  :src="order.goods_info.img_list[0]"
                  alt=""
                ></el-image>
              </div>
              <div class="name-and-attribute">
                <div class="goods-name">
                  {{ order.goods_info.goods_name }}
                </div>
                <div class="goods-attribute">
                  {{ order.goods_attribute }}
                </div>
              </div>
            </router-link>

            <!-- 价格 -->
            <div class="price xmf-flex">
              <div
                v-if="
                  order.goods_info.discount_price !==
                    order.goods_info.original_price
                "
              >
                <div class="original-price">
                  {{ order.goods_info.original_price | fmtAmount }} 元
                </div>
                <div class="discount-price">
                  {{ order.goods_info.discount_price | fmtAmount }} 元
                </div>
              </div>
              <div v-else>{{ order.price | fmtAmount }} 元</div>
            </div>

            <!-- 数量 -->
            <div class="number xmf-flex">
              {{ order.number }}
            </div>

            <!-- 实际付款 -->
            <div class="total_price xmf-flex">
              {{ order.total_price | fmtAmount }} 元
            </div>

            <!-- 操作 -->
            <div class="operation xmf-flex">
              <!-- 删除订单 -->
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteGoods(order._id)"
              ></el-button>

              <!-- 查看收货地址 -->
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-view"
                circle
                @click="seeDelivery(order._id)"
              ></el-button>

              <!-- 发表评论 -->
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-edit-outline"
                circle
                @click="showMakeCommentDia(order)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="xmf-flex no-order" v-else>暂无订单</div>
    </div>

    <!-- 分页 -->
    <div class="fenye xmf-flex" v-if="pagingForm.totalDate > 5">
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

    <!-- 收货地址对话框 -->
    <el-dialog
      title="收货地址"
      :visible.sync="dialogTableVisible"
      @closed="clearDeliveryInfo"
      class="delivery-dia"
    >
      <el-table :data="deliveryInfo" border>
        <el-table-column
          property="name"
          label="姓名"
          align="center"
          width="150"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          property="address"
          label="详细地址"
          align="center"
          min-width="400"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          property="phone"
          label="联系电话"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 发表评论对话框 -->
    <el-dialog
      title="发表评论"
      :visible.sync="makeCommentDia"
      @closed="closedMakeCommentDia"
      class="make-comment-dia"
    >
      <el-form :model="commentForm" :rules="commentRules" ref="ruleForm">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="100px" prop="goods_name">
          <el-input
            disabled
            v-model="commentForm.goods_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 商品评分 -->
        <el-form-item
          label="评价"
          label-width="100px"
          class="score"
          prop="stars"
        >
          <el-rate v-model="commentForm.stars" show-text :colors="colors">
          </el-rate>
        </el-form-item>

        <!-- 评论 -->
        <el-form-item label="评论" label-width="100px" prop="text">
          <el-input
            type="textarea"
            :rows="2"
            v-model="commentForm.text"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 添加图片 -->
        <el-form-item label="添加图片" label-width="100px">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3002/uploads"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-remove="fileRemove"
            :file-list="fileList"
            :limit="7"
            :on-exceed="fileExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="makeCommentDia = false">取 消</el-button>
        <el-button type="primary" @click="makeComment('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import xmfFixedBottom from '../../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../../components/header/header'
export default {
  data () {
    return {
      userId: '',
      orderList: [],

      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [5, 10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 5, // 每页显示数据条数
        totalDate: 0 // 数据总数
      },

      // 收货地址信息相关
      dialogTableVisible: false,
      deliveryInfo: [],

      // 发表评论相关
      makeCommentDia: false,
      // 评论内容表单
      commentForm: {
        goods_id: '',
        goods_name: '',
        goods_attribute: '',
        text: '',
        stars: 5,
        img_list: []
      },
      // 评论内容表单验证规则
      commentRules: {
        goods_name: [
          { required: true, message: '请选择商品名称', trigger: 'blur' }
        ],
        stars: [{ required: true, message: '请评价商品', trigger: 'blur' }],
        text: [{ required: true, message: '请填写评论', trigger: 'blur' }]
      },
      // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      // 商品评论图片列表
      fileList: []
    }
  },

  created () {
    this.userId = this.$route.query.userId
    let loginInfo = this.$mycookie.get('loginInfo')
    if (loginInfo && JSON.parse(loginInfo).user_id === this.userId) {
      this.getOrderList()
    } else {
      this.$message.warning('登录信息过期，或用户不存在！')
      this.$router.replace({ path: '/404' })
    }
  },

  mounted () {},

  methods: {
    // 获取订单数据
    getOrderList () {
      this.$axios
        .get('/order', {
          params: {
            user_id: this.userId,
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.orderList = res.data.orderList
            this.pagingForm.totalDate = res.data.totalGoods
          } else {
            this.$message.error(res.data.msg)
            this.$router.replace({ path: '/404' })
          }
        })
    },

    // 删除订单
    deleteGoods (id) {
      this.$confirm('是否删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/delete/order/byid', {
              params: {
                id
              }
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  offset: 55
                })
                this.getOrderList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg,
                  offset: 55
                })
              }
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

    // 查看收货地址
    seeDelivery (id) {
      this.orderList.forEach(item => {
        if (item._id === id) {
          this.deliveryInfo = []
          this.deliveryInfo.push({
            name: item.delivery.name,
            address: item.delivery.address,
            phone: item.delivery.phone
          })
        }
      })
      this.dialogTableVisible = true
    },

    // 显示发表评论对话框
    showMakeCommentDia (order) {
      this.commentForm.goods_id = order.goods_id
      this.commentForm.goods_name = order.goods_info.goods_name
      this.commentForm.goods_attribute = order.goods_attribute
      this.makeCommentDia = true
    },

    // 关闭发表评论对话框
    closedMakeCommentDia () {
      this.commentForm.goods_id = ''
      this.commentForm.goods_name = ''
      this.commentForm.goods_attribute = ''
      this.commentForm.text = ''
      this.commentForm.stars = 5
      this.commentForm.img_list = []
      this.fileList = []
    },

    // 图片上传之前触发该方法，用户校验文件类型和文件大小
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message({
          message: '上传头像图片只能是 JPG 或 PNG 格式!',
          type: 'error',
          offset: 80
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          offset: 80
        })
      }
      return (isJPG || isPNG) && isLt2M
    },

    // 图片上传成功
    uploadSuccess (response, file, fileList) {
      this.fileList = fileList
    },

    // 移除已经上传的图片
    fileRemove (file, fileList) {
      this.fileList = fileList
    },

    // 图片上传超过上限
    fileExceed (files, fileList) {
      this.$message({
        message: '最多可上传7张商品图片！',
        type: 'error',
        offset: 80
      })
    },

    // 发表评论
    makeComment (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 处理图片
          this.fileList.forEach(file => {
            this.commentForm.img_list.push(file.response.data.tmp_path)
          })
          this.$axios
            .post('/make/comment', {
              user_id: this.userId,
              goods_id: this.commentForm.goods_id,
              goods_attribute: this.commentForm.goods_attribute,
              comments: {
                text: this.commentForm.text,
                stars: this.commentForm.stars,
                img_list: this.commentForm.img_list
              }
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: '评论发表成功，可前往该商品的详情页面查看！',
                  type: 'success',
                  offset: 80
                })
                this.makeCommentDia = false
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  offset: 80
                })
              }
            })
        } else {
          return false
        }
      })
    },

    // 清空收货信息表格信息
    clearDeliveryInfo () {
      this.deliveryInfo = []
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
                height: 60px;
              }
            }

            .name-and-attribute {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              padding: 10px 0;

              .goods-name {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #000;
                font-size: 14px;
              }

              .goods-attribute {
                font-size: 12px;
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

  .delivery-dia {
    .el-dialog {
      width: 60%;

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
  }

  .make-comment-dia {
    .score {
      .el-form-item__content {
        display: flex;
        align-items: center;
        height: 40px;
      }
    }
  }
}
</style>
