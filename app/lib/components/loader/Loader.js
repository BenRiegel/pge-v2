//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var view = new View();
  var controller = new Controller(view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.activate = function(){
    controller.show();
  };

  this.terminate = function(fadeOut = false){
    return controller.hide(fadeOut);
  };

}
