import { combineReducers } from 'redux'
import {auth} from './loginReducer'
import {profile} from './profileReducer'


// We combine the reducers here so that they
// can be left split apart above
const stockApp = combineReducers({
  auth,
  profile
})

export default stockApp