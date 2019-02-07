//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';


//exports ----------------------------------------------------------------------

export default function ContractButton(popupState){

  //create subcomponent --------------------------------------------------------

  var contractButton = new PopupButton('report-contract-button', 'fa-compress', popupState);

  contractButton.addClickListener( () => {
    popupState.onContractAction();
  });

  //public api -----------------------------------------------------------------

  this.rootNode = contractButton.rootNode;

}
