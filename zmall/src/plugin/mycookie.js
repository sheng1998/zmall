const MyCookie = {}

MyCookie.install = function (Vue) {
  let mycookie = {}

  /**
   * [setCookie 设置cookie]
   * [key value t 键 值 时间(秒)]
   */
  mycookie.set = function setCookie (key, value, t) {
    var oDate = new Date()
    oDate.setTime(oDate.getTime() + t * 1000)
    document.cookie = key + '=' + value + '; expires=' + oDate.toGMTString()
  }

  /**
   * [getCookie 获取cookie]
   */
  mycookie.get = function getCookie (key) {
    var arr1 = document.cookie.split('; ') // 由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for (var i = 0; i < arr1.length; i++) {
      var arr2 = arr1[i].split('=') // 通过=截断，把name=Jack截断成[name,Jack]数组；
      if (arr2[0] === key) {
        return decodeURI(arr2[1])
      }
    }
  }

  /**
   * [removeCookie 移除cookie]
   */
  mycookie.remove = function removeCookie (key) {
    mycookie.set(key, '', -1) // 把cookie设置为过期
  }

  Vue.prototype.$mycookie = mycookie
}

export default MyCookie
