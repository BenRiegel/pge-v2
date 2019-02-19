//imports ----------------------------------------------------------------------

import GraphicsLayer from '../modules/graphics_layer/GraphicsLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import { pointSelect, clusterSelect } from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { createGraphics } from '../services/Graphics.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapMovement from '../stores/MapMovement.js';


//module code block ------------------------------------------------------------

var graphicsLayer = new GraphicsLayer(mapViewpoint, mapMovement, createGraphics);

dispatcher.addListener('load', async () => {
  await graphicsLayer.updateGraphics(INIT_SELECTED_TAG);
  graphicsLayer.addClickListener('point', pointSelect);
  graphicsLayer.addClickListener('cluster', clusterSelect);
  rootNode.appendChild(graphicsLayer.rootNode);
});

dispatcher.addListener('graphicsLayer - filterGraphics', async selectedTag => {
  await graphicsLayer.updateGraphics(selectedTag);
  graphicsLayer.addLocations(selectedProjects);
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
