import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Login extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='username' className="form-control" style={{ marginBottom: '5px' }} placeholder='email'/>
        <input type='password' ref='password' className="form-control" style={{ marginBottom: '5px' }} placeholder='Password'/>
        <button onClick={(event) => this.handleLogonClick(event)} className="btn btn-primary" style={{ marginRight: '5px' }}>
          Login
        </button>
        <button onClick={(event) => this.handleSignUpClick(event)} className="btn btn-primary">
          Sighnup
        </button>

        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }

  handleLogonClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
  handleSignUpClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onSignUpClick(creds)
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}