import Style from "./Job.module.scss";
import React from "react";

export default function JobCard(props) {
 return (
   <div className={Style.cardItem} onClick={() => {props.skipPage(props.item.id, '2')}}>
     <div className={Style.hotPositionInfo}>
       <div>
         <span>{props.item.jobName}</span>
         <p>
           {props.item.jobExperience}
           <span className={Style.vLine} />
           {props.item.education}
         </p>
       </div>
       <div className={Style.positionMoney}>
         {props.item.jobSalary}
       </div>
     </div>
     <div className={Style.positionAbout}>
       <span className={Style.positionDetail}>
          {props.item.announcer}
          <span className={Style.vLine} />
          {props.item.peopleNum}
        </span>
     </div>
   </div>
 )
}
