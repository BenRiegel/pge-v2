//imports ----------------------------------------------------------------------

import ObservedVar from '../../../lib/ObservedVar.js';
import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileState(xPosition, yPosition, mapViewpoint, mapProperties){

  //create state var -----------------------------------------------------------

  var state = {
    worldCoords: {x:undefined, y:undefined},
    screenCoords: {x:undefined, y:undefined},
    tileIndices: {x:undefined, y:undefined},
    size: undefined,
    get yValidIndex(){
      return (this.tileIndices.y >= 0 && this.tileIndices.y < mapProperties.numBasemapTiles);
    },
    get isVisible(){
      return this.yValidIndex;
      //var xVisible = (leftScreenCoord >= -mapProperties.tileSize && leftScreenCoord < mapProperties.
    }
  };

  state.onIndicesChange = null;
  state.onScreenCoordsChange = null;
  state.onSizeChange = null;

  //define state change reactions ----------------------------------------------

  var updateSize = function(){
    state.size = mapProperties.tileSize;
    if (state.onSizeChange){
      state.onSizeChange();
    }
  }

  var calculateWorldCoords = function(){
    state.worldCoords.x = mapProperties.centerTileWorldX + xPosition * mapProperties.tileSizeWorld;
    state.worldCoords.y = mapProperties.centerTileWorldY + yPosition * mapProperties.tileSizeWorld;
  }

  var calculateScreenCoords = function(){
    var deltaX = state.worldCoords.x - mapViewpoint.coords.x;
    var deltaY = state.worldCoords.y - mapViewpoint.coords.y;
    state.screenCoords.x = deltaX / mapProperties.pixelSize + mapProperties.halfMapWidthPx;
    state.screenCoords.y = deltaY / mapProperties.pixelSize + mapProperties.halfMapHeightPx;
    if (state.onScreenCoordsChange){
      state.onScreenCoordsChange();
    }
  }

  var calculateIndices = function(){
    state.tileIndices.x = Math.round(state.worldCoords.x / mapProperties.tileSizeWorld) % mapProperties.numBasemapTiles;
    if (state.tileIndices.x < 0){
      state.tileIndices.x += mapProperties.numBasemapTiles;
    }
    state.tileIndices.y = Math.round(state.worldCoords.y / mapProperties.tileSizeWorld) % mapProperties.numBasemapTiles;
    if (state.onIndicesChange){
      state.onIndicesChange();
    }
  }

  var panScreenCoords = function( {deltaXPx, deltaYPx} ){
    state.screenCoords.x -= deltaXPx;
    if (state.screenCoords.x < mapProperties.minScreenCoordX){
      state.screenCoords.x += mapProperties.numTilesWidth * mapProperties.tileSize;
      state.worldCoords.x += mapProperties.numTilesWidth * mapProperties.tileSizeWorld;
      calculateIndices();
    }
    if (state.screenCoords.x > mapProperties.maxScreenCoordX){
      state.screenCoords.x -= mapProperties.numTilesWidth * mapProperties.tileSize;
      state.worldCoords.x -= mapProperties.numTilesWidth * mapProperties.tileSizeWorld;
      calculateIndices();
    }
    state.screenCoords.y -= deltaYPx;
    if (state.onScreenCoordsChange){
      state.onScreenCoordsChange();
    }
    //add code here
  }

  //load state change reactions ------------------------------------------------

  mapViewpoint.addListener('basemapTile - updateOnPan', deltaPx => {
    panScreenCoords(deltaPx);
  });

  mapViewpoint.addListener('basemapTile - updateOnZoom', () => {
    calculateScreenCoords();
    updateSize();
  });

  mapViewpoint.addListener('basemapTile - reset', () => {
    calculateWorldCoords();
    calculateScreenCoords();
    calculateIndices();
  });

  //init code ------------------------------------------------------------------

  calculateWorldCoords();
  calculateScreenCoords();
  calculateIndices();

  //public api -----------------------------------------------------------------

  return state;

}
