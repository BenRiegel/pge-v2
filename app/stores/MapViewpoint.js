//imports ----------------------------------------------------------------------

import * as webMercator from '../../lib/WebMercator.js';
import { getMinScale, getPixelSize, getPixelNum } from '../../lib/WebMapScale.js';
import Emitter from '../../lib/Emitter.js';
import { ESRI_MAX_SCALE_LEVEL } from '../config/Config.js';
import { mapDimensions } from '../views/RootView.js';
import { clamp } from '../../lib/Utils.js';


//module code block ------------------------------------------------------------

const MIN_SCALE_LEVEL = 2;
const INIT_COORDS = webMercator.latLonToWebMercator( {lon:-5, lat:28} );
const INIT_SCALE_LEVEL = MIN_SCALE_LEVEL;
const ZOOM_IN_OUT_INCREMENT = 1;
const ZOOM_TO_TOTAL_CHANGE = 1;


var emitter = new Emitter();

var coords = {
  x: INIT_COORDS.x,
  y: INIT_COORDS.y,
  z: INIT_SCALE_LEVEL,
}

var eventStartZ;

var calculateXChanges = function(eventName, worldCoords){
  switch (eventName){
    case 'zoomIn':
    case 'zoomOut':
      var newX = coords.x;
      break;
    case 'zoomTo':
    case 'panTo':
      var newX = worldCoords.x;
      break;
    case 'zoomHome':
      var newX = INIT_COORDS.x;
      break;
    default:
      break;
  }
  var deltaX = webMercator.calculateDeltaX(newX, coords.x);
  return{
    init: coords.x,
    new: newX,
    delta: deltaX,
    hasChanged: (newX !== coords.x),
  }
}

var calculateYChanges = function(eventName, worldCoords){
  switch (eventName){
    case 'zoomIn':
    case 'zoomOut':
      var newY = coords.y;
      break;
    case 'zoomTo':
    case 'panTo':
      var newY = worldCoords.y;
      break;
    case 'zoomHome':
      var newY = INIT_COORDS.y;
      break;
    default:
      break;
  }
  var deltaY = newY - coords.y;
  return{
    init: coords.y,
    new: newY,
    delta: deltaY,
    hasChanged: (newY !== coords.y),
  }
}

var calculateZChanges = function(eventName){
  switch (eventName){
    case 'zoomIn':
      var newZ = clamp(coords.z + ZOOM_IN_OUT_INCREMENT, MIN_SCALE_LEVEL, ESRI_MAX_SCALE_LEVEL);
      break;
    case 'zoomOut':
      var newZ = clamp(coords.z - ZOOM_IN_OUT_INCREMENT, MIN_SCALE_LEVEL, ESRI_MAX_SCALE_LEVEL);
      break;
    case 'panTo':
      var newZ = coords.z;
      break;
    case 'zoomTo':
      var newZ = clamp(coords.z + ZOOM_TO_TOTAL_CHANGE, MIN_SCALE_LEVEL, ESRI_MAX_SCALE_LEVEL);
      break;
    case 'zoomHome':
      var newZ = INIT_SCALE_LEVEL;
      break;
    default:
      break;
  }
  var deltaZ = newZ - coords.z;
  return{
    init: coords.z,
    new: newZ,
    delta: deltaZ,
    hasChanged: (newZ !== coords.z),
  }
}

var setX = function(newX){
  var oldX = coords.x;
  var newRectifiedX = webMercator.calculateNewX(newX);
  var deltaX = webMercator.calculateDeltaX(newRectifiedX, oldX);
  coords.x = newRectifiedX;
  return deltaX;
}


//exports ----------------------------------------------------------------------

export default {

  coords,

  get eventStartZ(){
    return eventStartZ;
  },

  setEventStartZ: function(){
    eventStartZ = this.coords.z;
  },

  addListener: emitter.addListener,

  calculateCoordChanges: function(eventName, worldCoords){
    return {
      x: calculateXChanges(eventName, worldCoords),
      y: calculateYChanges(eventName, worldCoords),
      z: calculateZChanges(eventName)
    }
  },

  pan: async function(newX, newY, deltaXPx, deltaYPx){
    setX(newX);
    coords.y = newY;
    emitter.broadcast('mapProperties - updateOnPan');
    emitter.broadcast('graphic - updateOnPan', {deltaXPx, deltaYPx} );
    //broadcast to basemap tiles
  },

  zoom: async function(newZ){
    coords.z = newZ;
    emitter.broadcast('mapProperties - updateOnZoom');
    emitter.broadcast('graphic - updateOnZoom');
    //broadcast to basemap tiles or basemap layer
  },

  panAndZoom: async function(newX, newY, newZ){
    setX(newX);
    coords.y = newY;
    coords.z = newZ;
    emitter.broadcast('mapProperties - updateOnZoom');
    emitter.broadcast('graphic - updateOnZoom');
    //broadcast to basemap tiles or basemap layer
  },

}



/*var setY = function(newY){
  var oldY = coords.y;
  var newRectifiedY = webMercator.calculateNewY(newY);
  var deltaY = newRectifiedY - oldY;
  coords.y = newRectifiedY;
  return deltaY;
}

var setZ = function(newZ){
  var oldZ = coords.z;
  var newRectifiedZ = clamp(newZ, MIN_SCALE_LEVEL,  ESRI_MAX_SCALE_LEVEL);
  var deltaZ = newRectifiedZ - oldZ;
  coords.z = newRectifiedZ;
  return deltaZ;
}*/


/*setCoords: async function(newX, newY, newZ){
  var xHasChanged = setX(newX);
  var yHasChanged = setY(newY);
  var zHasChanged = setZ(newZ);

  if (xHasChanged || yHasChanged || zHasChanged){
    if (zHasChanged){
      await dispatcher.broadcast('mapProperties', 'updatePixelProps');
      var updateProps = {zHasChanged}
    } else {
      var pixelSize = getPixelSize(this.coords.z);
      var deltaXPx = xHasChanged / pixelSize;
      var deltaYPx = yHasChanged / pixelSize;
      var numPixels = getPixelNum(pixelSize);
      var updateProps = {zHasChanged, deltaXPx, deltaYPx, numPixels};
    }
    await dispatcher.broadcast('mapProperties', 'updateViewportProps');
    await dispatcher.broadcast('graphicsLayer', 'update', updateProps);
  }
},*/

/*calculateViewpointProps: function( y = this.yCoord.value, z = this.zCoord.value){
  var pixelSize = getPixelSize(z);
  var pixelNum = webMercator.getPixelNum(pixelSize);
  var leftMapCoord = x / pixelSize - mapDimensions.width * 0.5;   //change this in case of negative?
  var topMapCoord = y / pixelSize - mapDimensions.height * 0.5;
  return { pixelSize, pixelNum, leftMapCoord, topMapCoord };
}*/

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