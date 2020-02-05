import React, {Component} from "react";
import { Input } from 'antd';
const { Search } = Input;

// 搜索模块
export default class NavSearch extends Component{
  render() {
    return (
        <div className="nav-search">
          <Search placeholder="搜索职位、公司" size="large" enterButton="搜索" />
        </div>
    )
  }
}