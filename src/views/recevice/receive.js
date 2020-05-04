import React, { Component } from "react";
import Style from './receive.module.scss'
import {List, Button, Avatar, Modal, Tag} from 'antd';
import { getReceive, updateDelivery } from "@/api/deliveryApi";
import { connect } from 'react-redux';
import userAction from "@/store/actions/userAction";
import ResumeInfo from "@/views/resume/cmps/ResumeInfo";
import {getResume} from "@/api/resumeApi";


class Receive extends Component{
  constructor() {
    super();
    this.state = {
      dataList: [],
      visible: false,
      resumeInfo: {}
    }
  }

  async componentDidMount() {
    await this.getDataList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  async getDataList() {
    const companyId = this.props.user.companyId
    const { data } = await getReceive({ companyId })
    this.setState({ dataList: data })
  }

  viewResume = async (id) => {
    const { data } = await getResume({ userId: id })
    if (this.flag) this.setState({
      resumeInfo: data,
      visible: true
    })
  }

  editSituation = async (id, flag) => {
    await updateDelivery({id, flag})
    this.getDataList()
  }

  flag = true

  render() {
    return (
      <div className={Style.wrapper}>
        <div className={Style.list}>
          <List
            dataSource={this.state.dataList}
            size="large"
            pagination={{ pageSize: 10 }}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button key="view" onClick={() => { this.viewResume(item.userId) }}>查看简历</Button>,
                  <Button disabled={item.situation !== '0'} key="view" type="primary" onClick={() => { this.editSituation(item.id,'1') }}>邀请面试</Button>,
                  <Button disabled={item.situation !== '0'} key="view" type="danger" onClick={() => { this.editSituation(item.id,'2') }}>拒绝面试</Button>
                ]}
              >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" icon="user" />}
                    title={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {item.username}
                      <Tag color="#108ee9" style={{marginLeft: '5px'}}>
                        {item.situation === '0' ? '待处置' : item.situation === '1' ? '已邀请' : '已拒绝'}
                      </Tag>
                    </span>}
                    description={`应聘职位：${item.jobName}`}
                  />
                  <div>我对这个职位非常感兴趣，希望能和你沟通一下！</div>
              </List.Item>
            )}
          />
        </div>
        <Modal
          bodyStyle={{padding: '20px 50px'}}
          width="900px"
          footer={null}
          destroyOnClose
          visible={this.state.visible}
          onCancel={() => {this.setState({visible: false})}}
        >
          <ResumeInfo info={this.state.resumeInfo} btnHide />
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}), userAction)(Receive)
