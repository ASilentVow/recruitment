import React, { Component } from "react";
import {Form, Input, Radio, DatePicker, Select, Slider } from "antd";
import { phoneValidate, emailValidate } from "@/libs/validate";
import { statusMap, educationMap } from "@/libs/SEM";
import moment from "moment";

function disabledDate(current) {
  return current && current >= moment().endOf('day');
}

class ResumeForm extends Component{

  componentDidMount() {
    this.initForm()
  }

  initForm = () => {
    if (this.props.resumeInfo) {
      const {
        name, sex, birth, salary,
        phone, status, job,
        advantage, education, volunteer, email
      } = JSON.parse(JSON.stringify(this.props.resumeInfo))
      this.props.form.setFieldsValue({
        birth: moment(birth),
        salary: salary.split('-').map(v => +v),
        name, sex, phone, status, job, email,
        advantage, education, volunteer
      })
    } else {
      this.props.form.setFieldsValue({ sex: '1' })
    }
  }

  formItemLayout = {
    labelCol: {
      sm: { span: 6 }
    },
    wrapperCol: {
      sm: { span: 16 }
    },
  }

  marks = {
    0: '0k',
    20: '20k',
    40: '40k',
    60: '60k',
    80: '80k',
    100: '100k'
  };

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...this.formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入姓名' }]
          })(
            <Input placeholder="请输入您的姓名" />
          )}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('sex')(
            <Radio.Group>
              <Radio.Button value="1">男</Radio.Button>
              <Radio.Button value="0">女</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="生日">
          {getFieldDecorator('birth', {
            rules: [{ required: true, message: '请选择生日' }]
          })(
            <DatePicker disabledDate={disabledDate} placeholder="请选择生日" format="YYYY-MM-DD" />
          )}
        </Form.Item>
        <Form.Item label="电话">
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入电话' },
              { validator: phoneValidate }
            ]
          })(
            <Input placeholder="请输入您的电话" />
          )}
        </Form.Item>
        <Form.Item label="学历">
          {getFieldDecorator('education', {
            rules: [{ required: true, message: '请选择学历' }],
          })(
            <Select placeholder="请选择学历">
              { Object.keys(educationMap).map(v => <Select.Option value={v} key={v}>{educationMap[v]}</Select.Option>) }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="当前求职状态">
          {getFieldDecorator('status', {
            rules: [{ required: true, message: '请选择求职状态' }],
          })(
            <Select placeholder="请选择求职状态">
              { Object.keys(statusMap).map(v => <Select.Option value={v} key={v}>{statusMap[v]}</Select.Option>) }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            rules: [{ validator: emailValidate }]
          })(
            <Input placeholder="请输入您的邮箱" />
          )}
        </Form.Item>
        <Form.Item label="期望职位">
          {getFieldDecorator('job', {
            rules: [{ required: true, message: '请输入期望职位' }],
          })(
            <Input placeholder="请输入期望职位" />
          )}
        </Form.Item>
        <Form.Item label="期望薪资">
          {getFieldDecorator('salary')(
            <Slider range marks={this.marks} />
          )}
        </Form.Item>
        <Form.Item label="个人优势">
          {getFieldDecorator('advantage', {
            rules: [{ required: true, message: '请输入个人优势' }],
          })(
            <Input.TextArea
              autoSize={{minRows: 4, maxRows: 4}}
              placeholder="请输入个人优势"
            />
          )}
        </Form.Item>
        <Form.Item label="志愿服务经历">
          {getFieldDecorator('volunteer')(
            <Input.TextArea
              autoSize={{minRows: 4, maxRows: 4}}
              placeholder="请输入志愿服务经历"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(ResumeForm)
