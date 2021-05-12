<template>
  <div class="manage-goods-list">
    <div class="goods-list-table">
      <el-row class="addgoods-btn">
        <el-button type="primary">添加商品</el-button>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
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
.manage-goods-list {
  .goods-list-table {
    .addgoods-btn {
      margin-bottom: 20px;
    }
  }
}
</style>
