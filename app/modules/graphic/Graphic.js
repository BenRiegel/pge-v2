//imports ----------------------------------------------------------------------

import GraphicState from './state/GraphicState.js';
import GraphicView from './view/GraphicView.js';


//exports ----------------------------------------------------------------------

export default function Graphic(props, layerState){

  //private code block ---------------------------------------------------------

  var state = new GraphicState(props, layerState);
  var view = new GraphicView(props, state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
