//imports ----------------------------------------------------------------------

import PopupState from './state/PopupState.js';
import PopupEmitter from './services/PopupEmitter.js';
import PopupView from './view/PopupView.js';


//exports ----------------------------------------------------------------------

export default function Popup(){

  //private code block ---------------------------------------------------------

  var state = new PopupState();
  var eventsEmitter = new PopupEmitter(state);
  var view = new PopupView(state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;

  this.enable = function(){
    state.set('userDisabled', false);
  };

  this.disable = function(){
    state.set('userDisabled', true);
  };

  this.setContent = function(projectData){
    state.set('projectData', projectData);
  };

  this.open = async function(){
    await state.set('isOpen', true);
  };

  this.close = async function(){
    state.set('isExpanded', false);
    state.set('isOpen', false);
  };

}
