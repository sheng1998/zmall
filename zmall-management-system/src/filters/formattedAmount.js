/* 金额格式化 */
import Vue from 'vue'

Vue.filter('fmtAmount', price => {
  if (!price) {
    return '金额格式错误！'
  }
  let decimal = price.toString().split('.')[1]
  if (decimal) {
    decimal = decimal.padEnd(2, '0')
  } else {
    decimal = '00'
  }
  price = price.toString().split('.')[0] + '.' + decimal
  return price
})
