# explorer
explorer blockchain for nex.js


### Started Development

    export NODE=http://timmy-1.timmycoin.net:1303
    npm run dev

### Settings
change the settings in this file **(next.config.js)** to your own.

```JS
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
```


### Deploy

We use [Nextd](https://github.com/yasaricli/nextd) for production. I need a **nextd.json** file for this.

    nextd --deploy
