//imports ----------------------------------------------------------------------

import ViewpointState from '../lib/ViewpointState.js';
import { INIT_COORDS_WM, INIT_SCALE } from '../config/Config.js';
import { mapDimensions } from '../views/RootView.js';


//module code block ------------------------------------------------------------

var viewpointMap = {
  x: undefined,
  y: undefined,
}

var mapViewpoint = new ViewpointState({
  x: INIT_COORDS_WM.x,
  y: INIT_COORDS_WM.y,
  scale: INIT_SCALE,
});

mapViewpoint.onChange = function(){
  this.notify('self');
  this.notify('mapMovement');
  this.notify('graphicsLayer');
  this.notify('basemapLayer');
}

mapViewpoint.calculateMapCoords = function(worldCoords){
  return {
    x: worldCoords.x / mapViewpoint.scale,
    y: worldCoords.y / mapViewpoint.scale,
  }
}

mapViewpoint.calculateScreenCoords = function(mapCoords){
  return {
    x: mapCoords.x - viewpointMap.x + mapDimensions.width / 2,
    y: mapCoords.y - viewpointMap.y + mapDimensions.height / 2,
  }
}

mapViewpoint.tileIsVisible = function(screenCoords, size){
  var inRangeLeft = screenCoords.x > -size;
  var inRangeRight = screenCoords.x < mapDimensions.width;
  var inRangeTop = screenCoords.y > -size;
  var inRangeBottom = screenCoords.y < mapDimensions.height;
  return inRangeLeft && inRangeRight && inRangeTop && inRangeBottom;
}

var updateViewpointMap = function(){
  viewpointMap = mapViewpoint.calculateMapCoords(mapViewpoint);
}

updateViewpointMap();

mapViewpoint.addListener('self', updateViewpointMap);


//exports ----------------------------------------------------------------------

export default mapViewpoint;
