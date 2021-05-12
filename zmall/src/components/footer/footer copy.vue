<template>
  <div class="footer">
    <el-row>
      <el-col :span="14">
        <div class="copyright">
          <div class="title">
            <!-- 商城图标 -->
            <div class="logo xmf-flex">
              <img src="../../../static/image/logo/logo.png" alt="" />
            </div>

            <!-- 商城名字 -->
            <div class="logo-font xmf-flex">
              <img src="../../../static/image/font_img/font.png" alt="" />
            </div>
          </div>

          <div class="content">
            <div class="item">
              Copyright ©
              该项目使用了大量非开源图片和字体，仅用于学习分享，禁止商用。
            </div>
            <div class="item">
              <span>姓名：庄值升</span><br />
              <span>班级：计科1172</span><br />
              <span>Tel: 18475140601</span><br />
              <span>Email: 18475140601@163.com</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="friends">
          <div class="title">友情链接</div>
          <div class="content">
            <span>
              <a target="_blank" href="https://www.mi.com/">小米商城</a>
            </span>
            <span>
              <a target="_blank" href="https://www.vmall.com/">华为商城</a>
            </span>
            <span>
              <a target="_blank" href="https://www.taobao.com/">淘宝</a>
            </span>
            <span>
              <a target="_blank" href="https://www.tmall.com/">天猫</a>
            </span>
            <span>
              <a target="_blank" href="https://www.tmall.hk/">天猫国际</a>
            </span>
            <span>
              <a target="_blank" href="https://www.vip.com/">唯品会</a>
            </span>
            <span>
              <a target="_blank" href="https://www.suning.com/">苏宁易购</a>
            </span>
            <span>
              <a target="_blank" href="https://www.jd.com/">京东</a>
            </span>
            <span>
              <a target="_blank" href="https://www.pinduoduo.com/">拼多多</a>
            </span>
            <span>
              <a target="_blank" href="https://www.mogu.com/">蘑菇街</a>
            </span>
            <span>
              <a target="_blank" href="https://www.amazon.cn/">亚马逊</a>
            </span>
            <span>
              <a target="_blank" href="http://www.dangdang.com/">当当网</a>
            </span>
            <span>
              <a target="_blank" href="https://www.yhd.com/">1号店</a>
            </span>
            <span>
              <a target="_blank" href="https://www.zhaoliangji.com/">找靓机</a>
            </span>
            <span>
              <a target="_blank" href="https://2.taobao.com/">咸鱼</a>
            </span>
            <span>
              <a target="_blank" href="https://www.zhuanzhuan.com/">转转</a>
            </span>
            <span>
              <a target="_blank" href="http://www.manmanbuy.com/"
                >慢慢买-比价网</a
              >
            </span>
            <span>
              <a target="_blank" href="https://www.autohome.com.cn/beijing/"
                >汽车之家</a
              >
            </span>
            <span>
              <a target="_blank" href="https://www.guazi.com/zhanjiang/"
                >瓜子二手车</a
              >
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.footer {
  background-color: #06060b;
  color: #60606d;
  margin-top: 50px;

  .friends {
    margin: 30px 50px 30px 50px;
    padding-right: 15%;

    .title {
      margin: 10px 0 15px 0;
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 5px;
    }

    .content {
      letter-spacing: 1px;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;

      span {
        display: inline-block;
        padding: 2px 5px 2px 0;
        margin-top: 10px;
        margin-right: 20px;

        a {
          color: #60606d;
        }
      }
    }
  }

  .copyright {
    margin: 30px 50px 30px 80px;
    padding-right: 15%;

    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;

      .logo {
        img {
          height: 30px;
        }
      }

      .logo-font {
        margin-left: 10px;

        img {
          height: 30px;
        }
      }
    }

    .item {
      margin-bottom: 10px;

      span {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
