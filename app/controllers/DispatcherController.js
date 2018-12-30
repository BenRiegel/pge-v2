//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { getProjectData } from '../stores/ProjectsModel.js';


//exports ----------------------------------------------------------------------

export async function initApp(){
  await dispatcher.broadcast('all', 'startLoading');
  await dispatcher.broadcast('all', 'load');
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  await dispatcher.broadcast('all', 'finishLoading');
};

export async function pointSelect(id){
  var id = Math.floor(Math.random() * 5);
  var projectData = await getProjectData(id);
  dispatcher.broadcast('popup', 'loadProjectData', projectData);
  //dispatcher.broadcast('')  //move viewpoint
  dispatcher.broadcast('popup', 'open');
};

export async function clusterSelect(worldCoords){
}

export function setNewSelectedTag(selectedTag){
  //console.log(selectedTag);
  //dispatcher.broadcast('graphicsLayer', 'filterGraphics', selectedTag);
}
