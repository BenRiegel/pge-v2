//imports ----------------------------------------------------------------------

import VisibilityProp from '../../../../lib/props/VisibilityProp.js';
import ClassNameProp from '../../../../lib/props/ClassNameProp.js';
import OpacityProp from '../../../../lib/props/OpacityProp2.js';
import ContainerHeightProp from '../props/ContainerHeightProp.js';
import '../stylesheets/option_container.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(key){

  const OPTION_EXPANDED_HEIGHT = '25px'

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'option';
  node.dataset.key = key;

  var props = {
    visibility: new VisibilityProp(node),
    borderRadiusStyle: new ClassNameProp(node),
    opacity: new OpacityProp(node),
    height: new ContainerHeightProp(node, OPTION_EXPANDED_HEIGHT),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
