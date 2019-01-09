//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import PopupButtonView from './view/PopupButtonView.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(containerClassName, iconClassName, popupState){

  //private code block ---------------------------------------------------------

  var eventsEmitter = new Emitter();
  var view = new PopupButtonView(containerClassName, iconClassName, popupState, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(cb){
    eventsEmitter.addListener('click', cb);
  }

}
