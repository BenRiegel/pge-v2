//imports ----------------------------------------------------------------------

import View from './view/View.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(containerClassName, iconClassName, popupViewState){

  //private code block ---------------------------------------------------------

  var view = new View(containerClassName, iconClassName);
  var controller = {
    view: new ViewController(view, popupViewState),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.nodes.root.node,
    set onClick(cb){
      view.nodes.root.onClick = cb;
    }
  }


}
