//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileState(xPosition, yPosition, mapViewpoint, layerState){

  //create state var -----------------------------------------------------------

  //need something new for this
  var state = new ComponentState({
    screenCoords: {x:undefined, y:undefined},
    tileIndices: {x:undefined, y:undefined},
    yValidIndex: undefined,
    size: undefined,           //get rid of this
    isVisible: undefined,
  });

  //define state change reactions ----------------------------------------------

  var calculateIsVisible = function(){
    return mapViewpoint.tileIsVisible(state.screenCoords, layerState.tileSize);
  }

  var calculateYValidIndex = function(indices){
    return (indices.y >= 0 && indices.y < layerState.numBasemapTiles);
  }

  var calculateScreenCoords = function(){
    var x = layerState.centerScreenCoords.x + (layerState.tileSize * xPosition);
    var y = layerState.centerScreenCoords.y + (layerState.tileSize * yPosition);
    return {x, y};
  }

  var calculateIndices = function(){
    //move this out
    var centerTileX = Math.floor(mapViewpoint.x / (layerState.tileSize * mapViewpoint.scale));
    var xIndex = (centerTileX + xPosition) % layerState.numBasemapTiles;
    if (xIndex < 0){
      xIndex += layerState.numBasemapTiles;
    }
    var centerTileY = Math.floor(mapViewpoint.y / (layerState.tileSize * mapViewpoint.scale));
    var yIndex = centerTileY + yPosition;
    return {x:xIndex, y:yIndex};
  }

  state.update = function(){
    var screenCoords = calculateScreenCoords();
    var indices = calculateIndices();
    var size = layerState.tileSize;
    var yValidIndex = calculateYValidIndex(indices);
    var isVisible = mapViewpoint.tileIsVisible(screenCoords, size);

    state.setQuick('isVisible', isVisible);
    state.setQuick('yValidIndex', yValidIndex)
    state.setQuick('screenCoords', screenCoords);
    state.setQuick('tileIndices', indices);
    state.setQuick('size', size);   //get rid of this eventually
  }

  //init code ------------------------------------------------------------------

  state.update();


  //public api -----------------------------------------------------------------

  return state;

}
