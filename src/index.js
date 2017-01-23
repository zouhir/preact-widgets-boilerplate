// import 'promise-polyfill';
// import 'isomorphic-fetch';

import { render } from 'preact-habitat';

function init() {
  let Widget = require('./components/widget').default;
  render(Widget);
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools');   // enables React DevTools, be careful on IE
  module.hot.accept('./components/widget', () => requestAnimationFrame(init) );
}

init();
