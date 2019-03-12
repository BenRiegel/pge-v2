//imports ----------------------------------------------------------------------

import root from './nodes/RootNode.js';
import loader from './components/Loader.js';
import selectMenu from './components/SelectMenu.js';
import webMap from './components/WebMap.js';


//module code block ------------------------------------------------------------

var nodes = {root};

var components = {loader, selectMenu, webMap};


//exports ----------------------------------------------------------------------

export default { nodes, components };
