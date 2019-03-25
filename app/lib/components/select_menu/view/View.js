//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  }

  this.subcomponents = [];

}
