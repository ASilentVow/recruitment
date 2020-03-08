import React, { Component } from "react";
import companyStyle from './company.module.scss'

function CompanyFilter() {
  return (
    <div className={companyStyle.companyFilter}>
      <div className={companyStyle.filterWrapper}>
        <div className={companyStyle.filterItem}>
          <div className={companyStyle.itemLabel}>公司地点:</div>
          <div className={companyStyle.itemTabList}>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
            <span className={companyStyle.itemTab}>广州</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompanyCard() {
  return (
    <div className={companyStyle.cardWrapper}>
      <div className={companyStyle.companyInfo}>
        <div className={companyStyle.logo} />
        <div className={companyStyle.companyText}>
          <span>平安普惠</span>
          <p className={companyStyle}>
            已上市
            <span className={companyStyle.vLine} />
            互联网金融
          </p>
        </div>
      </div>
      <div className={companyStyle.aboutInfo}>
        <span>热招：测试工程师/测试专家 18-35K·15薪</span>
      </div>
    </div>
  )
}

export default class Company extends Component {
  render() {
    return (
      <div className={companyStyle.company}>
        <CompanyFilter />
        <div className={companyStyle.content}>
          <CompanyCard />
        </div>
      </div>
    )
  }
}
