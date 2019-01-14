import React, { Component, Fragment }  from 'react'
import _ from 'underscore';
import moment from 'moment';

import { Api } from '../utils/api';
import { formatTimestamp, formatBytes, getReadableCoins } from '../utils/shortcuts';
import BootstrapTable from 'react-bootstrap-table-next';

export default class extends Component {
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
        dataField: 'value.amount',
        text: 'Amout',
        headerStyle: { width: '100px' },
        formatter(amount) {
          return getReadableCoins(amount);
        }
      },

      {
        dataField: 'value.k_image',
        text: 'Image',
        headerStyle: { width: '300px' }
      },

      {
        dataField: 'value.key_offsets',
        text: 'Offset',
        headerStyle: { width: '100px' },
        formatter(key_offsets=[]) {
          return key_offsets.join(',');
        }
      }
    ];

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Inputs</h4>
              </div>
              <div className="card-body pl-0 pr-0">
                <BootstrapTable keyField='height' data={this.props.list} columns={columns} bordered={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
