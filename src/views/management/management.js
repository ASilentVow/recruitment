import React, { Component } from "react";
import Style from './mamagement.module.scss'
import { Tabs, Table, Divider, Button, Popconfirm, Modal } from 'antd';
import { getAllCompanyListApi } from "@/api/companyApi";
import { getAllPositionListApi } from "@/api/positionApi";
import { delCompany, delUser, delJob, editUser } from "@/api/managementApi";
import { getAllUser } from "@/api/userApi";
import { companyConfig, userConfig, jobConfig } from "@/views/management/cmps/config";
import EditForm from "@/views/management/cmps/EditForm";
const { TabPane } = Tabs;


export default class Management extends Component{
  constructor() {
    super();
    this.state = {
      dataList: [],
      activeTab: 'user',
      activeConfig: [],
      visible: false,
      userInfo: {},
      currentId: ''
    }
  }

  async componentDidMount() {
    await this.getList()
  }

  componentWillUnmount() {
    this.flag = false
  }

  async delData(id) {
    const api = this.delApiMap[this.state.activeTab]
    await api({ id })
    this.getList()
  }

  makeConfig() {
    const config = this.configMap[this.state.activeTab].concat({
      title: '操作',
      key: 'action',
      render: (record) => (
        <span>
          {
            this.state.activeTab === 'user' ?
              <span>
                <Button type="link" size="small" onClick={() => {this.openModal(record)}}>编辑</Button>
                <Divider type="vertical" />
              </span> : ''
          }
          <Popconfirm
            title="是否删除?"
            onConfirm={() => {this.delData(record.id)}}
          >
            <Button type="link" size="small">删除</Button>
          </Popconfirm>
        </span>
      )
    })
    this.setState({
      activeConfig: config
    })
  }

  apiMap = {
    user: getAllUser,
    company: getAllCompanyListApi,
    job: getAllPositionListApi
  }

  delApiMap = {
    user: delUser,
    company: delCompany,
    job: delJob
  }

  configMap = {
    user: userConfig,
    company: companyConfig,
    job: jobConfig
  }

  tabList = [
    {
      tab: '用户管理',
      key: 'user'
    },
    {
      tab: '公司管理',
      key: 'company'
    },
    {
      tab: '职位管理',
      key: 'job'
    }
  ]

  flag = true

  getList = async () => {
    this.makeConfig()
    const api = this.apiMap[this.state.activeTab]
    const { data } = await api()
    this.setState({dataList: data})
  }

  handleChange = async (key) => {
    await this.setState({ activeTab: key })
    await this.getList()
  }

  openModal = (userInfo) => {
    this.setState({
      visible: true,
      currentId: userInfo.id,
      userInfo
    })
  }

  handleSubmit = async e => {
    const { form } = this.form.props
    e.preventDefault();
    const res = await form.validateFields()
    await editUser({ ...res, id: this.state.currentId })
    this.setState({ visible: false })
    await this.getList()
  }

  render() {
    return (
      <div className={Style.wrapper}>
        <div className={Style.table}>
          <Tabs type="card" onChange={this.handleChange}>
            { this.tabList.map(v => <TabPane tab={v.tab} key={v.key} />) }
          </Tabs>
          <Table rowKey="id" dataSource={this.state.dataList} columns={this.state.activeConfig} />
        </div>
        <Modal
          title="编辑用户"
          destroyOnClose
          visible={this.state.visible}
          onCancel={() => {this.setState({ visible: false })}}
          onOk={this.handleSubmit}
        >
          <EditForm userInfo={this.state.userInfo} wrappedComponentRef={(form) => this.form = form} />
        </Modal>
      </div>
    )
  }
}
