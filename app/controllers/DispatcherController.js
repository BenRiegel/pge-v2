//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { getProjectData } from '../stores/ProjectsModel.js';
import { wait } from '../../lib/Utils.js';


//exports ----------------------------------------------------------------------

//selectMenu, zoomControls, popup, graphicsLayer, basemapLayer

export async function initApp(){
  await dispatcher.broadcast('all', 'startLoading');
  await dispatcher.broadcast('all', 'load');
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  await dispatcher.broadcast('all', 'finishLoading');
};

export async function pointSelect(id, worldCoords){
  dispatcher.broadcast('zoomControls', 'disable');
  dispatcher.broadcast('popup', 'disable');
  dispatcher.broadcast('popup', 'close');
  dispatcher.broadcast('selectMenu', 'disable');
  dispatcher.broadcast('selectMenu', 'close');
  await dispatcher.broadcast('mapMoveAnimator', 'panTo', worldCoords);
  await wait(200);
  var projectData = await getProjectData(id);
  dispatcher.broadcast('popup', 'loadProjectData', projectData);
  dispatcher.broadcast('popup', 'open');
  dispatcher.broadcast('popup', 'enable');
  dispatcher.broadcast('zoomControls', 'enable');
  dispatcher.broadcast('selectMenu', 'enable');
};

export async function clusterSelect(worldCoords){
  dispatcher.broadcast('zoomControls', 'disable');
  dispatcher.broadcast('popup', 'disable');
  dispatcher.broadcast('popup', 'close');
  dispatcher.broadcast('selectMenu', 'disable');
  dispatcher.broadcast('selectMenu', 'close');
  await dispatcher.broadcast('mapMoveAnimator', 'zoomTo', worldCoords);
  dispatcher.broadcast('popup', 'enable');
  dispatcher.broadcast('zoomControls', 'enable');
  dispatcher.broadcast('selectMenu', 'enable');
}

export async function zoomHome(){
  await dispatcher.broadcast('mapMoveAnimator', 'zoomHome');
}

export function selectMenuEventStart(){
  dispatcher.broadcast('zoomControls', 'disable');
  dispatcher.broadcast('popup', 'disable');
  dispatcher.broadcast('popup', 'close');
  dispatcher.broadcast('graphicsLayer', 'disable');
}

export function selectMenuEventEnd(){
  dispatcher.broadcast('zoomControls', 'enable');
  dispatcher.broadcast('popup', 'enable');
  dispatcher.broadcast('graphicsLayer', 'enable');
}

export function setNewSelectedTag(selectedTag){
  dispatcher.broadcast('popup', 'close');
  dispatcher.broadcast('graphicsLayer', 'filterGraphics', selectedTag);
}

export function popupEventStart(){
  dispatcher.broadcast('zoomControls', 'disable');
  dispatcher.broadcast('selectMenu', 'disable');
  dispatcher.broadcast('graphicsLayer', 'disable');
}

export function popupEventEnd(){
  dispatcher.broadcast('zoomControls', 'enable');
  dispatcher.broadcast('selectMenu', 'enable');
  dispatcher.broadcast('graphicsLayer', 'enable');
}

export function zoomStartRequest(dir){
  dispatcher.broadcast('zoomController', 'zoomStartRequest', dir);
}

export function zoomStopRequest(){
  dispatcher.broadcast('zoomController', 'zoomStopRequest')
}

export function zoomStart(){
  dispatcher.broadcast('graphicsLayer', 'disable');
  dispatcher.broadcast('popup', 'disable');
  dispatcher.broadcast('selectMenu', 'disable');
  dispatcher.broadcast('selectMenu', 'close');
}

export function zoomEnd(){
  dispatcher.broadcast('graphicsLayer', 'enable');
  dispatcher.broadcast('popup', 'enable');
  dispatcher.broadcast('selectMenu', 'enable');
}
