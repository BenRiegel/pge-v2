//imports ----------------------------------------------------------------------

import * as webMercator from '../../lib/WebMercator.js';


//module code block ------------------------------------------------------------

const MIN_SCALE_LEVEL = 2;

const MAX_SCALE_LEVEL = 12;

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
    this.z.value = z; //scale.calculateNewZ(z);
    this.x.deltaValue = webMercator.calculateDeltaX(this.x.value - this.x.previousValue);
    this.y.deltaValue = this.y.value - this.y.previousValue;
    this.z.deltaValue = this.z.value - this.z.previousValue;
  },
  add: function(deltaX, deltaY, deltaZ){
    var newX = x.value + deltaX;
    var newY = y.value + deltaY;
    var newZ = z.value + deltaZ;
    this.set(newX, newY, newZ);
  },
}
