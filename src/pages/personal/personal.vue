<template>
  <div class="personal">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 个人中心内容 -->
    <div class="content xmf-flex">
      <el-card class="my-card">
        <div class="introduce item">
          亲爱的<span> {{ userinfo.username }} </span
          >，请尽量填写真实信息，我们公司会对您的信息进行保密，只限于本系统内部使用。
        </div>

        <el-form :model="userinfo" label-width="100px" class="userinfo-form">
          <!-- 当前头像 -->
          <el-form-item label="当前头像" class="avatar">
            <el-image :src="userinfo.avatar_url"></el-image>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="*用户名" prop="username" class="username">
            <el-input v-model="userinfo.username" disabled></el-input>
            <span class="tip"
              >*提示：用户名禁止修改，用户名为用户登录的唯一凭证。</span
            >
          </el-form-item>

          <!-- 名字 -->
          <el-form-item label="真实名字" prop="name" class="name">
            <el-input v-model="userinfo.name"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="*性别" prop="gender" class="gender">
            <el-radio-group v-model="userinfo.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 联系电话 -->
          <el-form-item label="*联系电话" prop="tel" class="tel">
            <el-input v-model="userinfo.tel"></el-input>
          </el-form-item>

          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email" class="email">
            <el-input v-model="userinfo.email"></el-input>
          </el-form-item>

          <!-- 收货地址 -->
          <el-form-item label="*收货地址" class="address">
            <el-cascader
              class="addressFront"
              v-model="userinfo.addressFront"
              :options="addressOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange()"
            ></el-cascader>
            <el-input
              class="addressAfter"
              v-model="userinfo.addressAfter"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="btn xmf-flex">
          <el-button type="success">
            <router-link to="/">返回首页</router-link>
          </el-button>
          <el-button type="warning">保存信息</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
export default {
  data () {
    return {
      userinfo: {
        username: '小庄',
        name: '小庄',
        avatar_url:
          'https://i0.hdslb.com/bfs/face/edee88230332b2bf939863bcc9beef14b6d1fb48.jpg@128w_128h_1o.webp',
        gender: '男',
        email: '18475140601@163.com',
        tel: '18475140601',
        addressFront: ['1', '2', '3'],
        addressAfter: '湖光镇海大路1号广东海洋大学西区海思B220'
      },
      address: [],
      addressOptions: [
        {
          value: '1',
          label: '广东省',
          children: [
            {
              value: '2',
              label: '湛江市',
              children: [
                {
                  value: '3',
                  label: '麻章区'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleChange () {
      console.log(this.address)
    }
  },
  components: {
    xmfFixedBottom
  }
}
</script>

<style lang="less">
.personal {
  margin-top: 20px;

  .content {
    margin: 0 50px;

    .my-card {
      padding: 10px 30px;
      margin-bottom: 50px;

      .item {
        padding: 5px 10px;
        margin-bottom: 20px;
      }

      .introduce {
        span {
          font-weight: 700;
        }
      }

      .userinfo-form {
        .username {
          .tip {
            color: #999999;
            font-size: 12px;
          }
        }

        .avatar {
          img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }
        }

        .address {
          .addressFront {
            width: 250px;
          }

          .addressAfter {
            width: 400px;
          }
        }
      }

      .btn {
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
