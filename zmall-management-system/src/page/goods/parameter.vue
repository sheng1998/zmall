<template>
  <div class="goods-parameter">
    <div class="xmf-system-flex fzzj">添加参数</div>

    <!-- 添加参数区域 -->
    <div class="main">
      <el-card
        class="box-card parameter"
        v-for="(item, index1) in parameter"
        :key="index1"
      >
        <!-- 参数卡片头部 -->
        <div slot="header" class="clearfix header">
          <span>{{ item.name }}</span>
          <div style="float: right; padding: 3px 0">
            <el-button type="text" @click="clearCurrentForm(item.name)"
              >清空当前表单</el-button
            >
            <el-button type="text" @click="deleteParameter(item.name)"
              >删除该参数</el-button
            >
          </div>
        </div>

        <!-- 参数卡片主要部分 -->
        <div class="item body" v-for="(item, index) in item.value" :key="index">
          <div class="title">{{ item.title }}</div>
          <div class="value">
            <el-input v-model="item.value" :ref="'parameter' + index1 + index" :class="index1 + index"></el-input>
          </div>
        </div>
      </el-card>

      <el-button
        class="add-parameter-btn"
        type="primary"
        @click="dialogFormVisible = true"
        >添加 / 编辑分类参数</el-button
      >

      <el-button class="add-parameter-btn" type="success" @click="backPage"
        >保存参数并返回商品添加页面</el-button
      >
    </div>

    <!-- 添加、编辑分类参数 -->
    <el-dialog
      title="添加、编辑分类参数"
      :visible.sync="dialogFormVisible"
      @close="clearDiaForm"
    >
      <el-form :model="parameterForm" @submit.native.prevent>
        <el-form-item label="参数描述" label-width="120px">
          <el-input
            v-model="parameterForm.name"
            @change="searchParameter"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="参数值" label-width="120px">
          <el-input
            type="textarea"
            v-model="parameterForm.value"
            autocomplete="off"
            :disabled="!canInput"
          ></el-input>
          <div class="tip">
            提示：参数值之间用半角逗号 ',' 隔开。
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParameter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定时器
      timer: null,

      // 参数列表
      parameter: {},

      // 添加、编辑分类参数相关
      dialogFormVisible: false,
      parameterForm: {
        name: '',
        value: ''
      },
      canInput: false
    }
  },

  created () {
    this.$store.commit('setActiveMenu', '/goods/manage/addgoods')
    let parameter = window.localStorage.getItem('GoodsParameter-Form-parameter')
    if (parameter) {
      this.getParameterFromLocalStorate()
    } else {
      this.getParameter()
    }
  },

  mounted () {
    // 每半分钟自动保存商品信息，防止数据丢失
    this.timer = setInterval(() => {
      this.saveParameterToLocalStorate(
        '参数数据已经自动保存到浏览器localStorage中!'
      )
    }, 30 * 1000)
  },

  beforeRouteEnter (to, from, next) {
    if (!from.name || (from.name !== 'addgoods' && from.name !== 'editgoods')) {
      window.alert('请从商品添加页面或商品编辑页面进入该页面！点击确认返回商品列表页面。')
      next(vm => {
        if (window.localStorage.getItem('GoodsParameter-Form-parameter')) {
          window.localStorage.removeItem('GoodsParameter-Form-parameter')
        }
        vm.$nextTick(() => {
          // 清除定时器
          clearInterval(vm.timer)
          vm.timer = null
        })
        vm.$router.replace({ path: '/goods/manage/list' })
      })
    } else {
      next()
    }
  },

  // 导航离开该组件的对应路由时调用
  beforeRouteLeave (to, from, next) {
    // 清除定时器
    clearInterval(this.timer)
    this.timer = null
    next()
  },

  methods: {
    // 根据分类获取参数列表
    getParameter () {
      this.$axios
        .get('get/parameter/with/classification', {
          params: {
            classification: this.$route.query.classification
          }
        })
        .then(res => {
          let parameter = {}
          res.data.parameterList.forEach((item, index) => {
            let value = item.titleList.split(',')
            value.forEach((item, index) => {
              value[index] = {
                title: item,
                value: ''
              }
            })
            parameter['parameter' + (index + 1)] = {
              name: item.name,
              value
            }
          })
          this.parameter = parameter
          this.saveParameterToLocalStorate(null, false)
        })
    },

    // 从localStorate 获取参数数据
    getParameterFromLocalStorate () {
      let parameter = window.localStorage.getItem(
        'GoodsParameter-Form-parameter'
      )
      if (parameter) {
        parameter = JSON.parse(parameter)
        this.parameter = parameter
      }
    },

    // 保存参数数据到localStorate
    saveParameterToLocalStorate (msg, flag = true) {
      window.localStorage.setItem(
        'GoodsParameter-Form-parameter',
        JSON.stringify(this.parameter)
      )
      if (flag) {
        this.$message.success(
          typeof msg === 'string'
            ? msg
            : '参数数据已临时保存到 localStorage 中！'
        )
      }
    },

    // 删除参数
    deleteParameter (name) {
      this.$confirm('是否要删除 参数组：' + name, '提示', {
        confirmButtonText: '确定删除 参数组：' + name,
        cancelButtonText: '取消删除',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/deleteparameter', {
              params: {
                name,
                classification: this.$route.query.classification
              }
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success(`参数组：${name} 删除成功！`)
                this.getParameter()
                this.saveParameterToLocalStorate(null, false)
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

    // 添加、编辑分类参数
    editParameter () {
      this.dialogFormVisible = true
      if (this.parameterForm.name.trim() === '') {
        this.$message.error('请填写参数描述！')
      } else if (this.parameterForm.value.trim() === '') {
        this.$message.error('请填写或至少保留一个参数值！')
      } else {
        this.$axios
          .post('/editparameter/with/classification', {
            classification: this.$route.query.classification,
            name: this.parameterForm.name,
            titleList: this.parameterForm.value
          })
          .then(res => {
            this.getParameter()
            this.dialogFormVisible = false
            this.$message.success('添加 / 修改分类参数成功！')
            this.saveParameterToLocalStorate(null, false)
          })
      }
    },

    // 根据参数描述搜索参数值
    searchParameter (val) {
      if (val.trim() !== '') {
        this.$axios
          .get('/parametervalue/with/parametername', {
            params: {
              classification: this.$route.query.classification,
              parametername: val
            }
          })
          .then(res => {
            this.canInput = true
            if (res.data.parametervalue) {
              this.parameterForm.value = res.data.parametervalue.titleList
            }
          })
      } else {
        this.canInput = false
      }
    },

    // 清空对话框表单信息
    clearDiaForm () {
      this.parameterForm.name = ''
      this.parameterForm.value = ''
      this.canInput = false
    },

    // 清空当前表单
    clearCurrentForm (name) {
      this.$confirm(`是否要清除 参数组：${name} 的表单数据？`, '提示', {
        confirmButtonText: '确定清除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Object.keys(this.parameter).forEach(item => {
            if (this.parameter[item].name === name) {
              this.parameter[item].value.forEach(item => {
                item.value = ''
              })
            }
          })
          this.$message.success('清空表单数据成功！')
          this.saveParameterToLocalStorate(null, false)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          })
        })
    },

    // 返回商品添加页面
    backPage () {
      this.saveParameterToLocalStorate()
      // 清除定时器
      clearInterval(this.timer)
      this.timer = null
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less">
.goods-parameter {
  .main {
    width: calc(100% - 100px);
    margin: 0 auto;

    .parameter {
      &:not(:first-child) {
        margin-top: 35px;
      }

      .header {
        span {
          font-weight: 700;
        }
      }

      .body {
        &.item {
          display: flex;
          align-items: center;
          font-size: 13px;

          &:not(:first-child) {
            margin-top: 10px;
          }

          .title {
            width: 110px;
            text-align: right;
          }

          .value {
            padding-left: 20px;
            width: 100%;

            input {
              height: 35px;
            }
          }
        }
      }
    }

    .add-parameter-btn {
      margin-top: 30px;
    }
  }

  .tip {
    font-size: 12px;
    color: red;
  }
}
</style>
