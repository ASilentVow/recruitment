import React, { Component } from "react";
import userAction from '@/store/actions/userAction';
import { connect } from 'react-redux';
import Style from './resume.module.scss'
import {Modal} from 'antd'
import { saveOrUpdateResume, getResume } from "@/api/resumeApi";
// 组件
import ResumeForm from "@/views/resume/cmps/ResumeForm";
import EmptyPage from "@/views/resume/cmps/EmptyPage";
import ResumeInfo from "@/views/resume/cmps/ResumeInfo";

class Resume extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      resumeInfo: null,
      type: 'save'
    }
  }

  componentDidMount() {
    if(!this.props.user) {
      this.props.history.push('/home')
      return
    }
    this.getUserResume()
  }

  componentWillUnmount() {
    this.flag = false
  }

  form = null
  flag = true

  toggleModal = (flag, type) => {
    this.setState({ visible: flag, type })
  }

  getUserResume = async () => {
    const { data } = await getResume({ userId: this.props.user.id })
    if (this.flag) this.setState({ resumeInfo: data })
  }

  handleSubmit = async e => {
    const { form } = this.form.props
    e.preventDefault();
    const res = await form.validateFields()
    const { code } = await saveOrUpdateResume({
      ...res,
      ...this.props.user,
      birth: res['birth'].format('YYYY-MM-DD'),
      type: this.state.type
    })
    if (code === '200') {
      this.setState({ visible: false })
      form.resetFields()
      this.getUserResume()
    }
  }

  render() {
    return (
      <div className={Style.wrapper}>
        {
          this.state.resumeInfo ?
            <ResumeInfo info={this.state.resumeInfo} openModal={() => {this.toggleModal(true, 'change')}} />
            : <EmptyPage openModal={() => {this.toggleModal(true, 'save')}} />
        }
        <Modal
          title="我的简历"
          destroyOnClose
          visible={this.state.visible}
          onCancel={() => {this.toggleModal(false)}}
          onOk={this.handleSubmit}
        >
          <ResumeForm resumeInfo={this.state.resumeInfo} wrappedComponentRef={(form) => this.form = form} />
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}), userAction)(Resume)
