<template>
  <div class="manage-carousel">
    <div class="xmf-system-flex fzzj">商城首页轮播图管理</div>
    <!-- 轮播图表格--已上传 -->
    <div class="carousel-table already-uploads-table">
      <div class="already-uploads">已经上传的轮播图</div>
      <el-table :data="carouselList" border style="width: 100%">
        <!-- # -->
        <el-table-column label="#" type="index" width="80" align="center">
        </el-table-column>

        <!-- 图片 -->
        <el-table-column prop="name" label="图片" align="center">
          <template slot-scope="scope">
            <div>
              <el-image fit="cover" :src="scope.row.carousel_url"></el-image>
              <div class="with-goods">
                <span>绑定商品：</span>
                {{ scope.row.goods_name }}
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div>
              <el-row>
                <!-- 置顶轮播图 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="置顶该轮播图，设置该图片为首页显示的第一张轮播图。"
                  placement="top-end"
                >
                  <el-button
                    size="mini"
                    plain
                    type="success"
                    icon="el-icon-top"
                    circle
                    @click="topCarousel(scope.row)"
                  ></el-button>
                </el-tooltip>

                <!-- 删除轮播图 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除该轮播图"
                  placement="top-end"
                >
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteCarousel(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 上传轮播图 -->
    <div class="uploads-carousel">
      <div class="choice-carousel">
        请在加号处选择轮播图上传，然后在下方表格中预览并确定上传作为轮播图。
      </div>
      <el-upload
        action="http://127.0.0.1:3002/uploads"
        list-type="picture-card"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <!-- 轮播图表格--未上传 -->
    <div
      class="carousel-table not-uploads-table"
      v-if="notUploadsImgList.length"
    >
      <div class="not-uploads">未上传的轮播图</div>
      <el-table :data="notUploadsImgList" border style="width: 100%">
        <!-- # -->
        <el-table-column label="#" type="index" width="80" align="center">
        </el-table-column>

        <!-- 图片 -->
        <el-table-column prop="name" label="图片" align="center">
          <template slot-scope="scope">
            <div>
              <el-image fit="cover" :src="scope.row.url"></el-image>
            </div>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div>
              <el-row>
                <!-- 删除轮播图 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除该轮播图"
                  placement="top-end"
                >
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteNotUploadsCarousel(scope.row)"
                  ></el-button>
                </el-tooltip>

                <!-- 上传轮播图 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="上传该轮播图"
                  placement="top-end"
                >
                  <el-button
                    size="mini"
                    plain
                    type="success"
                    icon="el-icon-upload"
                    circle
                    @click="showDia(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 上传轮播图绑定商品 id 的对话框 -->
    <el-dialog
      title="绑定商品"
      :visible.sync="dialogFormVisible"
      @closed="closedDia"
    >
      <el-form :model="form">
        <el-form-item label="绑定商品id" label-width="120px">
          <el-input v-model="form.goods_id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadsCarousel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselList: [],
      notUploadsImgList: [],
      form: {
        goods_id: '',
        carousel: {}
      },
      dialogFormVisible: false
    }
  },

  created () {
    this.getCarouselList()
    if (this.$mycookie.getCookie('notUploadsImgList')) {
      this.notUploadsImgList = JSON.parse(
        this.$mycookie.getCookie('notUploadsImgList')
      )
    }
  },

  mounted () {},

  methods: {
    // 获取轮播图数据
    getCarouselList () {
      this.$axios.get('/carousel').then(res => {
        let status = res.data.meta.status
        let data = res.data.data
        if (status === 200) {
          this.carouselList = data.carouselList
        }
      })
    },

    // 置顶轮播图
    topCarousel (carousel) {
      this.$axios.post('/top/carousel', { id: carousel._id }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success('置顶成功！')
          this.getCarouselList()
        } else {
          this.$message.error('置顶失败！')
        }
      })
    },

    // 删除轮播图
    deleteCarousel (carousel) {
      if (this.carouselList.length <= 2) {
        return this.$message.warning('删除失败，至少保留两张图片作为轮播图！')
      }
      this.$confirm('是否删除该轮播图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/delete/carousel', {
              id: carousel._id
            })
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message.success('删除成功！')
                this.getCarouselList()
              } else {
                this.$message.error('删除失败！')
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

    // 删除未上传的轮播图
    deleteNotUploadsCarousel (carousel) {
      this.$confirm('是否删除该轮播图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let temArr = this.notUploadsImgList.filter(item => {
            return item.url !== carousel.url
          })
          this.notUploadsImgList = temArr
          this.$mycookie.setCookie(
            'notUploadsImgList',
            JSON.stringify(this.notUploadsImgList),
            60 * 60
          )
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

    // 选择图片上传到临时地址成功
    handleSuccess (response) {
      this.notUploadsImgList.push(response.data)
      this.$mycookie.setCookie(
        'notUploadsImgList',
        JSON.stringify(this.notUploadsImgList),
        60 * 60
      )
    },

    // 上传轮播图
    uploadsCarousel () {
      this.$axios.post('/uploads/carousel', this.form).then(res => {
        let status = res.data.meta.status
        if (status === 200) {
          this.$message.success('上传成功！')
          let temArr = this.notUploadsImgList.filter(item => {
            return item.url !== this.form.carousel.url
          })
          this.notUploadsImgList = temArr
          this.$mycookie.setCookie(
            'notUploadsImgList',
            JSON.stringify(this.notUploadsImgList),
            60 * 60
          )
          this.getCarouselList()
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },

    // 显示绑定商品 id 对话框
    showDia (carousel) {
      if (this.carouselList.length >= 10) {
        return this.$message.warning('上传失败，最多允许有10张图片作为轮播图！')
      }
      this.dialogFormVisible = true
      this.form.carousel = carousel
    },

    // 关闭对话框触发
    closedDia () {
      this.form.goods_id = ''
      this.form.carousel = {}
    }
  }
}
</script>

<style lang="less">
.manage-carousel {
  .already-uploads-table {
    .already-uploads {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      font-size: 18px;
      font-weight: 700;
      color: tomato;
    }

    .with-goods {
      border-top: 1px solid #ebeef5;
      padding-top: 10px;
      box-sizing: border-box;
      text-align: left;
      span {
        font-size: 16px;
      }
    }
  }

  .not-uploads-table {
    margin-top: 30px;
    .not-uploads {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      font-size: 18px;
      font-weight: 700;
      color: turquoise;
    }
  }
  .uploads-carousel {
    margin-top: 30px;

    .el-upload-list.el-upload-list--picture-card {
      display: none;
    }

    .choice-carousel {
      font-size: 18px;
      font-weight: 700;
      color: tomato;
      margin-bottom: 10px;
    }
  }
}
</style>
