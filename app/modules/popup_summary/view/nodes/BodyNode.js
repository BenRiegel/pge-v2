//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function BodyNode(){

  //create dom element ---------------------------------------------------------

  var body = new DomElement('div', 'popup-body');

  //public api -----------------------------------------------------------------

  this.node = body.node;

}
