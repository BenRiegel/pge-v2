//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(webMapModel){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view, webMapModel);

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

  this.setLocations = function(graphicPropsList){
    dispatcher.newAction('setLocations', graphicPropsList);
  }

  this.filterLocations = function(selectedTag){
    dispatcher.newAction('selectLocations', selectedTag);
  }

  this.selectGraphic = function(graphicId){
    dispatcher.newAction('selectGraphic', graphicId);
  }

  this.unselectGraphic = function(graphicId){
    dispatcher.newAction('selectGraphic', null);
  }

  this.updateGraphics = function(){
    dispatcher.newAction('updateGraphics');
  }

  this.updateOnPan = function(viewpoint, zoomFactor){
    dispatcher.newAction('pan', viewpoint, zoomFactor);
  }



  this.fadeDown = function(){
    //return controller.view.fadeDown();
  }

  this.fadeUp = function(){
    //return controller.view.fadeUp();
  }

}
