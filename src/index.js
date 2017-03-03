import habitat from 'preact-habitat';

function init() {
  console.log(typeof habitat);
  let Widget = require('./components/widget').default;
  let niceLogin = habitat(Widget);
  niceLogin.render();
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools'); // enables React DevTools, be careful on IE
  module.hot.accept('./components/widget', () => requestAnimationFrame(init));
}

init();
