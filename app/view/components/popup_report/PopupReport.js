//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import View from './view/View.js';
import Model from './model/Model.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function PopupReport(popupModel){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
  var controller = new Controller(emitter, model, view, popupModel);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.showAt = function(location){
    return controller.showAt(location);
  };

  this.expand = function(){
    return controller.expand();
  };

  this.contract = function(dimensions){
    return controller.contract(dimensions);
  };

  this.load = function(content){
    return controller.load(content);
  };

  this.close = function(){
    controller.close();
  };

}
