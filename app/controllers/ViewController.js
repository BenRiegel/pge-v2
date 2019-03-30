//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import view from '../view/View.js';
import { getOptionsData } from '../services/Tags.js';
import { getLocationsList } from '../services/Projects.js';
import { waitAtLeast } from '../lib/utils/Utils.js';


//module code block ------------------------------------------------------------

var { nodes, components } = view;
var { root } = nodes;
var { loader, webMap } = components;

//configure dom ----------------------------------------------------------------

root.appendChild(loader.rootNode);

//define helper functions ------------------------------------------------------

var initSelectMenu = async function(){
  var optionsData = await getOptionsData();
  webMap.selectMenu.loadOptions(optionsData, INIT_SELECTED_TAG);
}

var initWebMap = async function(){
  await webMap.hasRendered;
  var locationsList = await getLocationsList();
  webMap.graphicsLayer.setLocations(locationsList);
  webMap.graphicsLayer.filterLocations(INIT_SELECTED_TAG);
};

var startLoading = function(){
  loader.activate();
};

var load = async function(){
  var selectMenuReady = initSelectMenu();
  var webMapReady = initWebMap();
  await Promise.all( [selectMenuReady, webMapReady] );
};

var finishLoading = async function(){
  await loader.terminate(true);
};

var onInitApp = async function(){
  startLoading();
  await waitAtLeast(1000, load);
  await finishLoading();
}

//load listeners ---------------------------------------------------------------

dispatcher.setListener('view', 'initApp', onInitApp);
