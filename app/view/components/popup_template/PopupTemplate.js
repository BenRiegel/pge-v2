//imports ----------------------------------------------------------------------

import View from './view/View.js';
import Controller from './controller/Controller.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplate(){

  //private code block ---------------------------------------------------------

  var view = new View();
  var controller = new Controller(view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.load = function(content){
    return controller.load(content);
  };

}
