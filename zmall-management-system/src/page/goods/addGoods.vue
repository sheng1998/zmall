<template>
  <div class="add-goods">
    <div class="xmf-system-flex fzzj">添加商品</div>
    <!-- 添加商品表单 -->
    <el-card class="add-goods-form">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goods_name">
          <el-input
            class="form--inpu-item"
            clearable
            v-model="form.goods_name"
            ref="goodsName"
          ></el-input>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述" prop="describe">
          <el-input
            class="form--inpu-item"
            clearable
            type="textarea"
            v-model="form.describe"
          ></el-input>
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item label="商品价格" prop="price">
          <el-input
            type="number"
            class="form--inpu-item"
            clearable
            v-model="form.price"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>

        <!-- 商品原价 -->
        <el-form-item label="商品原价">
          <el-input
            type="number"
            class="form--inpu-item"
            clearable
            v-model="form.original_price"
            placeholder="如果不填写，默认与商品价格一致。"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>

        <!-- 商品数量 -->
        <el-form-item label="商品数量" prop="goods_number">
          <el-input
            type="number"
            class="form--inpu-item"
            clearable
            v-model="form.goods_number"
          ></el-input>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片" prop="picture">
          <template>
            <div>
              <el-upload
                class="upload-demo"
                drag
                multiple
                action="http://127.0.0.1:3002/uploads"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :file-list="fileList"
                list-type="picture"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过 2MB
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </template>
        </el-form-item>

        <!-- 商品详情 -->
        <el-form-item label="商品详情">
          <template>
            <div class="fuwenben">
              <quill-editor
                class="my-quill-editor"
                v-model="form.details"
              ></quill-editor>
            </div>
          </template>
        </el-form-item>

        <!-- 商品分类 -->
        <el-form-item label="商品分类" prop="classification">
          <template>
            <div class="classification">
              <el-select
                v-model="form.classification"
                filterable
                placeholder="请选择商品分类"
                @change="classificationChange"
              >
                <el-option
                  :label="item.class_name"
                  :value="item.class_name"
                  v-for="item in classList"
                  :key="item._id"
                ></el-option>
              </el-select>
            </div>
            <div class="add-classification-btn">
              <el-button type="primary" @click="toAddClassification"
                >前往添加新的分类</el-button
              >
            </div>
          </template>
        </el-form-item>

        <!-- 商品属性 -->
        <el-form-item label="商品属性" prop="attribute">
          <template>
            <div>
              <!-- 属性对应的表格 -->
              <div v-if="form.classification && attributeList.length > 0">
                <el-table
                  :data="attributeList"
                  stripe
                  border
                  style="width: 100%"
                >
                  <!-- # -->
                  <el-table-column
                    type="index"
                    label="#"
                    width="80"
                    align="center"
                  >
                  </el-table-column>

                  <!-- 属性名 -->
                  <el-table-column
                    prop="attribute_name"
                    label="属性名"
                    width="180"
                  >
                  </el-table-column>

                  <!-- 可选属性值 -->
                  <el-table-column label="属性值">
                    <template slot-scope="scope">
                      <div>
                        <el-checkbox-group v-model="checkedAttributeValueList">
                          <el-checkbox
                            v-for="item in scope.row.children"
                            :label="
                              scope.row.attribute_name +
                                '-attributeName-' +
                                item
                            "
                            :key="item"
                            >{{ item }}</el-checkbox
                          >
                        </el-checkbox-group>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button
                  type="primary"
                  class="add-attribute-btn"
                  @click="toAddattribute"
                  >前往添加分类属性</el-button
                >
              </div>

              <!-- 选择了分类，但是分类属性没有值 -->
              <div v-if="form.classification && attributeList.length === 0">
                <el-alert
                  title="该分类尚未设置属性，点击下方按钮前往商品属性管理页面为该分类添加属性。！注意！：如果前往，则以上数据需要重新填写。"
                  :closable="false"
                  effect="dark"
                  type="warning"
                  show-icon
                >
                </el-alert>
                <el-button
                  type="primary"
                  class="add-attribute-btn"
                  @click="toAddattribute"
                  >前往添加分类属性</el-button
                >
              </div>

              <!-- 未选择分类 -->
              <div class="no-classification" v-if="!form.classification">
                <el-alert
                  title="请先选择商品分类"
                  :closable="false"
                  type="info"
                  effect="dark"
                  show-icon
                >
                </el-alert>
              </div>
            </div>
          </template>
        </el-form-item>

        <!-- 商品参数 -->
        <el-form-item label="商品参数">
          <template>
            <div class="goods-parameter">
              <!-- 主体 -->
              <div class="body">
                <div class="title">
                  主体
                  <el-button
                    type="primary"
                    @click="showAddParameterDia('bodyParameterList')"
                    >添加参数</el-button
                  >
                </div>
                <el-table
                  :data="bodyParameterList"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column prop="name" label="参数名" width="180">
                  </el-table-column>
                  <el-table-column prop="value" label="参数值">
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注">
                  </el-table-column>
                  <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-row>
                          <!-- 修改参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="修改参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="primary"
                              icon="el-icon-edit"
                              circle
                              @click="
                                showAlterDia('bodyParameterList', scope.row)
                              "
                            ></el-button>
                          </el-tooltip>

                          <!-- 删除参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="删除参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="danger"
                              icon="el-icon-delete"
                              circle
                              @click="
                                deleteParameter(
                                  'bodyParameterList',
                                  scope.row.name
                                )
                              "
                            ></el-button>
                          </el-tooltip>
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 主要参数 -->
              <div class="main">
                <div class="title">
                  主要参数
                  <el-button
                    type="primary"
                    @click="showAddParameterDia('mainParameterList')"
                    >添加参数</el-button
                  >
                </div>
                <el-table
                  :data="mainParameterList"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column prop="name" label="参数名" width="180">
                  </el-table-column>
                  <el-table-column prop="value" label="参数值">
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注">
                  </el-table-column>
                  <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-row>
                          <!-- 修改参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="修改参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="primary"
                              icon="el-icon-edit"
                              circle
                              @click="
                                showAlterDia('mainParameterList', scope.row)
                              "
                            ></el-button>
                          </el-tooltip>

                          <!-- 删除参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="删除参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="danger"
                              icon="el-icon-delete"
                              circle
                              @click="
                                deleteParameter(
                                  'mainParameterList',
                                  scope.row.name
                                )
                              "
                            ></el-button>
                          </el-tooltip>
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 尺寸和重量 -->
              <div class="size-and-weight">
                <div class="title">
                  尺寸和重量
                  <el-button
                    type="primary"
                    @click="showAddParameterDia('sizeAndWeightParameterList')"
                    >添加参数</el-button
                  >
                </div>
                <el-table
                  :data="sizeAndWeightParameterList"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column prop="name" label="参数名" width="180">
                  </el-table-column>
                  <el-table-column prop="value" label="参数值">
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注">
                  </el-table-column>
                  <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-row>
                          <!-- 修改参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="修改参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="primary"
                              icon="el-icon-edit"
                              circle
                              @click="
                                showAlterDia(
                                  'sizeAndWeightParameterList',
                                  scope.row
                                )
                              "
                            ></el-button>
                          </el-tooltip>

                          <!-- 删除参数 -->
                          <el-tooltip
                            class="item"
                            effect="light"
                            content="删除参数"
                            placement="top-end"
                          >
                            <el-button
                              size="mini"
                              plain
                              type="danger"
                              icon="el-icon-delete"
                              circle
                              @click="
                                deleteParameter(
                                  'sizeAndWeightParameterList',
                                  scope.row.name
                                )
                              "
                            ></el-button>
                          </el-tooltip>
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </template>
        </el-form-item>
      </el-form>

      <!-- 保存按钮 -->
      <div class="goodsinfo-submit-btn xmf-system-flex">
        <el-button type="danger" @click="clearFormData">清空表单数据</el-button>
        <el-button type="success" @click="temporarySaveDataToLocalStorage"
          >临时保存商品数据</el-button
        >
        <el-button type="success" @click="saveGoods">提交商品数据</el-button>
      </div>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog
      title="添加参数"
      :visible.sync="parameterDialogVisible"
      @closed="closeDia"
    >
      <el-form :model="parameterForm">
        <el-form-item label="参数名称" label-width="120px">
          <el-input v-model="parameterForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数值" label-width="120px">
          <el-input v-model="parameterForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input
            v-model="parameterForm.remarks"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="parameterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParameter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改参数对话框 -->
    <el-dialog
      title="修改参数"
      :visible.sync="parameterDialogVisible2"
      @closed="closeDia"
    >
      <el-form :model="parameterForm">
        <el-form-item label="参数名称" label-width="120px">
          <el-input v-model="parameterForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数值" label-width="120px">
          <el-input v-model="parameterForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input
            v-model="parameterForm.remarks"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="parameterDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="alterParameter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本编辑器样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入富文本编辑器组件
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      // 商品数据表单
      form: {
        goods_name: '',
        describe: '',
        price: '',
        original_price: '',
        discount_price: '',
        classification: '',
        img_list: [],
        goods_number: '',
        details: '',
        attribute: [],
        parameter: {}
      },
      // 商品数据表单验证规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        classification: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        picture: [{ required: true, message: '', trigger: 'blur' }],
        attribute: [{ required: true, message: '', trigger: 'blur' }]
      },
      classList: [], // 分类列表的数据
      attributeList: [], // 属性列表的数据
      checkedAttributeValueList: [],
      fileList: [],
      tmpFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      bodyParameterList: [],
      mainParameterList: [],
      sizeAndWeightParameterList: [],
      parameterDialogVisible: false,
      parameterDialogVisible2: false,
      parameterForm: {
        name: '',
        value: '',
        remarks: '',
        current: '',
        currentAlterParameterName: ''
      },
      isSubmit: false
    }
  },

  // 用到的子组件
  components: {
    quillEditor
  },

  // 生命周期钩子 created
  created () {
    this.getLocalStorage()
    this.getClassification()
    this.$store.commit('setActiveMenu', this.$route.path)
    this.$nextTick(() => {
      this.$refs.goodsName.$refs.input.focus()
    })
  },

  // 生命周期钩子 mounted
  mounted () {
    // 为页面绑定刷新和关闭事件
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },

  // 生命周期钩子 destroyed
  destroyed () {
    // 为页面绑定刷新和关闭事件
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.onbeforeunload = null
  },

  // 组件中用到的方法
  methods: {
    // 启动关闭和刷新提示
    beforeunloadHandler (e) {
      if (this.$route.name === 'addgoods') {
        e.returnValue = '关闭提示'
      } else {
        window.onbeforeunload = null
      }
    },
    // 获取分类列表
    getClassification () {
      this.$axios.get('/get/classification').then(res => {
        if (res.data.meta.status === 200) {
          this.classList = res.data.data.class_list
        }
      })
    },

    // 获取 localStorage 的值赋值给组件数据
    getLocalStorage () {
      if (window.localStorage.getItem('addGoodsData-form')) {
        this.form = JSON.parse(window.localStorage.getItem('addGoodsData-form'))
      }
      if (
        window.localStorage.getItem('addGoodsData-checkedAttributeValueList')
      ) {
        this.checkedAttributeValueList = JSON.parse(
          window.localStorage.getItem('addGoodsData-checkedAttributeValueList')
        )
      }
      if (window.localStorage.getItem('addGoodsData-classList')) {
        this.classList = JSON.parse(
          window.localStorage.getItem('addGoodsData-classList')
        )
      }
      if (window.localStorage.getItem('addGoodsData-attributeList')) {
        this.attributeList = JSON.parse(
          window.localStorage.getItem('addGoodsData-attributeList')
        )
      }
      if (window.localStorage.getItem('addGoodsData-fileList')) {
        this.fileList = JSON.parse(
          window.localStorage.getItem('addGoodsData-fileList')
        )
        this.tmpFileList = this.fileList
      }
      if (window.localStorage.getItem('addGoodsData-bodyParameterList')) {
        this.bodyParameterList = JSON.parse(
          window.localStorage.getItem('addGoodsData-bodyParameterList')
        )
      }
      if (window.localStorage.getItem('addGoodsData-mainParameterList')) {
        this.mainParameterList = JSON.parse(
          window.localStorage.getItem('addGoodsData-mainParameterList')
        )
      }
      if (
        window.localStorage.getItem('addGoodsData-sizeAndWeightParameterList')
      ) {
        this.sizeAndWeightParameterList = JSON.parse(
          window.localStorage.getItem('addGoodsData-sizeAndWeightParameterList')
        )
      }
      if (this.form.classification) {
        this.getAttribute(() => {
          if (
            window.localStorage.getItem(
              'addGoodsData-checkedAttributeValueList'
            )
          ) {
            this.checkedAttributeValueList = JSON.parse(
              window.localStorage.getItem(
                'addGoodsData-checkedAttributeValueList'
              )
            )
          }
        })
      }
    },

    // 商品分类值改变时触发
    classificationChange () {
      this.getAttribute()
    },

    // 根据分类获取属性
    getAttribute (callback) {
      this.$axios
        .get('/get/attribute/withclass', {
          params: {
            belong_classification: this.form.classification
          }
        })
        .then(res => {
          this.attributeList = res.data.data.attribute_list
          this.checkedAttributeValueList = []
          if (callback && typeof callback === 'function') {
            callback()
          }
        })
    },

    // 前往添加分类页面
    toAddClassification () {
      this.$router.push({ name: 'classification' })
    },

    // 前往添加分类属性页面
    toAddattribute () {
      this.$router.push({ name: 'attribute' })
    },

    // 图片上传之前触发该方法，用户校验文件类型和文件大小
    beforeUpload (file) {
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
    },

    // 图片上传成功后触发该方法
    handleSuccess (response) {
      this.tmpFileList.push(response.data)
    },

    // 文件列表移除文件触发该方法
    handleRemove (file) {
      this.tmpFileList.forEach(item => {
        item.name = '点击预览图片'
      })
      this.fileList = this.tmpFileList
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.fileList.splice(index, 1)
        }
      })
    },

    // 文件列表预览文件触发该方法
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 显示添加参数对话框
    showAddParameterDia (current) {
      this.parameterForm.current = current
      this.parameterDialogVisible = true
    },

    // 关闭添加对话框触发
    closeDia () {
      this.parameterForm.name = ''
      this.parameterForm.value = ''
      this.parameterForm.remarks = ''
      this.parameterForm.current = ''
      this.parameterForm.currentAlterParameterName = ''
    },

    // 添加参数
    addParameter () {
      let { name, value, remarks, current } = this.parameterForm
      if (name.trim() === '') {
        return this.$message.error('参数名不能为空！')
      } else if (value.trim() === '') {
        return this.$message.error('参数值不能为空！')
      } else {
        let flag = true
        this[current].forEach(item => {
          if (item.name === name) {
            flag = false
            return this.$message.error('参数值已存在！')
          }
        })
        if (flag) {
          this[current].push({
            name,
            value,
            remarks
          })
          this.parameterDialogVisible = false
        }
      }
    },

    // 显示修改参数对话框
    showAlterDia (current, parameter) {
      this.parameterForm.name = parameter.name
      this.parameterForm.currentAlterParameterName = parameter.name
      this.parameterForm.value = parameter.value
      this.parameterForm.remarks = parameter.remarks
      this.parameterForm.current = current
      this.parameterDialogVisible2 = true
    },

    // 修改参数
    alterParameter () {
      let {
        name,
        value,
        remarks,
        current,
        currentAlterParameterName
      } = this.parameterForm
      if (name.trim() === '') {
        return this.$message.error('参数名不能为空！')
      } else if (value.trim() === '') {
        return this.$message.error('参数值不能为空！')
      } else {
        let flag = true
        this[current].forEach(item => {
          if (item.name === name && name !== currentAlterParameterName) {
            flag = false
            return this.$message.error('参数值已存在！')
          }
        })
        if (flag) {
          let newArr = []
          this[current].forEach((item, index) => {
            if (item.name === currentAlterParameterName) {
              newArr.push({
                name,
                value,
                remarks
              })
            } else {
              newArr.push(item)
            }
          })
          this[current] = newArr
          this.$message.success('参数值修改成功！')
          this.parameterDialogVisible2 = false
        }
      }
    },

    // 删除参数
    deleteParameter (current, name) {
      this.$confirm(`是否删除参数(${name})?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this[current].forEach((item, index) => {
            if (item.name === name) {
              this[current].splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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

    // 清空表单数据
    clearFormData () {
      this.$confirm(
        '是否要清空表单所有数据？该操作不会清除临时保存的数据，只会清除页面上表单的数据，刷新页面就可以恢复临时保存的数据，可以先清除表单数据再点击临时保存商品数据来达到永久性清除表单数据。',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.form.goods_name = ''
          this.form.describe = ''
          this.form.price = ''
          this.form.original_price = ''
          this.form.discount_price = ''
          this.form.classification = ''
          this.form.img_list = []
          this.form.goods_number = ''
          this.form.details = ''
          this.form.attribute = []
          this.form.parameter = {}
          this.attributeList = []
          this.checkedAttributeValueList = []
          this.fileList = []
          this.tmpFileList = []
          this.bodyParameterList = []
          this.mainParameterList = []
          this.sizeAndWeightParameterList = []
          this.$message({
            type: 'success',
            message: '清除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          })
        })
    },

    // 临时保存商品数据到 localStorage 中
    temporarySaveDataToLocalStorage () {
      this.tmpFileList.forEach(item => {
        item.name = '点击预览图片'
      })
      this.fileList = this.tmpFileList
      console.log(this.tmpFileList)
      window.localStorage.setItem(
        'addGoodsData-form',
        JSON.stringify(this.form)
      )
      window.localStorage.setItem(
        'addGoodsData-checkedAttributeValueList',
        JSON.stringify(this.checkedAttributeValueList)
      )
      window.localStorage.setItem(
        'addGoodsData-classList',
        JSON.stringify(this.classList)
      )
      window.localStorage.setItem(
        'addGoodsData-attributeList',
        JSON.stringify(this.attributeList)
      )
      window.localStorage.setItem(
        'addGoodsData-fileList',
        JSON.stringify(this.fileList)
      )
      window.localStorage.setItem(
        'addGoodsData-bodyParameterList',
        JSON.stringify(this.bodyParameterList)
      )
      window.localStorage.setItem(
        'addGoodsData-mainParameterList',
        JSON.stringify(this.mainParameterList)
      )
      window.localStorage.setItem(
        'addGoodsData-sizeAndWeightParameterList',
        JSON.stringify(this.sizeAndWeightParameterList)
      )
      this.$message.success('保存成功！')
    },

    // 清除保存到 localStorage 的商品数据
    clearDataInLocalStorage () {
      window.localStorage.removeItem('addGoodsData-form')
      window.localStorage.removeItem('addGoodsData-checkedAttributeValueList')
      window.localStorage.removeItem('addGoodsData-classList')
      window.localStorage.removeItem('addGoodsData-attributeList')
      window.localStorage.removeItem('addGoodsData-fileList')
      window.localStorage.removeItem('addGoodsData-bodyParameterList')
      window.localStorage.removeItem('addGoodsData-mainParameterList')
      window.localStorage.removeItem('addGoodsData-sizeAndWeightParameterList')
    },

    // 提交商品到后台数据库保存
    saveGoods () {
      this.tmpFileList.forEach(item => {
        item.name = '点击预览图片'
      })
      this.fileList = this.tmpFileList
      if (this.form.goods_name.trim() === '') {
        return this.$message.error('必须填写商品名称!')
      } else if (this.form.describe.trim() === '') {
        return this.$message.error('必须填写商品描述!')
      } else if (this.form.price === '') {
        return this.$message.error('必须填写商品价格!')
      } else if (Number(this.form.price) <= 0) {
        return this.$message.error('商品价格必需大于0!')
      } else if (
        this.form.original_price &&
        Number(this.form.price) > Number(this.form.original_price)
      ) {
        return this.$message.error('商品价格不能大于商品原价!')
      } else if (this.form.goods_number === '') {
        return this.$message.error('必须填写商品数量!')
      } else if (Number(this.form.goods_number) < 0) {
        return this.$message.error('商品数量必需大于等于 0 !')
      } else if (this.form.classification.trim() === '') {
        return this.$message.error('必须选择商品分类!')
      } else if (this.fileList.length <= 0) {
        return this.$message.error('必须要上传商品图片!')
      } else {
        // 整理 attribute
        let attribute = []
        this.checkedAttributeValueList.forEach(item => {
          let arr = item.split('-attributeName-')
          if (attribute.length === 0) {
            attribute.push({
              name: arr[0],
              value: arr[1]
            })
          } else {
            let index = 0
            for (let i = 0; i < attribute.length; i++, index++) {
              if (attribute[i].name === arr[0]) {
                attribute[i].value = attribute[i].value + ',' + arr[1]
                break
              }
            }
            if (index === attribute.length) {
              attribute.push({
                name: arr[0],
                value: arr[1]
              })
            }
          }
        })
        this.form.attribute = attribute

        if (this.form.attribute.length <= 0) {
          return this.$message.error('必须要设置商品参数!')
        } else {
          // 整理商品图片列表
          this.fileList.forEach(item => {
            this.form.img_list.push(item.tmp_path)
          })

          // 整理价格
          this.form.price = Number(this.form.price)
          this.form.discount_price = this.form.price
          if (
            this.form.original_price === '' ||
            Number(this.form.original_price) <= 0
          ) {
            this.form.original_price = this.form.price
          }

          // 整理商品参数
          this.form.parameter.body = this.bodyParameterList
          this.form.parameter.main = this.mainParameterList
          this.form.parameter.size_and_weight = this.sizeAndWeightParameterList

          // 发送保存请求
          this.$axios.post('/add/goods', this.form).then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success('添加商品成功！')
              this.$store.dispatch('getWarningGoodsNumber')
              this.clearDataInLocalStorage()
              this.isSubmit = true
              this.$router.push({ name: 'goodslist' })
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
        }
      }
    }
  },

  // 导航离开该组件的对应路由时调用
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    if (to.name !== 'addgoods' && !this.isSubmit) {
      this.$confirm('跳转到其他页面会清空当前表单数据, 是否继续跳转?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 移除页面绑定的刷新和关闭事件
          window.removeEventListener('beforeunload', e =>
            this.beforeunloadHandler(e)
          )
          window.onbeforeunload = null
          next()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消跳转'
          })
          this.$store.commit('setActiveMenu', '/goods/manage/addgoods')
        })
    } else {
      next()
    }
  }
}
</script>

<style lang="less">
.add-goods {
  .add-goods-form {
    .form--inpu-item {
      width: 500px;
    }

    .classification {
      display: inline-block;
    }

    .add-classification-btn {
      display: inline-block;
    }

    .fuwenben {
      margin-bottom: 60px;
      .my-quill-editor {
        height: 300px;
      }
    }

    .attribute {
      display: inline-block;
    }

    .add-attribute-btn {
      display: inline-block;
    }

    .add-attribute-btn {
      margin-top: 20px;
    }

    .goods-parameter {
      .main {
        margin-top: 50px;
      }

      .size-and-weight {
        margin-top: 50px;
      }

      .title {
        font-size: 20px;
        font-weight: 700;
        font-family: FZZJ, Georgia, 'Times New Roman', Times, serif;
        margin-bottom: 12px;
      }
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
