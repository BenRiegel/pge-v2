//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';
import ButtonNode from './nodes/ButtonNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(state, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();
  var homeButtonContainer = new ButtonContainerNode();
  var inOutButtonContainer = new ButtonContainerNode();
  var zoomHomeButton = new ButtonNode('zoom-home', 'zoomHome', state, eventsEmitter);
  var zoomHomeIcon = new IconNode('fa-home');
  var zoomInButton = new ButtonNode('zoom-in', 'zoomIn', state, eventsEmitter);
  var zoomInIcon = new IconNode('fa-plus');
  var zoomOutButton = new ButtonNode('zoom-out', 'zoomOut', state, eventsEmitter);
  var zoomOutIcon = new IconNode('fa-minus');

  //configure dom --------------------------------------------------------------

  container.node.appendChild(homeButtonContainer.node);
  container.node.appendChild(inOutButtonContainer.node);
  zoomHomeButton.node.appendChild(zoomHomeIcon.node);
  zoomInButton.node.appendChild(zoomInIcon.node);
  zoomOutButton.node.appendChild(zoomOutIcon.node);
  homeButtonContainer.node.appendChild(zoomHomeButton.node);
  inOutButtonContainer.node.appendChild(zoomInButton.node);
  inOutButtonContainer.node.appendChild(zoomOutButton.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
