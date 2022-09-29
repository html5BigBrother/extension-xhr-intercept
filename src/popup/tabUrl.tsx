import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Checkbox, Col, Input, Row, Switch, Tabs } from "antd"
import { useEffect, useMemo, useState } from "react"

function TabUrl() {
  const [urlConcatList, setUrlConcatList] = useState([
    { id: 1, checked: false, key: "", value: "" }
  ]) // url拼接参数列表

  // 添加
  const clickAdd = () => {
    const urlConcatListNew = urlConcatList.concat([
      { checked: false, key: "", value: "", id: Math.random() }
    ])
    setUrlConcatList(urlConcatListNew)
  }
  // 删除
  const clickDel = (idx: number) => {
    const urlConcatListNew = urlConcatList.concat()
    urlConcatListNew.splice(idx, 1)
    setUrlConcatList(urlConcatListNew)
  }

  useEffect(() => {
    // 首次进入获取 storage中的数据
    chrome.storage.sync.get(["urlConcatList"], (result) => {
      result["urlConcatList"] && setUrlConcatList(result["urlConcatList"])
    })
  }, [])
  useEffect(() => {
    chrome.storage.sync.set({ urlConcatList: urlConcatList }, () => {
      console.log("urlConcatList storage set success", urlConcatList)
      // 往 content script 通信
      postMessageToContent({ dataName: "urlConcatList", data: urlConcatList })
    })
  }, [urlConcatList])

  // popup 往 content script 通信
  const postMessageToContent = async ({ dataName, data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    tab?.id && chrome.tabs.sendMessage(tab.id, { dataName, data })
  }

  const checkListValue = useMemo(() => {
    return urlConcatList
      .map((item, index) => item.checked && index)
      .filter((item) => item === 0 || item)
  }, [urlConcatList])

  const changeCheck = (checkList: number[]) => {
    const urlConcatListNew = urlConcatList.concat()
    urlConcatListNew.forEach((item, index) => {
      item.checked = checkList?.includes(index)
    })
    setUrlConcatList(urlConcatListNew)
  }

  const changeInput = (value: string, idx: number, key: string) => {
    const urlConcatListNew = urlConcatList.concat()
    urlConcatListNew[idx][key] = value
    setUrlConcatList(urlConcatListNew)
  }

  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      value={checkListValue}
      onChange={changeCheck}>
      {urlConcatList.map((item, index) => (
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
              placeholder="参数名"
              value={item.key}
              onChange={(e) =>
                changeInput(e.target.value, index, "key")
              }></Input>
          </Col>
          <Col span={14}>
            <Input
              placeholder="参数数据"
              value={item.value}
              onChange={(e) =>
                changeInput(e.target.value, index, "value")
              }></Input>
          </Col>
          <Col span={3}>
            {/* 删除icon */}
            {urlConcatList.length > 1 && (
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
            {index === urlConcatList.length - 1 && (
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

export default TabUrl
