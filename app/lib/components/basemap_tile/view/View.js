//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  };

}
