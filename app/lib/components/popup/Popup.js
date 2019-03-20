//imports ----------------------------------------------------------------------

import Model from './model/Model.js';
import View from './view/View.js';
import ViewController from './controller/ViewController.js';

//exports ----------------------------------------------------------------------

export default function Popup(){

  //private code block ---------------------------------------------------------

  var model = new Model();
  var view = new View(model);
  var controller = {
    view: new ViewController(view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setEventListener = function(eventName, listener){
    view.emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    view.state.set('userDisabled', false);
  };

  this.disable = function(){
    view.state.set('userDisabled', true);
  };

  this.setContent = function(content){
    model.set('content', content);
  };

  this.open = function(){
    return controller.view.open();
  };

  this.close = function(){
    controller.view.close();
  };

}
