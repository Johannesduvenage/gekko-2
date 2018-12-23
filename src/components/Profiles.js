import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Profiles extends Component {

  render() {
    const { profiles, errorMessage } = this.props

    return (
      <div>
        
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }

}

Profiles.propTypes = {
  errorMessage: PropTypes.string,
  profiles: PropTypes.array
}