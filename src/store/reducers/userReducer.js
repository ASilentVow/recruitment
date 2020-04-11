import { SET_USER, REMOVE_USER } from "@/store/actionTypes/actionTypes";
import {message} from "antd";

let user = JSON.parse(sessionStorage.getItem('user')) || null

export function userInfo(state = user, action) {
  switch (action.type) {
    case SET_USER:
      sessionStorage.setItem('user', JSON.stringify(action.user))
      return action.user
    case REMOVE_USER:
      sessionStorage.removeItem('user')
      message.success({ content: '退出登录!', duration: 2 })
      return null
    default:
      return user
  }
}
