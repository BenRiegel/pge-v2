//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';


//exports ----------------------------------------------------------------------

export default function ContractButton(popupState){

  //create subcomponent --------------------------------------------------------

  var contractButton = new PopupButton({
    containerClassName: 'report-contract-button',
    iconClassName: 'fa-compress',
    onButtonClick: popupState.onContractAction.bind(popupState),
    popupState,
  });

  //public api -----------------------------------------------------------------

  this.rootNode = contractButton.rootNode;

}
