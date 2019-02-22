//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/zoom_controls_button_container.scss';

//exports ----------------------------------------------------------------------

export default function ButtonContainerNode(){

  //create dom element ---------------------------------------------------------

  var buttonContainer = new DomElement('div', 'zoom-button-container');

  //public api -----------------------------------------------------------------

  return buttonContainer;

}
