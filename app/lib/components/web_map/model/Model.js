//imports ----------------------------------------------------------------------

import XCoord from './props/XCoord.js';
import YCoord from './props/YCoord.js';
import ScaleCoord from './props/ScaleCoord.js';
import { calculateDeltaX } from '../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(initProps){

  var { initCoords, initScale, mapDimensions } = initProps;

  var coords = {
    x: new XCoord(initCoords.x),
    y: new YCoord(initCoords.y),
    scale: new ScaleCoord(initScale),
  };

  var model = {
    coords,
    set(x, y, scale){
      coords.x.set(x);
      coords.y.set(y);
      coords.scale.set(scale);
    },
    calculateScreenCoords(worldCoords, viewpoint){
      var deltaX = calculateDeltaX(worldCoords.x, viewpoint.x);
      var deltaXMap = deltaX / viewpoint.scale;
      var screenX = deltaXMap + mapDimensions.width / 2;
      var deltaY = worldCoords.y - viewpoint.y;
      var deltaYMap = deltaY / viewpoint.scale;
      var screenY = deltaYMap + mapDimensions.height / 2;
      return {x:screenX, y:screenY};
    },
    get x(){
      return coords.x.value;
    },
    get y(){
      return coords.y.value;
    },
    get scale(){
      return coords.scale.value;
    },
  }

  //public api -----------------------------------------------------------------

  return model;

}
