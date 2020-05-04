import React, {Component} from "react";
import {Form, Select} from 'antd';
import LayoutStyle from "../../views/layout/layout.module.scss"
import {getSelectCompany} from "@/api/companyApi";
import {getSelectPosition} from "@/api/positionApi";

let timeout;

// 搜索模块
export default class NavSearch extends Component{
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      positionData: []
    }
  }

  fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const fake = async () => {
      const companyData = await getSelectCompany({ name: value })
      const positionData = await getSelectPosition({ name: value })
      callback(companyData, positionData)
    }

    timeout = setTimeout(fake, 500);
  }

  handleSearch = value => {
    if (value) {
      this.fetch(value, (companyData, positionData) => this.setState({ companyData, positionData }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = (value, option) => {
    if (!option.type) {
      this.props.history.push({ pathname : `/companyDetail/${value}`})
    } else {
      this.props.history.push({ pathname : `/jobDetail/${value}`})
    }
  }

  render() {
    const companyOptions = this.state.companyData.map(v => <Select.Option key={v.companyId} type={0}>{v.companyName}</Select.Option>);
    const positionOptions = this.state.positionData.map(v => <Select.Option key={v.id} type={1}>{v.jobName}</Select.Option>);
    return (
        <div className={`${LayoutStyle.navSearch}`}>
          <Form style={{width: "100%"}}>
            <Form.Item style={{marginBottom: "0"}}>
              <Select
                onChange={this.handleChange}
                showSearch
                placeholder="输入关键字搜索公司、职位"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                notFoundContent={null}
              >
                <Select.OptGroup label="公司">
                  {companyOptions}
                </Select.OptGroup>
                <Select.OptGroup label="职位">
                  {positionOptions}
                </Select.OptGroup>
              </Select>
            </Form.Item>
          </Form>
        </div>
    )
  }
}
