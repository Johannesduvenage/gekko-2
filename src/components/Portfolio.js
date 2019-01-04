import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Portfolio extends Component {

  render() {
    const { portfolios, errorMessage, isAuthenticated,getPortfolioOnLogin } = this.props
    console.log(portfolios);
    var listItems;
    
    try {
      if(isAuthenticated)
        listItems = portfolios.map((d) => 
        <li key={d._id} >{d.name}
           <button onClick={(event) => this.handleDeleteClick(event,d._id)} className="btn btn-warning">
           delete
           </button>
      </li>);
    } catch (e) {
      console.log(e)
    }

    return (
      <div>

        { isAuthenticated &&
          <div className='col-sm-3'>
            <button onClick={getPortfolioOnLogin} className="btn btn-warning">
              Get portfolios
            </button>

            {listItems}
            <button onClick={(event) => this.handleAddClick(event)} className="btn btn-warning">
              Add portfolios
            </button>
            <input type='text' ref='portfolioName' className="form-control" style={{ marginRight: '5px', }} placeholder='New Name'/>
        
          </div> 
        }
        
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }
  handleAddClick(event) {
    const portfolioName = this.refs.portfolioName;
    this.props.addPortfolio(portfolioName.value.trim());
  }
  handleDeleteClick(event,id)
  {
    this.props.deletePortfolio(id)
  }
}


Portfolio.propTypes = {
  errorMessage: PropTypes.string,
  portfolios: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  getPortfolioOnLogin: PropTypes.func,
  addPortfolio: PropTypes.func
}