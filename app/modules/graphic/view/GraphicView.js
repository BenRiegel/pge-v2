//imports ----------------------------------------------------------------------

import GraphicContainerNode from './nodes/GraphicContainerNode.js';
import GraphicNode from './nodes/GraphicNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsView(props){

  //create nodes ---------------------------------------------------------------

  var nodes = {
    graphicContainer: new GraphicContainerNode(props),
    graphic: new GraphicNode(props),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = nodes.graphicContainer.node;

  this.nodes = nodes;

}
