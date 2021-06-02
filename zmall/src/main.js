// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js' // 引入 stroe

// 导入组件
import ElementUI from 'element-ui' // 引入 element-ui 组件库

// 导入自定义插件
import MyAxios from './plugin/axios.js' // 引入自定义的 axios 插件
import MyCookie from './plugin/mycookie.js' // 引入自定义的 cookie 插件

// 导入过滤器
import './filters/fmtdata.js' // 引入时间过滤器
import './filters/formattedAmount.js' // 引入金额格式化过滤器

// 导入样式文件
import 'element-ui/lib/theme-chalk/index.css' // 引入 element-ui 样式文件
// 导入vue-quill-editor的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(MyAxios)
Vue.use(MyCookie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 挂载 store
  components: { App },
  template: '<App/>'
})
