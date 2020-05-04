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
import EmployerHome from "../employerHome/employerHome"
import Delivery from "../delivery/delivery"
import Receive from "../recevice/receive"
import Management from "../management/management"

// logo模块
function NavLogo() {
    return (
        // LayoutStyle(layout.module.scss)中的navLogo
        <div className={LayoutStyle.navLogo}>
            <img src={logo} alt="" />
        </div>
    )
}


// 选项卡模块
function NavTabs(props) {
  let navItem = []
  if(props.user && props.user.type === '0') {
    navItem = [
      {
        label: '我的公司',
        key: 'home'
      }
    ]
  } else if (props.user && props.user.type === '2') {
    navItem = [
      {
        label: '数据管理',
        key: 'home'
      }
    ]
  } else {
    navItem = [
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
  }
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
          <NavTabs user={props.user} activeName={props.activeName} onClick={(name) => props.onClick(name)} />
          {/* 用户操作 */}
          {
            props.user ?
              <UserInfo history={props.history} user={props.user} logout={props.removeUser} />
              : <UnLogin history={props.history} setUser={props.setUser} />
          }
        </div>
      </div>
    </div>
  )
}


// 主框架
class Layout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeName: ''
    }
  }

  componentDidMount() {
    if(this.props.user && this.props.user.type === '0') {
      this.HomePage = EmployerHome
    } else if (this.props.user && this.props.user.type === '2') {
      this.HomePage = Management
    } else {
      this.HomePage = Home
    }
    this.setState({
      activeName: this.props.location.pathname.replace('/', '')
    })
    this.props.history.listen(route => {
      this.setState({
        activeName: route.pathname.replace('/', '')
      })
    })
  }

  HomePage = null

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
          removeUser={this.props.removeUser}
          setUser={this.props.setUser}
          user={this.props.user}
          history={this.props.history}
          activeName={this.state.activeName}
          onClick={(name) => this.switchRoute(name)}
        />
        <div className="content">
          <Switch>
            <Route exact path="/home" component={this.HomePage} />
            <Route exact path="/position" component={Position} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/receive" component={Receive} />
            <Route exact path="/delivery" component={Delivery} />
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

// state储存变量的地方，例如用户信息（user）
// userAction是方法，用于改变user的值
export default connect(state => ({
  user: state.user
}), userAction)(Layout)
