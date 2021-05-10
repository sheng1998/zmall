<template>
  <div class="details-comment">
    <!-- 评论顶部 -->
    <div class="top">
      <div class="left">
        <div class="content">99%</div>
        <div class="describe">好评度</div>
      </div>
      <div class="right">
        <el-checkbox-group
          class="my-checkbbox"
          v-model="evaluateList"
          size="mini"
        >
          <el-checkbox
            v-for="item in allEvaluate"
            :key="item.value"
            :label="item.value"
            border
            @change="fun(item.value)"
          >
            <span>{{ item.value }}</span>
            <span>{{ item.number > 1000 ? '1000+' : item.number }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <!-- 评论导航菜单 -->
    <div class="comment-nav">
      <el-checkbox-group v-model="commentNavList" :min="1" :max="2">
        <el-checkbox
          v-for="(item, index) in allCommentNav"
          :label="item.value"
          :key="item.value"
          @change="fun2(item.value)"
          :checked="index === 0"
        >
          <span>{{ item.value }}</span>
          <span>{{ item.number > 999 ? '999+' : item.number }}</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 评论 -->
    <div class="comment-content">
      <div
        class="comment-item xmf-flex-only"
        v-for="item in commentList"
        :key="item.id"
      >
        <!-- left -->
        <div class="left">
          <div class="user-avatar">
            <el-image :src="item.user_avatar" fit="contain"></el-image>
          </div>
          <div class="username">{{ item.username }}</div>
        </div>

        <!-- right -->
        <div class="right">
          <div class="right-top">
            <div class="comment-stars">我是星星{{ item.stars }}</div>
            <div class="xmf-flex-only">
              <div class="created_time">{{ item.created_time }}</div>
              <div class="praise">
                <span>
                  <i class="iconfont icondianzan"></i>
                </span>
                <span>
                  {{ item.praises }}
                </span>
              </div>
            </div>
          </div>

          <div class="right-center">
            <div class="content" v-if="item.text">{{ item.text }}</div>
            <div class="comment-image" v-if="item.imgList.length > 0">
              <el-image
                :src="img"
                fit="contain"
                v-for="img in item.imgList"
                :key="img"
              ></el-image>
            </div>
          </div>

          <div class="right-bottom">
            <div class="product">{{ item.product }}</div>
          </div>

          <div
            class="service_reply xmf-flex-only"
            v-if="item.service_reply.text"
          >
            <div class="left">
              <el-image :src="item.service_reply.img" fit="contain"></el-image>
            </div>
            <div class="main">
              <div class="name">{{ item.service_reply.name }}</div>
              <div class="text">{{ item.service_reply.text }}</div>
              <div class="praises">
                <span>
                  <i class="iconfont icondianzan"></i>
                </span>
                <span> ( {{ item.service_reply.praises }} ) </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      evaluateList: [],
      commentNavList: [],
      allEvaluate: [
        {
          value: '外观不错',
          number: 1000
        },
        {
          value: '物流不错',
          number: 700
        },
        {
          value: '屏幕不错',
          number: 566
        },
        {
          value: '服务号',
          number: 76892
        },
        {
          value: '音质很好',
          number: 346
        },
        {
          value: '内存很好',
          number: 723
        }
      ],
      allCommentNav: [
        {
          value: '全部',
          number: 3456
        },
        {
          value: '最热门',
          number: 123
        },
        {
          value: '最新评论',
          number: 123
        },
        {
          value: '有图',
          number: 123
        }
      ],
      commentList: [
        {
          id: '1',
          goods_id: '1',
          product: '我是产品呀',
          username: '我是名字',
          user_avatar:
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/802b65ca69007c08b81d7ed4.jpg',
          stars: 3.5,
          created_time: '2020-12-20 12:00:00',
          praises: 1,
          text:
            '好产品会说话，太难买到了，真心喜欢。不容易啊，从P40到Mate40再到MATE X2，终于全家人都换成华为手机了，支持国货首选华为，除非买不到，不然以后换手机肯定就是华为。产品的折叠设计秒杀市面上所有的折叠手机。',
          imgList: [
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/CA4C9F7CEF9443F2A5570B54.png',
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/FC8AEE51727162EA7FBA24F6.jpg',
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/7D6A22F66097EA1895618163.png'
          ],
          service_reply: {
            name: '这是客服名字',
            text: '这是客服评论',
            img:
              'https://res.vmallres.com//uomcdn/CN/pms/productSales/202105/temp/E18CE3F7FCA9A6ACC3AC0FE3625A04F2.png',
            praises: 0
          }
        },
        {
          id: '2',
          goods_id: '2',
          product: '我是产品呀2',
          username: '我是名字',
          user_avatar:
            'https://res.vmallres.com/rms/comment/image/U0466/5dfdc11efb06fae57ce41e2e3338f0b3/9d5673605c46d70dc6156901.jpg',
          stars: 3.5,
          created_time: '2020-12-20 12:00:00',
          praises: 1,
          text: '',
          imgList: [
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/CA4C9F7CEF9443F2A5570B54.png',
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/FC8AEE51727162EA7FBA24F6.jpg',
            'https://res.vmallres.com/rms/comment/image/U0341/77C131E24773813C10BAEE10D6FFC9AC822089CA0C3D2030E7C3DEAF7C57E252/100/7D6A22F66097EA1895618163.png'
          ],
          service_reply: {}
        },
        {
          id: '3',
          goods_id: '3',
          product: '我是产品呀4',
          username: '我是名字',
          user_avatar:
            'https://res.vmallres.com/rms/comment/image/U0466/5dfdc11efb06fae57ce41e2e3338f0b3/9d5673605c46d70dc6156901.jpg',
          stars: 3.5,
          created_time: '2020-12-20 12:00:00',
          praises: 1,
          text:
            '好产品会说话，太难买到了，真心喜欢。不容易啊，从P40到Mate40再到MATE X2，终于全家人都换成华为手机了，支持国货首选华为，除非买不到，不然以后换手机肯定就是华为。产品的折叠设计秒杀市面上所有的折叠手机。',
          imgList: [],
          service_reply: {
            name: '这是客服名字',
            text: '这是客服评论',
            img:
              'https://res.vmallres.com//uomcdn/CN/pms/productSales/202105/temp/E18CE3F7FCA9A6ACC3AC0FE3625A04F2.png',
            praises: 0
          }
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {
    fun (name) {
      this.evaluateList = []
      this.evaluateList.push(name)
    },
    fun2 (name) {
      this.commentNavList = []
      this.commentNavList.push(name)
    }
  }
}
</script>

<style lang="less">
.details-comment {
  margin: 0 50px;
  margin-top: 30px;

  .top {
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 15px;

    .left {
      width: 15%;

      .content {
        color: #ca141d;
        font-size: 56px;
        text-align: center;
        margin-bottom: 10px;
      }

      .describe {
        text-align: center;
        font-size: 12px;
      }
    }

    .right {
      width: 85%;

      .my-checkbbox {
        .el-checkbox {
          margin-bottom: 10px;
        }

        .el-checkbox.is-bordered + .el-checkbox.is-bordered {
          margin-left: 0;
        }

        .el-checkbox__inner {
          display: none;
        }
      }
    }
  }

  .comment-nav {
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;

    .el-checkbox-group {
      padding: 12px 0;
    }

    .el-checkbox__inner {
      display: none;
    }

    .el-checkbox__input.is-disabled + span.el-checkbox__label {
      color: #409eff;
      cursor: not-allowed;
    }
  }

  .comment-content {
    width: 80%;
    margin: 0 auto;

    .comment-item {
      margin-top: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeaea;

      .left {
        width: 15%;

        .user-avatar {
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          margin: 10px auto;
        }

        .username {
          text-align: center;
          font-size: 14px;
        }
      }

      .right {
        width: 85%;

        .right-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          .praise {
            margin-left: 15px;
            color: #ccc8c8;
          }
        }

        .right-center {
          margin-bottom: 10px;

          .comment-image {
            img {
              width: 80px;
              height: 80px;
              margin-right: 15px;
              margin-top: 20px;
              border-radius: 5px;
            }
          }
        }

        .product {
          color: #a4a4a4a4;
          font-size: 14px;
        }

        .service_reply {
          margin-top: 30px;

          .left {
            width: 50px;

            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
          }

          .main {
            font-size: 12px;

            .name {
              color: red;
            }

            .text {
              color: #717171;
              margin: 10px 0;
            }

            .praises {
              color: #717171;
              i {
                color: #ccc8c8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
