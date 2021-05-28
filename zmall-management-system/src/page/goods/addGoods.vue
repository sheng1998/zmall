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
        <el-form-item
          label="商品分类"
          prop="classification"
          style="margin-top: 60px;"
        >
          <template>
            <div class="classification">
              <el-select
                v-model="form.classification"
                filterable
                ref="classificationSelect"
                placeholder="请选择商品分类"
                @change="classificationChange"
                @focus="rememberClassification"
              >
                <el-option
                  :label="item.class_name"
                  :value="item.class_name"
                  v-for="item in classList"
                  :key="item._id"
                ></el-option>
              </el-select>
            </div>
          </template>
        </el-form-item>

        <!-- 商品属性 -->
        <el-form-item label="商品属性" prop="attribute">
          <template>
            <div>
              <el-button type="primary" @click="addAttributeDia = true"
                >添加商品属性</el-button
              >
              <!-- 属性对应的表格 -->
              <el-table :data="form.attribute" style="width: 100%">
                <el-table-column
                  prop="name"
                  label="参数名"
                  width="180"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>

                <!-- 属性值 -->
                <el-table-column label="参数值" width="1000">
                  <template slot-scope="scope">
                    <div>
                      <el-tag
                        effect="dark"
                        :type="tagType[index % 5]"
                        v-for="(tag, index) in scope.row.value"
                        :key="tag"
                        closable
                        @close="handleClose(scope.row.name, tag)"
                        >{{ tag }}</el-tag
                      >
                    </div>
                  </template>
                </el-table-column>

                <!-- 操作 -->
                <el-table-column label="操作" width="120" fixed="right">
                  <template slot-scope="scope">
                    <div>
                      <el-row>
                        <!-- 编辑商品属性 -->
                        <el-button
                          size="mini"
                          plain
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          @click="
                            showAddAttributeDia(scope.row.name, scope.row.value)
                          "
                        ></el-button>

                        <!-- 删除商品属性 -->
                        <el-button
                          size="mini"
                          plain
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="deleteAttribute(scope.row.name)"
                        ></el-button>
                      </el-row>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-form-item>

        <!-- 商品参数 -->
        <el-form-item label="商品参数">
          <template>
            <div class="params">
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

              <div class="has-classification" v-else>
                <el-button
                  style="margin-bottom: 20px;"
                  type="primary"
                  @click="toAddParams"
                >
                  前往添加商品参数
                </el-button>
                <el-card
                  shadow="hover"
                  v-for="item in form.parameter"
                  :key="item.name"
                  class="parameter-item"
                >
                  <div class="parameter-name">
                    {{ item.name }}
                  </div>
                  <div
                    v-for="(parameter, index) in item.value"
                    :key="index"
                    class="parameter-list"
                  >
                    <div class="parameter-title">{{ parameter.title }}</div>
                    <div class="parameter-value">{{ parameter.value }}</div>
                  </div>
                </el-card>
              </div>
            </div>
          </template>
        </el-form-item>
      </el-form>

      <!-- 保存按钮 -->
      <div class="goodsinfo-submit-btn xmf-system-flex">
        <el-button type="danger" @click="clearFormData">清空表单数据</el-button>
        <el-button type="primary" @click="temporarySaveDataToLocalStorage"
          >临时保存商品数据</el-button
        >
        <el-button type="success" @click="saveGoods">提交商品数据</el-button>
      </div>
    </el-card>

    <!-- 添加、修改商品属性对话框 -->
    <el-dialog
      title="添加、修改商品属性"
      :visible.sync="addAttributeDia"
      @close="clearAddAttributeForm"
    >
      <el-form
        :model="addAttributeForm"
        :rules="addAttributeRules"
        ref="addAttributeForm"
      >
        <!-- 属性名 -->
        <el-form-item label="属性名" label-width="120px" prop="name">
          <el-tooltip
            class="item"
            effect="light"
            content="添加属性时多个属性名之间用全角句号'。'隔开，修改时只能填写一个属性名"
            placement="top-start"
          >
            <el-input
              v-model="addAttributeForm.name"
              autocomplete="off"
            ></el-input>
          </el-tooltip>
        </el-form-item>

        <!-- 属性值 -->
        <el-form-item label="属性值" label-width="120px" prop="value">
          <el-tooltip
            class="item"
            effect="light"
            content="多个属性值之间用半角逗号','隔开，添加属性时不同属性名的属性值之间用全角句号'。'分组"
            placement="bottom-start"
          >
            <el-input
              type="textarea"
              v-model="addAttributeForm.value"
              autocomplete="off"
            ></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAttributeDia = false">取 消</el-button>
        <el-button type="primary" @click="addAttribute('addAttributeForm')"
          >确 定</el-button
        >
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
      // 定时器
      timer: null,

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
      fileList: [],
      tmpFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      isSubmit: false,
      // 标签类型
      tagType: ['', 'success', 'info', 'warning', 'danger'],

      // 添加、修改属性相关数据
      addAttributeDia: false,
      addAttributeForm: {
        name: '',
        value: '',
        current: ''
      },
      // 表单验证规则
      addAttributeRules: {
        name: [{ required: true, message: '请填写属性名', trigger: 'blur' }],
        value: [
          {
            required: true,
            message: '请填写属性值或至少保留一个属性值',
            trigger: 'blur'
          }
        ]
      },

      // 商品分类改变相关数据
      oldClassification: ''
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
  },

  // 生命周期钩子 mounted
  mounted () {
    // 为页面绑定刷新和关闭事件
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    // 每半分钟自动保存商品信息，防止数据丢失
    // this.timer = setInterval(() => {
    //   this.temporarySaveDataToLocalStorage(
    //     '商品数据已经自动保存到浏览器localStorage中!'
    //   )
    // }, 30 * 1000)
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

    // 记录改变前的商品分类
    rememberClassification () {
      this.oldClassification = this.form.classification
    },

    // 获取 localStorage 的值赋值给组件数据
    getLocalStorage () {
      if (window.localStorage.getItem('addGoodsData-form')) {
        this.form = JSON.parse(window.localStorage.getItem('addGoodsData-form'))
      }
      if (window.localStorage.getItem('addGoodsData-classList')) {
        this.classList = JSON.parse(
          window.localStorage.getItem('addGoodsData-classList')
        )
      }
      if (window.localStorage.getItem('addGoodsData-fileList')) {
        this.fileList = JSON.parse(
          window.localStorage.getItem('addGoodsData-fileList')
        )
        this.tmpFileList = this.fileList
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
      if (window.localStorage.getItem('GoodsParameter-Form-parameter')) {
        let parameter = JSON.parse(
          window.localStorage.getItem('GoodsParameter-Form-parameter')
        )
        Object.keys(parameter).forEach(item => {
          for (let i = 0; i < parameter[item].value.length; i++) {
            if (parameter[item].value[i].value === '') {
              parameter[item].value.splice(i, 1)
              i--
            }
          }
          if (parameter[item].value.length <= 0) {
            delete parameter[item]
          }
        })
        this.form.parameter = parameter
      }
    },

    // 商品分类值改变时触发
    classificationChange (val) {
      let oldClassification = this.oldClassification
      if (oldClassification === '') {
        return
      }
      let newClassification = val
      this.form.classification = oldClassification
      this.$confirm('改变分类会清空商品参数数据且无法恢复, 是否继续?', '警告', {
        confirmButtonText: '取消改变',
        cancelButtonText: '确定改变',
        type: 'error'
      })
        .then(() => {
          this.form.classification = oldClassification
          this.$refs.classificationSelect.blur()
        })
        .catch(() => {
          this.form.classification = newClassification
          this.$refs.classificationSelect.blur()
          this.form.parameter = {}
          window.localStorage.setItem(
            'addGoodsData-form',
            JSON.stringify(this.form)
          )
          if (window.localStorage.getItem('GoodsParameter-Form-parameter')) {
            window.localStorage.removeItem('GoodsParameter-Form-parameter')
          }
        })
    },

    // 添加、修改商品属性
    addAttribute (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加商品属性
          if (this.addAttributeForm.current === '') {
            let nameArr = this.addAttributeForm.name.split('。')
            let valueArr = this.addAttributeForm.value.split('。')
            if (nameArr.length !== valueArr.length) {
              this.$message.error(
                '属性名个数和属性值组数对应不上，请检查后再添加'
              )
            } else {
              // 判断属性名和属性值是否为空
              valueArr.forEach((item, index) => {
                if (item.trim() === '' || nameArr[index].trim() === '') {
                  return this.$message.error('属性名和属性值禁止为空！')
                }
              })

              // 遍历属性名和属性值，将其合并添加至表格中
              valueArr.forEach((item, index) => {
                // 去除属性值中的空白项
                let value = item.split(',').filter(item => {
                  return item !== undefined && item.trim() !== ''
                })
                item = value.join(',')

                this.form.attribute.forEach(att => {
                  if (att.name === nameArr[index]) {
                    item = att.value.join(',') + item
                    att.value = [...new Set(item.split(','))]
                    item = ''
                  }
                })
                if (item !== '') {
                  this.form.attribute.push({
                    name: nameArr[index],
                    value: [...new Set(item.split(','))]
                  })
                }
              })
              this.addAttributeDia = false
            }
          } else {
            // 修改商品属性
            this.form.attribute.forEach((item, index) => {
              if (item.name === this.addAttributeForm.current) {
                let value = [...new Set(this.addAttributeForm.value.split(','))]
                // 去除属性值中的空白项
                value = value.filter(item => {
                  return item !== undefined && item.trim() !== ''
                })
                let obj = {
                  name: this.addAttributeForm.name,
                  value
                }
                this.form.attribute.splice(index, 1, obj)
                this.addAttributeDia = false
              }
            })
          }
        } else {
          return false
        }
      })
    },

    // 清空添加、修改商品属性表单
    clearAddAttributeForm () {
      this.addAttributeForm.name = ''
      this.addAttributeForm.value = ''
      this.addAttributeForm.current = ''
    },

    // 前往添加商品参数页面
    toAddParams () {
      this.temporarySaveDataToLocalStorage()
      this.$router.push({
        path: '/goods/all/parameter?classification=' + this.form.classification
      })
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
          this.fileList = []
          this.tmpFileList = []
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
    temporarySaveDataToLocalStorage (msg) {
      this.tmpFileList.forEach(item => {
        item.name = '点击预览图片'
      })
      this.fileList = this.tmpFileList
      window.localStorage.setItem(
        'addGoodsData-form',
        JSON.stringify(this.form)
      )
      window.localStorage.setItem(
        'addGoodsData-classList',
        JSON.stringify(this.classList)
      )
      window.localStorage.setItem(
        'addGoodsData-fileList',
        JSON.stringify(this.fileList)
      )
      this.$message.success(
        typeof msg === 'string' ? msg : '商品数据已临时保存到 localStorage 中！'
      )
    },

    // 清除保存到 localStorage 的商品数据
    clearDataInLocalStorage () {
      window.localStorage.removeItem('addGoodsData-form')
      window.localStorage.removeItem('addGoodsData-classList')
      window.localStorage.removeItem('addGoodsData-fileList')
      window.localStorage.removeItem('GoodsParameter-Form-parameter')
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
    },

    // 删除商品属性值
    handleClose (name, tag) {
      this.$confirm(`是否要删除${name}中的${tag}?`, '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消删除',
        type: 'warning'
      })
        .then(() => {
          this.form.attribute.forEach(item => {
            if (item.name === name) {
              if (item.value.length <= 1) {
                this.$message.error('至少保留一个属性值！')
              } else {
                item.value.splice(item.value.indexOf(tag), 1)
              }
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

    // 删除商品属性
    deleteAttribute (name) {
      this.$confirm(`是否要删除商品属性${name}?`, '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.attribute.forEach((item, index) => {
            if (item.name === name) {
              this.form.attribute.splice(index, 1)
            }
          })
          this.$message.success(`删除属性${name}成功！`)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 显示商品参数编辑对话框
    showAddAttributeDia (name, value) {
      this.addAttributeForm.current = name
      this.addAttributeForm.name = name
      this.addAttributeForm.value = value.join(',')
      this.addAttributeDia = true
    }
  },

  // 导航离开该组件的对应路由时调用
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    if (to.name !== 'addgoods' && !this.isSubmit && to.name !== 'parameter') {
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
          // 清除定时器
          clearInterval(this.timer)
          this.timer = null
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
      // 清除定时器
      clearInterval(this.timer)
      this.timer = null
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

    ul.el-upload-list {
      width: 60%;
      max-width: 500px;
    }

    .el-tag {
      margin-bottom: 5px;

      &:not(:last-child) {
        margin-right: 10px;
      }
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .parameter-item {
    padding: 0;
    .el-card__body {
      padding: 0;
    }

    .parameter-name {
      font-size: 20px;
      font-weight: 700;
      font-family: FZZJ, Georgia, 'Times New Roman', Times, serif;
      background-color: #f9f9f9;
      padding: 0 0 0 20px;
    }

    .parameter-list {
      display: flex;
      border-bottom: 1px solid#f2f2f2;

      .parameter-title {
        width: 200px;
        padding-left: 20px;
        border-right: 1px solid#f2f2f2;
        box-sizing: border-box;
      }

      .parameter-value {
        width: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        padding-left: 20px;
        color: #999999;
      }
    }
  }
}
</style>
