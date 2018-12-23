import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser, signUpUser } from '../actions/actionsLogon'

export default class Navbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div>
      <nav class='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Pickle Risk</a>
      <input class="form-control form-control-dark w-75" type="text" placeholder="Search" aria-label="Search">
      </input>
        <div className='container-fluid'>
          <div className='form-inline'>

            {!isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
                onSignUpClick={creds => dispatch(signUpUser(creds))}
              />
            }

            {isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} />
            }

          </div>
        </div>
      </nav>
      <a name='myanchor'>
        {!isAuthenticated &&
          <h1 style={{height: '10px'}}></h1>
        }
        {isAuthenticated &&
          <h1 style={{height: '10px'}}></h1>
        }
      </a>
      </div>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}