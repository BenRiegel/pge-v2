//imports ----------------------------------------------------------------------

import { getPixelNum } from '../../lib/WebMercator.js';
import { getMinScale, getPixelSize } from '../../lib/WebMapScale.js';
import { ESRI_MAX_SCALE_LEVEL } from '../config/Config.js';
import { mapDimensions } from '../views/RootView.js';
import { XCoord, YCoord, ZCoord } from './MapViewpointCoords.js';


//module code block ------------------------------------------------------------

const MIN_SCALE_LEVEL = getMinScale(mapDimensions);

const HOME_Z = 2.25;

var listeners = [];

var requestUpdate = async function(target, propName, ...args){
  var promises = [];
  for (var listener of this.listeners){
    if ( (target === 'all') || (target === listener.source && propName === listener.propName) ){
      var p = listener.cb(...args);
      promises.push(p);
    }
  }
  await Promise.all(promises);
}


//exports ----------------------------------------------------------------------

export default {
  xCoord: new XCoord(HOME_X),
  yCoord: new YCoord(HOME_Y),
  zCoord: new ZCoord(HOME_Z, MIN_SCALE_LEVEL, ESRI_MAX_SCALE_LEVEL),
  addListener: function(source, propName, cb){
    listeners.push( {source, propName, cb} );
  },
  setCoords: async function(newX, newY, newZ){
    this.xCoord.set(newX);
    this.yCoord.set(newY);
    this.zCoord.set(newZ);
    if (this.xCoord.hasChanged || this.yCoord.hasChanged || this.zCoord.hasChanged){
      var p1 = requestUpdate('graphicsLayer', 'update');
      var p2 = requestUpdate('basemapLayer', 'update');
      await Promise.all( [p1, p2] );
    }
  },
  calculateViewpointProps: function(x = this.xCoord.value, y = this.yCoord.value, z = this.zCoord.value){
    var pixelSize = getPixelSize(z);
    var pixelNum = getPixelNum(pixelSize);
    var leftMapCoord = x / pixelSize - mapDimensions.width * 0.5;   //change this in case of negative?
    var topMapCoord = y / pixelSize - mapDimensions.height * 0.5;
    return { pixelSize, pixelNum, leftMapCoord, topMapCoord };
  }
}



//const ZOOM_IN_OUT_INCREMENT = 1;  //change this;

//const ZOOM_TO_INCREMENT = 2;
/*pan: async function(deltaXPx, deltaYPx){
  var pixelSize = getPixelSize(zCoord.value);
  var deltaXWorld = deltaXPx * pixelSize;
  var deltaYWorld = deltaYPx * pixelSize;
  await setCoords(xCoord.value + deltaXWorld, yCoord.value + deltaYWorld, zCoord.value);
},
zoomIn: async function(){
 await setCoords(xCoord.value, yCoord.value, zCoord.value + ZOOM_IN_OUT_INCREMENT);
},
zoomOut: async function(){
 await setCoords(xCoord.value, yCoord.value, zCoord.value - ZOOM_IN_OUT_INCREMENT);
},
animatePanTo: async function(newX, newY){
  await setCoords(newX, newY, zCoord.value);
},
animateZoomTo: async function(newX, newY){
  await setCoords(newX, newY, zCoord.value + ZOOM_TO_INCREMENT);
},
animateZoomHome: async function(){
  await setCoords(HOME_X, HOME_Y, HOME_Z);
},*/


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
