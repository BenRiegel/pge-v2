//imports ----------------------------------------------------------------------

import VisibilityProp from '../../../../lib/props/VisibilityProp.js';
import '../stylesheets/loader_spinner.scss';


//exports ----------------------------------------------------------------------

export default function SpinnerNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'spinner';

  //define props ---------------------------------------------------------------

  var props = {
    visibility: new VisibilityProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
