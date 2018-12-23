//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'report-window');

  //public api -----------------------------------------------------------------

  this.node = container.node;
  this.show = container.show;
  this.hide = container.hide;
  
}
