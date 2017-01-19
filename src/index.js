// import 'promise-polyfill';
// import 'isomorphic-fetch';

import render from '../dev_modules/lib'

let root;

function init() {
  let Widget = require('./components/widget').default;

  render(Widget);
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools');   // enables React DevTools
  module.hot.accept('./components/widget', () => requestAnimationFrame(init) );
}

init();
