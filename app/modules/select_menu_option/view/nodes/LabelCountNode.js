//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/option_label_count.scss';


//exports ----------------------------------------------------------------------

export default function LabelCountNode(count){

  //create dom element ---------------------------------------------------------

  var labelCount = new DomElement('div', 'tag-count');
  labelCount.innerHTML = count;

  //public api -----------------------------------------------------------------

  return labelCount;

}
