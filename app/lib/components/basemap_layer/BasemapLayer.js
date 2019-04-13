//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayer(webMapModel, webMapDimensions){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model;
  var view = new View();
  var controller = new Controller(emitter, model, view, webMapModel, webMapDimensions)

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    controller.enable();
  };

  this.disable = function(){
    controller.disable();
  };

  this.configure = function(){
    return controller.configure();
  }

  this.updateOnPan = function(cumulativePan){
    controller.updateOnPan(cumulativePan);
  };

  this.updateOnPanEnd = function(){
    controller.updateOnPanEnd();
  };

  this.updateOnZoom = function(cumulativePan, scaleFactor){
    controller.updateOnZoom(cumulativePan, scaleFactor);
  };

  this.updateOnZoomEnd = function(){
    return controller.updateOnZoomEnd();
  };

  this.updateOnZoomHome = function(){
    return controller.updateOnZoomHome();
  };

  this.fadeDown = function(){
    return controller.fadeDown();
  };

  this.fadeUp = function(){
    return controller.fadeUp();
  };

}
