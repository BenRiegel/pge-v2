//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function PopupButtonView(containerClassName, iconClassName, popupState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(containerClassName, popupState, eventsEmitter);
  var icon = new IconNode(iconClassName);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(icon.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(resolve => {
    container.render();
    resolve();
  });

}