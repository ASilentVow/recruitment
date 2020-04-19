import React, {Component} from "react";
import {Form, Icon, Input, Radio} from "antd";

class Registry extends Component{
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    }
  }

  componentDidMount() {
    this.initForm()
  }

  initForm = () => {
    const { form } = this.props;
    form.setFieldsValue({ type: '1' })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('type')(
            <Radio.Group>
              <Radio.Button value="1">我要找工作</Radio.Button>
              <Radio.Button value="0">我要招聘</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码!' },
              { validator: this.validateToNextPassword }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              autoComplete="off"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入密码!' },
              { validator: this.compareToFirstPassword }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="确认密码"
              autoComplete="off"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </Form.Item>
      </Form>
    )
  }
}
export const RegistryForm = Form.create()(Registry)
