//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode';


//exports ----------------------------------------------------------------------

export default function ZoomButtonView(buttonProps, controlsState, emitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(buttonProps, controlsState, emitter);
  var icon = new IconNode(buttonProps);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(icon.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(resolve => {
    container.render();
    resolve();
  });

}
