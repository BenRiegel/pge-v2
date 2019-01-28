//imports ----------------------------------------------------------------------

import BasemapLayer from '../../modules/basemap_layer/BasemapLayer.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import '../assets/stylesheets/basemap_layer.scss';
import '../assets/stylesheets/basemap_tile.scss';


//module code block ------------------------------------------------------------

var basemapLayer = new BasemapLayer(mapViewpoint, mapProperties);

dispatcher.addListener('basemapLayer', 'load', async () => {
  await basemapLayer.hasRendered;
  rootNode.appendChild(basemapLayer.rootNode);
});


//exports ----------------------------------------------------------------------

export default basemapLayer;
