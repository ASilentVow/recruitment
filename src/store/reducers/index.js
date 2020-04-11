import { combineReducers } from 'redux'
import { userInfo } from "@/store/reducers/userReducer";

const reducer = combineReducers({
  user: userInfo
})

export default reducer
