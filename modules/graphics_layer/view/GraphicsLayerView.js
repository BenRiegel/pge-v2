//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import GraphicNode from './nodes/GraphicNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(layerState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(layerState, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addNewGraphicNode = function(id, graphicState){
    var graphicNode = new GraphicNode(id, graphicState);
    graphicNode.render();
    container.node.appendChild(graphicNode.node);
  }

  this.hasRendered = new Promise(async resolve => {
    container.render();
    resolve();
  });

}
