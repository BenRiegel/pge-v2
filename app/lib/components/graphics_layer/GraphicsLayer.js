//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(webMapModel, webMapDimensions){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
  var controller = new Controller(emitter, model, view, webMapModel, webMapDimensions);

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

  this.addGraphics = function(graphics){
    controller.addGraphics(graphics);
  };

  this.removeAllGraphics = function(){
    controller.removeAllGraphics();
  };

  this.updateGraphics = function(){
    controller.updateGraphics();
  };

  this.selectGraphic = function(graphicId){
    controller.selectGraphic(graphicId);
  };

  this.unselectGraphic = function(){
    controller.unselectGraphic();
  };

  this.updateOnPan = function(viewpoint){
    controller.updateOnPan(viewpoint);
  };

  this.updateOnZoom = function(viewpoint, zoomFactor){
    controller.updateOnZoom(viewpoint, zoomFactor);
  };

  this.fadeDown = function(){
    return controller.fadeDown();
  };

  this.fadeUp = function(){
    return controller.fadeUp();
  };

}
