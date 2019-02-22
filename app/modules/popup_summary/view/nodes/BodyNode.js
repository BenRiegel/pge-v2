//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/body.scss';


//exports ----------------------------------------------------------------------

export default function BodyNode(){

  //create dom element ---------------------------------------------------------

  var body = new DomElement('div', 'popup-body');

  //public api -----------------------------------------------------------------

  return body;

}
