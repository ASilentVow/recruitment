import React, {Component} from 'react'
import CompanyInfo from "@/views/companyDetail/cmps/CompanyInfo";
import PositionCard from "@/components/PositionCard/PositionCard";
import { getCompanyInfoApi } from "@/api/companyApi";
import { getCompanyPositionApi } from "@/api/positionApi";
import Style from './companyDetail.module.scss'

export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      positionList: {
        data: [],
        count: 0
      }
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
    const data = await getCompanyPositionApi({companyId})
    if (this.flag) await this.setState({ positionList: data })
  }

  render() {
    if (this.state.info) {
      return (
        <div>
          <CompanyInfo info={this.state.info} count={this.state.positionList.count} />
          <div className={Style.wrapper}>
            { this.state.positionList.data.map(v => <PositionCard key={v.id} item={v} />) }
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
