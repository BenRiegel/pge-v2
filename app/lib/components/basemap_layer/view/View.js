//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import TileContainerNode from './nodes/TileContainerNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    tileContainer1: new TileContainerNode(),
    tileContainer2: new TileContainerNode(),
  };

  this.subcomponents = {
    tileSet1: [],
    tileSet2: [],
  };

}
