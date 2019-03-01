//imports ----------------------------------------------------------------------

import ComponentState from '../../lib/ComponentState4.js';
import GraphicView from './view/GraphicView.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function Graphic(props, mapViewpoint, layerState){

  //private code block ---------------------------------------------------------

  var state = new ComponentState({
    mapCoords: undefined,
  });
  var view = new GraphicView(props);
  var controller = {
    state: new StateController(props, mapViewpoint, layerState, state),
    view: new ViewController(props, layerState, state, view),
  };

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
