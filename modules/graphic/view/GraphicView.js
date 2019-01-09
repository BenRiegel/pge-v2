//imports ----------------------------------------------------------------------

import GraphicNode from './nodes/GraphicNode';


//exports ----------------------------------------------------------------------

export default function GraphicView(props, state){

  //create nodes ---------------------------------------------------------------

  var graphic = new GraphicNode(props.id, state);

  //public api -----------------------------------------------------------------

  this.rootNode = graphic.node;

  this.hasRendered = new Promise(async resolve => {
    graphic.render();
    resolve();
  });

}
