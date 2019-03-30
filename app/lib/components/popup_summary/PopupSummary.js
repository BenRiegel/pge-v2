//imports ----------------------------------------------------------------------

import Dispatcher from '../../utils/Dispatcher.js';
import Model from './model/Model.js';
import Emitter from './services/Emitter.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function PopupSummary(popupModel){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view, popupModel);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.getDimensions = function(){
    return controller.view.getDimensions();
  }

  this.update = function(actionName, ...args){
    dispatcher.newAction(actionName, ...args);
  };

  this.updateAsync = function(actionName, ...args){
    return dispatcher.newAsyncAction(actionName, ...args);
  };

  this.loadContent = async function(){
    dispatcher.newAction('prepLoading');
    await dispatcher.newAsyncAction('loading');
    dispatcher.newAction('finishLoading');
  }

}
