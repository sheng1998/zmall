const Debounce = {}

Debounce.install = function (Vue) {
  let debounce = {}
  /**
   * 实现函数的防抖（目的是频繁触发中只执行一次）
   * @param {*} fun 需要执行的函数
   * @param {*} delay 检测防抖的间隔频率，默认 500ms
   * @param {*} immediate 是否是立即执行
   * @return {可被调用执行的函数}
   */
  debounce.use = function debounce (fun, delay = 500, immediate = false) {
    let timer = null
    return (function () {
      clearTimeout(timer)
      if (immediate) {
        let doNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, delay) // 当 immediate 不为 null 时，不执行

        // immediate 为 true, 则函数会立即执行，所以 timer 为 null 时就要执行
        if (doNow) {
          fun.apply(this, arguments)
        }
      } else {
        timer = setTimeout(() => {
          // 注意此处要用箭头函数，不然就要先在函数外声明变量保存 this 和 arguments
          fun.apply(this, arguments)
        }, delay)
      }
    })()
  }

  Vue.prototype.$debounce = debounce
}

export default Debounce
