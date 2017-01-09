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

  console.log(currentScriptTag.parentNode)

	root = render(<Widget />, currentScriptTag.parentNode, root);
}


// in development, set up HMR:
if (module.hot) {
	require('preact/devtools');   // enables React DevTools
	module.hot.accept('./components/widget', () => requestAnimationFrame(init) );
}

init();
