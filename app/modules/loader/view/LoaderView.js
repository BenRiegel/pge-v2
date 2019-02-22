//imports ----------------------------------------------------------------------

import BackgroundNode from './nodes/BackgroundNode.js';
import SpinnerNode from './nodes/SpinnerNode.js';


//exports ----------------------------------------------------------------------

export default function LoaderView(state){

  //create renderingProps ---------------------------------------------------------

  var renderingProps = {
    isAnimating: false,
  }

  //create nodes ---------------------------------------------------------------

  var background = new BackgroundNode(state, renderingProps);
  var spinner = new SpinnerNode(state);

  //configure dom --------------------------------------------------------------

  background.appendChildNode(spinner.node);

  //public api -----------------------------------------------------------------

  this.rootNode = background.node;

  this.setRenderingProp = function(propName, value){
    renderingProps[propName] = value;
  };

}
