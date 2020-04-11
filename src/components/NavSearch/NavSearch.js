import React, {Component} from "react";
import { Input } from 'antd';
import LayoutStyle from "../../views/layout/layout.module.scss"
import homeStyle from "../../views/home/home.module.scss";
const { Search } = Input;


// 搜索模块
export default class NavSearch extends Component{
  render() {
    return (
        <div className={`${LayoutStyle.navSearch} ${homeStyle.navSearch}`}>
          <Search placeholder="搜索职位、公司" size="large" enterButton="搜索" />
        </div>
    )
  }
}
