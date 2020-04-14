import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UnLogin from './cmps/UnLogin'
import UserInfo from './cmps/UserInfo'
import logo from "../../statics/images/logo.png"
import LayoutStyle from "./layout.module.scss";
import userAction from '@/store/actions/userAction';
import { connect } from 'react-redux';
// 页面
import Home from "../home/home";
import Position from "../position/position";
import Company from "../company/company";
import Resume from "../resume/resume";
import CompanyDetail from "../companyDetail/companyDetail";
import JobDetail from "../jobDetail/jobDetail";

// logo模块
function NavLogo() {
    return (
        <div className={LayoutStyle.navLogo}>
            <img src={logo} alt="" />
        </div>
    )
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
function NavBarCom(props) {
  return (
    // 固定导航
    <div className={LayoutStyle.navBar}>
      <div className={LayoutStyle.navWrapper}>
        <div className={LayoutStyle.navContent}>
          <NavLogo />
          {/* 标签栏 */}
          <NavTabs activeName={props.activeName} onClick={(name) => props.onClick(name)} />
          {/* 用户操作 */}
          {
            props.user ?
              <UserInfo history={props.history} user={props.user} logout={props.removeUser} />
              : <UnLogin setUser={props.setUser} />
          }
        </div>
      </div>
    </div>
  )
}
const NavBar = connect(state => ({
  user: state.user
}), userAction)(NavBarCom)



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
          history={this.props.history}
          activeName={this.state.activeName}
          onClick={(name) => this.switchRoute(name)}
        />
        <div className="content">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/position" component={Position} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/resume" component={Resume} />
            <Route exact path="/companyDetail/:companyId" component={CompanyDetail} />
            <Route exact path="/jobDetail/:id" component={JobDetail} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>
    )
  }
}
