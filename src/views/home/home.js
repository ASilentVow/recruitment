import React, { Component } from "react";
import NavSearch from "../../components/NavSearch/NavSearch";
import homeStyle from "./home.module.scss"
import { Tabs, Button } from "antd";
const { TabPane } = Tabs;

// 热门职位
function HotPosition() {
  const posList = [
    'Java',
    'PHP',
    'C++',
    'web前端',
    'iOS',
    'Android',
    '产品经理',
    'UI设计师',
    '产品运营'
  ]
  const list = posList.map((v, i) => <span key={i} className={homeStyle.posItem}>{v}</span>)
  return (
      <div className={homeStyle.hotPosition}>
        <span>热门职位:</span>
        {list}
      </div>
  )
}

// 热招
function Hot() {
  const inviteList = [
    {
      label: 'IT·互联网'
    }, {
      label: '金融'
    }, {
      label: '房地产·建筑'
    }, {
      label: '教育培训'
    }, {
      label: '娱乐传媒'
    }, {
      label: '医疗健康'
    }, {
      label: '法律咨询'
    }, {
      label: '供应链·物流'
    }, {
      label: '采购贸易'
    }
  ]
  const paneList = inviteList.map((v, i) => <TabPane tab={v.label} key={i} />)
  const cardList = [0,1,2,3,4,5,6,7,8].map((v, i) => {
    return (
        <div className={homeStyle.cardItem} key={i}></div>
    )
  })

  return (
      <div className={homeStyle.hot}>
        <Tabs tabBarGutter={60} tabBarStyle={{backgroundColor: '#fff', padding: '10px 0 0 0'}}>
          {paneList}
        </Tabs>
        <div className={homeStyle.hotCard}>
          {cardList}
        </div>
        <div className={homeStyle.hotBtn}>
          <Button block type="primary" ghost>查看更多</Button>
        </div>
      </div>
  )
}

// 热门区域
function Section(props) {
  return (
      <div className={homeStyle.section}>
        <div className={homeStyle.title}>{props.title}</div>
        <Hot/>
      </div>
  )
}

export default class Home extends Component{
  render() {
    return (
      <div className={homeStyle.home}>
        <div className={homeStyle.homeWrapper}>
          <div className={homeStyle.homeSearch}>
            {/* 首页搜索 */}
            <NavSearch />
            {/* 热门职位搜索 */}
            <HotPosition />
          </div>
          <Section title="热招职位"/>
          <Section title="热门企业"/>
        </div>
      </div>
    )
  }
}