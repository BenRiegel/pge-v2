//imports ----------------------------------------------------------------------

import LoaderView from './view/LoaderView.js';
import LoaderViewController from './controller/LoaderViewController.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var view = new LoaderView();
  var controller = {
    view: new LoaderViewController(view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.activate = function(){
    controller.view.show();
  };

  this.terminate = function(){
    controller.view.hide();
  };

  this.terminateAndFade = function(){
    return controller.view.hideAndFade();
  };

}
