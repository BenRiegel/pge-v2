//imports ----------------------------------------------------------------------

import TileNode from './nodes/BasemapTileNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileView(layerState, state, mapMovement){

  //create nodes ---------------------------------------------------------------

  var tile = new TileNode(layerState, state, mapMovement);

  //public api -----------------------------------------------------------------

  this.rootNode = tile.node;

  this.hasRendered = new Promise(async resolve => {
    tile.render();
    resolve();
  });

}
