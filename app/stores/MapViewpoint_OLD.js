//imports ----------------------------------------------------------------------

import * as webMercator from '../lib/WebMercator.js';
import * as webMapScale from '../lib/WebMapScale.js';
import Emitter from '../lib/Emitter.js';
import { clamp, wait } from '../lib/Utils.js';
import { calculatePixelSize, getPixelNum, levelToValue } from '../lib/WebMapScale.js';
import ComponentState from '../lib/ComponentState.js';




//module code block ------------------------------------------------------------

const INIT_COORDS = webMercator.latLonToWebMercator( {lon:-5, lat:28} );
const MIN_SCALE_LEVEL = 2;
const MAX_SCALE_LEVEL = 12;
const INIT_SCALE_LEVEL = MIN_SCALE_LEVEL;
const MIN_SCALE = levelToValue(MIN_SCALE_LEVEL);
const MAX_SCALE = levelToValue(MAX_SCALE_LEVEL);
const INIT_SCALE = levelToValue(INIT_SCALE_LEVEL);
const ZOOM_IN_OUT_INCREMENT = 1;
const ZOOM_TO_TOTAL_CHANGE = 1;




var viewpoint = new ComponentState({
  coords: {x:INIT_COORDS.x, y:INIT_COORDS.y},
  scale: INIT_SCALE,
  pixelSize: undefined,
  pixelNum: undefined,
  currentMovement: null,
  baselineScale: undefined,
  zoomScaleFactor: undefined,
});




viewpoint.setOnChange('currentMovement', async function (currentValue, previousValue){
  this.requestUpdateQuick('self', 'baselineScale');
  if (currentValue === null){
    if (previousValue === 'zoom'){
      emitter.broadcast('basemapLayer - copyTiles');
      emitter.broadcast('basemapTile - reset');
      await emitter.asyncBroadcast('basemapTile - render');
      emitter.broadcast('graphicsLayer - unhighlightCluster');
      emitter.broadcast('graphicsLayer - clusterGraphics');
      await emitter.asyncBroadcast('basemapLayer - revealNewTiles');
    } else if (previousValue === 'zoomHome'){
      var p1 = emitter.asyncBroadcast('basemapLayer - fadeDown');
      var p2 = emitter.asyncBroadcast('graphicsLayer - fadeDown');
      await Promise.all([p1, p2]);
      emitter.broadcast('basemapTile - reset');
      await emitter.asyncBroadcast('basemapTile - render');
      emitter.broadcast('graphicsLayer - unhighlightCluster');
      emitter.broadcast('graphicsLayer - clusterGraphics');
      await wait(300);
      p1 = emitter.asyncBroadcast('basemapLayer - fadeUp');
      p2 = emitter.asyncBroadcast('graphicsLayer - fadeUp');
      await Promise.all([p1,p2]);
    } else {
      //recalculate x here
      emitter.broadcast('basemapTile - reset');
    }
  }
});

viewpoint.setOnChangeQuick('coords', function(currentValue, previousValue){
  if (viewpoint.currentMovement === 'pan'){
    var deltaX = webMercator.calculateDeltaX(currentValue.x, previousValue.x);
    var deltaY = currentValue.y - previousValue.y;
    var deltaXPx = deltaX / viewpoint.pixelSize;
    var deltaYPx = deltaY / viewpoint.pixelSize;
    emitter.broadcast('graphicsLayer - updateOnPan', {deltaXPx, deltaYPx} );
    emitter.broadcast('basemapTile - updateOnPan', {deltaXPx, deltaYPx} );
  }
});

viewpoint.setOnChangeQuick('scale', function(){
  this.requestUpdateQuick('self', 'pixelSize');
  this.requestUpdateQuick('self', 'pixelNum');
  this.requestUpdateQuick('self', 'zoomScaleFactor');
  if (viewpoint.currentMovement === 'zoom'){
    emitter.broadcast('graphic - updateOnZoom');
    emitter.broadcast('basemapTile - updateOnZoom');
  }
});

var updatePixelSize = function(){
  var pixelSize = calculatePixelSize(viewpoint.scale);
  viewpoint.setQuick('pixelSize', pixelSize);
}

var updateNumPixels = function(){
  var pixelNum = getPixelNum(viewpoint.pixelSize);
  viewpoint.setQuick('pixelNum', pixelNum);
}

