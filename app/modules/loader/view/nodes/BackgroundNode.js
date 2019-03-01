//imports ----------------------------------------------------------------------

import OpacityProp from '../../../../lib/props/OpacityProp2.js';
import VisibilityProp from '../../../../lib/props/VisibilityProp.js';
import AnimationProp from '../../../../lib/props/AnimationProp.js';
import '../stylesheets/loader_background.scss';


//exports ----------------------------------------------------------------------

export default function BackgroundNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'loader-background';

  //define props ---------------------------------------------------------------

  var props = {
    visibility: new VisibilityProp(node),
    opacity: new OpacityProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
