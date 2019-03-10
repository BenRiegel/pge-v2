//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  }

  this.subcomponents = [];

}
