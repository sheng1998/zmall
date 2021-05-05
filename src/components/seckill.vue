<template>
  <div class="seckill">
    <el-card class="seckill-card">
      <div class="seckill-list">
        <div class="seckill-item miaosha">
          <!-- img -->
          <div class="seckill-img xmf-flex">
            <img src="../../static/image/home/seckill.png" alt="" />
          </div>

          <!-- iconfont -->
          <div class="seckill-iconfont xmf-flex">
            <span class="iconfont iconshandian"></span>
          </div>

          <!-- 场次 -->
          <div class="session">
            <span>{{ session }} : 00</span>
            点场&nbsp;&nbsp;距结束
          </div>

          <!-- time -->
          <div class="time">
            <span class="hour bgc">{{ hour }}</span>
            <span>:</span>
            <span class="minutes bgc">{{ minutes }}</span>
            <span>:</span>
            <span class="seconds bgc">{{ seconds }}</span>
          </div>
        </div>

        <div class="seckill-item" v-for="(item, index) in 5" :key="index">
          <div class="item-img xmf-flex">
            <img
              src="http://img30.360buyimg.com/seckillcms/s140x140_jfs/t1/193934/12/573/195753/608b676cEed33c355/ec4e0f561bd4358d.jpg"
              alt=""
            />
          </div>
          <div class="item-title xmf-flex">
            <div class="ellipsis">这是标题这是标题这是标题这是标题</div>
          </div>
          <div class="item-price xmf-flex">
            <div class="col">
              <div class="discount-price xmf-flex"><small>￥</small>3001.00</div>
              <div class="sanjiaoxing"></div>
              <div class="original-price xmf-flex"><small>￥</small>3461.00</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      session: '00',
      hour: '00',
      minutes: '00',
      seconds: '00'
    }
  },
  created () {
    this.getSession()
  },
  mounted () {},
  methods: {
    // 计算时间差
    timeDiffer (time1, time2) {
      let dateEnd = new Date(time1.replace(/-/g, '/')) // 将-转化为/，使用new Date
      let dateBegin = new Date(time2)
      let dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
      let leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000)) // 计算出小时数
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
      // 计算相差秒数
      let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)
      this.hour = hours.toString().padStart(2, '0')
      this.minutes = minutes.toString().padStart(2, '0')
      this.seconds = seconds.toString().padStart(2, '0')
      if (hours <= 0 && minutes <= 0 && seconds <= 1) {
        return true
      }
    },

    // 获取当前阶段和下一阶段开始的时间
    getSession () {
      // 后台代码，处理当前时间和下一阶段时间同时获取秒杀数据
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hour = now.getHours()
      hour = hour % 2 === 0 ? hour : hour - 1
      this.session = hour.toString().padStart(2, '0')
      let time1 = ''
      if (hour + 2 > 23) {
        hour = hour - 22
        time1 = `${year}-${month}-${day} ${hour}:00:00`
        time1 = moment(new Date(time1))
          .add(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      } else {
        time1 = `${year}-${month}-${day} ${hour + 2}:00:00`
      }
      let timer = setInterval(() => {
        let flag = this.timeDiffer(
          time1,
          moment().format('YYYY-MM-DD HH:mm:ss')
        )
        if (flag) {
          clearInterval(timer)
          // eslint-disable-next-line
          this.getSession()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.seckill {
  margin-top: 30px;
  width: 100%;

  .seckill-card {
    margin: 0 50px;

    .seckill-list {
      display: flex;

      .seckill-item {
        height: 250px;
        flex: 1;

        &:not(:last-child) {
          margin-right: 15px;
        }

        .item-img {
          img {
            width: 140px;
            height: 140px;
          }
        }

        .item-title {
          height: 50px;
          font-size: 14px;

          div {
            width: 160px;
            overflow: hidden;
          }
        }

        .item-price {
          .col {
            background-color: #fff;
            border: 1px solid red;
            width: 160px;
            display: flex;

            .discount-price {
              width: 75px;
              height: 30px;
              background-color: red;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              font-size: 14px;
              color: #fff;
              font-weight: 700;
            }

            .original-price {
              color: #999;
              font-size: 12px;
              text-decoration: line-through;
            }
          }

          .sanjiaoxing {
            width: 0;
            height: 0;
            border-width: 30px 15px 0 0;
            box-sizing: border-box;
            border-style: solid solid none none;
            border-color: red transparent transparent transparent;
          }
        }
      }

      .miaosha {
        background-color: red;
        color: #fff;

        .seckill-img {
          height: 60px;

          img {
            height: auto;
            width: 150px;
          }
        }

        .seckill-iconfont {
          height: 100px;

          span {
            font-size: 80px;
            color: #fff;
          }
        }

        .session {
          margin-top: 10px;
          text-align: center;

          span {
            font-size: 18px;
            font-weight: 900;
            // margin-left: 200px;
          }
        }

        .time {
          margin-top: 15px;
          text-align: center;

          span {
            font-size: 18px;
            font-weight: 700;
          }

          .bgc {
            background-color: rgb(47, 52, 48);
            margin: 0 3px;
            padding: 5px;
            font-size: 20px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
