import debounce from 'just-debounce-it'

// 公开的助手函数，使用方式：adminlts.util.xxx()
export default {
  debounce(...args) {
    return debounce(...args)
  },
  // 给任意url添加一个参数
  addSearchParams(url, params = {}) {
    let isRootPath = url.startsWith('/')

    let isRelative
    let base = window.location.origin

    let urlObj
    try {
      urlObj = new URL(url)
      isRelative = false
    } catch (e) {
      urlObj = new URL(url, base)
      isRelative = true
    }

    // 遍历 params 并使用 set 替换现有参数或添加新参数
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value)
    })

    // 构造新的 URL
    const new_url = new URL(
      `${urlObj.origin}${urlObj.pathname}?${urlObj.searchParams.toString()}${urlObj.hash}`,
    )

    if (isRelative) {
      let finalUrl = new_url.href.replace(`${base}/`, '')
      return isRootPath ? `/${finalUrl}` : finalUrl
    } else {
      return new_url.href
    }
  },

  isCrossOrigin(iframe) {
    try {
      // 尝试访问 iframe 的内容
      const doc = iframe.contentDocument || iframe.contentWindow.document
      // 如果没有抛出异常，说明不是跨域的
      return false
    } catch (e) {
      // 如果捕获到 SecurityError 异常，说明是跨域的
      if (e instanceof DOMException && e.name === 'SecurityError') {
        return true
      } else {
        throw e // 重新抛出不是 SecurityError 的异常
      }
    }
  },

  isSVGString(str) {
    // 1. 检查字符串是否包含 <svg> 标签
    if (typeof str !== 'string' || !str.trim().startsWith('<svg')) {
      return false
    }

    // 2. 使用 DOMParser 解析字符串
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'image/svg+xml')

    // 3. 检查解析结果是否包含 <svg> 根元素
    const svgElement = doc.documentElement
    return svgElement.tagName === 'svg' && !doc.querySelector('parsererror')
  },

  //html反转义
  htmlspecialchars_decode(text) {
    let temp = document.createElement('div')
    temp.innerHTML = text
    let output = temp.innerText || temp.textContent
    temp = null
    return output
  },

  // HTML转义
  htmlspecialchars(html) {
    let temp = document.createElement('div')
    temp.textContent != null
      ? (temp.textContent = html)
      : (temp.innerText = html)
    let output = temp.innerHTML
    temp = null
    return output
  },
  sprintf(_str, ...args) {
    let flag = true
    let i = 0

    const str = _str.replace(/%s/g, () => {
      const arg = args[i++]

      if (typeof arg === 'undefined') {
        flag = false
        return ''
      }
      return arg
    })

    return flag ? str : ''
  },

  clear(prefix = 'Quicktab') {
    ;['localStorage', 'sessionStorage'].forEach((storage) => {
      const keys = Object.keys(window[storage])
      keys.forEach((key) => {
        if (key.startsWith(prefix)) {
          window[storage].removeItem(key)
        }
      })
    })
  },
}
