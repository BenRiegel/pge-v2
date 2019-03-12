//imports ----------------------------------------------------------------------

import view from '../view/View.js';
import { waitAtLeast } from '../lib/utils/Utils.js';
import { tagsReceived } from '../services/Tags.js';
import { projectsReceived } from '../services/Projects.js';


//module code block ------------------------------------------------------------

var { nodes, components } = view;
var { root } = nodes;
var { loader, selectMenu, webMap } = components;

const INIT_SELECTED_TAG = "All Sites";

var initSelectMenu = async function(){
  var tags = await tagsReceived;
  for (var tag of tags){
    selectMenu.addNewOption({
      key: tag.name,
      name: tag.name,
      count: tag.count,
      labelIsIndented: tag.labelIsIndented
    });
  }
  selectMenu.setSelectedOption(INIT_SELECTED_TAG);
}

var filterGraphics = function(tagName){
  webMap.filterGraphics(location => {
    return location.attributes.tags.includes(tagName);
  });
}

var projectToLocation = function(project){
  var attributes = Object.assign({}, project);
  delete attributes.id;
  delete attributes.geoCoords;
  return {
    id: project.id,
    geoCoords: project.geoCoords,
    attributes,
  }
}

var initWebMap = async function(){
  await webMap.hasRendered;
  var projects = await projectsReceived;
  var locations = [];
  for (var project of projects){
    var location = projectToLocation(project);
    locations.push(location);
  }
  webMap.addGraphics(locations);
  filterGraphics(INIT_SELECTED_TAG);
};

var startLoading = function(){
  loader.show();
  root.appendChild(loader.rootNode);
};

var load = async function(){
  var selectMenuReady = initSelectMenu();
  var webMapReady = initWebMap();
  await Promise.all( [selectMenuReady, webMapReady] );
  root.appendChild(selectMenu.rootNode);
  root.appendChild(webMap.rootNode);
}

var finishLoading = async function(){
  await loader.fadeAndHide();
}

//event reactions --------------------------------------------------------------

selectMenu.addEventListener('newSelectedOption', filterGraphics);


//exports ----------------------------------------------------------------------

export async function initApp(){
  startLoading();
  await waitAtLeast(1000, load);
  await finishLoading();
}


/*zoomControls.addEventListener('zoomInButtonClicked', () => {
  zoom('zoomIn');
});
zoomControls.addEventListener('zoomOutButtonClicked', () => {
  zoom('zoomOut');
});
zoomControls.addEventListener('zoomHomeButtonClicked', () => {
  zoom('zoomHome');
});
selectMenu.addEventListener('newSelectedOption', setNewSelectedTag);
selectMenu.addEventListener('eventStart', selectMenuEventStart);
selectMenu.addEventListener('eventEnd', selectMenuEventEnd);*/

/*dispatcher.addListener('popup - loadProjectData', projectData => {
  popup.setContent(projectData);
});

dispatcher.addListener('popup - open', projectData => {
  popup.open(projectData);
});

dispatcher.addListener('popup - close', () => {
  popup.close();
});

dispatcher.addListener('popup - enable', () => {
  popup.enable();
});

dispatcher.addListener('popup - disable', () => {
  popup.disable();
});*/

/*dispatcher.addListener('load', () => {
  popup.addEventListener('eventStart', popupEventStart);
  popup.addEventListener('eventEnd', popupEventEnd);
  popup.addEventListener('isClosed', popupClose);
  rootNode.appendChild(popup.rootNode);
});*/
