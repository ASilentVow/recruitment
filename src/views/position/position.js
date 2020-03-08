import React, { Component } from "react";
import positionStyle from './position.module.scss'
import NavSearch from "../../components/NavSearch/NavSearch";

// 顶部筛选栏
function PositionFilter() {
  return (
    <div className={positionStyle.positionFilter}>
      <div className={positionStyle.filterWrapper}>
        <div className={positionStyle.search}>
          <NavSearch />
        </div>
        <div className={positionStyle.city}>
          <span className={positionStyle.greyText}>广州</span>
          <span className={positionStyle.greyText}>></span>
          <div className={positionStyle.cityList}>
            <span>热门城市：</span>
            <span>北京</span>
            <span>上海</span>
            <span>广州</span>
            <span>深圳</span>
            <span>杭州</span>
            <span>天津</span>
            <span>西安</span>
            <span>苏州</span>
            <span>武汉</span>
            <span>厦门</span>
            <span>长沙</span>
            <span>成都</span>
            <span>郑州</span>
            <span>重庆</span>
          </div>
          <span className={positionStyle.allCity}>全部城市</span>
        </div>
        <div className={positionStyle.zone}>
          <div className={positionStyle.zoneList}>
            <span>天河区</span>
            <span>白云区</span>
            <span>番禺区</span>
            <span>海珠区</span>
            <span>越秀区</span>
            <span>黄埔区</span>
            <span>荔湾区</span>
            <span>花都区</span>
            <span>增城区</span>
            <span>南沙区</span>
            <span>从化区</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 职位详情
function PositionCard() {
  return (
    <div className={positionStyle.cardWrapper}>
      <div className={positionStyle.positionInfo}>
        <div>
          <div className={positionStyle.name}>算法封装工程师</div>
          <div>
            <span className={positionStyle.money}>18-35K·15薪</span>
            <span className={positionStyle.experience}>
              3-5年
              <span className={positionStyle.vLine} />
              本科
            </span>
            <span className={positionStyle.commitPerson}>
              廖先生
              <span className={positionStyle.vLine} />
              人力资源主管
            </span>
            <span className={positionStyle.commitBtn}>立即沟通</span>
          </div>
        </div>
        <div>
          <div className={positionStyle.name}>碧桂园房地产有限公司</div>
          <div className={positionStyle.experience}>
            房地产开发
            <span className={positionStyle.vLine} />
            已上市
            <span className={positionStyle.vLine} />
            10000人以上
          </div>
        </div>
      </div>
      <div className={positionStyle.tag}>
        <div className={positionStyle.tagList}>
          <span>深度学习算法</span>
          <span>视觉图像算法</span>
          <span>语音算法</span>
        </div>
        <div className={positionStyle.desc}>
          年终奖，定期体检，免费班车，五险一金，员工旅游
        </div>
      </div>
    </div>
  )
}

export default class Position extends Component {
  render() {
    return (
      <div className={positionStyle.position}>
        <PositionFilter />
        <div className={positionStyle.content}>
          <PositionCard />
          <PositionCard />
          <PositionCard />
          <PositionCard />
          <PositionCard />
          <PositionCard />
          <PositionCard />
        </div>
      </div>
    )
  }
}
