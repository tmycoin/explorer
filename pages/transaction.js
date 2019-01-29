import React, { Component, Fragment } from "react";

import { Api } from "../src/utils/api";
import {
  formatTimestamp,
  formatBytes,
  getReadableCoins
} from "../src/utils/shortcuts";

import Layout from "../src/components/layout";
import Inputs from "../src/components/inputs";
import Outputs from "../src/components/outputs";

export default class extends Component {
  static async getInitialProps({ query }) {
    const { block, tx, txDetails } = await Api.getTransactionByHash(query.hash);
    const info = await Api.getInfo();

    return { block, tx, txDetails, info };
  }

  render() {
    const { block, tx, txDetails, info } = this.props;

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="jumbotron">
                <h1 className="display-4">Transaction</h1>
                <h3>{txDetails.hash}</h3>
                {!block.hash &&
                  <span className="unconfirmed-transaction">
                    Unconfirmed transaction
                  </span>
                }
                {block.hash &&
                  <p className="lead">
                    <span className="badge badge-success">
                      <b>Created At</b> {formatTimestamp(block.timestamp)}
                    </span>
                  </p>
                }
                {block.hash && (
                  <div className="row">
                    <div className="col-6">
                      <p className="lead mt-5">Block Header Detail</p>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Confirmations
                          <span className="badge badge-primary badge-pill">
                            {info.height - block.height}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Fee
                          <span className="badge badge-primary badge-pill">
                            {getReadableCoins(txDetails.fee)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Sum of outputs
                          <span className="badge badge-primary badge-pill">
                            {getReadableCoins(txDetails.amount_out)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Size
                          <span className="badge badge-primary badge-pill">
                            {formatBytes(txDetails.size)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <p className="lead mt-5">In block</p>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Hash
                          <span className="badge badge-primary badge-pill">
                            {block.hash}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Height
                          <span className="badge badge-primary badge-pill">
                            {block.height}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Timestamp
                          <span className="badge badge-primary badge-pill">
                            {formatTimestamp(block.timestamp)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Inputs list={tx.vin} />
            <Outputs list={tx.vout} />
          </div>
        </div>
      </Layout>
    );
  }
}
