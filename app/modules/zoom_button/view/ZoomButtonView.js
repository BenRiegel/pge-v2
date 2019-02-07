//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode';


//exports ----------------------------------------------------------------------

export default function ZoomButtonView(containerClassName, iconClassName, controlsState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(containerClassName, controlsState, eventsEmitter);
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
