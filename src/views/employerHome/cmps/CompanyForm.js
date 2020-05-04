import React, { Component } from "react";
import {Form, Select} from "antd";
import {getSelectCompany} from "@/api/companyApi";

let timeout;

class defaultForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const fake = async () => {
      const data = await getSelectCompany({ name: value })
      callback(data)
    }

    timeout = setTimeout(fake, 500);
  }

  handleSearch = value => {
    if (value) {
      this.fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  render() {
    const options = this.state.data.map(v => <Select.Option key={v.companyId}>{v.companyName}</Select.Option>);
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('companyId', {
            rules: [{ required: true, message: '请选择公司' }]
          })(
            <Select
              showSearch
              placeholder="输入关键字搜索公司"
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearch}
              notFoundContent={null}
            >
              {options}
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}

export const CompanyForm = Form.create()(defaultForm)
