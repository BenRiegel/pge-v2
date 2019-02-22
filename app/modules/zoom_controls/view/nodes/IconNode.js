//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/zoom_button_icon.scss';


//exports ----------------------------------------------------------------------

export default function IconNode(className){

  //create dom element ---------------------------------------------------------

  var icon = new DomElement('span', `fa ${className}`);

  //public api -----------------------------------------------------------------

  return icon;

}
