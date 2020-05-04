import React, { Component } from "react";
import Style from './delivery.module.scss'
import { getDelivery } from "@/api/deliveryApi";
import { Icon } from "antd";
import { connect } from 'react-redux';
import userAction from "@/store/actions/userAction";
import PositionCard from "@/components/PositionCard/PositionCard";


class delivery extends Component{
  constructor() {
    super();
    this.state = {
      dataList: []
    }
  }

  async componentDidMount() {
    await this.getDataList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  async getDataList() {
    const id = this.props.user.id
    const { data } = await getDelivery({ id })
    this.setState({ dataList: data })
  }

  skipPage = (id) => {
    this.props.history.push({ pathname : `/jobDetail/${id}`})
  }

  flag = true

  render() {
    return (
      <div className={Style.wrapper}>
        <div style={{ padding: '0 150px', fontWeight: 'bold' }}>
          <h1>
            <Icon type="mail" style={{ marginRight: '10px' }} />
            我的投递
          </h1>
        </div>
        <div className={Style.list}>
          {this.state.dataList.map(v => <PositionCard showTag key={v.id} item={v} skipPage={this.skipPage} />)}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}), userAction)(delivery)
