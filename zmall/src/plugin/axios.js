import axios from 'axios'

const MyAxios = {}

MyAxios.install = function (Vue) {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://127.0.0.1:3002/api/private/'
  Vue.prototype.$axios = axios
}

export default MyAxios
