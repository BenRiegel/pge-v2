//imports ----------------------------------------------------------------------

import BackgroundNode from './nodes/BackgroundNode.js';
import SpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(){

  //create nodes ---------------------------------------------------------------

  var nodes = {
    background: new BackgroundNode(),
    spinner: new SpinnerNode(),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = nodes.background.node;

  this.nodes = nodes;

  this.isFadingOut = false;

}
