//imports ----------------------------------------------------------------------

import TileNode from './nodes/BasemapTileNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileView(layerState, state){

  //create nodes ---------------------------------------------------------------

  var tile = new TileNode(layerState, state);

  //public api -----------------------------------------------------------------

  this.rootNode = tile.node;

  this.hasRendered = new Promise(async resolve => {
    await tile.render();
    resolve();
  });

}
