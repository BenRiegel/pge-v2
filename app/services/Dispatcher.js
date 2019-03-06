//imports ----------------------------------------------------------------------

import Emitter from '../lib/Emitter.js';
import { getProjectData } from './Projects.js';
import { wait } from '../lib/Utils.js';


//module code block ------------------------------------------------------------

var dispatcher = new Emitter();


//exports ----------------------------------------------------------------------

  //selectMenu, zoomControls, popUp, basemapLayer, graphicsLayer

export default dispatcher;

export async function initApp(){
  dispatcher.broadcast('startLoading');
  await dispatcher.asyncBroadcast('load');
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  await dispatcher.asyncBroadcast('finishLoading');
};

export async function pointSelect(id, worldCoords){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('selectMenu - close');
  dispatcher.broadcast('basemapLayer - disable');
  dispatcher.broadcast('graphicsLayer - highlightGraphic', id);
  await dispatcher.asyncBroadcast('mapMoveAnimator - panTo', worldCoords);
  await wait(200);
  var projectData = await getProjectData(id);
  dispatcher.broadcast('popup - loadProjectData', projectData)
  await dispatcher.asyncBroadcast('popup - open');
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('basemapLayer - enable');
};

export async function clusterSelect(id, worldCoords){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('selectMenu - close');
  dispatcher.broadcast('basemapLayer - disable');
  dispatcher.broadcast('graphicsLayer - highlightGraphic', id);
  await dispatcher.asyncBroadcast('mapMoveAnimator - zoom', 'zoomTo', worldCoords);
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('basemapLayer - enable');
}

export function selectMenuEventStart(){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('graphicsLayer - disable');
  dispatcher.broadcast('basemapLayer - disable');
}

export function selectMenuEventEnd(){
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('graphicsLayer - enable');
  dispatcher.broadcast('basemapLayer - enable');
}

export function setNewSelectedTag(selectedTag){
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('graphicsLayer - filterGraphics', selectedTag);
}

export function popupEventStart(){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('graphicsLayer - disable');
  dispatcher.broadcast('basemapLayer - disable');
}

export function popupEventEnd(){
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('graphicsLayer - enable');
  dispatcher.broadcast('basemapLayer - enable');
}

export function popupClose(){
  dispatcher.broadcast('graphicsLayer - unhighlightGraphic');
}

export async function zoom(type){
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('selectMenu - close');
  dispatcher.broadcast('graphicsLayer - disable');
  dispatcher.broadcast('basemapLayer - disable');
  await dispatcher.asyncBroadcast('mapMoveAnimator - zoom', type);
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('graphicsLayer - enable');
  dispatcher.broadcast('basemapLayer - enable');
}

export function panStartRequest(){
  dispatcher.broadcast('panController - panStartRequest');
}

export function panEndRequest(){
  dispatcher.broadcast('panController - panEndRequest');
}

export function panRequest(deltaPx){
  dispatcher.broadcast('panController - panRequest', deltaPx);
}

export function panStart(){
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('graphicsLayer - disable');
}

export function panEnd(){
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('graphicsLayer - enable');
}
