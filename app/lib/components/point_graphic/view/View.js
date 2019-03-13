//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import LocationNode from './nodes/LocationNode.js';
import LabelNode from './nodes/LabelNode.js';


//exports ----------------------------------------------------------------------

export default function PointGraphicView(props){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(props),
    location: new LocationNode(),
    label: new LabelNode(),
  }

}
