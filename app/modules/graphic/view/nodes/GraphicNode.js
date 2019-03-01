//imports ----------------------------------------------------------------------

import ClassNameProp from '../../../../lib/props/ClassNameProp.js';
import ScaleProp from '../../../../lib/props/ScaleProp.js';
import { BASELINE_DIAMETER_PX } from '../../config/GraphicConfig.js';
import '../stylesheets/graphic.scss';


//exports ----------------------------------------------------------------------

export default function GraphicNode(props){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'graphic';
  node.style.width = `${BASELINE_DIAMETER_PX}px`;
  node.style.height = `${BASELINE_DIAMETER_PX}px`;

  var props = {
    isHighlighted: new ClassNameProp(node),
    scale: new ScaleProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
