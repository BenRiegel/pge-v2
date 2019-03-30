//imports ----------------------------------------------------------------------

import XCoord from './props/XCoord.js';
import YCoord from './props/YCoord.js';
import ScaleCoord from './props/ScaleCoord.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(initProps){

  var coords = {
    x: new XCoord(),
    y: new YCoord(),
    scale: new ScaleCoord(),
  };

  var model = {
    coords,
    set(x, y, scale){
      coords.x.set(x);
      coords.y.set(y);
      coords.scale.set(scale);
    },
    get hasChanged(){
      return coords.x.hasChanged || coords.y.hasChanged || coords.scale.hasChanged;
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
