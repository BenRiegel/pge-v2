//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function PopupButtonView(buttonProps){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(buttonProps);
  var icon = new IconNode(buttonProps.iconClassName);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(icon.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(resolve => {
    container.render();
    resolve();
  });

}
