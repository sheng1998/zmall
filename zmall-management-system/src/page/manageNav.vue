<template>
  <div class="manage-nav">
    <!-- 分类列表 -->
    <el-card class="nav-card">
      <el-row class="add-classification-btn">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加分类</el-button
        >
      </el-row>
      <el-table :data="classList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="80" align="center">
        </el-table-column>
        <el-table-column prop="class_name" label="分类参数"> </el-table-column>
        <el-table-column prop="class_path" label="分类路径"> </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div>
              <el-row>
                <!-- 修改分类参数 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="修改分类参数"
                  placement="left-start"
                >
                  <el-button
                    size="mini"
                    plain
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="showAlterDia(scope.row)"
                  ></el-button>
                </el-tooltip>

                <!-- 删除分类参数 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除分类参数"
                  placement="left-start"
                >
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteClassification(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <div class="addclass-dialog">
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" label-width="80px">
            <el-input v-model="form.class_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类路径" label-width="80px">
            <el-input v-model="form.class_path" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toAddClassification"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 修改分类对话框 -->
    <div class="addclass-dialog">
      <el-dialog title="修改分类参数" :visible.sync="dialogFormVisible2">
        <el-form :model="form">
          <el-form-item label="分类名称" label-width="80px">
            <el-input v-model="form.class_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类路径" label-width="80px">
            <el-input v-model="form.class_path" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="alterClassification"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classList: [],
      form: {
        class_name: '',
        class_path: ''
      },
      dialogFormVisible: false,
      dialogFormVisible2: false
    }
  },
  created () {
    this.getClssificationList()
  },
  mounted () {},
  methods: {
    // 获取分类参数列表
    getClssificationList () {
      this.$axios.get('/get/calssification').then(res => {
        if (res.data.meta.status === 200) {
          this.classList = res.data.data.class_list
        }
      })
    },

    // 添加分类参数
    toAddClassification () {
      if (this.form.class_name.trim() === '') {
        this.$message.error('请输入分类名！')
      } else if (this.form.class_path.trim() === '') {
        this.$message.error('请输入分类路径！')
      } else {
        this.$axios.post('/add/calssification', this.form).then(res => {
          if (res.data.meta.status === 200) {
            this.form.class_name = ''
            this.form.class_path = ''
            this.$message.success('添加成功！')
            this.getClssificationList()
            this.dialogFormVisible = false
          }
        })
      }
    },

    // 显示修改分类参数对话框
    showAlterDia (classification) {
      this.dialogFormVisible2 = true
      this.form.class_name = classification.class_name
      this.form.class_path = classification.class_path
      this.form.id = classification._id
    },

    // 修改分类参数
    alterClassification () {
      this.$axios
        .post('/alter/calssification', {
          id: this.form.id,
          class_name: this.form.class_name,
          class_path: this.form.class_path
        })
        .then(res => {
          let status = res.data.meta.status
          if (status === 200) {
            this.$message.success('修改分类参数成功！')
            this.form.class_name = ''
            this.form.class_path = ''
            this.dialogFormVisible2 = false
            this.getClssificationList()
          } else {
            this.$message.error('修改分类参数失败！')
          }
        })
    },

    // 删除分类参数
    deleteClassification (classification) {
      this.$confirm('是否删除该分类参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/delete/calssification', {
              id: classification._id
            })
            .then(res => {
              let status = res.data.meta.status
              if (status === 200) {
                this.$message.success('删除分类成功！')
                this.getClssificationList()
              } else {
                this.$message.error('删除分类失败！')
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less">
.manage-nav {
  .add-classification-btn {
    margin-bottom: 20px;
  }
}
</style>
