<template>
  <div class="details-comment">
    <!-- 评论导航菜单 -->
    <div class="comment-nav" v-if="commentNav[0] && commentNav[0].number > 0">
      <el-checkbox-group v-model="checkCommentNav">
        <el-checkbox
          v-for="item in commentNav"
          :label="item.name"
          :key="item.value"
          @change="checkboxChange(item.name)"
        >
          <span>{{ item.name }}</span>
          <span>（{{ item.number > 999 ? '999+' : item.number }}）</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 评论 -->
    <div
      class="comment-content"
      v-if="commentList.length > 0"
    >
      <div
        class="comment-item xmf-flex-only"
        v-for="item in commentList"
        :key="item.id"
      >
        <!-- left -->
        <div class="left">
          <div class="user-avatar">
            <el-image :src="item.user.avatar"></el-image>
          </div>
          <div class="username">{{ item.user.username }}</div>
        </div>

        <!-- right -->
        <div class="right">
          <div class="right-top">
            <div class="comment-stars">
              <el-rate
                v-model="item.comment.stars"
                disabled
                text-color="#ff9900"
              >
              </el-rate>
            </div>
            <div class="xmf-flex-only">
              <div class="created_time">
                {{ item.comment.created_time | fmtdate2 }}
              </div>
            </div>
          </div>

          <div class="right-center">
            <div class="content" v-if="item.comment.text">
              {{ item.comment.text }}
            </div>
            <div class="comment-image" v-if="item.comment.img_list.length > 0">
              <el-image
                :src="img"
                fit="contain"
                v-for="img in item.comment.img_list"
                :key="img"
              ></el-image>
            </div>
          </div>

          <div class="right-bottom">
            <div class="product">{{ item.comment.goods_attribute }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-comment" v-else>暂无评论</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsId: '',

      // 评论导航栏
      commentNav: [],
      checkCommentNav: ['全部'],

      // 评论列表
      commentList: []
    }
  },

  created () {
    this.goodsId = this.$route.query.goodsId
    this.getCommentNav(() => {
      this.getComment()
    })
  },

  mounted () {},

  methods: {
    // 获取商品评论
    getComment () {
      this.$axios
        .get('/get/comment', {
          params: {
            id: this.goodsId,
            sort: this.checkCommentNav[0]
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.commentList = res.data.commentList
          }
        })
    },

    // 获取评论导航栏
    getCommentNav (callback) {
      this.$axios
        .get('/commentnav', {
          params: {
            id: this.goodsId
          }
        })
        .then(res => {
          this.commentNav = res.data.commentNav
          if (res.data.commentNav[0].number > 0) {
            callback()
          }
        })
    },

    // 点击评论导航
    checkboxChange (name) {
      this.checkCommentNav = []
      this.checkCommentNav.push(name)
      this.getComment()
    }
  }
}
</script>

<style lang="less">
.details-comment {
  margin: 30px 50px 50px 50px;

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

  .no-comment {
    margin-top: 80px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    font-size: 50px;
    font-weight: 700;
    color: #cccccc;
  }
}
</style>
