import Style from "./PositionCard.module.scss";
import React from "react";

export default function PositionCard(props) {
  return (
    <div className={Style.cardWrapper}>
      <div className={Style.positionInfo}>
        <div>
          <div className={Style.name}>{props.item.jobName}</div>
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
            <span className={Style.commitBtn}>立即沟通</span>
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
