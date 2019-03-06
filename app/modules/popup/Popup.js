//imports ----------------------------------------------------------------------

import PopupState from './state/PopupState.js';
import PopupView from './view/PopupView.js';
import StateController from './controller/StateController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function Popup(mapDimensions){

  //private code block ---------------------------------------------------------

  var state = new PopupState();
  var view = new PopupView(mapDimensions);
  var controller = {
    state: new StateController(state, view),
    view: new ViewController(state, view, mapDimensions),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = function(eventName, listener){
    view.emitter.public.addListener(eventName, listener);
  }

  this.enable = function(){
    view.props.inputEnabled = true;
  };

  this.disable = function(){
    view.props.inputEnabled = false;
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
