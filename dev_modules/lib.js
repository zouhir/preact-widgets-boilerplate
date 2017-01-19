const preact = require('preact')

const ATTR = 'data-widget-id';

const getWidgetScriptTag = (document) => {
  return document.currentScript || ((() => {
  let scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
}))();
}

const getTagContent = (tag) => {
  let config = null;
  try {
    config = JSON.parse(tag.textContent)[0];
    return config;
  } catch (e) {
    return config;
  }
}

const render = (Widget) => {

  let root;
  let habitatNode; // the DOM element where our widget going to be rendered
  let mountTo = []; // other divs we are going to clone the widget to

  const widgetScriptTag = getWidgetScriptTag(document)
  const config = getTagContent(widgetScriptTag)

  if(!config || typeof config.mount === 'undefined') {
    habitatNode = widgetScriptTag.parentNode;
    return preact.render(
      preact.h(
        Widget
      ),
      habitatNode,
      root
    )
  }

  if(typeof config.mount == 'undefined') {
    return null;
  } else {
    (typeof config.mount === 'string') ? mountTo = [config.mount] : mountTo = config.mount
  }

  [].forEach.call(
    document.querySelectorAll(`[${ATTR}]`),
      tag => {
        if(mountTo.indexOf(tag.getAttribute(ATTR)) > -1) {
          habitatNode = tag
          return preact.render(
            preact.h(
              Widget
            ),
            habitatNode,
            root
          )
        } else {
          return null;
        }
      }
  )
}

export default render
