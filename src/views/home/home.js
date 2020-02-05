import React, { Component } from "react";
import NavSearch from "../../components/NavSearch";
import "./home.scss"

export default class Home extends Component{
  render() {
    return (
      <div className='home'>
        <div className="home-wrapper">
          {/* 首页搜索 */}
          <div className="home-search">
            <NavSearch />
          </div>
        </div>
      </div>
    )
  }
}