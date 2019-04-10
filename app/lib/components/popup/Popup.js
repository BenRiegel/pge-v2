//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function Popup(template){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View(template);
  var controller = new Controller(emitter, model, view);

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

  this.open = function(content){
    return controller.open(content);
  };

  this.close = function(){
    controller.close();
  };

  this.getDimensions = function(){
    return controller.getDimensions();
  };

  this.hideArrow = function(){
    controller.hideArrow();
  };

  this.showArrow = function(){
    controller.showArrow();
  };

  this.getContent = function(){  //don't really like this
    return model.content;
  };

}
