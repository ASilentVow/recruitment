import {REMOVE_USER, SET_USER} from "@/store/actionTypes/actionTypes";

export default {
  setUser: (user) => {
    return { type: SET_USER, user }
  },
  removeUser: () => {
    return { type: REMOVE_USER }
  }
}
