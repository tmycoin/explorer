import React, { Component, Fragment }  from 'react'

import { formatTimestamp, formatBytes, getReadableCoins, getReadableDifficultyString } from '../utils/shortcuts';
import { Api } from '../utils/api';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidMount() {
    // this.fetch();
  }

  render() {
    const { info, lastBlockHeader } = this.props;
    const { block_header } = lastBlockHeader;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3>İnfo</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Last Block:</div> <div>{info.last_known_block_index}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Transactions:</div> <div>{info.tx_count}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Min Fee:</div> <div>{getReadableCoins(100000)}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">alt_blocks_count:</div>
                  <div>{info.alt_blocks_count}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Difficulty:</div> <div>{getReadableDifficultyString(info.difficulty)}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">incoming_connections_count:</div> <div>{info.incoming_connections_count}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">outgoing_connections_count:</div> <div>{info.outgoing_connections_count}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">tx_pool_size:</div> <div>{info.tx_pool_size}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">white_peerlist_size:</div> <div>{info.white_peerlist_size}</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 scol-lg-6">
            <div className="card">
              <div className="card-header">
                <h3>Last Block Header</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Difficulty</div> <div>{getReadableDifficultyString(block_header.difficulty)}</div>
                </li>
                <li className="list-group-item">
                  <div>Hash</div>
                  <div>
                    <a href={`/hash/${block_header.hash}`}>{block_header.hash}</a>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Height</div> <div>{block_header.height}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">orphan_status:</div> <div>{block_header.orphan_status.toString()}</div>
                </li>
                <li className="list-group-item">
                  <div>Prev Hash</div>
                  <div>
                    <a href={`/hash/${block_header.prev_hash}`}>{block_header.prev_hash}</a>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Reward</div> <div>{getReadableCoins(block_header.reward)}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="mr-auto">Date</div> <div>{formatTimestamp(block_header.timestamp)}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
