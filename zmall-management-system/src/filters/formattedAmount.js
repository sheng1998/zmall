/* 金额格式化 */
import Vue from 'vue'

Vue.filter('fmtAmount', date => {
  let decimal = date.toString().split('.')[1]
  if (decimal) {
    decimal = decimal.padEnd(2, '0')
  } else {
    decimal = '00'
  }
  date = date.toString().split('.')[0] + '.' + decimal
  return date
})
