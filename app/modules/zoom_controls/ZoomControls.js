//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import ComponentState from '../../lib/ComponentState3.js';
import ZoomControlsView from './view/ZoomControlsView.js';
import ViewController from './controller/ViewController.js';
import EmitterController from './controller/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var state = new ComponentState({
    userDisabled: false,
  });
  var eventsEmitter = new Emitter();
  var view = new ZoomControlsView();
  var controller = {
    view: new ViewController(state, view),
    emitter: new EmitterController(state, eventsEmitter, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(buttonName, cb){
    eventsEmitter.addListener(buttonName, cb);
  };

  this.enable = function(){
    state.set('userDisabled', false);
  };

  this.disable = function(){
    state.set('userDisabled', true);
  };

}
