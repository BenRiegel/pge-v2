//imports ----------------------------------------------------------------------

import GraphicsLayer from '../modules/graphics_layer/GraphicsLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import { pointSelect, clusterSelect } from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { projectsReceived } from '../services/Projects.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import { mapDimensions } from '../views/RootView.js';
import { latLonToWebMercator } from '../lib/WebMercator.js';


//module code block ------------------------------------------------------------


//do something about all this
var locations;

var createLocations = function(projects){
  var locations = [];
  for (var project of projects){
    var newLocation = {
      id: project.id,
      tags: project.tags,
      worldCoords: latLonToWebMercator(project.geoCoords),
    }
    locations.push(newLocation);
  }
  return locations;
}

var getSelectedLocations = function(selectedTag){
  var mappedLocations = locations.filter( location => {
    return location.tags.includes(selectedTag);
  });
  return mappedLocations;
}


var graphicsLayer = new GraphicsLayer(mapDimensions, mapViewpoint);

dispatcher.addListener('load', async () => {
  var projects = await projectsReceived;
  locations = createLocations(projects);
  var selectedLocations = getSelectedLocations(INIT_SELECTED_TAG);
  //graphicsLayer.loadLocations(locations);
  graphicsLayer.setMappedLocations(selectedLocations);
  graphicsLayer.addEventListener('point', pointSelect);
  graphicsLayer.addEventListener('cluster', clusterSelect);
  rootNode.appendChild(graphicsLayer.rootNode);
});

dispatcher.addListener('graphicsLayer - filterGraphics', selectedTag => {
  var selectedLocations = getSelectedLocations(selectedTag);
  graphicsLayer.setMappedLocations(selectedLocations);
});

dispatcher.addListener('graphicsLayer - enable', () => {
  graphicsLayer.enable();
});

dispatcher.addListener('graphicsLayer - disable', () => {
  graphicsLayer.disable();
});

dispatcher.addListener('graphicsLayer - highlightGraphic', id => {
  graphicsLayer.highlightGraphic(id);
});

dispatcher.addListener('graphicsLayer - unhighlightGraphic', () => {
  graphicsLayer.highlightGraphic(null);
});

//exports ----------------------------------------------------------------------

export default graphicsLayer;
