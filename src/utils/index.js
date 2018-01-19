export default {
  /**
   * jsonp请求
   * @support IE8+
   * @param {* string} url 请求地址
   * @param {* func} onloadCallback 加载js成功
   * @param {* func} onErrorCallback 加载js失败
   */
  jsonp(url, onloadCallback, onErrorCallback) {
    const script = document.createElement('script')
    let tempScriptCountInDom = window.__tempScriptCountInDom || 0
    tempScriptCountInDom++
    script.src = url
    script.id = `tempJS${tempScriptCountInDom}`
    script.onload = function () {
      document.head.removeChild(script)
      onloadCallback && onloadCallback()
    }
    script.onerror = function () {
      document.head.removeChild(script)
      onErrorCallback && onErrorCallback()
    }
    document.head.appendChild(script)
  }
}
