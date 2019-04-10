//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplate(){

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

  this.load = function(content){
    return controller.load(content);
  };

}
