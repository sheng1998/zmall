import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
  // 相当于全局 data
  state: {
    warningGoodsNumber: 0, // 库存预警商品条数
    activeMenu: '/home/manage/logo' // 当前活跃导航栏
  },

  // 相当于方法，用于改变 state 中的数据
  mutations: {
    // 设置库存预警商品条数
    setWarningGoodsNumber (state, number) {
      state.warningGoodsNumber = number
    },

    // 设置当前活跃导航栏
    setActiveMenu (state, path) {
      state.activeMenu = path
    }
  },

  // 处理异步事件
  actions: {
    // 异步获取库存预警商品条数
    getWarningGoodsNumber (context) {
      axios.get('http://127.0.0.1:3002/stockwarning').then(res => {
        context.commit('setWarningGoodsNumber', res.data.warning_goods_number)
      })
    }
  }
})

export default store
