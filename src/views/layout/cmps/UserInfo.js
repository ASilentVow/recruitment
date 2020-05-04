import React, {Component} from "react";
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import LayoutStyle from "@/views/layout/layout.module.scss";

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

  menuList.push({ label: '退出登录', icon: 'logout', key: 'logout' })

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
  render() {
    return (
      <div className={LayoutStyle.navUser}>
        <Dropdown overlay={UserMenu(this.props)} trigger={['click']}>
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
      </div>
    )
  }
}
