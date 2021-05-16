import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setIsLogin (state, flag) {
      state.isLogin = flag
    }
  }
})

export default store
