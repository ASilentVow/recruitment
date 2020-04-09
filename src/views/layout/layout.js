import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Button, Modal } from 'antd';
import Home from "../home/home";
import Position from "../position/position";
import Company from "../company/company";
import logo from "../../statics/images/logo.png"
import LayoutStyle from "./layout.module.scss";
import { LoginForm } from './cmps/LoginForm'
import { RegistryForm } from './cmps/RegistryForm'

// logo模块
function NavLogo() {
    return (
        <div className={LayoutStyle.navLogo}>
            <img src={logo} alt="" />
        </div>
    )
}


// 用户操作模块
class NavUser extends Component{
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
    console.log(res, 'aaa')
  }

  render() {
    return (
      <div className={LayoutStyle.navUser}>
        <Button type="link" ghost size="small">我要找工作</Button>
        <Button type="link" ghost size="small">我要招聘</Button>
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

// 选项卡模块
function NavTabs(props) {
  const navItem = [
    {
      label: '首页',
      key: 'home'
    }, {
      label: '职位',
      key: 'position'
    }, {
      label: '公司',
      key: 'company'
    }
  ]
  const listItem = navItem.map(v => {
    return (
        <li onClick={() => props.onClick(v.key)} className={LayoutStyle.navItem} key={v.key}>
          <span className={props.activeName === v.key ? LayoutStyle.active : ''}>{v.label}</span>
        </li>
    )
  })
  return (
      <div className={LayoutStyle.navTabs}>
        <ul className={LayoutStyle.itemWrapper}>
          {listItem}
        </ul>
      </div>
  )
}

// 导航栏
function NavBar(props) {
  return (
    // 固定导航
    <div className={LayoutStyle.navBar}>
      <div className={LayoutStyle.navWrapper}>
        <div className={LayoutStyle.navContent}>
          <NavLogo />
          {/* 标签栏 */}
          <NavTabs activeName={props.activeName} onClick={(name) => props.onClick(name)} />
          {/* 用户操作 */}
          <NavUser />
        </div>
      </div>
    </div>
  )
}


// 主框架
export default class Layout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeName: ''
    }
  }

  componentDidMount() {
    this.setState({
      activeName: this.props.location.pathname.replace('/', '')
    })
    this.props.history.listen(route => {
      this.setState({
        activeName: route.pathname.replace('/', '')
      })
    })
  }

  // 路由切换
  switchRoute = (routeName) => {
    const pathname = `/${routeName}`
    if (this.props.history.location.pathname === pathname) return
    this.props.history.push(pathname)
  }

  render() {
    return (
      <div>
        <NavBar
          activeName={this.state.activeName}
          onClick={(name) => this.switchRoute(name)}
        />
        <div className="content">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/position" component={Position} />
            <Route exact path="/company" component={Company} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>
    )
  }
}
