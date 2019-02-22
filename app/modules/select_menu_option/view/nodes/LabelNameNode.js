//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/option_label_name.scss';


//exports ----------------------------------------------------------------------

export default function LabelNameNode(name){

  //create dom element ---------------------------------------------------------

  var labelName = new DomElement('div', 'tag-name');
  labelName.innerHTML = name;

  //public api -----------------------------------------------------------------

  return labelName;

}
