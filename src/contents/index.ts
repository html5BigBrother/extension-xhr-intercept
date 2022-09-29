import type { PlasmoContentScript } from "plasmo"
import injectedScript from "url:./injectedScript.ts"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

const script = document.createElement("script")
script.setAttribute("type", "text/javascript")
script.setAttribute("src", injectedScript)
document.documentElement.appendChild(script)

// 等待 script加载
script.addEventListener("load", () => {
  console.log('inject script loaded')
  // 如果有 storage 有数据，通知 injected script 和 background
  chrome.storage.sync.get(['extensionActive', 'urlConcatList', 'requestHeaders', 'mockList'],(results) => {
    // console.log('results', results)
    Object.entries(results).forEach(([key, value]) => {
      dispatchToInjectedScript({ dataName: key, data: value })
      if (key === 'extensionActive') {
        chrome.runtime.sendMessage({ from: 'content', to: 'background', dataDetail: { dataName: key, data: value } })
      }
    })
  })
})

// 监听 popup 通信，转发给 injected script
chrome.runtime.onMessage.addListener((e) => {
  // console.log('content.ts 接收到参数', e)
  dispatchToInjectedScript(e)
})

function dispatchToInjectedScript ({ dataName, data }) {
  window.dispatchEvent(
    new CustomEvent("injectedScript", {
      detail: {
        dataName,
        data
      }
    })
  )
}
