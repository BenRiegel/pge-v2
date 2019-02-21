//imports ----------------------------------------------------------------------

import BasemapTileState from './state/BasemapTileState.js';
import BasemapTileView from './view/BasemapTileView.js';


//exports ----------------------------------------------------------------------

export default function BasemapTile(xPos, yPos, mapViewpoint, layerState){

  //private code block ---------------------------------------------------------

  var state = new BasemapTileState(xPos, yPos, mapViewpoint, layerState);
  var view = new BasemapTileView(layerState, state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.hasRendered = view.hasRendered;

}
