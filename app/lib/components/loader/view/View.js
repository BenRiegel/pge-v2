//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import SpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    animation: new SpinnerNode(),
  };

}
