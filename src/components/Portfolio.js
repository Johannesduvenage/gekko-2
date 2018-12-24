import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Portfolio extends Component {

  render() {
    const { portfolios, errorMessage, isAuthenticated,getPortfolioOnLogin } = this.props
    console.log(portfolios);
    var listItems;
    
    try {
      if(isAuthenticated)
        listItems = portfolios.map((d) => <li key={d.name}>{d.name}</li>);
    } catch (e) {

    }

    return (
      <div>

        { isAuthenticated &&
          <div className='col-sm-3'>
            <button onClick={getPortfolioOnLogin} className="btn btn-warning">
              Get portfolios
            </button>
          </div>
        }
        {listItems}
        
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }

}

Portfolio.propTypes = {
  errorMessage: PropTypes.string,
  portfolios: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  getPortfolioOnLogin: PropTypes.func
}