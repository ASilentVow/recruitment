import Style from "@/views/companyDetail/companyDetail.module.scss";
import {Avatar, Button, Col, Row} from "antd";
import React from "react";

export default function Info(props) {
  return (
    <div className={Style.info}>
      <div className={Style.wrapper}>
        <Row>
          <Col span={12}>
            <div className={Style.pic}>
              <Avatar className={Style.img} size={100} shape="square" src={props.info.companyImg} />
              <div>
                <div className={Style.name}>
                  <span>{props.info.companyName}</span>
                  {props.btnShow ?
                    <Button type="primary" style={{marginLeft: '20px'}} onClick={() => {props.addJob()}}>发布职位</Button> : ''}
                </div>
                <div className={Style.desc}>
                  {props.info.situation} ·
                  {props.info.peopleNum} ·
                  {props.info.type}
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={Style.num}>
              <div style={{ fontSize: "45px" }}>{props.count}</div>
              <div>在招职位</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
