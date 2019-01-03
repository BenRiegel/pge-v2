//imports ----------------------------------------------------------------------

import { circumference } from './WebMercator.js';


//module code block ------------------------------------------------------------

//see https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/

const maxScale = 5.91657527591555E8;
const log2MaxScale = Math.log2(maxScale);
const pixelsPerMeter = 3779.52;


//exports ----------------------------------------------------------------------

export function getPixelSize(z){
  var mapScale = Math.pow(2, log2MaxScale - z);
  return mapScale / pixelsPerMeter;
}

export function getMinScale( {width, height} ){
  var maxDimensionPx = Math.max(height, width);
  var minScale = pixelsPerMeter * circumference / maxDimensionPx;
  var minZ = log2MaxScale - Math.log2(minScale);
  return minZ;
}
