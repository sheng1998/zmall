import axios from 'axios'

const MyAxios = {}

MyAxios.install = function (Vue) {
  Vue.prototype.$axios = axios
}

export default MyAxios
