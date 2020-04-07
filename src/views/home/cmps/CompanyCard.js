import homeStyle from "@/views/home/home.module.scss";
import React from "react";

export default function jobCard(props) {
  return (
    <div className={homeStyle.cardWrapper}>
      <div className={homeStyle.companyInfo}>
        <div className={homeStyle.logo}>
          <img src={props.item.companyImg} alt="" />
        </div>
        <div className={homeStyle.companyText}>
          <span>{props.item.companyName}</span>
          <p className={homeStyle}>
            {props.item.situation}
            <span className={homeStyle.vLine} />
            {props.item.type}
          </p>
        </div>
      </div>
      <div className={homeStyle.aboutInfo}>
        <span>{props.item.slogan}</span>
      </div>
    </div>
  )
}
