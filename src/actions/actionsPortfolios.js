import { CALL_API } from '../middleware/profilesApi'


export const PORTFOLIO_ADD_REQUEST = 'PROFILE_ADD_REQUEST'
export const PORTFOLIO_ADD_SUCCESS = 'PROFILE_ADD_SUCCESS'
export const PORTFOLIO_ADD_FAILURE = 'PROFILE_ADD_FAILURE'
export const PORTFOLIO_DELETE_REQUEST = 'PROFILE_DELETE_REQUEST'
export const PORTFOLIO_DELETE_SUCCESS = 'PROFILE_DELETE_SUCCESS'
export const PORTFOLIO_DELETE_FAILURE = 'PROFILE_DELETE_FAILURE'
export const PORTFOLIO_GET = 'PROFILE_GET'
export const PORTFOLIO_GET_FAILURE = 'PROFILE_GET_FAILURE'
export const PORTFOLIO_GET_SUCCESS = 'PROFILE_GET_SUCCESS'


// Uses the API middlware to get a quote
export function fetchPortfolios() {
  return {
    [CALL_API]: {
      endpoint: 'portfolio',
      authenticated: true,
      types: [PORTFOLIO_GET, PORTFOLIO_GET_SUCCESS, PORTFOLIO_GET_FAILURE]
    }
  }
}