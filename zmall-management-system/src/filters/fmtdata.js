/** 时间格式化过滤器 */
import Vue from 'vue'
import moment from 'moment'

Vue.filter('fmtdate', date => {
  return moment(date).format('YYYY-MM-DD')
})

Vue.filter('fmtdate2', date => {
  if (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '时间格式错误！'
  }
})
