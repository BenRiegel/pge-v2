//imports ----------------------------------------------------------------------

import GraphicsLayer from '../../modules/graphics_layer/GraphicsLayer.js';
import dispatcher from '../services/Dispatcher.js';
import { pointSelect } from '../controllers/DispatcherController.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { projectsReceived } from '../stores/ProjectsModel.js';
import viewpointState from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import '../assets/stylesheets/graphics_layer.scss';
import '../assets/stylesheets/graphic.scss';


//module code block ------------------------------------------------------------

var graphicsLayer = new GraphicsLayer(viewpointState, mapProperties);

dispatcher.addListener('graphicsLayer', 'load', async () => {
  var projects = await projectsReceived;
  graphicsLayer.addGraphics(projects);
  graphicsLayer.filterGraphics(INIT_SELECTED_TAG);
  graphicsLayer.addListener('pointSelected', pointSelect);
});

dispatcher.addListener('graphicsLayer', 'filterGraphics', selectedTag => {
  graphicsLayer.filterGraphics(selectedTag);
});


//exports ----------------------------------------------------------------------

export default graphicsLayer;
