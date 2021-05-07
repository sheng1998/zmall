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
          <el-carousel
            indicator-position="outside"
            :interval="6000"
            trigger="click"
            height="500px"
          >
            <el-carousel-item v-for="img in goods.imgList" :key="img">
              <el-image :src="img" alt="" fit="contain "> </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="content">
        <div class="title">{{ goods.title }}</div>
        <!-- 价格 -->
        <div class="price xmf-flex-align-items-center margin-10-0">
          <div class="price-name">价格:</div>
          <div class="price-number">{{ goods.price }} 元</div>
        </div>
        <!-- 编码 -->
        <div class="code xmf-flex-align-items-center margin-10-0">
          <div class="code-name" style="min-width: 70px;">商品编码</div>
          <div class="code-number xmf-font-14">{{ goods._id }}</div>
        </div>
        <!-- 属性 -->
        <div
          class="attribute xmf-flex-only margin-10-0"
          v-for="(item, index) in goods.attribute"
          :key="index"
        >
          <div class="attribute-name">{{ item.name }}</div>
          <div class="attribute-item-list">
            <el-checkbox-group
              v-model="checkboxGroup"
              size="small"
              class="attribute-item"
            >
              <el-checkbox
                :label="item.name + '--' + attribute.name"
                border
                v-for="(attribute, j) in item.item"
                :key="j"
                :class="{ 'height-50': attribute.img }"
                :disabled="attribute.goodsNumber === 0"
                @change="fun(item.name, attribute.name)"
              >
                <template>
                  <div class="xmf-flex">
                    <div v-if="attribute.img" class="attribute-img">
                      <el-image :src="attribute.img" alt=""></el-image>
                    </div>
                    <div class="item-name">
                      {{ attribute.name }}
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="address">
          <div class="xmf-flex" style="height: 100px; background-color: cyan;">
            地址区域
          </div>
        </div>
        <div class="xmf-flex buy-goods-btn">
          <div class="add-to-shopcar">
            <el-button type="danger">加入购物车</el-button>
          </div>
          <div class="now-buy">
            <el-button type="danger">立即购买</el-button>
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
          default-active="main"
          class="el-menu-demo xmf-flex-justify-content-center"
          mode="horizontal"
          :router="true"
        >
          <!-- 商品详情 -->
          <el-menu-item index="main">商品详情</el-menu-item>

          <!-- 规格参数 -->
          <el-menu-item index="parameter">规格参数</el-menu-item>

          <!-- 用户评论 -->
          <el-menu-item index="comment">用户评论</el-menu-item>
        </el-menu>
      </div>
      <div class="goods-details-content">
        <router-view></router-view>
      </div>
    </div>

    <div style="height: 700px;"></div>

    <!-- 尾部 -->
    <xmf-footer></xmf-footer>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../components/home/header'
import xmfBreadCrumb from '../../components/breadcrumb/breadcrumb'
import xmfFooter from '../../components/home/footer'
export default {
  data () {
    return {
      breadcrumb: [
        {
          name: '手机',
          path: '/goods/list'
        },
        {
          name: 'HUAWEI Mate X2 5G 全网通 256GB（冰晶蓝）',
          path: '#'
        }
      ],
      checkboxGroup: [],
      goods: {
        imgList: [
          'https://res.vmallres.com/pimages//product/6941487225064/800_800_D58F3741EBC023C1DD544D1A9D77B2DF8D1873FF58D72D75mp.png',
          'https://res.vmallres.com/pimages//product/6941487225064/group//800_800_966284E6F431C4510757F3EB95E741374254185EF3B1C0C0.png',
          'https://res.vmallres.com/pimages//product/6941487225064/group//800_800_A5DA1B0043900EEA11F7BBE0F3CEB3C4AB355A708E6BB7EF.png',
          'https://res.vmallres.com/pimages//product/6941487225064/group//800_800_5851BAA65E9DD31F05076D9B1D18D29DDCB18BE78A3D5E8C.png',
          'https://res.vmallres.com/pimages//product/6941487225064/group//800_800_2BC37C5412C6337B3A6FEAB5D57D5BBBF3A4910E1377A3FC.png'
        ],
        title:
          'HUAWEI Mate X2 5G 全网通 256GB（冰晶蓝） 这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
        price: '17999.00',
        _id: '2601010261419',
        attribute: [
          {
            name: '选择颜色',
            item: [
              {
                img:
                  'https://res.vmallres.com/pimages//product/6941487218196/40_40_DE3C7F5914BEC87CF9E7C1A31E83E5DB24B61801DBBFABA6mp.png',
                name: '亮黑色',
                goodsNumber: 7978
              },
              {
                img:
                  'https://res.vmallres.com/pimages//product/6941487218189/40_40_3E7D254E5C8B7203A2A5B80F5794A7C2772730233143A4AAmp.png',
                name: '釉白色',
                goodsNumber: 898
              },
              {
                img:
                  'https://res.vmallres.com/pimages//product/6941487225071/40_40_BABB68BA59D55641383EB060E9936AF80CBABACA717552B1mp.png',
                name: '冰晶粉',
                goodsNumber: 8981
              }
            ]
          },
          {
            name: '选择版本',
            item: [
              {
                name: '5G全网通 512GB',
                goodsNumber: 90798
              },
              {
                name: '5G全网通 256GB',
                goodsNumber: 0
              }
            ]
          },
          {
            name: '选择套餐',
            item: [
              {
                name: '官方标配',
                goodsNumber: 0
              },
              {
                name: '套餐一',
                goodsNumber: 123
              }
            ]
          }
        ]
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    fun (name1, name2) {
      this.checkboxGroup = this.checkboxGroup.filter(item => {
        return !item.startsWith(name1)
      })
      this.checkboxGroup.push(name1 + '--' + name2)
      console.log(this.checkboxGroup)
    }
  },
  components: {
    xmfFixedBottom,
    xmfHeader,
    xmfFooter,
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
        }
      }
    }

    & > .content {
      display: inline-block;
      width: 50%;

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
        .attribute-name {
          min-width: 70px;
        }

        .attribute-item-list {
          display: flex;
          margin-left: 20px;

          .height-50 {
            height: 50px;
          }

          .el-image {
            img {
              width: 40px;
              height: 40px;
            }
          }
        }

        .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
          display: none;
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
}
</style>
