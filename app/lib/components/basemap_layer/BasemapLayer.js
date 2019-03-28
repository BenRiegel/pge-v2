//imports ----------------------------------------------------------------------

import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';

//exports ----------------------------------------------------------------------

export default function BasemapLayer(webMapModel){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var model = new Model;
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view, webMapModel)


  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = view.hasRendered;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    dispatcher.enable();
  };

  this.disable = function(){
    dispatcher.disable();
  };

  this.updateOnPan = function(cumulativePan, scaleFactor){
    dispatcher.newAction('pan', cumulativePan, scaleFactor);
  };

  this.updateOnZoomEnd = function(){
    return dispatcher.newAsyncAction('zoomEnd');
  };

  this.updateOnPanEnd = function(){
    return dispatcher.newAsyncAction('panEnd');
  }

  /*this.updateOnZoomHome = function(){
    controller.model.updateProps();
    controller.view.updateOnZoomHomeEnd();
  }

  this.fadeDown = function(){
    return controller.view.fadeDown();
  }

  this.fadeUp = function(){
    return controller.view.fadeUp();
  }*/

}
