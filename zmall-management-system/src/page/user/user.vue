<template>
  <div class="manage-user">
    <div class="xmf-system-flex fzzj">用户管理</div>
    <el-card>
      <el-table :data="userData" border stripe style="width: 100%">
        <!-- 用户名 -->
        <el-table-column prop="date" label="用户名" width="180" align="center">
        </el-table-column>

        <!-- 头像 -->
        <el-table-column prop="name" label="头像" width="180" align="center">
        </el-table-column>

        <!-- 真实姓名 -->
        <el-table-column
          prop="name"
          label="真实姓名"
          width="180"
          align="center"
        >
        </el-table-column>

        <!-- 性别 -->
        <el-table-column prop="name" label="性别" width="180" align="center">
        </el-table-column>

        <!-- 注册手机号 -->
        <el-table-column
          prop="name"
          label="注册手机号"
          width="180"
          align="center"
        >
        </el-table-column>

        <!-- 邮箱 -->
        <el-table-column prop="name" label="邮箱" width="180" align="center">
        </el-table-column>

        <!-- 收货地址 -->
        <el-table-column
          prop="name"
          label="收货地址"
          width="180"
          align="center"
        >
        </el-table-column>

        <!-- 收货人 -->
        <el-table-column prop="name" label="收货人" width="180" align="center">
        </el-table-column>

        <!-- 收货人联系电话 -->
        <el-table-column
          prop="name"
          label="收货人联系电话"
          width="180"
          align="center"
        >
        </el-table-column>

        <!-- 权限管理 -->
        <el-table-column prop="name" label="权限" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限管理"
          width="180"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },

  created () {},

  mounted () {},

  methods: {}
}
</script>

<style lang="less"></style>
