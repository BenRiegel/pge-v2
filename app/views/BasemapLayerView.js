//imports ----------------------------------------------------------------------

import BasemapLayer from '../../modules/basemap_layer/BasemapLayer.js';
import dispatcher from '../services/Dispatcher.js';
//import { pointSelect } from '../controllers/DispatcherController.js';
//import { INIT_SELECTED_TAG } from '../config/Config.js';
//import { projectsReceived } from '../stores/ProjectsModel.js';
//import viewpointState from '../stores/MapViewpoint.js';
//import mapProperties from '../stores/MapProperties.js';
import '../assets/stylesheets/basemap_layer.scss';
import '../assets/stylesheets/basemap_tile.scss';


//module code block ------------------------------------------------------------

var basemapLayer = new BasemapLayer();
  //viewpointState, mapProperties);

/*dispatcher.addListener('graphicsLayer', 'load', async () => {
  var projects = await projectsReceived;
  graphicsLayer.addGraphics(projects);
  graphicsLayer.filterGraphics(INIT_SELECTED_TAG);
  graphicsLayer.addListener('pointSelected', pointSelect);
});

dispatcher.addListener('graphicsLayer', 'filterGraphics', selectedTag => {
  graphicsLayer.filterGraphics(selectedTag);
});

dispatcher.addListener('graphicsLayer', 'enable', () => {
  graphicsLayer.enable();
});

dispatcher.addListener('graphicsLayer', 'disable', () => {
  graphicsLayer.disable();
});*/

//exports ----------------------------------------------------------------------

export default basemapLayer;
