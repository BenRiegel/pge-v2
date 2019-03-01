//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(){

  //create nodes ---------------------------------------------------------------

  var nodes = {
    container: new ContainerNode(),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = nodes.container.node;

  this.nodes = nodes;

}
