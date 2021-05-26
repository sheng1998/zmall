<template>
  <div class="personal">
    <!-- 右下角按钮组 -->
    <xmf-fixed-bottom></xmf-fixed-bottom>

    <!-- 个人中心内容 -->
    <div class="content xmf-flex">
      <el-card class="my-card">
        <div class="introduce item">
          亲爱的
          <div class="introduce-name ellipsis">
            {{ userinfo.username }}
          </div>
          ，请尽量填写真实信息，我们公司会对您的信息进行保密，只限于本系统内部使用。
        </div>

        <!-- 用户信息表单 -->
        <el-form
          :model="userinfo"
          ref="userinfoRuleForm"
          label-width="100px"
          class="userinfo-form"
          :rules="rules"
        >
          <!-- 当前头像 -->
          <el-form-item label="当前头像" class="avatar" prop="avatar">
            <el-image :src="userinfo.avatar"></el-image><br />
            <el-upload
              action="http://127.0.0.1:3002/uploads/useravatar"
              list-type="picture"
              :show-file-list="false"
              :on-success="avatarSubmitSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary">更换头像</el-button>
            </el-upload>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" class="username">
            <el-input v-model="userinfo.username" disabled></el-input>
            <div class="tip">
              *提示：用户名禁止修改，用户名为用户登录的唯一凭证。
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="password" class="password">
            <el-input value="******************" disabled>
              <template slot="append">
                <el-button @click="alterPasswordDia = true">修改密码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <!-- 名字 -->
          <el-form-item label="真实名字" prop="name" class="name">
            <el-input v-model="userinfo.name" maxlength="20"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别" prop="gender" class="gender">
            <el-radio-group v-model="userinfo.gender">
              <el-radio label="未知"></el-radio>
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 联系电话 -->
          <el-form-item label="联系电话" prop="tel" class="tel">
            <el-input v-model="userinfo.tel" type="number"></el-input>
          </el-form-item>

          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email" class="email">
            <el-input v-model="userinfo.email"></el-input>
          </el-form-item>
        </el-form>

        <div class="address-list" v-if="addressList.length > 0">
          <div class="title fzzj">收货地址</div>
          <el-table :data="addressList" border>
            <!-- 收货人 -->
            <el-table-column
              prop="name"
              label="收货人"
              width="80"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 所在地区 -->
            <el-table-column
              prop="address_front"
              label="所在地区"
              width="150"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 详细地址 -->
            <el-table-column
              prop="address_after"
              label="详细地址"
              width="150"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 联系电话 -->
            <el-table-column
              prop="phone"
              label="联系电话"
              width="100"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-row class="address-btn">
                  <!-- 修改 -->
                  <el-button
                    size="mini"
                    plain
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="showAlterDeliveryInfoDia(scope.row)"
                  ></el-button>

                  <!-- 删除 -->
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteDeliveryInfo(scope.row._id)"
                  ></el-button>

                  <!-- 默认地址 -->
                  <el-button
                    v-if="scope.row.is_default"
                    size="mini"
                    type="primary"
                    disabled
                    >默认地址</el-button
                  >

                  <!-- 设为默认 -->
                  <el-button
                    v-else
                    size="mini"
                    plain
                    type="success"
                    @click="toDefault(scope.row._id)"
                    >设为默认</el-button
                  >
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 按钮区域 -->
        <div class="btn xmf-flex-only">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加收货地址</el-button
          >
          <el-button type="success" @click="toHome">返回首页 </el-button>
          <el-button type="warning" @click="saveUserInfo('userinfoRuleForm')"
            >保存修改</el-button
          >
        </div>
      </el-card>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="alterPasswordDia"
      @close="clearPasswordForm"
    >
      <el-form :model="passwordForm" :rules="rules">
        <el-form-item
          label="原密码"
          label-width="100px"
          prop="original_password"
        >
          <el-input
            v-model="passwordForm.original_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px">
          <el-input
            v-model="passwordForm.new_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" label-width="100px">
          <el-input
            v-model="passwordForm.new_password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterPasswordDia = false">取 消</el-button>
        <el-button type="primary" @click="alterPassword">确定修改</el-button>
      </div>
    </el-dialog>

    <!-- 添加收货信息 -->
    <el-dialog
      class="my-dialog"
      title="添加收货信息"
      @close="clearAddressFrom"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="addressForm">
        <!-- 姓名 -->
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="addressForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 联系电话 -->
        <el-form-item label="联系电话" label-width="100px">
          <el-input
            type="number"
            maxlength="11"
            v-model="addressForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 所在地区 -->
        <el-form-item label="所在地区" label-width="100px" class="address">
          <el-cascader
            class="addressFront"
            ref="addressCascader"
            v-model="addressForm.addressFront"
            :options="addressOptions"
            :props="{
              expandTrigger: 'hover',
              value: 'divisionId',
              label: 'name',
              children: 'children'
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <!-- 详细地址 -->
        <el-form-item label="详细地址" label-width="100px">
          <el-input
            class="addressAfter"
            v-model="addressForm.addressAfter"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress"
          >添加收货信息</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改收货信息 -->
    <el-dialog
      class="my-dialog"
      title="修改收货信息"
      @close="clearAddressFrom"
      :visible.sync="dialogFormVisible2"
    >
      <el-form :model="addressForm">
        <!-- 姓名 -->
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="addressForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 联系电话 -->
        <el-form-item label="联系电话" label-width="100px">
          <el-input
            type="number"
            maxlength="11"
            v-model="addressForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 所在地区 -->
        <el-form-item label="所在地区" label-width="100px" class="address">
          <el-cascader
            class="addressFront"
            ref="addressCascader"
            v-model="addressForm.addressFront"
            :options="addressOptions"
            :props="{
              expandTrigger: 'hover',
              value: 'divisionId',
              label: 'name',
              children: 'children'
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <!-- 详细地址 -->
        <el-form-item label="详细地址" label-width="100px">
          <el-input
            class="addressAfter"
            v-model="addressForm.addressAfter"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="alterDeliveryInfo"
          >修改收货信息</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import xmfFixedBottom from '../../components/fixedBottom/fixedBottom'
