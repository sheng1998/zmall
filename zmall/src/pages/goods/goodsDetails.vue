<template>
  <div class="goods-details">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 面包屑 -->
    <div class="xmf-breadcrumb">
      <xmf-bread-crumb :breadcrumb="breadcrumb"></xmf-bread-crumb>
    </div>

    <!-- 商品主要信息区域 -->
    <div class="goods-main-message">
      <!-- 左侧图片区域 -->
      <div class="img">
        <div class="big-img">
          <!-- 商品图片轮播图 -->
          <el-carousel
            indicator-position="outside"
            :interval="6000"
            trigger="click"
            height="500px"
          >
            <el-carousel-item v-for="img in goods.img_list" :key="img">
              <el-image
                :src="img"
                alt=""
                :preview-src-list="goods.img_list"
                :z-index="999999"
              >
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 商品右侧信息区域 -->
      <div class="content">
        <!-- 商品名称 -->
        <div class="title">{{ goods.goods_name }}</div>

        <!-- 商品描述 -->
        <div class="goods-describe">{{ goods.describe }}</div>

        <!-- 价格 -->
        <div class="price xmf-flex-align-items-center margin-10-0">
          <div class="price-name">价格:</div>
          <div class="price-number">{{ goods.price | fmtAmount }} 元</div>
        </div>

        <!-- 编码 -->
        <div class="code xmf-flex-align-items-center margin-10-0">
          <div class="code-name" style="min-width: 70px;">商品编码</div>
          <div class="code-number xmf-font-14">{{ goods._id }}</div>
        </div>

        <!-- 属性 -->
        <div
          class="attribute"
          v-for="(item, index) in goods.attribute"
          :key="index"
        >
          <!-- 属性名 -->
          <div class="attribute-name">{{ item.name }}</div>

          <!-- 属性值 -->
          <div class="attribute-item-list">
            <el-radio-group
              v-model="attributeRadio['radio' + index]"
              class="attribute-item"
            >
              <el-radio
                :label="value"
                v-for="(value, index) in item.value"
                :key="index"
              >
                {{ value }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- 商品数量 -->
        <div class="goods-number xmf-flex-only">
          <div class="text">数量：</div>
          <div class="input">
            <el-input-number
              :min="1"
              :max="10 < goods.goods_number ? 10 : goods.goods_number"
              size="mini"
              v-model="goodsNumber"
            ></el-input-number>
          </div>
          <div class="number">库存 {{ goods.goods_number }} 件</div>
        </div>

        <!-- 地址区域 -->
        <div class="address">
          <div class="text">收货地址：</div>
          <div class="default-address">
            {{ userAddress }}
          </div>
        </div>

        <!-- 按钮区域 -->
        <div class="xmf-flex buy-goods-btn">
          <div class="add-to-shopcar">
            <el-button type="danger" @click="addToShopCar"
              >加入购物车</el-button
            >
          </div>
          <div class="now-buy">
            <el-button type="danger" @click="buyNow">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分界线 -->
    <hr />

    <!-- 商品详情、商品参数、用户评价区域 -->
    <div class="goods-details-main">
      <div class="goods-details-nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo xmf-flex-justify-content-center"
          mode="horizontal"
        >
          <!-- 商品详情 -->
          <el-menu-item
            index="/goods/details/main"
            @click="toGoodsOther('main')"
            >商品详情</el-menu-item
          >

          <!-- 规格参数 -->
          <el-menu-item
            index="/goods/details/parameter"
            @click="toGoodsOther('parameter')"
            >商品参数</el-menu-item
          >

          <!-- 用户评论 -->
          <el-menu-item
            index="/goods/details/comment"
            @click="toGoodsOther('comment')"
            >商品评论</el-menu-item
          >
        </el-menu>
      </div>
      <div class="goods-details-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

    <!-- 商品订单弹窗 -->
    <el-dialog
      title="确认订单"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      class="order-dialog"
    >
      <div>
        <div class="delivery item">
          <div class="title">
            收货人信息：<span
              >（如需修改请前往
              <router-link :to="`/personal?userId=${userId}`"
                >个人中心</router-link
              >
              修改）</span
            >
          </div>

          <div class="delivery-details" v-if="delivery.name">
            <div class="tag">
              <el-tag effect="dark" type="info">默认地址</el-tag>
            </div>
            <div class="name">{{ delivery.name }}</div>
            <div class="address">{{ delivery.address }}</div>
            <div class="phone">{{ delivery.phone }}</div>
          </div>

          <div v-else>
            暂无默认地址，请前往
            <router-link :to="`/personal?userId=${userId}`"
              >个人中心</router-link
            >
            设置默认地址
          </div>
        </div>

        <div class="order item">
          <div class="title">订单详情：</div>
          <div class="order-list">
            <div class="order-goods">
              <div class="order-goods-info">
                <div class="goods-img">
                  <el-image
                    v-if="goods.img_list"
                    :src="goods.img_list[0]"
                  ></el-image>
                </div>
                <div class="goods-name-and-attribute">
                  <div class="goods-name">
                    {{ goods.goods_name }}
                  </div>
                  <div class="goods-attribute ellipsis">
                    {{ goodsAttribute }}
                  </div>
                </div>
              </div>

              <div class="order-goods-classification ellipsis">
                {{ goods.classification }}
              </div>

              <div class="order-goods-number xmf-flex">×{{ goodsNumber }}</div>

              <div class="goods-total-price xmf-flex">
                ￥{{ (goods.price * goodsNumber) | fmtAmount }}
              </div>
            </div>
          </div>
        </div>

        <!-- 支付详情 -->
        <div class="type item">
          <div class="title">支付方式：</div>
          <div>
            <span>请选择支付方式：</span>
            <el-radio disabled v-model="radio" label="1">余额支付</el-radio>
          </div>
        </div>

        <!-- 弹窗底部 -->
        <div class="statistics">
          <!-- 已选商品件数 -->
          <div class="all-goods-number">
            已选商品 <span>{{ goodsNumber }}</span> 件
          </div>
          <!-- 合计 -->
          <div class="total">
            合计： <span>{{ (goodsNumber * goods.price) | fmtAmount }} 元</span>
          </div>
          <!-- 结算按钮 -->
          <div class="settlement">
            <el-button type="warning" @click="buyGoods">结 算</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../components/header/header'
import xmfBreadCrumb from '../../components/breadcrumb/breadcrumb'
export default {
  data () {
    return {
      goodsId: '',
      userId: '',

      // 用户地址
      userAddress: '',

      // 面包屑配置
      breadcrumb: [],

      // 属性单选框
      attributeRadio: {},
      goodsAttribute: '',

      // 商品详情
      goods: {},

      // 添加的商品数量
      goodsNumber: 1,

      dialogFormVisible: false,
      radio: '1',
      delivery: {
        name: '',
        address: '',
        phone: ''
      }
    }
  },

  created () {
    this.goodsId = this.$route.query.goodsId
    if (this.$mycookie.get('loginInfo')) {
      this.userId = JSON.parse(this.$mycookie.get('loginInfo')).user_id
      this.$axios
        .get('/user/default/address', {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          let data = res.data.addressInfo
          if (data) {
            this.delivery.name = data.name
            this.delivery.address = data.address_front + data.address_after
            this.delivery.phone = data.phone
          }
        })
    }
    this.getGoodsDetails()
    this.getUserAddress()
  },

  mounted () {},

  methods: {
    // 获取商品详情
    getGoodsDetails () {
      this.$axios
        .get('/goodsdetails', {
          params: {
            goods_id: this.goodsId
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            let goods = res.data.goodsData
            this.goods = goods

            // 整理属性
            let attributeRadio = {}
            goods.attribute.forEach((item, index) => {
              if (item.value.length === 1) {
                attributeRadio['radio' + index] = item.value[0]
              } else {
                attributeRadio['radio' + index] = ''
              }
            })
            this.attributeRadio = attributeRadio

            this.breadcrumb = [
              {
                name: goods.classification,
                path: '#/goods/list?classification=' + goods.classification
              },
              {
                name: goods.goods_name,
                path: '#'
              }
            ]
          } else {
            this.$message.error(res.data.msg)
            this.$router.replace({ path: '/404' })
          }
        })
    },

    // 获取用户默认地址
    getUserAddress () {
      if (!this.userId) {
        return false
      }
      this.$axios
        .get('/user/default/address', {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            let address = res.data.addressInfo
            if (!address) {
              return (this.userAddress = '您还未设置默认收货地址！')
            }
            this.userAddress = address.address_front + address.address_after
          }
        })
    },

    // 加入购物车
    addToShopCar () {
      this.checkAttribute(() => {
        let goodsAttribute = ''
        Object.keys(this.attributeRadio).forEach(item => {
          goodsAttribute += '/' + this.attributeRadio[item]
        })
        goodsAttribute = goodsAttribute.slice(1)
        this.$axios
          .get('/addgoods/tocar', {
            params: {
              goods_id: this.goodsId,
              user_id: this.userId,
              number: this.goodsNumber,
              goods_attribute: goodsAttribute
            }
          })
          .then(res => {
            if (res.data.status === 200) {
              this.$alert('商品已添加至购物车！', '成功提示', {
                confirmButtonText: '确定',
                type: 'success',
                callback: () => {
                  this.goodsNumber = 1
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100,
                duration: 4000
              })
            }
          })
      })
    },

    // 立即购买
    buyNow () {
      this.checkAttribute(() => {
        let goodsAttribute = ''
        Object.keys(this.attributeRadio).forEach(item => {
          goodsAttribute += '/' + this.attributeRadio[item]
        })
        goodsAttribute = goodsAttribute.slice(1)
        this.goodsAttribute = goodsAttribute
        this.dialogFormVisible = true
      })
    },

    // 校验商品属性是否都选择了
    checkAttribute (callback) {
      if (this.userId === '') {
        return this.$notify.error({
          title: '警告',
          message: '请先登录后再操作！',
          offset: 100,
          duration: 4000
        })
      }
      let attribute = ''
      Object.keys(this.attributeRadio).forEach((item, index) => {
        if (
          attribute === '' &&
          (this.attributeRadio[item] === '' ||
            this.attributeRadio[item] === null)
        ) {
          attribute = this.goods.attribute[index].name
        }
      })

      if (attribute === '') {
        if (callback && typeof callback === 'function') {
          callback()
        }
      } else {
        this.$notify.error({
          title: '警告',
          message: '请选择商品的' + attribute,
          offset: 100,
          duration: 2000
        })
      }
    },

    // 前往其他页面
    toGoodsOther (order) {
      if (this.$route.path !== `/goods/details/${order}`) {
        this.$router.replace({
          path: `/goods/details/${order}?goodsId=${this.$route.query.goodsId}`
        })
      }
    },

    // 购买商品
    buyGoods () {
      if (this.delivery.name === '') {
        return this.$message({
          message: '请先选择收货地址！',
          type: 'info',
          offset: 80
        })
      }
      let goodsList = []
      goodsList.push({
        goods_id: this.goodsId,
        number: this.goodsNumber,
        goods_attribute: this.goodsAttribute
      })
      let form = {
        goods_list: goodsList,
        user_id: this.userId,
        delivery: this.delivery
      }
      this.$axios.post('/setuporder', form).then(res => {
        if (res.data.status === 200) {
          this.dialogFormVisible = false
          this.$alert('购买成功！！', '购买成功', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              this.getGoodsDetails()
              this.goodsNumber = 1
            }
          })
        } else {
          this.dialogFormVisible = false
          this.$alert(res.data.msg, '购买失败', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    }
  },

  components: {
    xmfFixedBottom,
    xmfHeader,
    xmfBreadCrumb
  }
}
</script>

<style lang="less">
.goods-details {
  .xmf-breadcrumb {
    margin-bottom: 15px;
    margin-top: 80px;
    margin-left: 50px;
  }

  .goods-main-message {
    width: 100%;
    padding: 10px 50px;
    display: flex;
    box-sizing: border-box;

    & > .img {
      display: inline-block;
      width: 50%;
      padding: 20px 50px;

      .big-img {
        .el-image {
          height: 480px;
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            height: 480px;
            width: auto;
          }
        }
      }
    }

    & > .content {
      display: inline-block;
      width: 50%;

      .goods-describe {
        color: #cccccc;
      }

      .margin-10-0 {
        margin: 25px 0;
      }

      .title {
        font-size: 21px;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .price {
        .price-number {
          color: #ca141d;
          margin-left: 20px;
          font-size: 24px;
        }
      }

      .code {
        .code-number {
          margin-left: 20px;
        }
      }

      .attribute {
        position: relative;
        margin-bottom: 15px;

        .attribute-name {
          position: absolute;
          display: inline-block;
          line-height: 24px;
          width: 70px;
        }

        .attribute-item-list {
          display: inline-block;
          margin-left: 90px;

          .attribute-item {
            .el-radio {
              border: 1px solid #cccccc;
              padding: 4px 6px;
              min-width: 60px;
              border-radius: 3px;
              margin-right: 10px;
              margin-bottom: 3px;

              &.is-checked {
                border: 1px solid #409eff;
              }

              span {
                display: inline-block;
              }

              .el-radio__input {
                display: none;
              }

              .el-radio__label {
                font-weight: 700;
              }
            }
          }
        }

        .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
          display: none;
        }
      }

      .goods-number {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-bottom: 20px;

        .text {
          display: flex;
          justify-content: flex-end;
          width: 70px;
        }

        .input {
          margin-left: 20px;
        }

        .el-input-number--mini {
          width: 100px;
          line-height: 26px;
          margin-right: 10px;
        }

        .number {
          color: #909399;
        }
      }

      .address {
        display: flex;

        .text {
          width: 100px;
        }

        .default-address {
          width: 100%;
          font-size: 14px;
          color: #909399;
        }
      }

      .buy-goods-btn {
        margin-top: 20px;

        .now-buy {
          margin-left: 20px;
        }
      }
    }
  }

  .goods-details-main {
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
  }

  .order-dialog {
    .el-dialog {
      width: 960px;
    }

    .el-dialog__body {
      border-top: 1px solid #9c9c9c;
      padding: 10px 20px;

      .item {
        background-color: #f6f6f6;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;

        .title {
          font-weight: 700;
          font-size: 14px;
          color: black;
          margin-bottom: 10px;
        }

        .order-goods {
          display: flex;

          &:not(:last-child) {
            margin-bottom: 15px;
          }

          .order-goods-info {
            display: flex;
            width: 470px;

            img {
              height: 50px;
              width: auto;
              min-width: 50px;
            }

            .goods-name-and-attribute {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .goods-name {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }

              .goods-attribute {
                color: #cccccc;
                font-size: 0.8em;
                width: 350px;
              }
            }
          }

          .order-goods-classification {
            width: 150px;
            text-align: center;
            margin: auto 0;
          }

          .order-goods-number {
            width: 80px;
          }

          .goods-total-price {
            width: 200px;
            color: #f40;
            font-weight: 700;
          }
        }
      }

      .delivery {
        .title {
          span {
            font-size: 0.8em;
          }
        }

        a {
          color: #409eff;
          text-decoration: underline;
        }

        .delivery-details {
          display: flex;
          align-items: center;

          div:not(:last-child) {
            margin-right: 20px;
          }

          .el-tag {
            height: 22px;
            line-height: 22px;
            padding: 0 10px;
          }
        }
      }

      .order {
        .order-list {
          max-height: 200px;
        }

        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
      }

      .type {
        .el-radio__input.is-disabled .el-radio__inner,
        .el-radio__input.is-disabled + span.el-radio__label {
          cursor: pointer;
          color: black;
        }
      }

      .statistics {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .all-goods-number {
          margin-right: 20px;
        }

        .total {
          margin-right: 20px;
          span {
            color: #f40;
            font-weight: 700;
          }
        }

        .settlement {
          button {
            padding: 6px 15px;
          }
        }
      }
    }
  }
}
</style>
