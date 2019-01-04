const BASE_URL = 'http://localhost:3001/'

function callApi(endpoint, authenticated,methodType = 'GET', data={}) {

  let token = localStorage.getItem('id_token') || null
  let config = {}


  if(methodType == 'GET') {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    }
    else {
      throw "No token saved!"
    }
  }else{
    if(token) {
      config = {
        method: methodType,
        headers: { 'Content-Type':'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      }
    }
    else {
      throw "No token saved!"
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.json().then(portfolios => ({ portfolios, response }))
    ).then(({ portfolios, response }) => {
      if (!response.ok) {
        return Promise.reject(portfolios)
      }

      return portfolios
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }


  let { endpoint, types, authenticated, methodType, data } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated, methodType, data).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}