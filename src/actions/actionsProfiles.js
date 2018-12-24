import { CALL_API } from '../middleware/profilesApi'


export const PROFILE_ADD_REQUEST = 'PROFILE_ADD_REQUEST'
export const PROFILE_ADD_SUCCESS = 'PROFILE_ADD_SUCCESS'
export const PROFILE_ADD_FAILURE = 'ROFILE_ADD_FAILURE'
export const PROFILE_DELETE_REQUEST = 'PROFILE_DELETE_REQUEST'
export const PROFILE_DELETE_SUCCESS = 'PROFILE_DELETE_SUCCESS'
export const PROFILE_DELETE_FAILURE = 'PROFILE_DELETE_FAILURE'
export const PROFILE_GET = 'PROFILE_GET'
export const PROFILE_GET_FAILURE = 'PROFILE_GET_FAILURE'
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS'


// Uses the API middlware to get a quote
export function fetchProfiles() {
  return {
    [CALL_API]: {
      endpoint: 'portfolio',
      authenticated: true,
      types: [PROFILE_GET, PROFILE_GET_SUCCESS, PROFILE_GET_FAILURE]
    }
  }
}