// server worker
import imgActive from "data-base64:~assets/icon-active.png"
import imgUnActive from "data-base64:~assets/icon512.png"

chrome.runtime.onMessage.addListener((e) => {
  // console.log("background.ts 接收数据", e)
  if (e.to === "background") {
    const { dataName, data } = e.dataDetail
    if (dataName === "extensionActive") {
      chrome.action.setIcon({ path: data ? imgActive : imgUnActive })
    }
  }
})
