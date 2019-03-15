//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import DispatcherController from './controllers/DispatcherController.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function WebMap(props){

  //private code block ---------------------------------------------------------

  var dispatcher = new Emitter();
  var state = new State(props);
  var view = new View(state);
  var controller = {
    dispatcher: new DispatcherController(dispatcher, view),
    state: new StateController(state, dispatcher, view),
    view: new ViewController(view, state, dispatcher),

  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = view.hasRendered;

  this.graphicsLayer = view.subcomponents.graphicsLayer;

}
