//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function WebMap(config){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View(config, model);
  var controller = new Controller(config, emitter, model, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = controller.configure;

  this.graphicsLayer = view.subcomponents.graphicsLayer;

  this.popup = view.subcomponents.popup;

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
