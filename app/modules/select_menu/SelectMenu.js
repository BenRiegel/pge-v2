//imports ----------------------------------------------------------------------

import Option from '../select_menu_option/SelectMenuOption.js';
import Emitter from '../../lib/Emitter.js';
import SelectMenuState from './state/SelectMenuState.js';
import SelectMenuView from './view/SelectMenuView.js';
import StateController from './controller/StateController.js';
import EmitterController from './controller/EmitterController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var state = new SelectMenuState();
  var eventsEmitter = new Emitter();
  var view = new SelectMenuView();
  var controller = {
    state: new StateController(state, view),
    emitter: new EmitterController(state, eventsEmitter),
    view: new ViewController(state, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = function(eventName, listener){
    eventsEmitter.addListener(eventName, listener);
  };

  this.addNewOption = function(optionProps){
    var option = new Option(optionProps, state);
    controller.view.addNewOption(option);
  };

  this.enable = function(){
    state.set('userDisabled', false);
  };

  this.disable = function(){
    state.set('userDisabled', true);
  };

  this.close = function(){
    state.set('isOpen', false);
  };

  this.setSelectedOption = function(newOptionKey){
    state.set('selectedOptionKey', newOptionKey);
  };
}
