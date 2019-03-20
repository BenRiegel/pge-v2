//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';
import '../stylesheets/contract_button.scss';


//exports ----------------------------------------------------------------------

export default function ContractButton(popupViewState){

  return new PopupButton('report-contract-button', 'fa-compress', popupViewState);

}
