//imports ----------------------------------------------------------------------

import PopupButtonView from './view/PopupButtonView.js';


//exports ----------------------------------------------------------------------

export default function PopupButton(buttonProps){

  //private code block ---------------------------------------------------------

  var view = new PopupButtonView(buttonProps);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
