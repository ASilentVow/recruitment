import React from "react";

export const companyConfig = [
  {
    title: '公司名称',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '标语',
    dataIndex: 'slogan',
    key: 'slogan',
  },
  {
    title: '公司规模',
    dataIndex: 'peopleNum',
    key: 'peopleNum',
  }
]

export const userConfig = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (record) => (
      <span>{record === '1' ? '应聘用户' : '招聘用户'}</span>
    )
  }
]

export const jobConfig = [
  {
    title: '职位名称',
    dataIndex: 'jobName',
    key: 'jobName',
  },
  {
    title: '经验',
    dataIndex: 'jobExperience',
    key: 'jobExperience',
  },
  {
    title: '薪资',
    dataIndex: 'jobSalary',
    key: 'jobSalary',
  },
  {
    title: '学历',
    dataIndex: 'education',
    key: 'education',
  }
]
