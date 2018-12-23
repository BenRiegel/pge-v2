//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode';


//exports ----------------------------------------------------------------------

export default function ZoomButtonView(controlsState, buttonState, buttonProps){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(controlsState, buttonState, buttonProps.containerClassName);
  var icon = new IconNode(buttonProps.iconClassName);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(icon.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.render = function(){
    container.render();
  }
}
