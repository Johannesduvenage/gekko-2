import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchPortfolios } from './actions/actionsPortfolios'
import Navbar from './components/Navbar'
import TSChart from './components/TSChart';
import SideBar from './components/SideBar'
import Portfolio from './components/Portfolio'
import HistogramChart from './components/HistogramChart';
import News from './components/News';
import Stats from './components/Stats';

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessagelogon, errorMessageprofile, portfolios } = this.props
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
        <Portfolio
          portfolios={portfolios}
          errorMessage={errorMessageprofile}
          isAuthenticated={isAuthenticated}
          getPortfolioOnLogin={() => dispatch(fetchPortfolios())}
          />
        <TSChart isAuthenticated={isAuthenticated}/>

        <HistogramChart />
        <Stats />
        <News />
        </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessagelogon: PropTypes.string,
  portfolios: PropTypes.string.isRequired,
  errorMessageprofile: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { portfolio, auth } = state
  const { portfolios, errorMessage: errorMessageprofile } = portfolio
  const { isAuthenticated, errorMessage:errorMessagelogon } = auth

  return {
    portfolios,
    errorMessageprofile,
    isAuthenticated,
    errorMessagelogon
  }
}

export default connect(mapStateToProps)(App)