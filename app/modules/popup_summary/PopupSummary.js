//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import StateController from './controller/StateController.js';
import ViewController from './controller/ViewController.js';
import EmitterController from './controller/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function PopupSummary(popupState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View();
  var emitter = new Emitter();
  var controller = {
    state: new StateController(state, popupState),
    view: new ViewController(view, state, popupState),
    emitter: new EmitterController(emitter, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    controller.view.enableDomEvents();
  };

  this.disable = function(){
    controller.view.disableDomEvents();
  };

  this.setContent = function(content){
    state.set('content', content);
  }

  this.open = function(){
    return state.set('isOpen', true);
  };

  this.close = function(){
    state.set('isExpanded', false);
    state.set('isOpen', false);
  };

}
