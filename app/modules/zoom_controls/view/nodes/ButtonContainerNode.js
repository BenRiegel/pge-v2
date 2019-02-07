//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ButtonContainerNode(){

  //create dom element ---------------------------------------------------------

  var buttonContainer = new DomElement('div', 'zoom-button-container');

  //public api -----------------------------------------------------------------

  this.node = buttonContainer.node;

}
