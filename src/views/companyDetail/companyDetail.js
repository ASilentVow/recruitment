import React, {Component} from 'react'
import CompanyInfo from "@/views/companyDetail/cmps/CompanyInfo";
import PositionCard from "@/components/PositionCard/PositionCard";
import { getCompanyInfoApi } from "@/api/companyApi";
import { getCompanyPositionApi } from "@/api/positionApi";
import Style from './companyDetail.module.scss'
import {Pagination} from "antd";

export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      positionList: {
        data: [],
        count: 0,
      },
      pageNo: 1
    }
  }

  componentDidMount() {
    this.getInfo()
    this.getPositionList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  flag = true

  async getInfo() {
    const { companyId } = this.props.match.params
    const { data } = await getCompanyInfoApi({companyId})
    if (this.flag) await this.setState({ info: data })
  }

  async getPositionList() {
    const { companyId } = this.props.match.params
    const data = await getCompanyPositionApi({companyId, pageNum: this.state.pageNo})
    if (this.flag) await this.setState({ positionList: data })
  }

  pageChange = async (page) => {
    await this.setState({ pageNo: page })
    await this.getPositionList()
  }

  skipPage = (id) => {
    this.props.history.push({ pathname : `/jobDetail/${id}`})
  }

  render() {
    if (this.state.info) {
      return (
        <div>
          <CompanyInfo info={this.state.info} count={this.state.positionList.count} />
          <div className={Style.wrapper}>
            { this.state.positionList.data.map(v => <PositionCard key={v.id} item={v} skipPage={this.skipPage} />) }
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Pagination onChange={this.pageChange} current={this.state.pageNo} total={this.state.positionList.count} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}