export default {
  data () {
    // 定义电话号码校验
    let personalCheckphone = (rule, value, callback) => {
      if (value) {
        this.$axios
          .get('/checkphone', {
            params: {
              tel: value,
              id: this.userId
            }
          })
          .then(res => {
            if (res.data.status !== 200) {
              callback(new Error(res.data.msg))
            } else {
              callback()
            }
          })
      } else {
        callback(new Error('请输入联系电话！'))
      }
    }

    // 定义邮箱校验
    let personalCheckemail = (rule, value, callback) => {
      if (value) {
        this.$axios
          .get('/checkemail', {
            params: {
              email: value,
              id: this.userId
            }
          })
          .then(res => {
            if (res.data.status !== 200) {
              callback(new Error(res.data.msg))
            } else {
              callback()
            }
          })
      } else {
        callback()
      }
    }

    return {
      userId: '',
      // 用户信息
      userinfo: {
        username: '',
        name: '',
        avatar: '',
        gender: '',
        email: '',
        tel: ''
      },

      // 表单验证
      rules: {
        gender: [
          { required: true, message: '请选择性别！', trigger: 'change' }
        ],
        tel: [{ validator: personalCheckphone, trigger: 'blur' }],
        email: [{ validator: personalCheckemail, trigger: 'blur' }],
        original_password: [
          { required: true, message: '请输入原密码！', trigger: 'blur' }
        ]
      },

      // 修改密码相关
      alterPasswordDia: false,
      passwordForm: {
        original_password: '',
        new_password: '',
        new_password2: ''
      },

      dialogFormVisible: false,
      dialogFormVisible2: false,
      // 添加收货信息表单
      addressForm: {
        name: '',
        phone: null,
        addressFront: [],
        addressAfter: '',
        id: ''
      },
      addressFront: '',

      // 地址级联选择器
      addressOptions: [],

      // 用户收货信息列表
      addressList: []
    }
  },

  created () {
    let userId = this.$route.query.userId
    let loginInfo = this.$mycookie.get('loginInfo')
    if (loginInfo && JSON.parse(loginInfo).user_id === userId) {
      this.userId = userId
      this.getAddress()
      this.getUserInfo()
    } else {
      this.$message.warning('登录信息过期，或用户不存在！')
      this.$router.replace({path: '/404'})
    }
  },

  mounted () {},

  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$axios
        .get('/userinfo', {
          params: {
            id: this.userId
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            let userinfo = res.data.userinfo
            this.userinfo = userinfo
            let id = res.data.userinfo.default_delivery_address_id
            this.getDeliveryInfoList(id)
          } else {
            this.$message.error(res.data.msg)
            this.userId = ''
            this.$router.replace({path: '/404'})
          }
        })
    },

    // 获取用户收货地址信息
    getDeliveryInfoList (id) {
      this.$axios
        .get('/deliveryinfolist', {
          params: {
            user_id: this.userId
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            let data = res.data.addressList
            data.forEach(item => {
              if (item._id === id) {
                item.is_default = true
              } else {
                item.is_default = false
              }
            })
            this.addressList = data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },

    // 获取省市县级联地址
    getAddress () {
      this.$axios.get('/address').then(res => {
        this.addressOptions = res.data.address
      })
    },

    // 级联选择器发生改变触发
    handleChange () {
      let nodeArr = this.$refs.addressCascader.getCheckedNodes()[0].pathNodes
      this.addressFront = ''
      nodeArr.forEach(item => {
        this.addressFront += item.label
      })
    },

    // 修改密码
    alterPassword () {
      if (this.passwordForm.original_password.trim() === '') {
        this.$message.error('请输入原密码！')
      } else if (this.passwordForm.new_password.trim() === '') {
        this.$message.error('请输入新密码！')
      } else if (this.passwordForm.new_password2.trim() === '') {
        this.$message.error('请输入确认新密码！')
      } else if (
        this.passwordForm.new_password !== this.passwordForm.new_password2
      ) {
        this.$message.error('两次输入密码不一致！')
      } else {
        this.$axios
          .post('/alterpassword', {
            id: this.userId,
            passwordForm: this.passwordForm
          })
          .then(res => {
            console.log(res)
            if (res.data.status === 200) {
              this.$message.success('修改密码成功！')
              this.alterPasswordDia = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }
    },

    // 清空修改密码表单信息
    clearPasswordForm () {
      this.passwordForm.original_password = ''
      this.passwordForm.new_password = ''
      this.passwordForm.new_password2 = ''
    },

    // 清空添加收货信息表单
    clearAddressFrom () {
      this.addressForm.name = ''
      this.addressForm.phone = null
      this.addressForm.addressFront = []
      this.addressForm.addressAfter = ''
      this.addressFront = ''
      this.addressForm.id = ''
    },

    // 提交收货信息
    submitAddress () {
      if (this.addressForm.name.trim() === '') {
        this.$message.error('请输入姓名！')
      } else if (
        this.addressForm.phone === null ||
        this.addressForm.phone.trim() === ''
      ) {
        this.$message.error('请输入联系电话！')
      } else if (this.addressFront.trim() === '') {
        this.$message.error('请选择地址的省市县！')
      } else if (this.addressForm.addressAfter.trim() === '') {
        this.$message.error('请填写详细地址！')
      } else {
        // 发起请求
        this.$axios
          .post('/savedeliveryinfo', {
            id: this.userId,
            delivery_info: {
              name: this.addressForm.name,
              phone: this.addressForm.phone,
              address_front: this.addressFront,
              address_after: this.addressForm.addressAfter,
              address_list_id: this.addressForm.addressFront
            }
          })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success('添加成功！')
              this.dialogFormVisible = false
              this.getDeliveryInfoList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }
    },

    // 显示修改地址对话框
    showAlterDeliveryInfoDia (deliveryInfo) {
      this.addressForm.name = deliveryInfo.name
      this.addressForm.phone = deliveryInfo.phone
      this.addressForm.addressFront = deliveryInfo.address_list_id
      this.addressForm.addressAfter = deliveryInfo.address_after
      this.addressForm.id = deliveryInfo._id
      this.addressFront = deliveryInfo.address_front
      this.dialogFormVisible2 = true
    },

    // 修改收货地址
    alterDeliveryInfo () {
      if (this.addressForm.name.trim() === '') {
        this.$message.error('请输入姓名！')
      } else if (
        this.addressForm.phone === null ||
        this.addressForm.phone.trim() === ''
      ) {
        this.$message.error('请输入联系电话！')
      } else if (this.addressFront.trim() === '') {
        this.$message.error('请选择地址的省市县！')
      } else if (this.addressForm.addressAfter.trim() === '') {
        this.$message.error('请填写详细地址！')
      } else {
        // 发起请求
        this.$axios
          .post('/alterdeliveryinfo', {
            id: this.addressForm.id,
            delivery_info: {
              name: this.addressForm.name,
              phone: this.addressForm.phone,
              address_front: this.addressFront,
              address_after: this.addressForm.addressAfter,
              address_list_id: this.addressForm.addressFront
            }
          })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success('修改成功！')
              this.dialogFormVisible2 = false
              this.getDeliveryInfoList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }
    },

    // 删除收货地址
    deleteDeliveryInfo (id) {
      this.$confirm('确定要删除该地址信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/deletedeliveryInfo', {
              params: { id }
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success('删除收货地址成功！')
                this.addressList.forEach((item, index) => {
                  if (item._id === id) {
                    this.addressList.splice(index, 1)
                  }
                })
              } else {
                this.$message.error(res.data.msg)
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

    // 设为默认地址
    toDefault (id) {
      this.$axios
        .get('/setdefault', {
          params: {
            user_id: this.userId,
            address_id: id
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.addressList.forEach(item => {
              if (item._id === id) {
                item.is_default = true
              } else {
                item.is_default = false
              }
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },

    // 返回首页
    toHome () {
      this.$router.push({ path: '/' })
    },

    // 保存用户信息
    saveUserInfo (formName) {
      this.$confirm('是否确定要修改个人信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$axios
                .post('/saveuserinfo', {
                  id: this.userId,
                  userinfo: this.userinfo
                })
                .then(res => {
                  if (res.data.status === 200) {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
            } else {
              return false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改！'
          })
        })
    },

    // 用户头像上传成功
    avatarSubmitSuccess (response) {
      this.$axios
        .post('/alteravatar', { user_id: this.userId, avatar: response.url })
        .then(res => {
          if (res.data.status === 200) {
            this.userinfo.avatar = response.url
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },

    // 头像 上传之前触发该方法，用户校验文件类型和文件大小
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
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
      width: 1200px;

      .el-input {
        width: 500px;
      }

      .item {
        padding: 5px 10px;
        margin-bottom: 20px;
      }

      .introduce {
        height: 25px;
        display: flex;
        align-items: center;

        .introduce-name {
          font-weight: 700;
          display: inline-block;
          max-width: 150px;
        }
      }

      .userinfo-form {
        .avatar,
        .username,
        .password,
        .tel {
          .el-form-item__label::before {
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
          }
        }
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
      }

      .btn {
        margin-left: 100px;
        a {
          color: #fff;
        }
      }
    }
  }

  .my-dialog {
    .addressFront {
      input {
        width: 300px;
      }
    }
  }

  .address-list {
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    margin-bottom: 20px;
    width: 661px;

    .el-table {
      box-sizing: border-box;
      font-size: 12px;
    }

    .address-btn {
      button {
        margin: 0;
      }
    }

    .el-table td,
    .el-table th {
      padding: 5px 0;
    }

    .title {
      font-size: 18px;
      display: flex;
      justify-content: center;
      margin-bottom: 0;
    }
  }
}
</style>
