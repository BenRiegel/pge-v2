//imports ----------------------------------------------------------------------

import GraphicsLayer from '../../modules/graphics_layer/GraphicsLayer.js';
import dispatcher from '../services/Dispatcher.js';
import { pointSelect, clusterSelect } from '../controllers/DispatcherController.js';
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
  graphicsLayer.addListener('clusterSelected', clusterSelect);
});

dispatcher.addListener('graphicsLayer', 'filterGraphics', selectedTag => {
  graphicsLayer.filterGraphics(selectedTag);
});

dispatcher.addListener('graphicsLayer', 'enable', () => {
  graphicsLayer.enable();
});

dispatcher.addListener('graphicsLayer', 'disable', () => {
  graphicsLayer.disable();
});

dispatcher.addListener('graphicsLayer', 'highlightCluster', id => {
  graphicsLayer.highlightCluster(id);
});

dispatcher.addListener('graphicsLayer', 'unhighlightCluster', () => {
  graphicsLayer.unhighlightCluster();
});

dispatcher.addListener('graphicsLayer', 'clusterGraphics', () => {
  graphicsLayer.clusterGraphics();
});



//exports ----------------------------------------------------------------------

export default graphicsLayer;
