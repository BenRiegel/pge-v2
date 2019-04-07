//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
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

  this.loadOption = function(key, option){
    controller.loadOption(key, option);
  };

  this.setSelectedOption = function(selectedOptionKey){
    controller.setSelectedOption(selectedOptionKey);
  };

  this.close = function(){
    controller.forceClose();
  };

}
