// 顶部筛选栏
import style from "./Filter.module.scss";
import NavSearch from "@/components/NavSearch/NavSearch";
import {cityList} from "@/libs/SEM";
import React from "react";

export function Filter(props) {
  return (
    <div className={style.outline}>
      <div className={style.positionFilter}>
        <div className={style.filterWrapper}>
          <div className={style.search}>
            <NavSearch history={props.history} />
          </div>
          <div className={style.city}>
            <span className={style.greyText}>{props.active}</span>
            <span className={style.greyText}>></span>
            <div className={style.cityList}>
              <span>热门城市：</span>
              {
                cityList.map(v => <span
                  key={v.label}
                  onClick={() => {props.clickItem(v.label)}}
                  className={`${style.cityItem}
                                  ${props.active === v.label ? style['active'] : ''}`}
                                  >{v.label}</span>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
