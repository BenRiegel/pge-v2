//imports ----------------------------------------------------------------------

import * as webMercator from '../services/WebMercator.js';
import * as scale from '../services/Scale.js';


//module code block ------------------------------------------------------------

var NewViewpointVar = function(){
  return {
    value: undefined,
    previousValue: undefined,
    deltaValue: undefined,
  }
}

//exports ----------------------------------------------------------------------

export default {
  x: NewViewpointVar(),
  y: NewViewpointVar(),
  z: NewViewpointVar(),
  set: function(x, y, z){
    this.x.previousValue = x.value;
    this.y.previousValue = y.value;
    this.z.previousValue = z.value;
    this.x.value = webMercator.calculateNewX(x);
    this.y.value = webMercator.calculateNewY(y);
    this.z.value = scale.calculateNewZ(z);
    this.x.deltaValue = webMercator.calculateDeltaX(this.x.value - this.x.previousValue);
    this.y.deltaValue = this.y.value - this.y.previousValue;
    this.z.deltaValue = this.z.value - this.z.previousValue;
  }
}
