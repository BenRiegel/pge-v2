//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from './services/Emitter.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var view = new View();
  var controller = new Controller(emitter, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    controller.enable();
  };

  this.disable = function(){
    controller.disable();
  };

}
