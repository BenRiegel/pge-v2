//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import { valueToLevel } from '../../../lib/WebMapScale.js';
import BasemapTile from '../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerState(mapViewpoint, mapMovement){

  //create layerState var ------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    tiles: [],
    imageTileLevel: undefined,
    numBasemapTiles: undefined,
    tileSize: undefined,
    centerScreenCoords: undefined,
  });

  var calculateImageTileLevel = function(){
    var imageTileLevel = valueToLevel(mapMovement.baselineScale);
    imageTileLevel = Math.round(imageTileLevel);
    state.setQuick('imageTileLevel', imageTileLevel);
    var numBasemapTiles = Math.pow(2, imageTileLevel);
    state.setQuick('numBasemapTiles', numBasemapTiles);
  }

  var calculateTileSize = function(){
    var tileSize = mapMovement.zoomScaleFactor * 256;
    state.set('tileSize', tileSize);
  }

  var updateTiles = function(){
    for (var tile of state.tiles){
      tile.update();
    }
  }

  var updateCenterTile = function(){
    var centerTileX = Math.floor(mapViewpoint.x / (state.tileSize * mapViewpoint.scale));
    var mapX = centerTileX * state.tileSize;
    var centerTileY = Math.floor(mapViewpoint.y / (state.tileSize * mapViewpoint.scale));
    var mapY = centerTileY * state.tileSize;
    var mapCoords = {x:mapX,y:mapY};
    var screenCoords = mapViewpoint.calculateScreenCoords(mapCoords);
    state.setQuick('centerScreenCoords', screenCoords);
  }

  calculateImageTileLevel();
  calculateTileSize();
  updateCenterTile();


  //create tile states ---------------------------------------------------------

  var numTilesWidth = 9;
  var numTilesHeight = 5;

  var tiles = [];
  for (var i = 0; i < numTilesWidth; i++){
    for (var j = 0; j < numTilesHeight; j++){
      var xPos = i - Math.floor(numTilesWidth / 2);
      var yPos = j - Math.floor(numTilesHeight / 2);
      var tile = new BasemapTile(xPos, yPos, mapViewpoint, mapMovement, state);
      tiles.push(tile);
    }
    state.set('tiles', tiles);
  }

  mapViewpoint.addListener('basemapLayer', () => {
    updateCenterTile();
    updateTiles();
  });

  mapMovement.addListener('baselineScale', 'basemapLayer', 'imageTileLayer', calculateImageTileLevel);
  mapMovement.addListener('zoomScaleFactor', 'basemapLayer', 'tileSize', calculateTileSize);
  mapMovement.addListener('type', 'basemapLayer', 'reset', () => {
    updateCenterTile();
    updateTiles();
  });


  //public api -----------------------------------------------------------------

  return state;

}
