import { CHANGE_POSITION, CHANGE_COMPANY } from "./actionTypes/actionTypes";

export default {
  changePosition: (list) => {
    return { type: CHANGE_POSITION, list }
  },
   changeCompany: (list) => {
    return { type: CHANGE_COMPANY, list }
  }
}
