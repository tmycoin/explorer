import React, { Component, Fragment }  from 'react'
import _ from 'underscore';
import moment from 'moment';

import { Api } from '../utils/api';
import { formatTimestamp, formatBytes, getReadableDifficultyString } from '../utils/shortcuts';
import BootstrapTable from 'react-bootstrap-table-next';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {}

  render() {

    const columns = [
      {
        dataField: 'height',
        text: 'Height',
        headerStyle: { width: '80px' },
        formatter(height) {
          return <b>{height}</b>
        }
      },
      {
        dataField: 'timestamp',
        text: 'Date & time',
        headerStyle: { width: '250px' },
        formatter(timestamp) {
          return <i>{formatTimestamp(timestamp)}</i>
        }
      },
      {
        dataField: 'cumul_size',
        text: 'Size',
        headerStyle: { width: '100px' },
        formatter(cumul_size) {
          return formatBytes(cumul_size);
        }
      },
      {
        dataField: 'hash',
        text: 'Block Hash',
        classes: 'column-hash',
        formatter(hash) {
          return <a href={`/hash/${hash}`}>{hash}</a>
        }
      },
      {
        dataField: 'difficulty',
        text: 'Difficulty',
        headerStyle: { width: '90px' },
        formatter(difficulty) {
          return getReadableDifficultyString(difficulty);
        }
      },

      { dataField: 'tx_count', text: 'Txs', headerStyle: { width: '50px' } }
    ];

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Recent blocks (last of 30)</h4>
              </div>
              <div className="card-body pl-0 pr-0">
                <BootstrapTable keyField='height' data={this.props.blocks} columns={columns} bordered={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
