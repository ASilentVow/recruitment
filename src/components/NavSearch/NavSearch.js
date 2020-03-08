import React, {Component} from "react";
import { Input, Cascader } from 'antd';
import NavSearchStyle from "./NavSearch.module.scss"
import LayoutStyle from "../../views/layout/layout.module.scss"
import homeStyle from "../../views/home/home.module.scss";
const { Search } = Input;

function Filter() {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  return (
      <div className={NavSearchStyle.filterPosition}>
        <Cascader className={NavSearchStyle.positionCascader} options={options} placeholder="职位类型" />
      </div>
  )
}

// 搜索模块
export default class NavSearch extends Component{
  render() {
    return (
        <div className={`${LayoutStyle.navSearch} ${homeStyle.navSearch}`}>
          <Search addonBefore={<Filter />} placeholder="搜索职位、公司" size="large" enterButton="搜索" />
        </div>
    )
  }
}
