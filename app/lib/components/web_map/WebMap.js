//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function WebMap(props){

  //private code block ---------------------------------------------------------

  var state = new State(props);
  var view = new View(props, state);
  var controller = {
    view: new ViewController(view),
    state: new StateController(state, props),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = view.hasRendered;

  this.addGraphics = function(locations){
    controller.view.addGraphicsLocations(locations);
  };

  this.filterGraphics = function(filter){
    view.subcomponents.graphicsLayer.filterLocations(filter);
  }

}
