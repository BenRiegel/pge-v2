//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function IconNode( {iconClassName} ){

  //create dom element ---------------------------------------------------------

  var icon = new DomElement('span', `fa ${iconClassName}`);

  //public api -----------------------------------------------------------------

  this.node = icon.node;

}
