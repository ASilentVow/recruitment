import Style from "./PositionCard.module.scss";
import { Tag } from 'antd'
import React from "react";

export default function PositionCard(props) {
  return (
    <div className={Style.cardWrapper} onClick={() => {props.skipPage(props.item.id)}}>
      <div className={Style.positionInfo}>
        <div>
          <div className={Style.name}>
            {props.item.jobName}
            {
              (!props.showTag || props.item.situation === '0') ? '' :
              <Tag color="#108ee9" style={{marginLeft: '5px'}}>{props.item.situation === '1' ? '待面试' : '不合适'}</Tag>
            }
          </div>
          <div>
            <span className={Style.money}>{props.item.jobSalary}</span>
            <span className={Style.experience}>
              {props.item.jobExperience}
              <span className={Style.vLine} />
              {props.item.education}
            </span>
            <span className={Style.commitPerson}>
              {props.item.announcer}
            </span>
            <span className={Style.commitBtn}>
              {
                !props.hiddenCommit ? '查看职位' : '管理职位'
              }
            </span>
          </div>
        </div>
        <div>
          <div className={Style.name}>{props.item.companyName}</div>
          <div className={Style.experience}>
            {props.item.type}
            <span className={Style.vLine} />
            {props.item.situation}
            <span className={Style.vLine} />
            {props.item.peopleNum}
          </div>
        </div>
      </div>
      <div className={Style.tag}>
        {props.item.slogan}
      </div>
    </div>
  )
}
