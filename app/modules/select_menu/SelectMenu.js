//imports ----------------------------------------------------------------------

import SelectMenuState from './state/SelectMenuState.js';
import SelectMenuView from './view/SelectMenuView.js';
import StateController from './controller/StateController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var state = new SelectMenuState();
  var view = new SelectMenuView();
  var controller = {
    state: new StateController(state, view),
    view: new ViewController(state, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = function(eventName, listener){
    view.emitter.public.addListener(eventName, listener);
  };

  this.addNewOption = function(optionProps){
    controller.view.addNewOption(optionProps);
  };

  this.enable = function(){
    view.props.inputEnabled = true;
  };

  this.disable = function(){
    view.props.inputEnabled = false;
  };

  this.close = function(){
    state.set('isOpen', false);
  };

  this.setSelectedOption = function(newOptionKey){
    state.set('selectedOptionKey', newOptionKey);
  };
}
