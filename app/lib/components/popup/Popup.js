//imports ----------------------------------------------------------------------

import Dispatcher from './services/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function Popup(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var model = new Model();
  var view = new View(model);
  var controller = new Controller(dispatcher, model, emitter, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    dispatcher.doAction('enable');
  };

  this.disable = function(){
    dispatcher.doAction('disable');
  };

  this.setContent = function(content){
    dispatcher.doAction('setContent', content);
  };

  this.open = function(){
    return dispatcher.doAction('open');
  };

  this.close = function(){
    dispatcher.doAction('forceClose');
  };

}
