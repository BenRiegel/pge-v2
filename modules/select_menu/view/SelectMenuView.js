//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(state);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(resolve => {
    container.render();
    resolve();
  });

  this.addOptionNode = function(optionRootNode){
    container.node.appendChild(optionRootNode);
  }

}
