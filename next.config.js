const withPlugins = require('next-compose-plugins'),
      withSass = require('@zeit/next-sass'),
      withImages = require('next-images');

const plugins = [
  [withSass, { }],
  [withImages, { }]
];

const nextConfiguration = {
  serverRuntimeConfig: {
    coinUnits: 100000000
  },

  publicRuntimeConfig: {
    name: 'Timmycoin',
    title: 'Timmycoin Explorer',
    favicon: '/static/favicon.png',
    logo: '/static/images/logo.svg',
    symbol: 'TMY',
    coinUnits: 100000000,
    walletUrl: 'https://wallet.timmycoin.net',
    githubUrl: 'https://github.com/tmycoin/explorer'
  }
};

module.exports = withPlugins(plugins, nextConfiguration);
