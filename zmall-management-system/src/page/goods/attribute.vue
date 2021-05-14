<template>
  <div class="goods-attribute">
    <div class="xmf-system-flex fzzj">商品属性管理</div>
    <!-- 属性列表 -->
    <el-card class="attribute-card">
      <el-row class="add-attribute-btn">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加属性</el-button
        >
      </el-row>
      <el-table :data="attributeList" stripe style="width: 100%">
        <!-- 扩展列 -->
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <div>
              <el-tag
                :key="tag"
                :type="tagType[index % 5]"
                v-for="(tag, index) in scope.row.children"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row, tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(scope.row)"
                >+ New Tag</el-button
              >
            </div>
          </template>
        </el-table-column>

        <!-- 属性名 -->
        <el-table-column prop="attribute_name" label="属性名" width="180">
        </el-table-column>

        <!-- 所属分类 -->
        <el-table-column prop="belong_classification" label="所属分类" width="150">
        </el-table-column>

        <!-- 属性值 -->
        <el-table-column label="属性值">
          <template slot-scope="scope">
            <div>
              <el-tag
                :type="tagType[index % 5]"
                v-for="(tag, index) in scope.row.children"
                :key="tag"
                >{{ tag }}</el-tag
              >
            </div>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div>
              <el-row>
                <!-- 修改属性 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="修改属性"
                  placement="top-end"
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

                <!-- 删除属性 -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除属性"
                  placement="top-end"
                >
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteAttribute(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加属性对话框 -->
    <div class="addclass-dialog">
      <el-dialog
        title="添加属性"
        :visible.sync="dialogFormVisible"
        @closed="closeDia"
        @open="getClassification"
      >
        <el-form :model="form">
          <el-form-item label="属性名称" label-width="80px">
            <el-input
              v-model="form.attribute_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属分类" label-width="80px">
            <el-select v-model="classValue" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.class_name"
                :label="item.class_name"
                :value="item.class_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性值" label-width="80px">
            <el-input
              v-model="form.attribute_value"
              autocomplete="off"
              placeholder="属性值之间用“,”隔开"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toAddAttribute">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改属性对话框 -->
    <div class="addclass-dialog">
      <el-dialog
        title="修改属性"
        :visible.sync="dialogFormVisible2"
        @closed="closeDia"
        @open="getClassification"
      >
        <el-form :model="form">
          <el-form-item label="属性名称" label-width="80px">
            <el-input
              v-model="form.attribute_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属分类" label-width="80px">
            <el-select v-model="form.belong_classification" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.class_name"
                :label="item.class_name"
                :value="item.class_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性值" label-width="80px">
            <el-input
              v-model="form.attribute_value"
              autocomplete="off"
              placeholder="属性值之间用“,”隔开"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="alterAttribute">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      attributeList: [],
      classList: [],
      classValue: '',
      form: {
        attribute_name: '',
        attribute_value: '',
        belong_classification: ''
      },
      tagType: ['', 'success', 'info', 'warning', 'danger'],
      dialogFormVisible: false,
      dialogFormVisible2: false
    }
  },
  created () {
    this.getAttributeList()
    this.$store.commit('setActiveMenu', this.$route.path)
  },
  mounted () {},
  methods: {
    // 获取属性列表
    getAttributeList () {
      this.$axios.get('/get/attribute').then(res => {
        let status = res.data.meta.status
        let attributeList = res.data.data.attribute_list
        if (status === 200) {
          this.attributeList = attributeList.map(item => {
            return {
              _id: item._id,
              attribute_name: item.attribute_name,
              attribute_value: item.attribute_value,
              children: item.children,
              belong_classification: item.belong_classification,
              inputVisible: false,
              inputValue: ''
            }
          })
        } else {
          this.$message.warning(res.data.meta.msg)
        }
      })
    },

    // 获取分类列表
    getClassification () {
      this.$axios.get('/get/classification').then(res => {
        if (res.data.meta.status === 200) {
          this.classList = res.data.data.class_list
        }
      })
    },

    // 添加属性
    toAddAttribute () {
      if (this.form.attribute_name.trim() === '') {
        this.$message.error('请输入属性名！')
      } else if (this.classValue.trim() === '') {
        this.$message.error(
          '请选择所属分类，如果没有分类数据请刷新页面或者前往商品分类管理页面添加分类！'
        )
      } else if (this.form.attribute_value.trim() === '') {
        this.$message.error('请输入属性值！')
      } else {
        let obj = {
          attribute_name: this.form.attribute_name,
          attribute_value: this.form.attribute_value,
          class_value: this.classValue
        }
        this.$axios.post('/add/attribute', obj).then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success('添加成功！')
            this.getAttributeList()
            this.dialogFormVisible = false
          } else {
            this.$message.warning(res.data.meta.msg)
          }
        })
      }
    },

    // 显示修改属性对话框
    showAlterDia (attribute) {
      this.dialogFormVisible2 = true
      this.form.attribute_name = attribute.attribute_name
      this.form.attribute_value = attribute.attribute_value
      this.form.belong_classification = attribute.belong_classification
      this.form.id = attribute._id
    },

    // 修改属性
    alterAttribute () {
      if (this.form.attribute_name.trim() === '') {
        this.$message.error('请输入属性名！')
      } else if (this.classValue.trim() === '') {
        this.$message.error(
          '请选择所属分类，如果没有分类数据请刷新页面或者前往商品分类管理页面添加分类！'
        )
      } else if (this.form.attribute_value.trim() === '') {
        this.$message.error('请输入属性值！')
      } else {
        let obj = {
          id: this.form.id,
          attribute_name: this.form.attribute_name,
          attribute_value: this.form.attribute_value,
          class_value: this.classValue
        }
        this.$axios.post('/alter/attribute', obj).then(res => {
          let status = res.data.meta.status
          if (status === 200) {
            this.$message.success('修改属性成功！')
            this.dialogFormVisible2 = false
            this.getAttributeList()
          } else {
            this.$message.warning(res.data.meta.msg)
          }
        })
      }
    },

    // 删除属性
    deleteAttribute (attribute) {
      this.$confirm('是否删除该属性?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/delete/attribute', {
              id: attribute._id
            })
            .then(res => {
              let status = res.data.meta.status
              if (status === 200) {
                this.$message.success('删除属性成功！')
                this.getAttributeList()
              } else {
                this.$message.error('删除属性失败！')
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

    // 关闭添加、修改属性对话框
    closeDia () {
      this.form.attribute_name = ''
      this.form.attribute_value = ''
      this.form.belong_classification = ''
      this.classValue = ''
    },

    // 删除标签时触发
    handleClose (attribute, tag) {
      let id = attribute._id
      let value = tag
      if (attribute.children.length === 1) {
        return this.$message.error('请至少保留一个属性值！')
      }
      this.$axios.post('/delete/attribute/value', { id, value }).then(res => {
        let status = res.data.meta.status
        if (status === 200) {
          attribute.children.splice(attribute.children.indexOf(tag), 1)
        } else {
          this.$message.error('删除属性值失败！')
        }
      })
    },

    // 显示添加属性值输入框
    showInput (attribute) {
      attribute.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 关闭添加属性值输入框触发
    handleInputConfirm (attribute) {
      let inputValue = attribute.inputValue
      if (inputValue && attribute.children.indexOf(inputValue) === -1) {
        this.$axios
          .post('/add/attribute/value', {
            id: attribute._id,
            value: inputValue
          })
          .then(res => {
            let status = res.data.meta.status
            if (status === 200) {
              attribute.children.push(inputValue)
            } else {
              this.$message.error('添加属性值失败！')
            }
          })
      } else if (attribute.children.indexOf(inputValue) !== -1) {
        this.$message.warning('属性值已经存在，将不会添加到属性值列表中。')
      }
      attribute.inputVisible = false
      attribute.inputValue = ''
    }
  }
}
</script>

<style lang="less">
.goods-attribute {
  .add-attribute-btn {
    margin-bottom: 20px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
