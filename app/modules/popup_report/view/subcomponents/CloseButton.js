//imports ----------------------------------------------------------------------

import PopupButton from '../../../popup_button/PopupButton.js';
import '../stylesheets/close_button.scss';


//exports ----------------------------------------------------------------------

export default function CloseButton(){

  return new PopupButton('report-close-button', 'fa-times', 'close');

}
