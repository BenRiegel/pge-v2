//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ZoomControls from '../../zoom_controls/ZoomControls.js';
import Popup from '../../popup/Popup.js';
import GraphicsLayer from '../../graphics_layer/GraphicsLayer.js';
import BasemapLayer from '../../basemap_layer/BasemapLayer.js';
//import SelectMenu from '../../select_menu/SelectMenu.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewView(config, model){

  //public api -----------------------------------------------------------------

  this.dimensions = {
    width: undefined,
    height: undefined,
  };

  this.nodes = {
    root: new RootNode(config.rootNodeId),
  };

  this.subcomponents = {
    zoomControls: new ZoomControls(),
    popup: new Popup(),
    graphicsLayer: new GraphicsLayer(model, this.dimensions),
    basemapLayer: new BasemapLayer(model, this.dimensions),
//    selectMenu: new SelectMenu(),
  };

}
