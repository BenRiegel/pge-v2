//imports ----------------------------------------------------------------------

import View from './view/View.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PopupReport(popupModel, popupViewState){

  //private code block ---------------------------------------------------------

  var view = new View(popupViewState);
  var controller = {
    view: new ViewController(view, popupModel),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,
    set onContract(cb){
      view.subcomponents.contractButton.onClick = cb;
    },
    set onClose(cb){
      view.subcomponents.closeButton.onClick = cb;
    },
    fadeInAndShow: function(){
      return controller.view.show();
    },
    hide: function(){
      controller.view.hide();
    },
    fadeOutAndHide: function(){
      return controller.view.fadeOutAndHide();
    },
  }

}
