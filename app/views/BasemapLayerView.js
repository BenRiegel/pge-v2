//imports ----------------------------------------------------------------------

import { panStartRequest, panEndRequest, panRequest } from '../services/Dispatcher.js';
import BasemapLayer from '../modules/basemap_layer/BasemapLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import { mapDimensions } from '../views/RootView.js';


//module code block ------------------------------------------------------------

//var basemapLayer = new BasemapLayer(mapDimensions, mapViewpoint);

dispatcher.addListener('load', async () => {
  //basemapLayer.addListener('userPanStartRequest', panStartRequest);
  //basemapLayer.addListener('userPanEndRequest', panEndRequest);
  //basemapLayer.addListener('userPanRequest', panRequest);
  //await basemapLayer.hasRendered;
//  rootNode.appendChild(basemapLayer.rootNode);
});

dispatcher.addListener('basemapLayer - enable', () => {
  //basemapLayer.enable();
});

dispatcher.addListener('basemapLayer - disable', () => {
  //basemapLayer.disable();
});

//exports ----------------------------------------------------------------------

//export default basemapLayer;
