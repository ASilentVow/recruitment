import React, { Component } from "react";
import companyStyle from './company.module.scss'
import { Filter } from '@/components/Filter/Filter'
import { getAllCompanyListApi } from "@/api/companyApi";
import { Row, Col, Pagination } from 'antd';

function CompanyCard(props) {
  return (
    <div className={companyStyle.cardWrapper}>
      <div className={companyStyle.companyInfo}>
        <div className={companyStyle.logo}>
          <img src={props.item.companyImg} alt="" />
        </div>
        <div className={companyStyle.companyText}>
          <span>{props.item.companyName}</span>
          <p className={companyStyle}>
            {props.item.situation}
            <span className={companyStyle.vLine} />
            {props.item.type}
          </p>
        </div>
      </div>
      <div className={companyStyle.aboutInfo}>
        <span>{props.item.slogan}</span>
      </div>
    </div>
  )
}

export default class Company extends Component {
  constructor() {
    super();
    this.state = {
      activeCity: '广州',
      list: [],
      count: 0,
      pageNo: 1
    }
  }

  async componentDidMount() {
    await this.getList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  flag = true

  clickFilter = async (label) => {
    this.flag = true
    if (this.flag) await this.setState({ activeCity: label })
    await this.getList()
  }

  pageChange = async (page, pageSize) => {
    if (this.flag) await this.setState({ pageNo: page })
    await this.getList()
  }

  getList = async () => {
    const { data, count } = await getAllCompanyListApi({
      city: this.state.activeCity,
      pageNum: this.state.pageNo
    })
    if (this.flag) this.setState({ list: data, count: count })
  }

  render() {
    return (
      <div className={companyStyle.company}>
        <Filter active={this.state.activeCity} clickItem={this.clickFilter} />
        <div className={companyStyle.content}>
          <Row gutter={25}>
            {this.state.list.map((v, i) => {
              return (
                <Col key={i} span={6}>
                 <CompanyCard key={v.id} item={v} />
                </Col>
              )
            })}
          </Row>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              onChange={this.pageChange}
              pageSize={24}
              current={this.state.pageNo}
              total={this.state.count}
            />
          </div>
        </div>
      </div>
    )
  }
}
