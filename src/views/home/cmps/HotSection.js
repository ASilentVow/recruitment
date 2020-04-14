import homeStyle from "../home.module.scss";
import {Button, Tabs, Row, Col} from "antd";
import React, { Component } from "react";
import { inviteList } from "@/libs/SEM";
import { getPositionListApi } from "@/api/positionApi.js";
import { getCompanyListApi } from "@/api/companyApi.js";
import JobCard from '@/components/JobCard/JobCard'
import CompanyCard from '@/components/CompanyCard/CompanyCard'
const { TabPane } = Tabs;

// 热招职位&企业
export default class HotSection extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTabs: '移动互联网',
      list: []
    }
  }

  async componentDidMount() {
    await this.getList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  flag = true

  getList = async () => {
    const api = this.props.type === '1' ? getPositionListApi : getCompanyListApi
    const data = await api({type: this.state.activeTabs})
    if (this.flag) this.setState({ list: data })
  }

  clickTab = async (key) => {
    if (this.flag) await this.setState({ activeTabs: key })
    await this.getList()
  }

  // tabs栏
  inviteList = inviteList
  paneList = this.inviteList.map(v => <TabPane tab={v.label} key={v.label} />)

  viewMore = () => {
    const name = this.props.type === '1' ? 'position' : 'company'
    this.props.history.push(`/${name}`)
  }

  skipPage = (id, type) => {
    if (type === '1') {
      this.props.history.push({ pathname : `/companyDetail/${id}`})
    } else {
      this.props.history.push({ pathname : `/jobDetail/${id}`})
    }
  }

  render () {
    return (
      <div className={homeStyle.hot}>
        <Tabs
          activeKey={this.state.activeTabs}
          onChange={this.clickTab}
          tabBarGutter={70}
          tabBarStyle={{backgroundColor: '#fff', padding: '10px 0 0 15px'}}
        >
          {this.paneList}
        </Tabs>
        <Row gutter={25} className={homeStyle.hotCard}>
          {this.state.list.map((v, i) => {
            return (
              <Col key={i} span={this.props.type === '1' ? 8 : 6}>
                { this.props.type === '1' ?
                  <JobCard item={v} skipPage={this.skipPage} /> :
                  <CompanyCard item={v} skipPage={this.skipPage} /> }
              </Col>
            )
          })}
        </Row>
        <div className={homeStyle.hotBtn}>
          <Button block type="primary" ghost onClick={this.viewMore}>查看更多</Button>
        </div>
      </div>
    )
  }
}
