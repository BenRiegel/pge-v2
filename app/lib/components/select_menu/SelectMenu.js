//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import Emitter from './services/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
  var controller = new Controller(dispatcher, emitter, model, view);

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

  this.loadOptions = function(optionsData, selectedOptionKey){
    dispatcher.newAction('loadOptions', {optionsData, selectedOptionKey} );
  };

  this.close = function(){
    dispatcher.newAction('close');
  };

}
