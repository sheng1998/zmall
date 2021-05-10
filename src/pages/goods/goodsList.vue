<template>
  <div class="goods-list">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 头部 -->
    <xmf-header></xmf-header>

    <!-- 面包屑 -->
    <div class="xmf-breadcrumb">
      <xmf-bread-crumb :breadcrumb="breadcrumb"></xmf-bread-crumb>
    </div>

    <!-- 分类和商品属性 -->
    <el-card class="class-attribute-card">
      <div class="class-attribute">
        <!-- 分类名 -->
        <div class="class-title attribute-item fenlei">
          <div class="attribute-name">分类：</div>
          <div>
            <el-checkbox-group
              v-model="classCheckList"
              class="class-item item-checkbox"
            >
              <el-checkbox
                class="item"
                :label="'class--' + item"
                v-for="(item, index) in classification"
                :key="index"
                @change="fun4(item)"
              >
                {{ item }}
              </el-checkbox></el-checkbox-group
            >
          </div>
        </div>

        <!-- 分类属性 -->
        <div
          class="class-title attribute-item"
          v-for="(attribute, i) in attribute"
          :key="i"
        >
          <div class="attribute-name">{{ attribute.name + '：' }}</div>
          <el-checkbox-group v-model="checkList" class="item-checkbox">
            <el-checkbox
              class="item"
              :label="'attribute' + attribute.name + item + j"
              v-for="(item, j) in attribute.item"
              :key="j"
              @change="fun(attribute.name, item)"
            >
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <!-- 排序 -->
        <div class="class-title attribute-item sort">
          <div class="attribute-name">排序：</div>
          <div class="sort-item">
            <el-checkbox-group v-model="sortList">
              <el-checkbox
                class="item"
                label="sort--综合"
                @change="fun2('sort--综合')"
                :checked="true"
              >
                综合
              </el-checkbox>
              <el-checkbox
                class="item"
                label="sort--最新"
                @change="fun2('sort--最新')"
              >
                最新
              </el-checkbox>
              <el-checkbox
                class="item"
                label="sort--评论数"
                @change="fun2('sort--评论数')"
              >
                评论数
              </el-checkbox>
              <el-checkbox
                class="item"
                label="sort--价格"
                @change="fun2('sort--价格')"
              >
                <template>
                  <div class="price">
                    <span class="price-title" @click="fun3('toggle')"
                      >价格</span
                    >
                    <div class="price-icon">
                      <span @click="fun3(true)">
                        <i
                          class="el-icon-caret-top"
                          :class="{ grey: !isPriceUp, blue: isPriceUp }"
                        ></i>
                      </span>
                      <span @click="fun3(false)">
                        <i
                          class="el-icon-caret-bottom"
                          :class="{ grey: isPriceUp, blue: !isPriceUp }"
                        ></i>
                      </span>
                    </div>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>

            <div class="price-section">
              <div style="display: flex;">
                <el-input
                  type="number"
                  prefix-icon="iconfont iconmoney"
                  v-model="price1"
                >
                </el-input>
                <div class="zhi">
                  <span>-</span>
                </div>
                <el-input
                  type="number"
                  prefix-icon="iconfont iconmoney"
                  v-model="price2"
                >
                </el-input>
                <el-button type="primary" class="price-btn" size="mini"
                  >确定</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 商品列表 -->
    <el-card class="class-goods-card">
      <xmf-goods-item
        :goods="goods"
        v-for="goods in goodsList"
        :key="goods.id"
        :comment="true"
      ></xmf-goods-item>
    </el-card>

    <!-- 尾部 -->
    <xmf-footer></xmf-footer>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
import xmfHeader from '../../components/header/header'
import xmfFooter from '../../components/footer/footer'
import xmfBreadCrumb from '../../components/breadcrumb/breadcrumb'
import xmfGoodsItem from '../../components/goods/goods'

