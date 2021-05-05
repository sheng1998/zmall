/** 时间格式化过滤器 */
import Vue from 'vue'
import moment from 'moment'

Vue.filter('fmtdata', date => {
  return moment(date).format('YYYY-MM-DD')
})
