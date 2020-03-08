import homeStyle from "../home.module.scss";
import {Button, Tabs} from "antd";
import homeActions from "../../../store/actions/homeAction";
import React from "react";
import { connect } from 'react-redux';
const { TabPane } = Tabs;

// 热招职位&企业
function HotSection(props) {
  // tabs栏
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

  // 热门职位列表
  const positionList = props.positionList.map((v, i) => {
    return (
      <div className={homeStyle.cardItem} key={i}>
        <div className={homeStyle.hotPositionInfo}>
          <div>
            <span>Java</span>
            <p>
              深圳
              <span className={homeStyle.vLine} />
              3-5年
              <span className={homeStyle.vLine} />
              本科
            </p>
          </div>
          <div className={homeStyle.positionMoney}>
            20-40K
          </div>
        </div>
        <div className={homeStyle.positionAbout}>
          阿里巴巴集团
          <span className={homeStyle.positionDetail}>
            李先生
            <span className={homeStyle.vLine} />
            高级开发工程师
          </span>
        </div>
      </div>
    )
  })

  // 热门企业列表
  const companyList = props.companyList.map((v, i) => {
    return (
      <div className={homeStyle.cardWrapper} key={i}>
        <div className={homeStyle.companyInfo}>
          <div className={homeStyle.logo} />
          <div className={homeStyle.companyText}>
            <span>平安普惠</span>
            <p className={homeStyle}>
              已上市
              <span className={homeStyle.vLine} />
              互联网金融
            </p>
          </div>
        </div>
        <div className={homeStyle.aboutInfo}>
          <span>热招：测试工程师/测试专家 18-35K·15薪</span>
        </div>
      </div>
    )
  })

  const viewMore = () =>{
    props.type === '1' ? props.changePosition() : props.changeCompany()
  }

  return (
    <div className={homeStyle.hot}>
      <Tabs tabBarGutter={60} tabBarStyle={{backgroundColor: '#fff', padding: '10px 0 0 0'}}>
        {paneList}
      </Tabs>
      <div className={homeStyle.hotCard}>
        {props.type === '1' ? positionList : companyList}
      </div>
      <div className={homeStyle.hotBtn}>
        <Button block type="primary" ghost onClick={viewMore}>查看更多</Button>
      </div>
    </div>
  )
}

export default connect(state => ({
  ...state
}), homeActions)(HotSection)
