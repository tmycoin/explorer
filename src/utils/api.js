import fetch from 'isomorphic-unfetch';
import _ from 'underscore';

class Ajax {
  constructor() {
    this.API_URL = process.env.NODE;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(`${this.API_URL}${url}`).then((res) => resolve(res.json())).catch((data) => {
        reject({
          // sonra error componentsi yazılacak.
        })
      })
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      const request = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
      };

      fetch(`${this.API_URL}${url}`, request).then((res) => resolve(res.json()));
    });
  }

  rpcInput(method, params={}) {
    return {
      jsonrpc: "2.0",
      id: "test",
      method: method,
      params: params
    }
  }

  async rpc(method, params) {
    return await Api.post('/json_rpc', this.rpcInput(method, params));
  }

  async getInfo() {
    return await Api.get('/getinfo');
  }

  async getheight() {
    return await Api.get('/getheight');
  }

  async getTransactions() {
    return await Api.get('/gettransactions');
  }

  async getlastBlockHeader() {
    const request = await this.rpc('getlastblockheader');
    return request.result;
  }

  async getBlockHeaderByHeight(height) {
    const request = await this.rpc('getblockheaderbyheight', {
      "height": height
    });

    return request.result;
  }

  async getBlockHeaderByHash(hash) {
    const request = await this.rpc('f_block_json', {
      "hash": hash
    });

    return request.result;
  }

  async getTransactionByHash(hash) {
    const request = await this.rpc('f_transaction_json', {
      "hash": hash
    });

    return request.result;
  }

  async getBlocks() {
    const { block_header: { height } } = await this.getlastBlockHeader();
    const {  result } = await this.rpc('f_blocks_list_json', {
      "height": height
    });

    return result.blocks;
  }

  async transactionPool() {
    const request = await this.rpc('f_mempool_json');

    return request.result;
  }
}

const Api = new Ajax();

export {
  Api
}
