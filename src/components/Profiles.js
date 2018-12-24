import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Profiles extends Component {

  render() {
    const { profiles, errorMessage, isAuthenticated,getProfileOnLogin } = this.props
    console.log(profiles);
    var listItems;
    
    try {
      if(isAuthenticated)
        listItems = profiles.map((d) => <li key={d.name}>{d.name}</li>);
    } catch (e) {

    }

    return (
      <div>

        { isAuthenticated &&
          <div className='col-sm-3'>
            <button onClick={getProfileOnLogin} className="btn btn-warning">
              Get profiles
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

Profiles.propTypes = {
  errorMessage: PropTypes.string,
  profiles: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  getProfileOnLogin: PropTypes.func
}