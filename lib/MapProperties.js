//imports ----------------------------------------------------------------------

import { getPixelSize } from '../../lib/WebMapScale.js';
import { getPixelNum } from '../../lib/WebMercator.js';
import { mapDimensions } from '../views/RootView.js';


//exports ----------------------------------------------------------------------

export function calculateViewpointProps(x, y, z){
  var pixelSize = getPixelSize(mapViewpoint.zCoord.value);
  var pixelNum = getPixelNum(pixelSize);
  var leftMapCoord = mapViewpoint.xCoord.value / pixelSize - mapDimensions.width * 0.5;   //change this in case of negative?
  var topMapCoord = mapViewpoint.yCoord.value / pixelSize - mapDimensions.height * 0.5;
  return { pixelSize, pixelNum, leftMapCoord, topMapCoord };
}





/*var calculateMapProperties = function(){
  var pixelSize = getPixelSize(state.z.value);
  var pixelNum = getPixelNum(pixelSize);
  var leftMapCoord = state.x.value / pixelSize - width * 0.5;   //change this in case of negative?
  var topMapCoord = state.y.value / pixelSize - height * 0.5;
  var imageTileLevel = Math.floor(state.z.value);
  var scaleFactor = Math.pow(2, state.z.value - imageTileLevel);
  var tileSize = scaleFactor * 256;
  var numBasemapTiles = Math.round(pixelNum / tileSize);
  var leftTileCoord = Math.floor(leftMapCoord / tileSize);
  var topTileCoord = Math.floor(topMapCoord / tileSize);
  //var expansionDistance = (tileSize - 256) / 2;              //don't need?
  var leftMapOffset = leftMapCoord % tileSize;
  leftMapOffset += (leftMapOffset < 0) ? tileSize : 0;
  var topMapOffset = topMapCoord % tileSize;
  topMapOffset += (topMapOffset < 0) ? tileSize : 0;
  return {
    pixelSize,
    pixelNum,
    leftMapCoord,
    topMapCoord,
    imageTileLevel,
  //  scaleFactor,
    leftTileCoord,
    topTileCoord,
    numBasemapTiles,
    //expansionDistance,
    tileSize,
    leftMapOffset,
    topMapOffset,
  };
}*/
/*add: function(deltaX, deltaY, deltaZ){
  var newX = x.value + deltaX;
  var newY = y.value + deltaY;
  var newZ = z.value + deltaZ;
  this.set(newX, newY, newZ);
},*/
