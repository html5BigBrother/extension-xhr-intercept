import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Checkbox, Col, Input, Row, Switch, Tabs } from "antd"
import { useEffect, useMemo, useState } from "react"

import TabHeader from "./tabHeader"
import TabMock from "./tabMock"
import TabUrl from "./tabUrl"

import "antd/dist/antd.css"

function IndexPopup() {
  const [extensionActive, setExtensionActive] = useState<boolean>(false) // 是否激活插件

  useEffect(() => {
    // 首次进入获取 storage中的数据
    chrome.storage.sync.get(["extensionActive"], (result) => {
      setExtensionActive(result["extensionActive"])
    })
  }, [])
  useEffect(() => {
    chrome.storage.sync.set({ extensionActive: extensionActive }, () => {
      console.log("extensionActive storage set success", extensionActive)
      const dataDetail = { dataName: "extensionActive", data: extensionActive }
      // 往 content script 通信
      postMessageToContent(dataDetail)
      // 往 background 通信
      postMessageToBackground({ from: "popup", to: "background", dataDetail })
    })
  }, [extensionActive])

  // popup 往 content script 通信
  const postMessageToContent = async ({ dataName, data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    tab?.id && chrome.tabs.sendMessage(tab.id, { dataName, data })
  }
  // popup 往 background 通信
  const postMessageToBackground = (message) => {
    chrome.runtime.sendMessage(message)
  }

  return (
    <div
      style={{
        width: 600,
        padding: "0px 30px 30px 30px",
        position: "relative"
      }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="request headers" key="1">
          <TabHeader></TabHeader>
        </Tabs.TabPane>
        <Tabs.TabPane tab="request url拼接参数" key="2">
          <TabUrl></TabUrl>
        </Tabs.TabPane>
        <Tabs.TabPane tab="接口mock" key="3">
          <TabMock></TabMock>
        </Tabs.TabPane>
      </Tabs>
      <Switch
        checked={extensionActive}
        onChange={(checked: boolean) => setExtensionActive(checked)}
        style={{ position: "absolute", top: 15, right: 20 }}></Switch>
    </div>
  )
}

export default IndexPopup
