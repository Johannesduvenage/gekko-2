import React, { Component } from 'react'
import PropTypes from 'prop-types';


export default class SideBar extends Component {

  render() {
    const {isAuthenticated} = this.props

    return (
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <a name='myanchor'>
            {!isAuthenticated &&
            <h1 style={{height: '10px'}}></h1>
            }
            {isAuthenticated &&
            <h1 style={{height: '10px'}}></h1>
            }
        </a>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#rootAnchor">
                Portfolio Makeup <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#historyAnchor">
                Risk and Returns
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#statsAnchor">
                Key Indicators
              </a>
              </li>
            <li class="nav-item">
              <a class="nav-link" href="#newsAnchor">
                News
              </a>
            </li>
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Analysis</span>
            <a class="d-flex align-items-center text-muted" href="#">
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Moving Averages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Regressions
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Dimensionality Reduction
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Clustering
              </a>
            </li>
          </ul>
        </div>
      </nav> 
    )
  }

}

SideBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}