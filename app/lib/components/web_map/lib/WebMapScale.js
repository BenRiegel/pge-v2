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
