//imports ----------------------------------------------------------------------

import root from './nodes/RootNode.js';
import selectMenu from './components/SelectMenu.js';
import loader from './components/Loader.js';
import webMap from './components/WebMap.js';
import popupTemplate from './components/PopupTemplate.js';


//module code block ------------------------------------------------------------

var nodes = { root };

var components = {
  loader,
  webMap,
  selectMenu,
  popupTemplate,
  labels: {},
};


//exports ----------------------------------------------------------------------

export default { nodes, components };
