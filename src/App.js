import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from './actions/actionsLogon'
import Navbar from './components/Navbar'
import TSChart from './TSChart';
import SideBar from './components/SideBar'
import Profiles from './components/Profiles'

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessagelogon, errorMessageprofile, profiles } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessagelogon}
          dispatch={dispatch}
        />
        <SideBar
          isAuthenticated={isAuthenticated}
        />
        <Profiles
          profiles={profiles}
          errorMessage={errorMessageprofile}
          />
        <TSChart isAuthenticated={isAuthenticated}/>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessagelogon: PropTypes.string,
  profiles: PropTypes.array.isRequired,
  errorMessageprofile: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { profile, auth } = state
  const { profiles, errorMessage: errorMessageprofile } = profile
  const { isAuthenticated, errorMessage:errorMessagelogon } = auth

  return {
    profiles,
    errorMessageprofile,
    isAuthenticated,
    errorMessagelogon
  }
}

export default connect(mapStateToProps)(App)