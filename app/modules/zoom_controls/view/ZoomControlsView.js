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

  container.appendChildNode(homeButtonContainer.node);
  container.appendChildNode(inOutButtonContainer.node);
  zoomHomeButton.appendChildNode(zoomHomeIcon.node);
  zoomInButton.appendChildNode(zoomInIcon.node);
  zoomOutButton.appendChildNode(zoomOutIcon.node);
  homeButtonContainer.appendChildNode(zoomHomeButton.node);
  inOutButtonContainer.appendChildNode(zoomInButton.node);
  inOutButtonContainer.appendChildNode(zoomOutButton.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
