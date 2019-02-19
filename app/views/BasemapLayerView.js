//imports ----------------------------------------------------------------------

import { panStart, panEnd, pan } from '../services/Dispatcher.js';
import BasemapLayer from '../modules/basemap_layer/BasemapLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapMovement from '../stores/MapMovement.js';


//module code block ------------------------------------------------------------

var basemapLayer = new BasemapLayer(mapViewpoint, mapMovement);

dispatcher.addListener('load', async () => {
  basemapLayer.addListener('userPanStartRequest', panStart);
  basemapLayer.addListener('userPanEndRequest', panEnd);
  basemapLayer.addListener('userPanRequest', pan);
  await basemapLayer.hasRendered;
  rootNode.appendChild(basemapLayer.rootNode);
});


//exports ----------------------------------------------------------------------

export default basemapLayer;
