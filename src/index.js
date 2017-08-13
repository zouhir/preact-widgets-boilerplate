import habitat from 'preact-habitat';
import Widget from './components/widget';

function init() {
  let niceLogin = habitat(Widget);
  /**
   * option 1: render inline
   */
  niceLogin.render({
    inline: true,
    clean: false
  });
  /**
   * option 2: client specified
   */
  // niceLogin.render({
  //   clientSpecified: true,
  //   inline: false,
  //   clean: true
  // });
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools'); // enables React DevTools, be careful on IE
  module.hot.accept('./components/widget', () => requestAnimationFrame(init));
}

init();
