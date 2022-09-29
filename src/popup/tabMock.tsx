import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Checkbox, Col, Input, Row, Switch, Tabs } from "antd"
import { useEffect, useMemo, useState } from "react"

function TabMock() {
  const [mockList, setMockList] = useState([
    { id: 1, checked: false, key: "", value: "" }
  ]) // url拼接参数列表

  // 添加
  const clickAdd = () => {
    const mockListNew = mockList.concat([
      { checked: false, key: "", value: "", id: Math.random() }
    ])
    setMockList(mockListNew)
  }
  // 删除
  const clickDel = (idx: number) => {
    const mockListNew = mockList.concat()
    mockListNew.splice(idx, 1)
    setMockList(mockListNew)
  }

  useEffect(() => {
    // 首次进入获取 storage中的数据
    chrome.storage.sync.get(["mockList"], (result) => {
      result["mockList"] && setMockList(result["mockList"])
    })
  }, [])
  useEffect(() => {
    chrome.storage.sync.set({ mockList: mockList }, () => {
      console.log("mockList storage set success", mockList)
      // 往 content script 通信
      postMessageToContent({ dataName: "mockList", data: mockList })
    })
  }, [mockList])

  // popup 往 content script 通信
  const postMessageToContent = async ({ dataName, data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    tab?.id && chrome.tabs.sendMessage(tab.id, { dataName, data })
  }

  const checkListValue = useMemo(() => {
    return mockList
      .map((item, index) => item.checked && index)
      .filter((item) => item === 0 || item)
  }, [mockList])

  const changeCheck = (checkList: number[]) => {
    const mockListNew = mockList.concat()
    mockListNew.forEach((item, index) => {
      item.checked = checkList?.includes(index)
    })
    setMockList(mockListNew)
  }

  const changeInput = (value: string, idx: number, key: string) => {
    const mockListNew = mockList.concat()
    mockListNew[idx][key] = value
    setMockList(mockListNew)
  }

  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      value={checkListValue}
      onChange={changeCheck}>
      {mockList.map((item, index) => (
        <Row
          key={item.id}
          gutter={16}
          align="middle"
          style={{ marginBottom: 10 }}>
          <Col span={1}>
            <Checkbox value={index}></Checkbox>
          </Col>
          <Col span={8}>
            <Input
              placeholder="拦截路径"
              value={item.key}
              onChange={(e) =>
                changeInput(e.target.value, index, "key")
              }></Input>
          </Col>
          <Col span={12}>
            <Input.TextArea
              placeholder="mock数据"
              value={item.value}
              onChange={(e) =>
                changeInput(e.target.value, index, "value")
              }></Input.TextArea>
          </Col>
          <Col span={3}>
            {/* 删除icon */}
            {mockList.length > 1 && (
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
            {index === mockList.length - 1 && (
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

export default TabMock
