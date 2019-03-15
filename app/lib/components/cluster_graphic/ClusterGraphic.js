//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';
import StateController from './controllers/StateController.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphic(props, layerState, webMapState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View(props);
  var controller = {
    view: new ViewController(view, props, state, webMapState),
    state: new StateController(state, props, layerState),
  };

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.worldCoords = props.worldCoords;

  this.removeListeners = controller.state.removeListener;

}
