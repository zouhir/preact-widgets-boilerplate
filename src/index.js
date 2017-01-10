// import 'promise-polyfill';
// import 'isomorphic-fetch';

import { h, render } from 'preact';

let root;

function init() {
	let Widget = require('./components/widget').default;

  let currentScriptTag = document.currentScript || (function() {
    let scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  console.log(`rendering main widget inside ${currentScriptTag.parentNode.id}`)
  // render main copy of our widget
  render(<Widget />, currentScriptTag.parentNode, root);

  console.log(document.querySelectorAll('script[data-widget]'));

  // is it needed anywhere else?
  [].forEach.call(
    document.querySelectorAll('script[data-widget]'),
    script => {
      let config;
      try { config = JSON.parse(script.textContent)[0]; } catch(e) {}
      if (!config) return;
      [].forEach.call(config.clone, domId => {
        if(domId == currentScriptTag.parentNode.id) {
          render(
            h(
              Widget,
              config // config can contain any extra stuff you want!
            ),
            script.parentNode,
            script
          );
        }
      });
    }
  )
}


// in development, set up HMR:
if (module.hot) {
	require('preact/devtools');   // enables React DevTools
	module.hot.accept('./components/widget', () => requestAnimationFrame(init) );
}

init();
