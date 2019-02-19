//module code block ------------------------------------------------------------

//see https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/

const PIXELS_PER_METER = 3779.52;
const MAX_SCALE = 5.91657527591555E8 / PIXELS_PER_METER;
const LOG2_MAX_SCALE = Math.log2(MAX_SCALE);


//exports ----------------------------------------------------------------------

export function levelToValue(scaleLevel){
  return Math.pow(2, LOG2_MAX_SCALE - scaleLevel);
}

export function valueToLevel(scaleValue){
  return LOG2_MAX_SCALE - Math.log2(scaleValue);
}



//export function rectifyScaleValue(scaleValue){
//  return clamp(scaleValue, MIN_VIEWPOINT_SCALE, MAX_VIEWPOINT_SCALE);
//}

/*const MIN_VIEWPOINT_SCALE_LEVEL = 2;
const MAX_VIEWPOINT_SCALE_LEVEL = 12;
const MAX_VIEWPOINT_SCALE = levelToValue(MIN_VIEWPOINT_SCALE_LEVEL);
const MIN_VIEWPOINT_SCALE = levelToValue(MAX_VIEWPOINT_SCALE_LEVEL);*/



//export function calculatePixelSize(scaleValue){
//  return scaleValue / 1; /// PIXELS_PER_METER;
//}
/*export function getMinScale( {width, height} ){
  var maxDimensionPx = Math.max(height, width);
  var minScale = PIXELS_PER_METER * CIRCUMFERENCE / maxDimensionPx;
  var minZ = LOG2_MAX_SCALE - Math.log2(minScale);
  return minZ;
}*/

/*export function calculateDeltaScale(z1, z2){
  var scale1 = Math.pow(2, LOG2_MAX_SCALE - z1);
  var scale2 = Math.pow(2, LOG2_MAX_SCALE - z2);
  return z1 - z2;
}*/

//var mapScale = Math.pow(2, LOG2_MAX_SCALE - z);
//return mapScale / PIXELS_PER_METER;
