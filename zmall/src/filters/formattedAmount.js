/* 金额格式化 */
import Vue from 'vue'

Vue.filter('fmtAmount', data => {
  if (data) {
    let decimal = data.toString().split('.')[1]
    if (decimal) {
      decimal = decimal.padEnd(2, '0')
    } else {
      decimal = '00'
    }
    data = data.toString().split('.')[0] + '.' + decimal
    return data
  } else {
    return '0.00'
  }
})
