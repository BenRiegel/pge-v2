//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';
import StateController from './controllers/StateController.js';
import EmitterController from './controllers/EmitterController.js';

//exports ----------------------------------------------------------------------

export default function BasemapLayer(webMapState){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var state = new State;
  var view = new View(state, webMapState);
  var controller = {
    emitter: new EmitterController(emitter),
    state: new StateController(state, webMapState),
    view: new ViewController(view, state, webMapState),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = view.hasRendered;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    //state.set('isEnabled', true);
  };

  this.disable = function(){
    //state.set('isEnabled', false);
  };

  this.updateOnZoomEnd = async function(){
    controller.state.updateProps();
    await controller.view.updateOnZoomEnd();
  };

  this.updateOnPanEnd = function(){
    controller.view.updateOnPanEnd();
  }

  this.updateOnZoomHome = function(){
    controller.state.updateProps();
    controller.view.updateOnZoomHomeEnd();
  }

  this.fadeDown = function(){
    return controller.view.fadeDown();
  }

  this.fadeUp = function(){
    return controller.view.fadeUp();
  }

}
