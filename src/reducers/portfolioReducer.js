import {
    PORTFOLIO_GET, PORTFOLIO_GET_SUCCESS, PORTFOLIO_GET_FAILURE
  } from '../actions/actionsPortfolios'
  
  // The auth reducer. The starting state sets authentication
  // based on a token being in local storage. In a real app,
  // we would also want a util to check if the token is expired.
  export function portfolio(state = {
      isFetching: false,
      portfolio: []
    }, action) {
      switch (action.type) {
        case PORTFOLIO_GET:
          return Object.assign({}, state, {
            isFetching: true
          })
        case PORTFOLIO_GET_SUCCESS:
          return Object.assign({}, state, {
            isFetching: false,
            portfolios: action.response,
          })
        case PORTFOLIO_GET_FAILURE:
          return Object.assign({}, state, {
            isFetching: false
          })
        default:
          return state
        }
  }