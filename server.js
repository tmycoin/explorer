const express = require('express'),
      next = require('next'),
      { createServer } = require('http'),
      _ = require('underscore'),
     fetch = require('isomorphic-unfetch');

const PORT = 4000;
const coinUnits = 100000000;
const isDev = !_.isEqual(process.env.NODE_ENV, 'production');

const app = next({ dev: isDev });
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/hash/:hash', (req, res) => {
    return app.render(req, res, '/hash', { hash: req.params.hash })
  })

  server.get('/transactions/:hash', (req, res) => {
    return app.render(req, res, '/transaction', { hash: req.params.hash })
  })

  server.get('/api/:_type', (req, res) => {
    fetch(`${process.env.NODE}/getinfo`).then((res) => res.json()).then((data) => {
      const { _type } = req.params;
      const getReadableCoinsServer = (coins) => {
        var amount = (parseInt(coins || 0) / coinUnits).toFixed(coinUnits.toString().length - 1);
        return amount;
      }

      if (_.isEqual(_type, 'hashrate')) {
        const difficulty = Math.round(data.difficulty / 120);
        return res.end(difficulty.toString());
      }

      if (_.isEqual(_type, 'height')) {
        return res.end(data.last_known_block_index.toString());
      }

      if (_.isEqual(_type, 'reward')) {
        return res.end(getReadableCoinsServer(data.last_block_reward));
      }

      if (_.isEqual(_type, 'supply')) {
        return res.end(data.already_generated_coins)
      }

      res.send(data);
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Started ${PORT}`)
  })
})
