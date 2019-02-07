//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function LabelCountNode(count){

  //create dom element ---------------------------------------------------------

  var labelCount = new DomElement('div', 'tag-count');
  labelCount.innerHTML = count;

  //public api -----------------------------------------------------------------

  this.node = labelCount.node;

}
