//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ZoomControls from '../../zoom_controls/ZoomControls.js';
import Popup from '../../popup/Popup.js';
import GraphicsLayer from '../../graphics_layer/GraphicsLayer.js';
import SelectMenu from '../../select_menu/SelectMenu.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewView(state){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  };

  this.subcomponents = {
    zoomControls: new ZoomControls(),
    popup: new Popup(),
    graphicsLayer: new GraphicsLayer(state),
    selectMenu: new SelectMenu(),
  };

  this.hasRendered = undefined;

}
