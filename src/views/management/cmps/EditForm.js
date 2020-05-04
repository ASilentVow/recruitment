import React, {Component} from "react";
import {Form, Icon, Input, Radio} from "antd";

class EditForm extends Component{
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
    form.setFieldsValue({
      username: this.props.userInfo.username,
      password: this.props.userInfo.password,
      type: this.props.userInfo.type,
    })
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('type')(
            <Radio.Group>
              <Radio.Button value="1">应聘用户</Radio.Button>
              <Radio.Button value="0">招聘用户</Radio.Button>
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
              placeholder="密码"
              autoComplete="off"
            />,
          )}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(EditForm)
