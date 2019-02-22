//imports ----------------------------------------------------------------------

import BackgroundNode from './nodes/BackgroundNode.js';
import SpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(state){

  //create renderProps ---------------------------------------------------------

  var renderProps = {
    isAnimating: false,
  }

  //create nodes ---------------------------------------------------------------

  var background = new BackgroundNode(state, renderProps);
  var spinner = new SpinnerNode(state);

  //configure dom --------------------------------------------------------------

  background.appendChildNode(spinner.node);

  //public api -----------------------------------------------------------------

  this.rootNode = background.node;

  this.setRenderProp = function(propName, value){
    renderProps[propName] = value;
  };

}
