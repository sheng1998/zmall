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
        class="upload-demo"
        drag
        multiple
        :show-file-list="false"
        action="http://127.0.0.1:3002/uploads"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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

    <!-- 上传轮播图绑定商品对话框 -->
    <el-dialog
      title="绑定商品"
      :visible.sync="dialogFormVisible"
      @closed="closedDia"
    >
      <el-form :model="goodsStarp" class="carousel-goods-starp">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="120px">
          <el-select
            v-model="goodsStarp.value"
            filterable
            remote
            clearable
            placeholder="请输入商品名称"
            :remote-method="remoteMethod"
            :loading="goodsStarp.loading"
            @change="selectChange"
            popper-class="carousel-search-select"
          >
            <el-option
              v-for="item in goodsStarp.options"
              :key="item.goods_id"
              :label="item.goods_name"
              :value="item.goods_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 商品id -->
        <el-form-item label="已选择商品的id" label-width="120px">
          <el-input
            disabled
            v-model="goodsStarp.value"
            placeholder="未选择商品"
          ></el-input>
        </el-form-item>

        <!-- 商品图片预览 -->
        <el-form-item
          label="商品图片预览"
          class="goods-img"
          label-width="120px"
          v-if="goodsStarp.value"
        >
          <template>
            <div>
              <el-carousel height="200px" indicator-position="none">
                <el-carousel-item
                  v-for="item in goodsStarp.goodsImgList"
                  :key="item"
                >
                  <el-image
                    fit="cover"
                    :src="item"
                    :preview-src-list="goodsStarp.goodsImgList"
                  ></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-form-item>
        <!-- 商品图片预览 -->
        <el-form-item
          label="商品图片预览"
          class="goods-img"
          label-width="120px"
          v-else
        >
          <el-input disabled value="未选择商品"></el-input>
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
      dialogFormVisible: false,
      // 绑定商品对话框相关数据
      goodsStarp: {
        carousel: {},
        options: [],
        value: '',
        list: [],
        loading: false,
        goodsImgList: []
      }
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
      if (!this.goodsStarp.value) {
        return this.$message.error('请先选择要绑定的商品！')
      }
      this.$axios
        .post('/uploads/carousel', {
          goods_id: this.goodsStarp.value,
          tmp_path: this.goodsStarp.carousel.tmp_path
        })
        .then(res => {
          let status = res.data.meta.status
          if (status === 200) {
            this.$message.success('上传成功！')
            let temArr = this.notUploadsImgList.filter(item => {
              return item.url !== this.goodsStarp.carousel.url
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

    // 显示绑定商品对话框
    showDia (carousel) {
      if (this.carouselList.length >= 10) {
        return this.$message.warning('上传失败，最多允许有10张图片作为轮播图！')
      }
      this.dialogFormVisible = true
      console.log(carousel)
      this.goodsStarp.carousel = carousel
    },

    // 远程搜索商品
    remoteMethod (query) {
      if (query !== '') {
        this.goodsStarp.loading = true
        this.$axios
          .get('/goods/withname', {
            params: {
              query
            }
          })
          .then(res => {
            let {
              data,
              meta: { msg, status }
            } = res.data
            if (status === 200) {
              this.goodsStarp.options = data.goods_list
              this.goodsStarp.loading = false
            } else {
              this.$message.error(msg)
              this.goodsStarp.options = []
            }
          })
      } else {
        this.goodsStarp.options = []
      }
    },

    // 可搜索下拉选择器选中值改变
    selectChange () {
      if (this.goodsStarp.value) {
        this.goodsStarp.options.forEach(item => {
          if (item.goods_id === Number(this.goodsStarp.value)) {
            this.goodsStarp.goodsImgList = item.img_list
          }
        })
      }
    },

    // 关闭对话框触发
    closedDia () {
      this.goodsStarp.carousel = {}
      this.goodsStarp.options = []
      this.goodsStarp.value = ''
      this.goodsStarp.list = []
      this.goodsStarp.loading = false
      this.goodsStarp.goodsImgList = []
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

    .choice-carousel {
      font-size: 18px;
      font-weight: 700;
      color: tomato;
      margin-bottom: 10px;
    }
  }

  .carousel-goods-starp {
    .el-select {
      width: 100%;
    }

    .goods-img {
      .el-carousel__button {
        display: none;
      }

      .el-carousel__item {
        display: flex;
        justify-content: center;
      }

      img {
        height: 200px;
        width: auto;
      }
    }
  }
}

.carousel-search-select {
  max-width: 500px;
}
</style>
