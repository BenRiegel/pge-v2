//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ZoomControls from '../../zoom_controls/ZoomControls.js';
import Popup from '../../popup/Popup.js';
import GraphicsLayer from '../../graphics_layer/GraphicsLayer.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(props, state){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  };

  this.subcomponents = {
    zoomControls: new ZoomControls(),
    popup: new Popup(),
    graphicsLayer: new GraphicsLayer(props.mapDimensions, state),
  };

  this.hasRendered = undefined;

}
