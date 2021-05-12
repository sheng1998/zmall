import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
  state: {
    loginDiaVisible: false,
    registerDiaVisible: false
  },
  mutations: {
    setLoginDiaVisible (state, flag) {
      state.loginDiaVisible = flag
    },
    setRegisterDiaVisible (state, flag) {
      state.registerDiaVisible = flag
    }
  }
})

export default store
