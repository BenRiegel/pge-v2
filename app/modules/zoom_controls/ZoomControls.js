//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import View from './view/View.js';
import EmitterController from './controller/EmitterController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var view = new View();
  var emitter = new Emitter();
  var controller = {
    view: new ViewController(view),
    emitter: new EmitterController(emitter, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    controller.view.enableButtons();
  };

  this.disable = function(){
    controller.view.disableButtons();
  };

}
