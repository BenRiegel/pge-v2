//imports ----------------------------------------------------------------------

import { clamp } from '../utils/Utils.js';


//module code block ------------------------------------------------------------

//see https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/

const EXTENT = {
  min: -2.0037507067161843E7,
  max: 2.0037507067161843E7,
};

const WORLD_CIRCUMFERENCE = EXTENT.max - EXTENT.min;

const HALF_CIRCUMFERENCE = WORLD_CIRCUMFERENCE / 2;

var normalizeCoords = function(xCoord, yCoord){
  return {
    x: xCoord - EXTENT.min,
    y: EXTENT.max - yCoord,
  };
};


//exports ----------------------------------------------------------------------

export function latLonToWebMercatorXY( {lon, lat} ){
  var x = lon * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / Math.PI * 20037508.34;
  return normalizeCoords(x, y);
}

export function rectifyXCoord(x){
  var newX = x % WORLD_CIRCUMFERENCE;
  return (newX < 0) ? (newX + WORLD_CIRCUMFERENCE) : newX;
}

export function calculateDeltaX(x2, x1){
  var deltaX = x2 - x1;
  if (deltaX < -HALF_CIRCUMFERENCE){
    return deltaX + WORLD_CIRCUMFERENCE;
  }
  if (deltaX > HALF_CIRCUMFERENCE){
    return deltaX - WORLD_CIRCUMFERENCE;
  }
  return deltaX;
}

export function rectifyYCoord(y){
  return clamp(y, 0, WORLD_CIRCUMFERENCE);
}
