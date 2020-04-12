import {Button, Empty} from "antd";
import Style from "@/views/resume/resume.module.scss";
import React from "react";

export default function EmptyPage(props) {
  return (
    <Empty className={Style.empty} description="暂无简历">
      <Button type="primary" onClick={() => {props.openModal()}}>立刻填写</Button>
    </Empty>
  )
}
