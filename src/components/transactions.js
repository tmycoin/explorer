import React, { Component, Fragment }  from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

import { Api } from '../utils/api';
import { formatTimestamp, formatBytes, getReadableCoins } from '../utils/shortcuts';

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
    const columns = [
      {
        dataField: 'receiveTime',
        text: 'Date & time',
        headerStyle: { width: '270px' },
        formatter(receiveTime) {
          return formatTimestamp(receiveTime);
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

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Transaction pool</h4>
              </div>
              <div className="card-body pl-0 pr-0">
                <BootstrapTable keyField='hash' data={this.props.transactions} columns={columns} bordered={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
