<template>
  <div class="details-parameter">
    <div v-for="item in parameterData" :key="item.name" class="parameter-list">
      <div class="parameter-list-item">
        <div class="item-name">
          {{ item.name }}
        </div>
        <div class="item-list">
          <div v-for="item1 in item.children" :key="item1.name" class="item">
            <div class="item-list-name">{{ item1.name }}</div>
            <div class="item-list-value">{{ item1.value }}</div>
            <div class="item-list-remarks">{{ item1.remarks }}</div>
          </div>
        </div>
      </div>
      <hr style="margin-top: 50px;" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      parameterData: [
        {
          name: '主要参数',
          children: [
            {
              name: '传播名',
              value: 'HUAWEI Mate X2',
              remarks: ''
            },
            {
              name: '电池容量',
              value: '4500mAh（典型值）',
              remarks: '备注：电池额定容量为4400mAh。'
            },
            {
              name: '后置摄像头',
              value:
                '5000万像素超感知摄像头（广角， f/1.9光圈，支持OIS光学防抖）+ 1600万像素超广角摄像头（f/2.2光圈）+ 1200万像素长焦摄像头（f/2.4光圈，支持OIS光学防抖）+ 800万像素超级变焦摄像头（10倍光学变焦，f/4.4光圈，支持OIS光学防抖）',
              remarks: '备注：不同拍照模式的照片像素可能有差异，请以实际为准。'
            },
            {
              name: '屏幕尺寸',
              value: '内屏：8英寸；外屏：6.45英寸',
              remarks:
                '备注：显示屏采用圆角设计，按照标准矩形测量时，外屏屏幕的对角线长度是6.45英寸（实际可视区域较小）；内屏屏幕的对角线长度是8英寸（实际可视区域较小）。'
            }
          ]
        },
        {
          name: '主体',
          children: [
            {
              name: '品牌',
              value: '华为',
              remarks: ''
            },
            {
              name: 'CPU主频',
              value:
                '1*Cortex-A77@3.13GHz + 3*Cortex-A77@2.54GHz + 4*Cortex-A55@2.05GHz',
              remarks: ''
            },
            {
              name: '特色功能',
              value:
                '智慧多窗、悬浮窗、悬浮球、一步直达、应用多开、单应用多任务、畅连大文件闪传、多彩灭屏显示、微电影、AI跟拍、AI 字幕、多屏协同、畅连通话、四网协同、智慧剪辑、智慧分屏、双景录像、人脸解锁、小艺智慧语音、智慧视觉、情景智能、华为分享、无线投屏、支付保护中心、天际通、运动健康、杂志锁屏、应用锁、应用分身、隐私空间、密码保险箱、三重备份与恢复（云空间, 外部存储, 华为手机助手）、手机克隆、深色模式',
              remarks: ''
            }
          ]
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.details-parameter {
  margin: 0 50px;
  width: 100%;

  .parameter-list {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;

    .parameter-list-item {
      display: flex;

      .item-name {
        width: 12%;
        font-size: 22px;
        font-weight: 600;
        color: #333333;
      }

      .item-list {
        width: 88%;

        .item {
          display: flex;
          padding: 20px 0;

          .item-list-name {
            width: 12%;
          }

          .item-list-value {
            width: 45%;
            margin-right: 2%;
            line-height: 20px;
            letter-spacing: 0.8px;
          }

          .item-list-remarks {
            width: 41%;
            color: #999;
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
