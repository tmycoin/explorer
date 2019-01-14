import React, { Component, Fragment }  from 'react'

import { Api } from '../src/utils/api';
import { formatTimestamp, formatBytes, getReadableCoins } from '../src/utils/shortcuts';

import Layout from '../src/components/layout';
import { Transactions } from '../src/components/transactions';

export default class extends Component {
  static async getInitialProps({ query }) {
    const { block } = await Api.getBlockHeaderByHash(query.hash);
    return { block }
  }

  render() {
    const { block } = this.props;

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="jumbotron">
                <h1 className="display-4">Hash</h1>
                <h3>{block.hash}</h3>
                <p className="lead">
                  <span className="badge badge-success">
                    <b>Created At</b> {formatTimestamp(block.timestamp)}
                  </span>
                </p>
                <p className="lead mt-5">Block Header Detail</p>
                <div className="row">
                  <div className="col-6">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Height
                        <span className="badge badge-primary badge-pill">{block.height}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Hifficulty
                        <span className="badge badge-primary badge-pill">{block.difficulty}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Transactions
                        <span className="badge badge-primary badge-pill">{block.transactions.length}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total coins in the network
                        <span className="badge badge-primary badge-pill">{getReadableCoins(block.alreadyGeneratedCoins)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total block size
                        <span className="badge badge-primary badge-pill">{formatBytes(block.blockSize)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                         Current txs median
                        <span className="badge badge-primary badge-pill">{formatBytes(block.sizeMedian)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                         Base reward
                        <span className="badge badge-primary badge-pill">{getReadableCoins(block.baseReward)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                         Transactions fee
                        <span className="badge badge-primary badge-pill">{getReadableCoins(block.totalFeeAmount)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                          Reward
                        <span className="badge badge-primary badge-pill">{getReadableCoins(block.reward)}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h1 className="display-4 mt-5">Prev Hash</h1>
                <a href={`/hash/${block.prev_hash}`}>
                  <h3>{block.prev_hash}</h3>
                </a>
              </div>
            </div>

            <Transactions {...this.props} transactions={block.transactions}/>
          </div>
        </div>
      </Layout>
    )
  }
}
