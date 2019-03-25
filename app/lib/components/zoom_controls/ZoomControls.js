//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    dispatcher.enable();
  };

  this.disable = function(){
    dispatcher.disable();
  };

}
