import React, { Component, Fragment }  from 'react'

import { Api } from '../src/utils/api';
import Layout from '../src/components/layout';

export default class extends Component {
  static async getInitialProps({ req }) {
    return {

    }
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>
                <i className="fa fa-code" aria-hidden="true"></i> Supported APIs
              </h3>
              <ul className="api-list">
                <li>
                  <a href="/api/hashrate">hashrate</a> – current estimated network hashrate
                </li>
                <li>
                  <a href="/api/height">height</a> – current height (incl. genesis block)
                </li>
                <li>
                  <a href="/api/reward">reward</a> – current block reward
                </li>
                <li>
                  <a href="/api/supply">supply</a>– total available supply
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
