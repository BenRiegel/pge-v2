//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import { getTargetNode } from '../../../../lib/Utils.js';
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
      var worldCoords = {
        x: Number(graphicContainer.dataset.x),
        y: Number(graphicContainer.dataset.y),
      };
      var broadcastArgs = [graphicType, graphicId, worldCoords];
      return broadcastArgs;
    } else {
      return null;
    }
  }
}
