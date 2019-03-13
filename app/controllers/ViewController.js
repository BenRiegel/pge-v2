//imports ----------------------------------------------------------------------

import { INIT_SELECTED_TAG } from '../config/Config.js';
import view from '../view/View.js';
import { getOptionPropsList } from '../services/Tags.js';
import { getGraphicPropsList } from '../services/Projects.js';


//module code block ------------------------------------------------------------

var { nodes, components } = view;
var { root } = nodes;
var { loader, selectMenu, webMap } = components;

//configure dom ----------------------------------------------------------------

root.appendChild(loader.rootNode);
root.appendChild(selectMenu.rootNode);
root.appendChild(webMap.rootNode);

var initSelectMenu = async function(){
  var optionPropsList = await getOptionPropsList();
  selectMenu.setOptions(optionPropsList);
  selectMenu.setSelectedOption(INIT_SELECTED_TAG);
}

var initWebMap = async function(){
  await webMap.hasRendered;
  var graphicPropsList = await getGraphicPropsList();
  webMap.graphicsLayer.setGraphics(graphicPropsList);
  webMap.graphicsLayer.setSelectedTag(INIT_SELECTED_TAG);
};

//event reactions --------------------------------------------------------------

selectMenu.addEventListener('newSelectedOption', webMap.graphicsLayer.setSelectedTag);


//exports ----------------------------------------------------------------------

export function startLoading(){
  loader.show();
};

export async function load(){
  var selectMenuReady = initSelectMenu();
  var webMapReady = initWebMap();
  await Promise.all( [selectMenuReady, webMapReady] );
};

export async function finishLoading(){
  await loader.fadeAndHide();
};
