import React, { Component } from "react";
import positionStyle from './position.module.scss'
import { Filter } from '@/components/Filter/Filter'
import { getAllPositionListApi } from "@/api/positionApi";
import { Pagination } from 'antd';
import PositionCard from "@/components/PositionCard/PositionCard";

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

  pageChange = async (page) => {
    await this.setState({ pageNo: page })
    if (this.flag) await this.getList()
  }

  skipPage = (id) => {
    this.props.history.push({ pathname : `/jobDetail/${id}`})
  }

  render() {
    return (
      <div className={positionStyle.position}>
        <Filter active={this.state.activeCity} clickItem={this.clickFilter} />
        <div className={positionStyle.content}>
          {this.state.list.map(v => <PositionCard key={v.id} item={v} skipPage={this.skipPage} />)}
          <div style={{ width: '1000px', textAlign: 'center' }}>
            <Pagination onChange={this.pageChange} current={this.state.pageNo} total={this.state.count} />
          </div>
        </div>
      </div>
    )
  }
}
