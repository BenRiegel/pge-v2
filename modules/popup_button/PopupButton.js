//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import PopupButtonView from './view/PopupButtonView.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(buttonProps){

  //private code block ---------------------------------------------------------

  var eventsEmitter = new Emitter();

  var view = new PopupButtonView(buttonProps, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;


}
