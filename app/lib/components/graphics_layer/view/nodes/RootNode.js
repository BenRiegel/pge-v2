//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import { getTargetNode } from '../../../../utils/Utils.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(){
    super('div', 'graphics-layer');
  }
  clickHandler(evt){
    var graphicContainer = getTargetNode(evt.target, 'graphic');
    if (graphicContainer){
      var graphicType = graphicContainer.dataset.type;
      var graphicId = Number(graphicContainer.dataset.id);
      var broadcastArgs = [graphicType, graphicId];
      return broadcastArgs;
    } else {
      return null;
    }
  }
}
