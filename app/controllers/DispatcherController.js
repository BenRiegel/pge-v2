//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { getProjectData } from '../stores/ProjectsModel.js';
import { wait } from '../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export async function initApp(){
  await dispatcher.broadcast('all', 'startLoading');
  await dispatcher.broadcast('all', 'load');
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  await dispatcher.broadcast('all', 'finishLoading');
};

export async function pointSelect(id, worldCoords){
  var projectData = await getProjectData(id);
  await dispatcher.broadcast('mapMoveAnimator', 'panTo', worldCoords);
  await wait(200);
  dispatcher.broadcast('popup', 'loadProjectData', projectData);
  dispatcher.broadcast('popup', 'open');
};

export async function clusterSelect(worldCoords){
}

export function setNewSelectedTag(selectedTag){
  dispatcher.broadcast('graphicsLayer', 'filterGraphics', selectedTag);
}

export function zoomStartRequest(dir){
  dispatcher.broadcast('zoomController', 'zoomStartRequest', dir);
}

export function zoomStopRequest(){
  dispatcher.broadcast('zoomController', 'zoomStopRequest')
}
