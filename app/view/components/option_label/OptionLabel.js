//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function OptionLabel(props){

  //private code block ---------------------------------------------------------

  var view = new View(props);
  var controller = new Controller(props, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.showIndent = function(){
    controller.showIndent();
  };

  this.hideIndent = function(){
    controller.hideIndent();
  };

}
