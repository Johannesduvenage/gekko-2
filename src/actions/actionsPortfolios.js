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


// Uses the API middlware to get portfolios
export function fetchPortfolios() {
  return {
    [CALL_API]: {
      endpoint: 'portfolio',
      authenticated: true,
      types: [PORTFOLIO_GET, PORTFOLIO_GET_SUCCESS, PORTFOLIO_GET_FAILURE]
    }
  }
}

// Uses the API middlware to add a portfolio
export function addPortfolio(name) {
  let data = {name: name};
  return {
    [CALL_API]: {
      endpoint: 'portfolio/',
      authenticated: true,
      types: [PORTFOLIO_ADD_REQUEST, PORTFOLIO_ADD_SUCCESS, PORTFOLIO_ADD_FAILURE],
      methodType: "POST",
      data: data
    }
  }
}

// Uses the API middlware to delete a portfolio
export function deletePortfolio(id) {
  let data = {id: id};
  return {
    [CALL_API]: {
      endpoint: 'portfolio/',
      authenticated: true,
      types: [PORTFOLIO_DELETE_REQUEST, PORTFOLIO_DELETE_SUCCESS, PORTFOLIO_DELETE_FAILURE],
      methodType: "DELETE",
      data: data
    }
  }
}