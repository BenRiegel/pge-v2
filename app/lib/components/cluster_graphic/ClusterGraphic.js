//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';
import StateController from './controllers/StateController.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphic(props, mapDimensions, webMapState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View(props);
  var controller = {
    view: new ViewController(view, props, state, mapDimensions, webMapState),
    state: new StateController(state, props, webMapState),
  };

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.worldCoords = props.worldCoords;

  this.removeListeners = controller.state.removeListener;

  //get rid of these eventually
  this.reset = controller.view.reset;

  this.updateOnPan = controller.view.updateOnPan;

  this.updateOnZoom = controller.view.updateOnZoom;

}
