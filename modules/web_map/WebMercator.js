//module code block ------------------------------------------------------------

//see https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/

const extent = {
  min: -2.0037507067161843E7,
  max: 2.0037507067161843E7,
};

const circumference = extent.max - extent.min;
const halfCircumference = circumference / 2;

var normalizeWorldCoords = function(x, y){
  return {
    x: x - extent.min,
    y: extent.max - y
  };
};


//exports ----------------------------------------------------------------------

export function getPixelNum(pixelSize){
  return Math.round(circumference / pixelSize);
}

export function latLonToWebMercator( {lon, lat} ){
  var x = lon * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI) * 20037508.34;
  return normalizeWorldCoords(x, y);
};

export function calculateNewX(x){
  var newX = x % circumference;
  newX += (newX < 0) ? circumference : 0;
  return newX;
};

export function calculateNewY(y){
  return Math.min(Math.max(y, 0), circumference);
};

export function calculateDeltaX(x1, x2){
  var deltaX = x2 - x1;
  deltaX += (deltaX < -halfCircumference) ? circumference : 0;
  deltaX -= (deltaX > halfCircumference) ? circumference : 0;
  return deltaX;
};
