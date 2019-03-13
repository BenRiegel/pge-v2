//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import StateController from './controllers/StateController.js';
import EmitterController from './controllers/EmitterController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View();
  var emitter = new Emitter();
  var controller = {
    state: new StateController(state, view),
    view: new ViewController(view, state),
    emitter: new EmitterController(emitter, state),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.setOptions = function(optionPropsList){
    controller.view.setOptions(optionPropsList);
  };

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  };

  this.close = function(){
    state.set('isOpen', false);
  };

  this.setSelectedOption = function(newOptionKey){
    state.set('selectedOptionKey', newOptionKey);
  };
}
