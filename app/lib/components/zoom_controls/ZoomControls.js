//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Emitter from '../../utils/Emitter2.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var emitter = new Emitter('zoomInRequest', 'zoomOutRequest', 'zoomHomeRequest');
  var view = new View();
  var controller = new Controller(emitter, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.setListener = function(eventName, listener){
    emitter.setListener(eventName, listener);
  };

  this.enable = function(){
    controller.enable();
  };

  this.disable = function(){
    controller.disable();
  };

}
