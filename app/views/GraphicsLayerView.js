//imports ----------------------------------------------------------------------

import GraphicsLayer from '../modules/graphics_layer/GraphicsLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import { pointSelect, clusterSelect } from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { projectsReceived } from '../services/Projects.js';
import viewpointState from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import '../assets/stylesheets/graphics_layer.scss';
import '../assets/stylesheets/graphic.scss';


//module code block ------------------------------------------------------------

var graphicsLayer = new GraphicsLayer(viewpointState, mapProperties);

dispatcher.addListener('load', async () => {
  var projects = await projectsReceived;
  graphicsLayer.addGraphics(projects);
  graphicsLayer.filterGraphics(INIT_SELECTED_TAG);
  graphicsLayer.addClickListener('point', pointSelect);
  graphicsLayer.addClickListener('cluster', clusterSelect);
  rootNode.appendChild(graphicsLayer.rootNode);
});

dispatcher.addListener('graphicsLayer - filterGraphics', selectedTag => {
  graphicsLayer.filterGraphics(selectedTag);
});

dispatcher.addListener('graphicsLayer - enable', () => {
  graphicsLayer.enable();
});

dispatcher.addListener('graphicsLayer - disable', () => {
  graphicsLayer.disable();
});

dispatcher.addListener('graphicsLayer - highlightCluster', id => {
  graphicsLayer.highlightCluster(id);
});

dispatcher.addListener('graphicsLayer - unhighlightCluster', () => {
  graphicsLayer.unhighlightCluster();
});

//exports ----------------------------------------------------------------------

export default graphicsLayer;
