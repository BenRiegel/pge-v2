//imports ----------------------------------------------------------------------

import VisibilityProp from '../../../../lib/props/VisibilityProp.js';
import IconCharProp from '../props/IconCharProp.js';
import '../stylesheets/option_icon.scss';


//exports ----------------------------------------------------------------------

export default function IconNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'icon fa';

  //define props ---------------------------------------------------------------

  var props = {
    visibility: new VisibilityProp(node),
    char: new IconCharProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
