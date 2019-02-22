//imports ----------------------------------------------------------------------

import GraphicNode from './nodes/GraphicNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsView(props, state){

  //create nodes ---------------------------------------------------------------

  var graphic = new GraphicNode(props, state);

  //public api -----------------------------------------------------------------

  this.rootNode = graphic.node;

}
