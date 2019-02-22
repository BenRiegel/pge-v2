//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function IconNode(className){

  //create dom element ---------------------------------------------------------

  var icon = new DomElement('span', `fa ${className}`);

  //public api -----------------------------------------------------------------

  return icon;

}
