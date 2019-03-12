//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import View from './view/View.js';
import ViewController from './controller/ViewController.js';
import EmitterController from './controller/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(containerClassName, iconClassName, buttonId){

  //private code block ---------------------------------------------------------

  var view = new View(containerClassName, iconClassName, buttonId);
  var emitter = new Emitter();
  var controller = {
    view: new ViewController(view),
    emitter: new EmitterController(emitter, buttonId, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addListener = function(eventName, cb){
    emitter.addListener(eventName, cb);
  }

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  }

}
