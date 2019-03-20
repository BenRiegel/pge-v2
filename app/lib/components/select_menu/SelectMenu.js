//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from '../../utils/Emitter.js';
import Model from './model/Model.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var model = new Model();
  var view = new View();
  var controller = new Controller(model, emitter, view);


  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.setOptions = function(optionPropsList){
    controller.view.setOptions(optionPropsList);
  };

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  };

  this.close = function(){
    model.set('isOpen', false);
  };

  this.setSelectedOption = function(newOptionKey){
    model.set('selectedOptionKey', newOptionKey);
  };
}
