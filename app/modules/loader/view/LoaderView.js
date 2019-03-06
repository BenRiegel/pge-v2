//imports ----------------------------------------------------------------------

import AnimationContainerNode from './nodes/AnimationContainerNode.js';
import LoaderSpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    animationContainer: new AnimationContainerNode(),
    animation: new LoaderSpinnerNode(),
  }

  this.rootNode = this.nodes.animationContainer.node;

}
