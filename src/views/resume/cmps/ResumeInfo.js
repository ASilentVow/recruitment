import React from "react";
import {Descriptions} from 'antd'
import moment from "moment"
import { statusMap, educationMap } from "@/libs/SEM";
import { Avatar, Button } from 'antd';

function getTime(date) {
  const current = new moment()
  moment.duration(current.diff(date))
  return moment.duration(current.diff(date)).years()
}

export default function ResumeInfo(props) {
  return (
    <div>
      <div style={{
          marginBottom: '20px',
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center'
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '24px', marginRight: "5px", verticalAlign: 'middle' }}>{props.info.name}</span>
          <Avatar
            style={{ verticalAlign: 'middle', backgroundColor: props.info.sex === '1' ? '#21a9ff' : '#ff4a55' }}
            size={24}
            icon={props.info.sex === '1' ? "man" : "woman"}
          />
        </div>
        <div>
          <Avatar
            style={{ backgroundColor: '#21a9ff', verticalAlign: 'middle' }}
            size={60}
          >
            <span>{props.info.name}</span>
          </Avatar>
        </div>
      </div>
      <div style={{marginTop: '20px'}}>
        <Descriptions title="个人信息" bordered>
          <Descriptions.Item label="姓名">{props.info.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{props.info.sex === '1' ? '男' : '女'}</Descriptions.Item>
          <Descriptions.Item label="年龄">{getTime(props.info.birth)}</Descriptions.Item>
          <Descriptions.Item label="生日">{props.info.birth}</Descriptions.Item>
          <Descriptions.Item label="当前求职状态" span={2}>{statusMap[props.info.status]}</Descriptions.Item>
          <Descriptions.Item label="电话">{props.info.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.info.email || '无'}</Descriptions.Item>
          <Descriptions.Item label="学历">{educationMap[props.info.education]}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{marginTop: '20px'}}>
        <Descriptions title="期望职位" bordered>
          <Descriptions.Item label="职位">{props.info.job}</Descriptions.Item>
          <Descriptions.Item label="期望薪资">{props.info.salary}k</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{marginTop: '20px'}}>
        <Descriptions title="个人优势" bordered>
          <Descriptions.Item label="描述">{props.info.advantage}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{marginTop: '20px'}}>
        <Descriptions title="志愿服务经历" bordered>
          <Descriptions.Item label="描述">{props.info.volunteer || '无'}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{marginTop: '20px', textAlign: 'right'}}>
        <Button type="primary" onClick={() => {props.openModal()}}>修改简历</Button>
      </div>
    </div>
  )
}
