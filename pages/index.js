import React, { Component, Fragment }  from 'react'

import { Api } from '../src/utils/api';
import Layout from '../src/components/layout';
import Info from '../src/components/info';
import RecentBlocks from '../src/components/recentBlocks';
import { TransactionPool } from '../src/components/transactions';

export default class extends Component {
  static async getInitialProps({ req }) {
    const info = await Api.getInfo();
    const lastBlockHeader = await Api.getlastBlockHeader();
    const blocks = await Api.getBlocks();
    const { mempool } = await Api.transactionPool();

    return {
      info,
      lastBlockHeader,
      blocks,
      mempool
    }
  }

  render() {
    return (
      <Layout>
        <Info {...this.props} />
        <TransactionPool transactions={this.props.mempool}/>
        <RecentBlocks {...this.props}  />
       </Layout>
    )
  }
}
