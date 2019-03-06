//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import ContainerNode from './nodes/ContainerNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';
import ButtonNode from './nodes/ButtonNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(){

  //public api -----------------------------------------------------------------

  this.props = {
    inputEnabled: true,
  }

  this.nodes = {
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

  this.rootNode = this.nodes.container.node;

  this.emitter = {
    public: new Emitter(),
  };

}
