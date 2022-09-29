const pageInstance = {
  data: {
    extensionActive: false, // 组件是否激活
    urlConcatList: [],
    requestHeaders: [],
    mockList: [],
    originXHR: window.XMLHttpRequest,
    privateXHR: window.XMLHttpRequest
  },
  methods: {
    setPrivateXHR() {
      function PrivateXHR() {
        const xhr = new pageInstance.data.originXHR()
        for (let attr in xhr) {
          if (attr === "open") {
            // 覆盖open
            pageInstance.methods.overwriteOpen(xhr)
          }
          if (attr === "send") {
            // 覆盖send
            pageInstance.methods.overwriteSend(xhr)
          }
          if (attr === "onload") {
            // 定义onload
            xhr.onload = (...args) => {
              if (pageInstance.data.extensionActive) {
                // 代理接口
                pageInstance.methods.proxyMockList.call(this, xhr)
              }
              this.onload && this.onload.call(this, ...args)
            }
            continue
          }
          if (attr === "onreadystatechange") {
            xhr.onreadystatechange = (...args) => {
              this.onreadystatechange &&
                this.onreadystatechange.call(this, ...args)
            }
            continue
          }
          if (typeof xhr[attr] === "function") {
            // 重要，确保 new PrivateXHR 之后，方法执行的this是指向 xhr 的
            this[attr] = xhr[attr].bind(xhr)
            continue
          }
          if (["response", "responseText", "status"].includes(attr)) {
            Object.defineProperty(this, attr, {
              get() {
                return xhr[`_${attr}`] || xhr[attr]
              },
              set(value) {
                xhr[`_${attr}`] = value
              },
              enumerable: true
            })
          } else {
            Object.defineProperty(this, attr, {
              get() {
                return xhr[attr]
              },
              set(value) {
                xhr[attr] = value
              },
              enumerable: true
            })
          }
        }
      }
      pageInstance.data.privateXHR = PrivateXHR
    },
    // 覆盖open方法
    overwriteOpen(xhr: XMLHttpRequest) {
      xhr.open = function (...args) {
        if (pageInstance.data.extensionActive) {
          let path = args[1]
          const urlSearchParams = new URLSearchParams()
          pageInstance.data.urlConcatList.forEach((item) => {
            if (item.checked && item.key && item.value) {
              urlSearchParams.append(item.key, item.value)
            }
          })
          const paramsStr = urlSearchParams.toString()
          args[1] =
            path +
            (paramsStr ? (path.indexOf("?") > -1 ? "&" : "?") + paramsStr : "")
        }
        pageInstance.data.originXHR.prototype.open.call(this, ...args)
      }
    },
    // 覆盖send方法
    overwriteSend(xhr: XMLHttpRequest) {
      xhr.send = function (...args) {
        // 根据配置增加 request Header 参数
        if (pageInstance.data.extensionActive) {
          pageInstance.data.requestHeaders.forEach((item) => {
            if (item.checked && item.key && item.value) {
              this.setRequestHeader(item.key, item.value)
            }
          })
        }
        pageInstance.data.originXHR.prototype.send.call(this, ...args)
      }
    },
    // 根据mockList 代理接口
    proxyMockList(xhr: XMLHttpRequest) {
      pageInstance.data.mockList.forEach((item) => {
        if (item.checked && item.key && item.value) {
          if (xhr.responseURL.indexOf(item.key) > -1) {
            this.status = 200
            this.response = item.value
            this.responseText = item.value
            console.log("<--------------------")
            console.log("代理接口：", xhr.responseURL)
            console.log("mock数据：", item.value)
            console.log("-------------------->")
          }
        }
      })
    }
  },
  mounted() {
    pageInstance.methods.setPrivateXHR()
  }
}
// 初始化
pageInstance.mounted()

window.addEventListener("injectedScript", (e) => {
  if (
    Object.keys(pageInstance.data).find((item) => item === e.detail?.dataName)
  ) {
    pageInstance.data[e.detail.dataName] = e.detail?.data
    if (pageInstance.data.extensionActive) {
      // 替换 XHR
      window.XMLHttpRequest = pageInstance.data.privateXHR
    } else {
      window.XMLHttpRequest = pageInstance.data.originXHR
    }
  }
  // console.log("injectedScript 接受数据:", e.detail)
})
