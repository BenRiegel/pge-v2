//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import GraphicNode from './nodes/GraphicNode';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(state, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.newGraphicNode = function(graphicInfo, graphicState){
    var graphicNode = new GraphicNode(graphicInfo.id, graphicState);
    graphicNode.render();
    container.node.appendChild(graphicNode.node);
  }

  this.hasRendered = new Promise(async resolve => {
    container.render();
    resolve();
  });

}
