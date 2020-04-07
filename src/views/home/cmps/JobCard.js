import homeStyle from "@/views/home/home.module.scss";
import React from "react";

export default function jobCard(props) {
 return (
   <div className={homeStyle.cardItem}>
     <div className={homeStyle.hotPositionInfo}>
       <div>
         <span>{props.item.jobName}</span>
         <p>
           {props.item.jobExperience}
           <span className={homeStyle.vLine} />
           {props.item.education}
         </p>
       </div>
       <div className={homeStyle.positionMoney}>
         {props.item.jobSalary}
       </div>
     </div>
     <div className={homeStyle.positionAbout}>
       <span className={homeStyle.positionDetail}>
          {props.item.announcer}
          <span className={homeStyle.vLine} />
          {props.item.peopleNum}
        </span>
     </div>
   </div>
 )
}