var updateBaselineScale = function(){
  viewpoint.setQuick('baselineScale', viewpoint.scale);
}

var updateZoomScaleFactor = function(){
  var scaleFactor = viewpoint.baselineScale / viewpoint.scale;
  viewpoint.setQuick('zoomScaleFactor', scaleFactor);
}

updatePixelSize();
updateNumPixels();
updateBaselineScale();
updateZoomScaleFactor();

viewpoint.addListener('currentMovement', 'self', 'baselineScale', updateBaselineScale);
viewpoint.addListener('scale', 'self', 'pixelSize', updatePixelSize);
viewpoint.addListener('scale', 'self', 'pixelNum', updateNumPixels);
viewpoint.addListener('scale', 'self', 'zoomScaleFactor', updateZoomScaleFactor);
viewpoint.addListener('baselineScale', 'self', 'zoomScaleFactor', updateZoomScaleFactor);



var emitter = new Emitter();

var calculateXChanges = function(eventName, worldCoords = {x:0,y:0} ){
  var newXLookup = {
    zoomIn: viewpoint.coords.x,
    zoomOut: viewpoint.coords.x,
    zoomTo: worldCoords.x,
    panTo: worldCoords.x,
    zoomHome: INIT_COORDS.x,
  };
  var newX = newXLookup[eventName];
  return {
    init: viewpoint.coords.x,
    new: newX,
    delta: webMercator.calculateDeltaX(newX, viewpoint.coords.x),
    hasChanged: (newX !== viewpoint.coords.x),
  }
}

var calculateYChanges = function(eventName, worldCoords = {x:0, y:0}){
  var newYLookup = {
    zoomIn: viewpoint.coords.y,
    zoomOut: viewpoint.coords.y,
    zoomTo: worldCoords.y,
    panTo: worldCoords.y,
    zoomHome: INIT_COORDS.y,
  };
  var newY = newYLookup[eventName];
  newY = clamp(newY, 0, webMercator.CIRCUMFERENCE);
  return {
    init: viewpoint.coords.y,
    new: newY,
    delta: newY - viewpoint.coords.y,
    hasChanged: (newY !== viewpoint.coords.y),
  }
}

var calculateZChanges = function(eventName){
  var currentZLevel = webMapScale.levelToValue(viewpoint.scale);
  var newZLookup = {
    zoomIn: clamp(currentZLevel + ZOOM_IN_OUT_INCREMENT, MIN_SCALE_LEVEL, MAX_SCALE_LEVEL),
    zoomOut: clamp(currentZLevel - ZOOM_IN_OUT_INCREMENT, MIN_SCALE_LEVEL, MAX_SCALE_LEVEL),
    panTo: currentZLevel,
    zoomTo: clamp(currentZLevel + ZOOM_TO_TOTAL_CHANGE, MIN_SCALE_LEVEL, MAX_SCALE_LEVEL),
    zoomHome: INIT_SCALE_LEVEL,
  }
  var newZLevel = newZLookup[eventName];
  var newZ = webMapScale.levelToValue(newZLevel);
  return {
    init: viewpoint.scale,
    new: newZ,
    delta: newZ - viewpoint.scale,
    hasChanged: (newZ !== viewpoint.scale),
  }
}


//exports ----------------------------------------------------------------------

export default {
  viewpoint,
  addListener: emitter.addListener,

  get canZoomHome(){
    var currentZLevel = webMapScale.levelToValue(viewpoint.scale);
    var deltaZ = currentZLevel - INIT_SCALE_LEVEL;
    return (deltaZ < 2);
  },

  calculateCoordChanges: function(eventName, worldCoords){
    return {
      x: calculateXChanges(eventName, worldCoords),
      y: calculateYChanges(eventName, worldCoords),
      z: calculateZChanges(eventName),
    }
  },

  setHome: function(){
    viewpoint.setQuick('coords', {x:INIT_COORDS.x, y:INIT_COORDS.y} );
    viewpoint.setQuick('scale', INIT_SCALE);
  },

  set: function(newX, newY, newScale){
    viewpoint.setQuick('coords', {x:newX, y:newY} );
    if (newScale){
      viewpoint.setQuick('scale', newScale);
    }
  },

}
