import React, {Component} from "react";
import { Avatar, Menu, Dropdown, Icon, Modal } from 'antd';
import LayoutStyle from "@/views/layout/layout.module.scss";
import EditPwdForm from "@/views/layout/cmps/EditPwdForm";
import { editPwd } from "@/api/userApi";

function UserMenu(props) {
  const clickMenu = ({key}) => {
    switch (key) {
      case 'logout':
        props.logout()
        props.history.push('/home')
        window.location.reload()
        break
      case 'resume':
        if (props.history.location.pathname === '/resume') return
        props.history.push('/resume')
        break
      case 'delivery':
        if (props.history.location.pathname === '/delivery') return
        props.history.push('/delivery')
        break
      case 'edit':
        props.openModal()
        break
      default:
        if (props.history.location.pathname === '/receive') return
        props.history.push('/receive')
    }
  }

  let menuList = []
  if(props.user && props.user.type === '0') {
    menuList = [
      { label: '接收投递', icon: 'audit', key: 'receive' }
    ]
  } else if(props.user && props.user.type === '2') {
    menuList = []
  } else {
    menuList = [
      { label: '我的简历', icon: 'edit', key: 'resume' },
      { label: '我的投递', icon: 'mail', key: 'delivery' }
    ]
  }

  menuList.push(
    ...[
        { label: '修改密码', icon: 'lock', key: 'edit' },
        { label: '退出登录', icon: 'logout', key: 'logout' }
      ]
  )

  return (
    <Menu onClick={clickMenu}>
      {
        menuList.map(v => {
          return (
            <Menu.Item key={v.key}>
              <Icon type={v.icon} />
              {v.label}
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
}

export default class UserInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  openModal = () => {
    this.setState({ visible: true })
  }

  form = null

  handleSubmit = async e => {
    const { form } = this.form.props
    e.preventDefault();
    const res = await form.validateFields()
    await editPwd({...res, id: this.props.user.id})
    this.setState({ visible: false })
  }

  render() {
    return (
      <div className={LayoutStyle.navUser}>
        <Dropdown overlay={UserMenu({...this.props, openModal:this.openModal})} trigger={['click']}>
          <div style={{ cursor: 'pointer' }}>
            <Avatar
              icon="user"
              shape="square"
              size="small"
              style={{ backgroundColor: '#21a9ff', verticalAlign: 'middle' }}
            />
            <span style={{ margin: '0 5px 0 10px' }}>{this.props.user.username}</span>
            <Icon type="down" />
          </div>
        </Dropdown>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onCancel={() => {this.setState({ visible: false })}}
          onOk={this.handleSubmit}
        >
          <EditPwdForm wrappedComponentRef={(form) => this.form = form} />
        </Modal>
      </div>
    )
  }
}
