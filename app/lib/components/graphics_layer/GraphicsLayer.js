//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(webMapModel, webMapDimensions){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var dispatcher = new Dispatcher();
  var model = new Model();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view, webMapModel, webMapDimensions);

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

  this.updateOnPan = function(viewpoint){
    dispatcher.newAction('pan', viewpoint);
  }

  this.updateOnZoom = function(viewpoint, zoomFactor){
    dispatcher.newAction('zoom', viewpoint, zoomFactor);
  }




  this.fadeDown = function(){
    return dispatcher.newAsyncAction('fadeDown');
  }

  this.fadeUp = function(){
    return dispatcher.newAsyncAction('fadeUp');
  }

}
