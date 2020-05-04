import React, { Component } from "react";
import {connect} from "react-redux";
import {Modal, Button, Pagination} from "antd";
import userAction from "@/store/actions/userAction";
import { CompanyForm } from "@/views/employerHome/cmps/CompanyForm";
import JobForm from "@/views/employerHome/cmps/JobForm";
import { updateUserCompany } from "@/api/userApi";
import { getCompanyInfoApi } from "@/api/companyApi";
import { getCompanyPositionApi,insertPosition } from "@/api/positionApi";
import CompanyInfo from "@/views/companyDetail/cmps/CompanyInfo";
import Style from "@/views/companyDetail/companyDetail.module.scss";
import PositionCard from "@/components/PositionCard/PositionCard";

function UserCompany(props) {
  return (
    <div>
      <CompanyInfo btnShow addJob={props.addJob} info={props.info} count={props.positionList.count} />
      <div className={Style.wrapper}>
        { props.positionList.data.map(v => <PositionCard key={v.id} item={v} skipPage={() => {}} hiddenCommit />) }
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Pagination onChange={props.pageChange} current={props.pageNo} total={props.positionList.count} />
        </div>
      </div>
    </div>
  )
}

class employerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      visible: false,
      jobVisible: false,
      positionList: {
        data: [],
        count: 0,
      },
      pageNo: 1
    }
  }

  componentDidMount() {
    if(!this.props.companyId) {
      this.setState({ visible: true })
    }
    this.getInfo()
    this.getPositionList()
  }

  form = null
  flag = true

  async getInfo() {
    if(!this.props.companyId) return
    const { data } = await getCompanyInfoApi({companyId: this.props.companyId})
    if (this.flag) await this.setState({ info: data })
  }

  async getPositionList() {
    if(!this.props.companyId) return
    const data = await getCompanyPositionApi({companyId: this.props.companyId, pageNum: this.state.pageNo})
    if (this.flag) await this.setState({ positionList: data })
  }

  handleSubmit = async () => {
    const { form } = this.form.props
    const res = await form.validateFields()
    await updateUserCompany({...res, id: this.props.user.id})
    this.props.setUser({...this.props.user, ...res})
    window.location.reload()
  }

  submitJob = async () => {
    const { form } = this.form.props
    const res = await form.validateFields()
    await insertPosition({
      ...res,
      companyId: this.props.companyId,
      announcer: this.props.user.username
    })
    this.setState({ jobVisible: false })
    await this.getPositionList()
  }

  pageChange = async (page) => {
    await this.setState({ pageNo: page })
    await this.getPositionList()
  }

  render() {
    return (
      <div>
        {
          this.state.info ?
          <UserCompany
            addJob={() => {this.setState({jobVisible: true})}}
            info={this.state.info}
            positionList={this.state.positionList}
            pageChange={this.pageChange}
            pageNo={this.state.pageNo}
          /> : ''
        }
        <Modal
          maskClosable={false}
          title="选择所属公司"
          visible={this.state.visible}
          destroyOnClose
          onCancel={() => {this.setState({ visible: false })}}
          footer={<Button type="primary" onClick={() => { this.handleSubmit() }}>确定</Button>}
        >
          <CompanyForm wrappedComponentRef={(form) => this.form = form} />
        </Modal>
        <Modal
          title="发布职位"
          destroyOnClose
          visible={this.state.jobVisible}
          onCancel={() => {this.setState({ jobVisible: false })}}
          onOk={()=>{this.submitJob()}}
        >
          <JobForm wrappedComponentRef={(form) => this.form = form} />
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user,
  companyId: state.user.companyId
}), userAction)(employerHome)
