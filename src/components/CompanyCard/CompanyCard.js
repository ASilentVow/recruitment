import Style from "./Company.module.scss";
import React from "react";

export default function CompanyCard(props) {
  return (
    <div className={Style.cardWrapper} onClick={() => {props.skipPage(props.item.companyId)}}>
      <div className={Style.companyInfo}>
        <div className={Style.logo}>
          <img src={props.item.companyImg} alt="" />
        </div>
        <div className={Style.companyText}>
          <span>{props.item.companyName}</span>
          <p className={Style}>
            {props.item.situation}
            <span className={Style.vLine} />
            {props.item.type}
          </p>
        </div>
      </div>
      <div className={Style.aboutInfo}>
        <span>{props.item.slogan}</span>
      </div>
    </div>
  )
}
