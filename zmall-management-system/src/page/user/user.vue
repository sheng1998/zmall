<template>
  <div class="manage-user">
    <div class="xmf-system-flex fzzj">用户管理</div>
    <el-card class="userlist-card">
      <!-- 搜索用户 -->
      <el-row class="user-search-input">
        <el-input
          class="search-input"
          ref="search"
          clearable
          placeholder="搜索用户"
          prefix-icon="el-icon-search"
          v-model="pagingForm.query"
          @keyup.enter.native="getUserList"
          @blur="getUserList"
          @input="searchUser"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUserList"
          ></el-button>
        </el-input>
      </el-row>

      <!-- 用户列表 -->
      <el-table
        :data="userData"
        stripe
        style="width: 100%"
        class="userlist-table"
      >
        <!-- 用户名 -->
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
          align="center"
          sortable
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 头像 -->
        <el-table-column label="头像" width="120" align="center">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.avatar"
              class="user-avatar xmf-system-flex"
              :preview-src-list="[scope.row.avatar]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i></div
            ></el-image>
          </template>
        </el-table-column>

        <!-- 真实姓名 -->
        <el-table-column
          prop="name"
          label="真实姓名"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 性别 -->
        <el-table-column prop="gender" label="性别" width="120" align="center">
        </el-table-column>

        <!-- 注册手机号 -->
        <el-table-column
          prop="tel"
          label="注册手机号"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 邮箱 -->
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 收货信息 -->
        <el-table-column label="收货信息" width="150" align="center">
          <template slot-scope="scope">
            <div class="delivery-info" @click="seeDeliveryInfo(scope.row)">
              查看收货信息
            </div>
          </template>
        </el-table-column>

        <!-- 余额 -->
        <el-table-column
          label="余额（元）"
          width="120"
          prop="balance"
          align="center"
          sortable
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span style="font-weight: 700;">
              {{ scope.row.balance | fmtAmount }}
            </span>
          </template>
        </el-table-column>

        <!-- 用户权限 -->
        <el-table-column
          label="用户权限"
          width="130"
          prop="limit"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <el-select
              class="user-limit"
              v-model="scope.row.limit"
              placeholder="请选择"
              @change="changeLimit(scope.row)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagingForm.currentPage"
          :page-sizes="pagingForm.dataNumberArr"
          :page-size="pagingForm.dataNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagingForm.totalDate"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 用户收货信息 -->
    <el-dialog
      title="收货信息"
      :visible.sync="dialogTableVisible"
      @close="clearDate"
    >
      <el-table
        :data="currentUserDeliveryInfo"
        border
        class="user-address-list"
      >
        <!-- 收货人 -->
        <el-table-column
          prop="name"
          label="收货人"
          width="120"
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
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <!-- 联系电话 -->
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: [],
      dialogTableVisible: false,
      currentUserDeliveryInfo: [],

      // 分页相关数据
      pagingForm: {
        currentPage: 1, // 当前页码
        dataNumberArr: [10, 15, 20, 30, 50, 100, 200, 500], // 每页可选显示数据条数数组
        dataNumber: 15, // 每页显示数据条数
        totalDate: 0, // 数据总数
        query: '' // 查询内容
      },

      // 权限选择器
      options: [
        {
          value: -1,
          label: '禁止评论'
        },
        {
          value: 0,
          label: '禁止登陆'
        },
        {
          value: 1,
          label: '所有权限'
        }
      ]
    }
  },

  created () {
    this.getUserList()
  },

  mounted () {},

  methods: {
    // 获取用户列表
    getUserList () {
      this.$axios
        .get('/userlist', {
          params: {
            page_size: this.pagingForm.currentPage,
            data_number: this.pagingForm.dataNumber,
            query: this.pagingForm.query
          }
        })
        .then(res => {
          this.userData = res.data.userlist
          this.pagingForm.totalDate = res.data.totalUser
        })
    },

    // 搜索用户
    searchUser () {
      this.$debounce.use(
        () => {
          this.getUserList()
        },
        500,
        true
      )
    },

    // 每页显示条数改变
    handleSizeChange (val) {
      this.pagingForm.dataNumber = val
      this.getUserList()
    },

    // 当前页改变
    handleCurrentChange (val) {
      this.pagingForm.currentPage = val
      this.getUserList()
    },

    // 修改用户权限
    changeLimit (user) {
      this.$axios.get('/alteruserlimit', {
        params: {
          user_id: user._id,
          limit: user.limit
        }
      })
    },

    // 查看收货信息
    seeDeliveryInfo (user) {
      this.$axios
        .get('/userdeliveryinfo', {
          params: {
            user_id: user._id
          }
        })
        .then(res => {
          this.currentUserDeliveryInfo = res.data.addressList
          this.dialogTableVisible = true
        })
    },

    // 清空数据
    clearDate () {
      this.currentUserDeliveryInfo = []
    }
  }
}
</script>

<style lang="less">
.manage-user {
  .search-input {
    float: right;
    width: 400px;
    margin-bottom: 20px;
  }

  .userlist-table {
    .user-avatar {
      height: 50px;
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }

    &.el-table td {
      padding: 0;
    }

    tbody .cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .delivery-info {
      cursor: pointer;
      color: #409eff;
      text-decoration: underline;
    }

    .user-limit {
      input {
        height: 30px;
        line-height: 30px;
      }

      .el-input__icon {
        line-height: 30px;
      }
    }

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
  }

  .user-address-list {
    font-size: 12px;
  }

  .fenye {
    margin-top: 20px;
  }
}
</style>
