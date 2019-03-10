//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import View from './view/View.js';
import EmitterController from './controller/EmitterController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButton(buttonId, rootClassName, iconClassName){

  //private code block ---------------------------------------------------------

  var view = new View(rootClassName, iconClassName);
  var emitter = new Emitter();
  var controller = {
    view: new ViewController(view),
    emitter: new EmitterController(emitter, view, buttonId),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.addListener(eventName, listener);
  };

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  }

}
