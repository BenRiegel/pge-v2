//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';
import HomeButtonNode from './nodes/HomeButtonNode.js';
import InButtonNode from './nodes/InButtonNode.js';
import OutButtonNode from './nodes/OutButtonNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    homeButtonContainer: new ButtonContainerNode(),
    inOutButtonContainer: new ButtonContainerNode(),
    homeButton: new HomeButtonNode('zoomHome'),
    inButton: new InButtonNode('zoomIn'),
    outButton: new OutButtonNode('zoomOut'),
  };

}
