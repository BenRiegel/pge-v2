//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function PopupButtonView(buttonProps, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(buttonProps.containerClassName, eventsEmitter);
  var icon = new IconNode(buttonProps.iconClassName);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(icon.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
