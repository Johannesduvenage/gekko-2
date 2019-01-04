import { combineReducers } from 'redux'
import {auth} from './loginReducer'
import {portfolio} from './portfolioReducer'


// We combine the reducers here so that they
// can be left split apart above
const stockApp = combineReducers({
  auth,
  portfolio
})

export default stockApp