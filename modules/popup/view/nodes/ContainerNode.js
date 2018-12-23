//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import { getDimensions } from '../../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'popup-container');

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.getDimensions = function(){
    return getDimensions(this.node);
  };
}
