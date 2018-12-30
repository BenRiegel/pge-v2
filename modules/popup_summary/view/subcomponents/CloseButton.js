//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';

//exports ----------------------------------------------------------------------

export default function CloseButton(popupState){

  //create subcomponent --------------------------------------------------------

  var closeButton = new PopupButton({
    containerClassName: 'summary-close-button',
    iconClassName: 'fa-times',
    onButtonClick: popupState.onCloseAction.bind(popupState),
    popupState,
  });

  //public api -----------------------------------------------------------------

  this.rootNode = closeButton.rootNode;

}
