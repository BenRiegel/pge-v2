//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
//import GraphicNode from './nodes/GraphicNode';


//module code block ------------------------------------------------------------

var calculateTilesNeeded = function(dimensionPx){
  var baseTilesNeeded = Math.trunc(dimensionPx / 256);
  var remainder = dimensionPx % 256;
  return (remainder > 1) ? baseTilesNeeded + 2 : baseTilesNeeded + 1;
};


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();

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
