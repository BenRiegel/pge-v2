//imports ----------------------------------------------------------------------

import View from './view/View.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var view = new View();
  var controller = {
    view: new ViewController(view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.show = function(){
    controller.view.show();
  };

  this.hide = function(){
    controller.view.hide();
  };

  this.fadeAndHide = function(){
    return controller.view.fadeAndHide();
  };

}
