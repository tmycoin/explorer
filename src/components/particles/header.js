import React, { Component, Fragment }  from 'react';
import autobind from 'autobind-decorator';
import getConfig from 'next/config';
import { withRouter } from "next/router";
import _ from 'underscore';

// get config
const { publicRuntimeConfig } = getConfig();

export default withRouter(class extends Component {
  constructor(props) {
    super();
    this.state = {
      value: null
    }
  }

  @autobind
  onInputChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { router: { route } } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <img src={publicRuntimeConfig.logo} width="50" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${_.isEqual(route, '/') ? 'active' : ''}`}>
              <a className="nav-link" href="/">Block Explorer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={publicRuntimeConfig.walletUrl} target="_blank">Wallet</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={publicRuntimeConfig.githubUrl} target="_blank">Github</a>
            </li>
            <li className={`nav-item ${_.isEqual(route, '/api') ? 'active' : ''}`}>
              <a className="nav-link" href='/api' >Api</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="height / hash, transaction hash, payment id" aria-label="Search" onChange={this.onInputChange} />
            <div className="btn-group dropleft">
              <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={!this.state.value}>
                Search
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href={`/block/${this.state.value}`}>Block</a>
                <a className="dropdown-item" href={`/hash/${this.state.value}`}>Hash</a>
                <a className="dropdown-item" href={`/transactions/${this.state.value}`}>Transaction Hash</a>
              </div>
            </div>
          </form>
        </div>
      </nav>
    )
  }
})
