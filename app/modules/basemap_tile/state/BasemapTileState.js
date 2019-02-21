//imports ----------------------------------------------------------------------

import ComponentState from '../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileState(xPosition, yPosition, mapViewpoint, layerState){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    screenCoords: undefined,
    tileIndices: {x:undefined, y:undefined},
    yIndexIsValid: undefined,
  });

  //define state change reactions ----------------------------------------------

  var updateScreenCoords = function(){
    var screenX = layerState.centerTileScreenCoords.x + (layerState.tileSize * xPosition);
    var screenY = layerState.centerTileScreenCoords.y + (layerState.tileSize * yPosition);
    state.set('screenCoords', {x:screenX, y:screenY});
  }

  var updateIndices = async function(){
    var xIndex = (layerState.centerTileIndices.x + xPosition) % layerState.numBasemapTiles;
    if (xIndex < 0){
      xIndex += layerState.numBasemapTiles;
    }
    var yIndex = layerState.centerTileIndices.y + yPosition;
    var tileIndices = {x:xIndex, y:yIndex};
    var yIndexIsValid = (yIndex >= 0 && yIndex < layerState.numBasemapTiles);
    state.set('yIndexIsValid', yIndexIsValid);
    if (layerState.isWaiting){
      await state.setTileIndices(tileIndices);
    } else {
      state.setTileIndices(tileIndices);
    }
  }

  //load state change reactions ------------------------------------------------

  layerState.addListener('centerTileScreenCoords', updateScreenCoords);

  layerState.addListener('centerTileIndices', async () => {
    if (layerState.isWaiting){
      await updateIndices();
    } else {
      updateIndices();
    }
  });

  //init state -----------------------------------------------------------------

  updateScreenCoords();
  updateIndices();

  //public api -----------------------------------------------------------------

  return state;

}
