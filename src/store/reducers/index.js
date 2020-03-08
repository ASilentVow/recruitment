import { combineReducers } from 'redux'
import { getPositionList, getCompanyList } from './homeReducer'

const reducer = combineReducers({
  positionList: getPositionList,
  companyList: getCompanyList
})

export default reducer
