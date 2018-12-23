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

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}



// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

    var data = { 
        "email": creds.username,
        "password": creds.password
    };

    let config = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(data)
    }
  
    return dispatch => {
      // We dispatch requestLogin to kickoff the call to the API
      dispatch(requestLogin(creds))
  
      return fetch('http://localhost:3001/logon/', config)
        .then(response =>
          response.json().then(({user,token,message}) => ({ user, token,message, response }))
              ).then(({ user, token,message, response }) =>  {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginError(message))
            return Promise.reject(user)
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', token)
            // Dispatch the success action
            dispatch(receiveLogin(user))
          }
        }).catch(err => console.log("Error: ", err))
    }
  }

  // Calls the API to get a token and
// dispatches actions along the way
export function signUpUser(creds) {

    var data = { 
        "email": creds.username,
        "password": creds.password
    };

    let config = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(data)
    }
  
    return dispatch => {
      // We dispatch requestLogin to kickoff the call to the API
      dispatch(requestLogin(creds))
  
      return fetch('http://localhost:3001/signup/', config)
        .then(response =>
          response.json().then(({user,token,message}) => ({ user, token,message, response }))
              ).then(({ user, token,message, response }) =>  {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginError(message))
            return Promise.reject(user)
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', token)
            // Dispatch the success action
            dispatch(receiveLogin(user))
          }
        }).catch(err => console.log("Error: ", err))
    }
  }
  
  // Logs the user out
export function logoutUser() {
    return dispatch => {
      dispatch(requestLogout())
      localStorage.removeItem('id_token')
      dispatch(receiveLogout())
    }
  }