import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Button } from 'antd';
import Home from "../home/home";
import logo from "../../statics/images/logo.png"
import NavSearch from "../../components/NavSearch";
import './layout.scss';

// logo模块
function NavLogo() {
    return (
        <div className="nav-logo">
            <img src={logo} alt=""/>
        </div>
    )
}


// 用户操作模块
function NavUser() {
    return (
        <div className="nav-user">
          <Button type="link" ghost size="small">我要找工作</Button>
          <Button type="link" ghost size="small">我要招聘</Button>
          <Button ghost size="small">注册</Button>
          <Button ghost size="small">登录</Button>
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
        <li onClick={() => props.onClick(v.key)} className="nav-item" key={v.key}>
          <span>{v.label}</span>
        </li>
    )
  })
  return (
      <div className="nav-tabs">
        <ul className="item-wrapper">
          {listItem}
        </ul>
      </div>
  )
}

// 导航栏(包含两种情况)
function NavBar(props) {
  const navShow = props.navShow
  if (navShow) {
    return (
        // 浮动导航
        <div className="fixed-nav-bar">
          <div className="nav-wrapper">
            <div className="nav-content">
              {/* logo */}
              <NavLogo />
              {/* 搜索栏 */}
              <NavSearch />
            </div>
          </div>
        </div>
    )
  }
  return (
      // 固定导航
      <div className="nav-bar">
        <div className="nav-wrapper">
          <div className="nav-content">
            <NavLogo />
            {/* 标签栏 */}
            <NavTabs onClick={(name) => props.onClick(name)} />
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
        navShow: false
      };
  }

  // 路由切换
  switchRoute = (routeName) => {
    this.props.history.push(`/${routeName}`)
  }

  render() {
    const navShow = this.state.navShow
    return (
      <div>
          <NavBar navShow={navShow} onClick={(name) => this.switchRoute(name)} />
          <div className="content">
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/position' component={Home} />
              <Route exact path='/company' component={Home} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
      </div>
    )
  }
}