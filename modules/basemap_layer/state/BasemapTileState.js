//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileState(xPosition, yPosition, mapViewpoint, mapProperties){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    worldCoords: {x:undefined, y:undefined},
    screenCoords: {x:undefined, y:undefined},
    tileIndices: {x:undefined, y:undefined},
    yValidIndex: undefined,
    size: undefined,
    isVisible: undefined,
  });

  state.setOnChange('tileIndices', function(){
    this.requestUpdateQuick('self', 'yValidIndex');
    this.requestUpdateQuick('node', 'src');
  });

  state.setOnChange('screenCoords', function(){
    this.requestUpdateQuick('self', 'isVisible');
    this.requestUpdateQuick('node', 'screenCoords');
  });

  //define state change reactions ----------------------------------------------

  var calculateIsVisible = function(){
    var xIsVisible = (state.screenCoords.x >= -mapProperties.tileSize) && (state.screenCoords.x < mapProperties.halfMapWidthPx * 2);
    var yIsVisible = (state.screenCoords.y >= -mapProperties.tileSize) && (state.screenCoords.y < mapProperties.halfMapHeightPx * 2);
    state.setQuick('isVisible', xIsVisible && yIsVisible);
  }

  var calculateYValidIndex = function(){
    var yValidIndex = state.tileIndices.y >= 0 && state.tileIndices.y < mapProperties.numBasemapTiles;
    state.setQuick('yValidIndex', yValidIndex);
  }

  var updateSize = function(){
    state.setQuick('size', mapProperties.tileSize);
  }

  var calculateWorldCoords = function(){
    var worldCoordX = mapProperties.centerTileWorldX + xPosition * mapProperties.tileSizeWorld;
    var worldCoordY = mapProperties.centerTileWorldY + yPosition * mapProperties.tileSizeWorld;
    state.setQuick('worldCoords', {x:worldCoordX, y:worldCoordY});
  }

  var calculateScreenCoords = function(){
    var deltaX = state.worldCoords.x - mapViewpoint.coords.x;
    var deltaY = state.worldCoords.y - mapViewpoint.coords.y;
    var screenCoordX = deltaX / mapProperties.pixelSize + mapProperties.halfMapWidthPx;
    var screenCoordY = deltaY / mapProperties.pixelSize + mapProperties.halfMapHeightPx;
    state.setQuick('screenCoords', {x:screenCoordX, y:screenCoordY});
  }

  var calculateIndices = function(){
    var xIndex = Math.round(state.worldCoords.x / mapProperties.tileSizeWorld) % mapProperties.numBasemapTiles;
    if (xIndex < 0){
      xIndex += mapProperties.numBasemapTiles;
    }
    var yIndex = Math.round(state.worldCoords.y / mapProperties.tileSizeWorld) % mapProperties.numBasemapTiles;
    state.setQuick('tileIndices', {x:xIndex, y:yIndex});
  }

  var panScreenCoords = function( {deltaXPx, deltaYPx} ){
    var screenCoordX = state.screenCoords.x - deltaXPx;
    if (screenCoordX < mapProperties.minScreenCoordX){
      screenCoordX += mapProperties.numTilesWidth * mapProperties.tileSize;
      var worldCoordX = state.worldCoords.x + mapProperties.numTilesWidth * mapProperties.tileSizeWorld;
      state.setQuick('worldCoords', {x:worldCoordY, y:state.worldCoords.y});
      calculateIndices();
    }
    if (screenCoordX > mapProperties.maxScreenCoordX){
      screenCoordX -= mapProperties.numTilesWidth * mapProperties.tileSize;
      var worldCoordX = state.worldCoords.x - mapProperties.numTilesWidth * mapProperties.tileSizeWorld;
      state.setQuick('worldCoords', {x:worldCoordY, y:state.worldCoords.y});
      calculateIndices();
    }
    var screenCoordY = state.screenCoords.y - deltaYPx;
    if (screenCoordY < mapProperties.minScreenCoordY){
      screenCoordY += mapProperties.numTilesHeight * mapProperties.tileSize;
      var worldCoordY = state.worldCoords.y + mapProperties.numTilesHeight * mapProperties.tileSizeWorld;
      state.setQuick('worldCoords', {x:state.worldCoord.x, y:worldCoordY});
      calculateIndices();
    }
    if (screenCoordY > mapProperties.maxScreenCoordY){
      screenCoordY -= mapProperties.numTilesHeight * mapProperties.tileSize;
      var worldCoordY = state.worldCoords.y - mapProperties.numTilesHeight * mapProperties.tileSizeWorld;
      state.setQuick('worldCoords', {x:state.worldCoord.x, y:worldCoordY});
      calculateIndices();
    }
    state.setQuick('screenCoords', {x:screenCoordX, y:screenCoordY});
  }

  //load state change reactions ------------------------------------------------

  state.addListener('screenCoords', 'self', 'isVisible', calculateIsVisible);
  state.addListener('tileIndices', 'self', 'yValidIndex', calculateYValidIndex);

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
    updateSize();
  });

  //init code ------------------------------------------------------------------

  calculateWorldCoords();
  calculateScreenCoords();
  calculateIndices();
  calculateYValidIndex();
  updateSize();

  //public api -----------------------------------------------------------------

  return state;

}
