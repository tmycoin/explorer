import React, { Component, Fragment }  from 'react'

// MAIN STYLES
import '../../sass/styles.scss';

// Particles
import Header from './particles/header';

if (process.browser) {
  require('popper.js');
  require('jquery');
  require("bootstrap");
}

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="mt-3">
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}
