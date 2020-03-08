import { CHANGE_COMPANY, CHANGE_POSITION } from "../actions/actionTypes/actionTypes";

let initPositionList = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let initCompanyList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export function getPositionList(state = initPositionList, action) {
  console.log(state, 'state')
  if (action.type === CHANGE_POSITION) {
    console.log(CHANGE_POSITION)
    return [1, 2, 3]
  } else {
    return state
  }
}

export function getCompanyList(state = initCompanyList, action) {
  if (action.type === CHANGE_COMPANY) {
    console.log(CHANGE_COMPANY)
    return [1, 2, 3, 4]
  } else {
    return state
  }
}
