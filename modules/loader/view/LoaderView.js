//imports ----------------------------------------------------------------------

import BackgroundNode from './nodes/BackgroundNode.js';
import SpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(state){

  //create nodes ---------------------------------------------------------------

  var background = new BackgroundNode(state);
  var spinner = new SpinnerNode(state);

  //configure dom --------------------------------------------------------------

  background.node.appendChild(spinner.node);

  //public api -----------------------------------------------------------------

  this.rootNode = background.node;
  
  this.render = function(){
    background.render();
    spinner.render();
  }

}
