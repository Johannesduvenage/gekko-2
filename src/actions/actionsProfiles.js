// There are three possible states for our login
// process and we need actions for each of them
export const PROFILE_ADD_REQUEST = 'PROFILE_ADD_REQUEST'
export const PROFILE_ADD_SUCCESS = 'PROFILE_ADD_SUCCESS'
export const PROFILE_ADD_FAILURE = 'ROFILE_ADD_FAILURE'
export const PROFILE_DELETE_REQUEST = 'PROFILE_DELETE_REQUEST'
export const PROFILE_DELETE_SUCCESS = 'PROFILE_DELETE_SUCCESS'
export const PROFILE_DELETE_FAILURE = 'PROFILE_DELETE_FAILURE'
export const PROFILE_GET = 'PROFILE_GET'
export const PROFILE_GET_FAILURE = 'PROFILE_GET_FAILURE'
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS'

function requestProfiles(creds) {
  return {
    type: PROFILE_GET,
    isFetching: true,
    creds
  }
}

