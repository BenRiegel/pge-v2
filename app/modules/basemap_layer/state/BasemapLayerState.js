//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import BasemapTileState from './BasemapTileState.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerState(mapViewpoint, mapProperties){

  //create layerState var ------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    tiles: [],
  });

  //create tile states ---------------------------------------------------------

  var tiles = [];
  for (var i = 0; i < mapProperties.numTilesWidth; i++){
    for (var j = 0; j < mapProperties.numTilesHeight; j++){
      var xPos = i - Math.floor(mapProperties.numTilesWidth / 2);
      var yPos = j - Math.floor(mapProperties.numTilesHeight / 2);
      var tile = new BasemapTileState(xPos, yPos, mapViewpoint, mapProperties);
      tiles.push(tile);
    }
    state.set('tiles', tiles);
  }

  //public api -----------------------------------------------------------------

  return state;

}
