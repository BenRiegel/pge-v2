//imports ----------------------------------------------------------------------

import ClassNameProp from '../../../../lib/props/ClassNameProp.js';
import '../stylesheets/option_icon_container.scss';


//exports ----------------------------------------------------------------------

export default function IconContainerNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'icon-container';

  //define props ---------------------------------------------------------------

  var props = {
    border: new ClassNameProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