export default {
  data () {
    return {
      goodsList: [
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487203307/428_428_FE364E05A0D86CE39BE00E1EE1D18350AA8E982DFAFFC0A2mp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00',
          comment: 565646,
          praise: 99.99
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487210619/428_428_1BED94F76D33074373CB7636AC2AEB733F3754C113BF6BBDmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3001.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487210619/428_428_1BED94F76D33074373CB7636AC2AEB733F3754C113BF6BBDmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6901443395217/428_428_DDB3BD6991C465502A6B44CF2382C0CA3279375DCE416CFFmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3001.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487220267/428_428_DEBB356E00934B123CDAE9CACBD70E1536224850853CCCE8mp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487210619/428_428_1BED94F76D33074373CB7636AC2AEB733F3754C113BF6BBDmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00',
          number: 0
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487210619/428_428_1BED94F76D33074373CB7636AC2AEB733F3754C113BF6BBDmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6901443395217/428_428_DDB3BD6991C465502A6B44CF2382C0CA3279375DCE416CFFmp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://res.vmallres.com/pimages//product/6941487220267/428_428_DEBB356E00934B123CDAE9CACBD70E1536224850853CCCE8mp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        }
      ],
      classCheckList: [],
      classification: [
        '手机',
        '平板',
        '电脑',
        '笔记本',
        '耳机',
        '音响',
        '路由器',
        '显示器',
        '照相机',
        '打印机',
        '投影仪',
        '电视机',
        '冰箱',
        '洗衣机'
      ],
      checkList: [],
      sortList: [],
      isPriceUp: false,
      price1: '',
      price2: '',
      breadcrumb: [
        {
          name: '111',
          path: '/111'
        }
      ],

      attribute: [
        {
          name: '屏幕尺寸',
          item: ['4.5-5.4英寸', '5.5-5.9英寸', '6.1-6.5英寸', '6.5英寸 以上']
        },
        {
          name: '运行内存',
          item: ['2GB 以下', '2GB', '4GB', '6GB', '8GB', '8GB 以上']
        },
        {
          name: '存储容量',
          item: ['64GB 以下', '64GB', '128GB', '256GB', '256GB 以上']
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {
    fun (name, value) {
      console.log(name)
      console.log(value)
    },
    fun2 (value) {
      this.sortList = []
      this.sortList.push(value)
      console.log(this.sortList)
    },
    fun3 (flag) {
      console.log(flag)
      if (flag === 'toggle') {
        this.isPriceUp = !this.isPriceUp
      } else {
        this.isPriceUp = flag
      }
    },
    fun4 (item) {
      console.log(item)
      this.classCheckList = []
      this.classCheckList.push(`class--${item}`)
    }
  },
  components: {
    xmfFixedBottom,
    xmfHeader,
    xmfFooter,
    xmfBreadCrumb,
    xmfGoodsItem
  }
}
</script>

<style lang="less">
.goods-list {
  .el-card__body {
    padding: 0;
  }

  .xmf-breadcrumb {
    margin-bottom: 15px;
    margin-top: 80px;
    margin-left: 50px;
  }

  .class-attribute-card {
    margin: 0 50px;

    .class-attribute {
      margin: 10px 25px 20px 25px;

      .attribute-item {
        padding: 15px 0;
        border-bottom: 1px solid #ddd;

        &:not(:first-child) {
          white-space: nowrap;
        }

        .attribute-name {
          display: inline-block;
          font-size: 15px;
          min-width: 80px;
        }

        .item-checkbox {
          display: inline-block;
        }

        .el-checkbox__label {
          padding-left: 3px;
        }

        .item {
          display: inline-block;
          font-size: 14px;
          min-width: 60px;

          &:not(:last-child) {
            margin-right: 20px;
          }
        }

        .sort-item {
          display: inline-block;

          .el-checkbox-group {
            display: inline-block;
          }

          .el-checkbox__inner {
            display: none;
          }

          .el-checkbox__label {
            padding-left: 0;
          }

          .price {
            display: flex;
            .price-icon {
              display: flex;
              flex-flow: column;
              flex-wrap: wrap;

              span {
                margin: 0 3px;
                width: 0;
                height: 0;

                i {
                  font-size: 10px;
                  position: absolute;
                }

                .el-icon-caret-bottom {
                  top: 6px;
                }
              }
            }
          }

          .price-section {
            display: inline-block;
            margin-left: 20px;

            input {
              height: 20px;
              font-size: 12px;
              width: 80px;
            }

            .price-btn {
              margin-left: 5px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-left: 8px;
              padding-right: 8px;
            }

            .zhi {
              margin: 0 5px;
            }

            .el-input__icon {
              line-height: 20px;
              font-size: 2px;
              color: #606266;
            }

            .el-input--prefix .el-input__inner {
              padding-left: 20px;
            }

            input[type='number'] {
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }

              -moz-appearance: textfield;
            }
          }
        }

        .is-checked {
          color: #409eff;

          .blue {
            color: #409eff;
          }

          .grey {
            color: #606266;
          }
        }
      }
    }

    .fenlei {
      display: flex;

      .class-item {
        display: inline-block;
        min-width: 60px;
        font-size: 14px;
        color: #606266;
        margin-bottom: 5px;

        .el-checkbox__input {
          display: none;
        }
      }
    }
  }

  .class-goods-card {
    margin: 30px 50px 0 50px;
  }
}
</style>
