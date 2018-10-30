//module code block ------------------------------------------------------------

//see https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/

const extent = {
  min: -2.0037507067161843E7,
  max: 2.0037507067161843E7,
};

var normalizeWorldCoords = function(x, y){
  return {
    x: x - extent.min,
    y: extent.max - y
  };
};


//exports ----------------------------------------------------------------------

export var circumference = extent.max - extent.min;

export function latLonToWebMercator( {lon, lat} ){
  var x = lon * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI) * 20037508.34;
  return normalizeWorldCoords(x, y);
};

export function calculateNewX(x){
  var newX = x % this.circumference;
  return (newX < 0) ? (newX + this.circumference): newX;
};

export function calculateDeltaX(x2, x1){
  var halfCircumference = this.circumference / 2;
  var deltaX = x2 - x1;
  deltaX += (deltaX < -halfCircumference) ? this.circumference : 0;
  deltaX -= (deltaX > halfCircumference) ? this.circumference : 0;
  return deltaX;
};

export function calculateNewY(y){
  return Math.min(Math.max(y, 0), this.circumference);
};
