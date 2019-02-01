//imports ----------------------------------------------------------------------

import mapViewpoint from './MapViewpoint.js';
import { getPixelSize, getPixelNum } from '../../lib/WebMapScale.js';
import { mapDimensions } from '../views/RootView.js';
import { calculateDeltaX } from '../../lib/WebMercator.js';


//module code block ------------------------------------------------------------

const BUFFER_SIZE = 2;

var calculateTilesNeeded = function(dimensionPx){
  var tilesNeeded = Math.trunc(dimensionPx*2 / 256);
  var remainder = dimensionPx % 256;
  return (remainder > 1) ? tilesNeeded + 2 : tilesNeeded + 1;
};

var { width, height } = mapDimensions;
var numTilesWidth = calculateTilesNeeded(width);
var numTilesHeight = calculateTilesNeeded(height);

var numTilesWidth = 15;
var numTilesHeight = 7;

var mapProperties = {
  halfMapHeightPx: mapDimensions.height * 0.5,
  halfMapWidthPx: mapDimensions.width * 0.5,
  numTilesWidth,
  numTilesHeight,
  pixelSize: undefined,
  pixelNum: undefined,
  imageTileLevel: undefined,
  tileSize: undefined,
  tileSizeWorld: undefined,
  numBasemapTiles: undefined,
  centerTileWorldX: undefined,
  centerTileWorldY: undefined,
  minScreenCoordX: undefined,
  maxScreenCoordX: undefined,
}

var calculateMinScreenCoords = function(){
  mapProperties.minScreenCoordX = mapDimensions.width * 0.5 - Math.ceil(numTilesWidth/2)*mapProperties.tileSize;
  mapProperties.minScreenCoordY = mapDimensions.height * 0.5 - Math.ceil(numTilesHeight/2)*mapProperties.tileSize;
}

var calculateMaxScreenCoords = function(){
  mapProperties.maxScreenCoordX = mapDimensions.width * 0.5 + Math.ceil(numTilesWidth/2)*mapProperties.tileSize;
  mapProperties.maxScreenCoordY = mapDimensions.height * 0.5 + Math.ceil(numTilesHeight/2)*mapProperties.tileSize;
}

var setImageTileLevel = function(){
  mapProperties.imageTileLevel = Math.round(mapViewpoint.coords.z);
}

var calculatePixelProperties = function(){
  mapProperties.pixelSize = getPixelSize(mapViewpoint.coords.z);
  mapProperties.pixelNum = getPixelNum(mapProperties.pixelSize);
}

var calculateTileProperties = function(){
  mapProperties.scaleFactor = Math.pow(2, mapViewpoint.coords.z - mapProperties.imageTileLevel);
  mapProperties.tileSize = mapProperties.scaleFactor * 256;
  mapProperties.tileSizeWorld = mapProperties.tileSize * mapProperties.pixelSize;
  mapProperties.numBasemapTiles = Math.round(mapProperties.pixelNum / mapProperties.tileSize);
}

var calculateCenterTileProperties = function(){
  var centerTileX = Math.floor(mapViewpoint.coords.x / mapProperties.tileSizeWorld);
  var centerTileY = Math.floor(mapViewpoint.coords.y / mapProperties.tileSizeWorld);
  mapProperties.centerTileWorldX = centerTileX * mapProperties.tileSizeWorld;
  mapProperties.centerTileWorldY = centerTileY * mapProperties.tileSizeWorld;
}

setImageTileLevel();
calculatePixelProperties();
calculateTileProperties();
calculateCenterTileProperties();
calculateMinScreenCoords();
calculateMaxScreenCoords();


mapViewpoint.addListener('mapProperties - updateOnZoom', () => {
  calculatePixelProperties();
  calculateTileProperties();
});

mapViewpoint.addListener('mapProperties - updateOnPan', () => {
  //calculateCenterTileProperties();
  //delete this?
});

mapViewpoint.addListener('mapProperties - startMovement', () => {
  setImageTileLevel();
  calculateTileProperties();
  calculateCenterTileProperties();
});

mapViewpoint.addListener('mapProperties - endMovement', () => {
  setImageTileLevel();
  calculateTileProperties();
  calculateCenterTileProperties();
});


//exports ----------------------------------------------------------------------

export default mapProperties;
