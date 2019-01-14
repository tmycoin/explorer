import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config';

// get config
const { publicRuntimeConfig } = getConfig();

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>{publicRuntimeConfig.title}</title>
          <link id="favicon" rel="shortcut icon" href={publicRuntimeConfig.favicon} type="image/png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,600" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
