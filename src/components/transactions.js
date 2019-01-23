import React, { Component, Fragment }  from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'underscore';

import { Api } from '../utils/api';
import { formatTimestamp, formatBytes, getReadableCoins, sum } from '../utils/shortcuts';

export class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {

  }

  render() {
    const columns = [
      {
        dataField: 'hash',
        text: 'Hash',
        classes: 'column-hash',
        formatter(hash) {
          return <a href={`/transactions/${hash}`}>{hash}</a>
        }
      },
      {
        dataField: 'fee',
        text: 'Fee',
        headerStyle: { width: '200px' },
        formatter(fee) {
          return getReadableCoins(fee);
        }
      },

      {
        dataField: 'amount_out',
        text: 'Total Amount',
        headerStyle: { width: '200px' },
        formatter(amount_out) {
          return getReadableCoins(amount_out);
        }
      },

      {
        dataField: 'size',
        text: 'Size',
        headerStyle: { width: '100px' },
        formatter(size) {
          return formatBytes(size);
        }
      }
    ];

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Transaction pool</h4>
              </div>
              <div className="card-body pl-0 pr-0">
                <BootstrapTable keyField='hash' data={this.props.transactions} columns={ columns } bordered={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class TransactionPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {

  }

  render() {
    const { transactions } = this.props;

    const columns = [
      {
        dataField: 'receiveTime',
        text: 'Date & time',
        headerStyle: { width: '175px' },
        formatter(receiveTime) {
          return formatTimestamp(receiveTime, false);
        }
      },
      {
        dataField: 'amount_out',
        text: 'Total Amount',
        headerStyle: { width: '160px' },
        formatter(amount_out) {
          return getReadableCoins(amount_out);
        }
      },
      {
        dataField: 'fee',
        text: 'Fee',
        headerStyle: { width: '150px' },
        formatter(fee) {
          return getReadableCoins(fee);
        }
      },
      {
        dataField: 'size',
        text: 'Size',
        headerStyle: { width: '100px' },
        formatter(size) {
          return formatBytes(size);
        }
      },
      {
        dataField: 'hash',
        text: 'Hash',
        classes: 'column-hash',
        formatter(hash) {
          return <a href={`/transactions/${hash}`}>{hash}</a>
        }
      }
    ];

    const total_amount = sum(_.map(transactions, (t) => t.amount_out ));
    const total_fee = sum(_.map(transactions, (t) => t.fee ));
    const total_sizes = sum(_.map(transactions, (t) => t.size ));

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Transaction pool</h4>
              </div>
              <div className="card-body pl-0 pr-0 ">
                <div className="transaction-header">
                  <button type="button" className="btn btn-primary">
                    Count <span className="badge badge-light">{this.props.transactions.length}</span>
                  </button>
                  <button type="button" className="btn btn-primary">
                    Total Amount <span className="badge badge-light">{getReadableCoins(total_amount)}</span>
                  </button>
                  <button type="button" className="btn btn-primary">
                    Total Fees <span className="badge badge-light">{getReadableCoins(total_fee)}</span>
                  </button>
                  <button type="button" className="btn btn-primary">
                    Total Size <span className="badge badge-light">{formatBytes(total_sizes)}</span>
                  </button>
                </div>
                <BootstrapTable keyField='hash' data={this.props.transactions} columns={columns} bordered={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
