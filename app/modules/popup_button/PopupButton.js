//imports ----------------------------------------------------------------------

import PopupButtonView from './view/PopupButtonView.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(containerClassName, iconClassName, buttonId){

  //private code block ---------------------------------------------------------

  var view = new PopupButtonView(containerClassName, iconClassName, buttonId);
  var controller = {
    view: new ViewController(view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = function(eventName, cb){
    view.emitter.public.addListener(eventName, cb);
  }

}
