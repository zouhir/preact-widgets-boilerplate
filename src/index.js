// import 'promise-polyfill';
// import 'isomorphic-fetch';

import { render } from 'preact-habitat';

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
