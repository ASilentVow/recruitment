import React, { Component } from "react";
import {Form, Input, Select, Slider} from "antd";
import {educationEnum} from "@/libs/SEM";

class JobForm extends Component{
  formItemLayout = {
    labelCol: {
      sm: { span: 5 }
    },
    wrapperCol: {
      sm: { span: 18 }
    },
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...this.formItemLayout} >
        <Form.Item label="职位名称">
          {getFieldDecorator('jobName', {
            rules: [{ required: true, message: '请输入职位名称' }]
          })(
            <Input placeholder="请输入职位名称" />
          )}
        </Form.Item>
        <Form.Item label="学历">
          {getFieldDecorator('education', {
            rules: [{ required: true, message: '请选择学历' }],
          })(
            <Select placeholder="请选择学历">
              { Object.keys(educationEnum).map(v => <Select.Option value={v} key={v}>{educationEnum[v]}</Select.Option>) }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="薪资">
          {getFieldDecorator('jobSalary')(
            <Slider range max={50} marks={{50:'50k'}} />
          )}
        </Form.Item>
        <Form.Item label="工作经验">
          {getFieldDecorator('jobExperience')(
            <Slider range max={10} marks={{10:'10年'}} />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(JobForm)
