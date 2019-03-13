//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import LocationNode from './nodes/LocationNode.js';
import LabelNode from './nodes/LabelNode.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphicView(props){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(props),
    location: new LocationNode(props),
    label: new LabelNode(props.numLocations),
  }

}
