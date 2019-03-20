//imports ----------------------------------------------------------------------

import Emitter from './services/Emitter.js';
import Controller from './controller/Controller.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButton(buttonId, rootClassName, iconClassName){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter();
  var view = new View(rootClassName, iconClassName);
  var controller = new Controller(emitter, view, buttonId);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, listener){
    emitter.public.addListener(eventName, listener);
  };

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  }

}
