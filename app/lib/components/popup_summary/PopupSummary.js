//imports ----------------------------------------------------------------------

import Dispatcher from './services/Dispatcher.js';
import Emitter from './services/Emitter.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function PopupSummary(popupModel){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, view, popupModel);

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

  this.do = function(actionName, ...args){
    return dispatcher.doAction(actionName, ...args);
  };

}
