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

  this.addEventListener = function(eventName, listener){
    emitter.public.addListener(eventName, listener);
  };

  this.enable = function(){
    controller.view.enableButtons();
  };

  this.disable = function(){
    controller.view.disableButtons();
  };

}
