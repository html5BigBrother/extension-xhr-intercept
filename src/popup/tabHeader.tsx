import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Checkbox, Col, Input, Row, Switch, Tabs } from "antd"
import { useEffect, useMemo, useState } from "react"

function TabHeader() {
  const [requestHeaders, setRequestHeaders] = useState([
    { id: 1, checked: false, key: "", value: "" }
  ]) // url拼接参数列表

  // 添加
  const clickAdd = () => {
    const requestHeadersNew = requestHeaders.concat([
      { checked: false, key: "", value: "", id: Math.random() }
    ])
    setRequestHeaders(requestHeadersNew)
  }
  // 删除
  const clickDel = (idx: number) => {
    const requestHeadersNew = requestHeaders.concat()
    requestHeadersNew.splice(idx, 1)
    setRequestHeaders(requestHeadersNew)
  }

  useEffect(() => {
    // 首次进入获取 storage中的数据
    chrome.storage.sync.get(["requestHeaders"], (result) => {
      result["requestHeaders"] && setRequestHeaders(result["requestHeaders"])
    })
  }, [])
  useEffect(() => {
    chrome.storage.sync.set({ requestHeaders: requestHeaders }, () => {
      console.log("requestHeaders storage set success", requestHeaders)
      // 往 content script 通信
      postMessageToContent({ dataName: "requestHeaders", data: requestHeaders })
    })
  }, [requestHeaders])

  // popup 往 content script 通信
  const postMessageToContent = async ({ dataName, data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    tab?.id && chrome.tabs.sendMessage(tab.id, { dataName, data })
  }

  const checkListValue = useMemo(() => {
    return requestHeaders
      .map((item, index) => item.checked && index)
      .filter((item) => item === 0 || item)
  }, [requestHeaders])

  const changeCheck = (checkList: number[]) => {
    const requestHeadersNew = requestHeaders.concat()
    requestHeadersNew.forEach((item, index) => {
      item.checked = checkList?.includes(index)
    })
    setRequestHeaders(requestHeadersNew)
  }

  const changeInput = (value: string, idx: number, key: string) => {
    const requestHeadersNew = requestHeaders.concat()
    requestHeadersNew[idx][key] = value
    setRequestHeaders(requestHeadersNew)
  }

  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      value={checkListValue}
      onChange={changeCheck}>
      {requestHeaders.map((item, index) => (
        <Row
          key={item.id}
          gutter={16}
          align="middle"
          style={{ marginBottom: 10 }}>
          <Col span={1}>
            <Checkbox value={index}></Checkbox>
          </Col>
          <Col span={6}>
            <Input
              placeholder="header名"
              value={item.key}
              onChange={(e) =>
                changeInput(e.target.value, index, "key")
              }></Input>
          </Col>
          <Col span={14}>
            <Input
              placeholder="header值"
              value={item.value}
              onChange={(e) =>
                changeInput(e.target.value, index, "value")
              }></Input>
          </Col>
          <Col span={3}>
            {/* 删除icon */}
            {requestHeaders.length > 1 && (
              <MinusCircleOutlined
                style={{
                  fontSize: 20,
                  color: "#f81f22",
                  cursor: "pointer",
                  marginRight: 5
                }}
                onClick={() => clickDel(index)}
              />
            )}
            {/* 新增icon */}
            {index === requestHeaders.length - 1 && (
              <PlusCircleOutlined
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#008eff"
                }}
                onClick={clickAdd}
              />
            )}
          </Col>
        </Row>
      ))}
    </Checkbox.Group>
  )
}

export default TabHeader
