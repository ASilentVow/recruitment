// 用户操作模块
import React, {Component} from "react";
import {loginUser, registryUser} from "@/api/userApi";
import LayoutStyle from "@/views/layout/layout.module.scss";
import {Button, Modal} from "antd";
import {LoginForm} from "@/views/layout/cmps/LoginForm";
import {RegistryForm} from "@/views/layout/cmps/RegistryForm";

export default class unLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: ''
    }
  }

  form = null

  openDialog = (title) => {
    this.setState({
      visible: true,
      title: title
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSubmit = async e => {
    const { form } = this.form.props
    e.preventDefault();
    const res = await form.validateFields()
    const api = this.state.title === '登录' ? loginUser : registryUser
    const { code, data } = await api(res)
    if (code === '200') {
      this.setState({ visible: false })
      form.resetFields()
      if (this.state.title === '登录') {
        this.props.setUser(data)
        this.props.history.push('/home')
        window.location.reload()
      }
    }
  }

  render() {
    return (
      <div className={LayoutStyle.navUser}>
        <Button ghost size="small" onClick={() => {this.openDialog('注册')}}>注册</Button>
        <Button ghost size="small" onClick={() => {this.openDialog('登录')}}>登录</Button>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
        >
          {
            this.state.title === '登录' ? <LoginForm wrappedComponentRef={(form) => this.form = form} />
              : <RegistryForm wrappedComponentRef={(form) => this.form = form} />
          }
        </Modal>
      </div>
    )
  }
}
