//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';
import ButtonNode from './nodes/ButtonNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(){

  //create nodes ---------------------------------------------------------------

  var nodes = {
    container: new ContainerNode(),
    homeButtonContainer: new ButtonContainerNode(),
    inOutButtonContainer: new ButtonContainerNode(),
    zoomHomeButton: new ButtonNode('zoom-home', 'zoomHome'),
    zoomHomeIcon: new IconNode('fa-home'),
    zoomInButton: new ButtonNode('zoom-in', 'zoomIn'),
    zoomInIcon: new IconNode('fa-plus'),
    zoomOutButton: new ButtonNode('zoom-out', 'zoomOut'),
    zoomOutIcon: new IconNode('fa-minus'),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = nodes.container.node;

  this.nodes = nodes;

}
