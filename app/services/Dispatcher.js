//imports ----------------------------------------------------------------------

import Emitter from '../lib/Emitter.js';
import { getProjectData } from './Projects.js';
import { wait } from '../lib/Utils.js';


//module code block ------------------------------------------------------------

var dispatcher = new Emitter();


//exports ----------------------------------------------------------------------

export default dispatcher;

export async function initApp(){
  await dispatcher.asyncBroadcast('startLoading');
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
  dispatcher.broadcast('graphicsLayer - highlightCluster', id);
  await dispatcher.asyncBroadcast('mapMoveAnimator - panTo', worldCoords);
  await wait(200);
  dispatcher.broadcast('graphicsLayer - unhighlightCluster');
  var projectData = await getProjectData(id);
  dispatcher.broadcast('popup - loadProjectData', projectData);
  await dispatcher.asyncBroadcast('popup - open');
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
};

export async function clusterSelect(id, worldCoords){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('selectMenu - close');
  dispatcher.broadcast('graphicsLayer - highlightCluster', id);
  await dispatcher.asyncBroadcast('mapMoveAnimator - zoom', 'to', worldCoords);
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
}

export function selectMenuEventStart(){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('popup - disable');
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('graphicsLayer - disable');
}

export function selectMenuEventEnd(){
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('popup - enable');
  dispatcher.broadcast('graphicsLayer - enable');
}

export function setNewSelectedTag(selectedTag){
  dispatcher.broadcast('popup - close');
  dispatcher.broadcast('graphicsLayer - filterGraphics', selectedTag);
}

export function popupEventStart(){
  dispatcher.broadcast('zoomControls - disable');
  dispatcher.broadcast('selectMenu - disable');
  dispatcher.broadcast('graphicsLayer - disable');
}

export function popupEventEnd(){
  dispatcher.broadcast('zoomControls - enable');
  dispatcher.broadcast('selectMenu - enable');
  dispatcher.broadcast('graphicsLayer - enable');
}

export async function zoom(type){
  await dispatcher.asyncBroadcast('mapMoveAnimator - zoom', type);
}

export function panStart(){
  dispatcher.broadcast('panController - panStartRequest');
}

export function panEnd(){
  dispatcher.broadcast('panController - panEndRequest');
}

export function pan(deltaPx){
  dispatcher.broadcast('panController - panRequest', deltaPx);
}
