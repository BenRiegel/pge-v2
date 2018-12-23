//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(state);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addOption = function(optionRootNode){
    container.node.appendChild(optionRootNode);
  }

  this.render = function(){
    container.render();
  }

}
