import React, { Component } from "react";
import positionStyle from './position.module.scss'
import { Filter } from '@/components/Filter/Filter'
import { getAllPositionListApi } from "@/api/positionApi";
import { Pagination } from 'antd';

// 职位详情
function PositionCard(props) {
  return (
    <div className={positionStyle.cardWrapper}>
      <div className={positionStyle.positionInfo}>
        <div>
          <div className={positionStyle.name}>{props.item.jobName}</div>
          <div>
            <span className={positionStyle.money}>{props.item.jobSalary}</span>
            <span className={positionStyle.experience}>
              {props.item.jobExperience}
              <span className={positionStyle.vLine} />
              {props.item.education}
            </span>
            <span className={positionStyle.commitPerson}>
              {props.item.announcer}
            </span>
            <span className={positionStyle.commitBtn}>立即沟通</span>
          </div>
        </div>
        <div>
          <div className={positionStyle.name}>{props.item.companyName}</div>
          <div className={positionStyle.experience}>
            {props.item.type}
            <span className={positionStyle.vLine} />
            {props.item.situation}
            <span className={positionStyle.vLine} />
            {props.item.peopleNum}
          </div>
        </div>
      </div>
      <div className={positionStyle.tag}>
        {props.item.slogan}
      </div>
    </div>
  )
}

export default class Position extends Component {
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

  getList = async () => {
    const { data, count } = await getAllPositionListApi({
      city: this.state.activeCity,
      pageNum: this.state.pageNo
    })
    if (this.flag) this.setState({ list: data, count: count })
  }

  clickFilter = async (label) => {
    if (this.flag) await this.setState({ activeCity: label })
    await this.getList()
  }

  pageChange = async (page, pageSize) => {
    await this.setState({ pageNo: page })
    if (this.flag) await this.getList()
  }

  render() {
    return (
      <div className={positionStyle.position}>
        <Filter active={this.state.activeCity} clickItem={this.clickFilter} />
        <div className={positionStyle.content}>
          {this.state.list.map(v => <PositionCard key={v.id} item={v} />)}
          <div style={{ width: '1000px', textAlign: 'center' }}>
            <Pagination onChange={this.pageChange} current={this.state.pageNo} total={this.state.count} />
          </div>
        </div>
      </div>
    )
  }
}
