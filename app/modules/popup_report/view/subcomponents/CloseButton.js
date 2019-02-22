//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';
import '../stylesheets/popup_report_close_button.scss';
import '../stylesheets/popup_report_close_button_icon.scss';


//exports ----------------------------------------------------------------------

export default function CloseButton(popupState){

  //create subcomponent --------------------------------------------------------

  var closeButton = new PopupButton('summary-close-button', 'fa-times', popupState);

  closeButton.addClickListener( () => {
    popupState.onCloseAction();
  });

  //public api -----------------------------------------------------------------

  this.rootNode = closeButton.rootNode;

}
