import React, { Component } from "react";
import NavSearch from "../../components/NavSearch";
import homeStyle from "./home.module.scss"

export default class Home extends Component{
  render() {
    return (
      <div className={homeStyle.home}>
        <div className={homeStyle.homeWrapper}>
          {/* 首页搜索 */}
          <div className={homeStyle.homeSearch}>
            <NavSearch />
          </div>
        </div>
      </div>
    )
  }
}