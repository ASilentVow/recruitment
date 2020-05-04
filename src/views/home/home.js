import React, { Component } from "react";
import NavSearch from "../../components/NavSearch/NavSearch";
import homeStyle from "./home.module.scss"
import LayoutStyle from "../layout/layout.module.scss";
import { throttle } from "../../tools";
import logo from "../../statics/images/logo.png";
import HotSection from "./cmps/HotSection";

// logo模块
function NavLogo() {
  return (
    <div className={LayoutStyle.navLogo}>
      <img src={logo} alt="" />
    </div>
  )
}

// 搜索栏
function SearchBar(props) {
  const navShow = props.navShow
  if (navShow) {
    return (
      // 浮动导航
      <div className={LayoutStyle.fixedNavBar}>
        <div className={LayoutStyle.navWrapper}>
          <div className={LayoutStyle.navContent}>
            {/* logo */}
            <NavLogo />
            {/* 搜索栏 */}
            <NavSearch history={props.history} />
          </div>
        </div>
      </div>
    )
  }
  return null
}

// 热门区域
function Section(props) {
  return (
      <div className={homeStyle.section}>
        <div className={homeStyle.title}>{props.title}</div>
        <HotSection history={props.history} type={props.type} />
      </div>
  )
}

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      navShow: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.pageScroll.bind(this), 100))
  }

  componentWillUnmount() {
    this.flag = false
    window.removeEventListener('scroll', throttle(this.pageScroll.bind(this), 100))
  }

  flag = true

  // 监听页面滚动
  pageScroll() {
    if(!this.flag) return
    const top = document.documentElement.scrollTop
    this.setState({
      navShow: top > 174
    })
  }

  render() {
    const navShow = this.state.navShow
    return (
      <div className={homeStyle.home}>
        <SearchBar history={this.props.history} navShow={navShow} onClick={(name) => this.switchRoute(name)} />
        <div className={homeStyle.homeWrapper}>
          <div className={homeStyle.homeSearch}>
            {/* 首页搜索 */}
            <NavSearch history={this.props.history} />
          </div>
          <Section history={this.props.history} title="热招职位" type="1" />
          <Section history={this.props.history} title="热门企业" type="2" />
        </div>
      </div>
    )
  }
}
