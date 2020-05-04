import React, {Component} from 'react';
import { getPositionInfo } from "@/api/positionApi";
import { sendDelivery } from "@/api/deliveryApi";
import Style from './jobDetail.module.scss';
import { Row, Col, Button, Avatar, Icon } from "antd";
import { headerImg, jobDesc } from "@/libs/SEM";
import { connect } from "react-redux";
import userAction from "@/store/actions/userAction";
import { message } from "antd";

class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    }
  }

  componentDidMount() {
    this.getInfo()
  }

  componentWillUnmount() {
    this.flag = false
  }

  async getInfo() {
    const { id } = this.props.match.params
    const { data } = await getPositionInfo({id})
    if (this.flag) await this.setState({ info: data })
  }

  async delivery() {
    if (!this.props.user) {
      message.info('请登录！')
      return
    }
    const params = {}
    params.userId = this.props.user.id
    params.companyId = this.state.info.parentId
    params.jobId = this.state.info.id
    await sendDelivery(params)
    const deliveryList = this.props.user.deliveryList
    deliveryList.push(params.jobId)
    this.props.setUser({ ...this.props.user, deliveryList })
  }

  flag = true

  render() {
    if (this.state.info) {
      return (
        <div style={{backgroundColor: "#fff"}}>
          <div className={Style.info}>
            <div className={Style.wrapper}>
              <Row>
                <Col span={12}>
                  <div>
                    <span className={Style.name}>{this.state.info.jobName}</span>
                    <span className={Style.salary}>{this.state.info.jobSalary}</span>
                  </div>
                  <div className={Style.desc}>
                    {this.state.info.city} ·
                    {this.state.info.jobExperience} ·
                    {this.state.info.education}
                  </div>
                </Col>
                <Col style={{textAlign: "right", lineHeight: "60px"}} span={12}>
                  <Button
                    disabled={this.props.user && this.props.user.deliveryList.includes(this.state.info.id)}
                    size="large"
                    type="primary"
                    onClick={() => {this.delivery()}}
                  >
                    {this.props.user && this.props.user.deliveryList.includes(this.state.info.id) ? '已投递' : '投递简历'}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div className={Style.wrapper} style={{height: "calc(100vh - 200px)"}}>
            <Row>
              <Col span={18} style={{ borderRight: '1px solid #f5f7f9' }}>
                <div>
                  <Avatar size={50} src={headerImg} />
                  <span className={Style.announcer}>{this.state.info.announcer}</span>
                </div>
                <div style={{fontWeight: "bold", marginTop: "10px"}}>职位描述</div>
                <div className={Style.jobDesc} dangerouslySetInnerHTML={{__html: jobDesc}} />
              </Col>
              <Col span={6}>
                <div className={Style.companyInfo}>
                  <div className={Style.title}>公司基本信息</div>
                  <p style={{fontWeight: "bold"}}>{this.state.info.companyName}</p>
                  <p>
                    <Icon type="line-chart" style={{marginRight: "20px", color: "#ccc"}} />
                    {this.state.info.situation}
                  </p>
                  <p>
                    <Icon type="user" style={{marginRight: "20px", color: "#ccc"}} />
                    {this.state.info.peopleNum}
                  </p>
                  <p>
                    <Icon type="appstore" style={{marginRight: "20px", color: "#ccc"}} />
                    {this.state.info.type}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

export default connect(state => ({
  user: state.user
}), userAction)(JobDetail)
