//imports ----------------------------------------------------------------------

import { WORLD_CIRCUMFERENCE } from '../../lib/WebMercator.js';
import { clamp } from '../../../../utils/Utils.js';


//module code block ------------------------------------------------------------

const MIN_VIEWPOINT_SCALE_LEVEL = 2;
const MAX_VIEWPOINT_SCALE_LEVEL = 12;

class Coord{
  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.deltaValue = undefined;
    this.hasChanged = undefined;
  }
  set(newValue){
    this.previousValue = this.value;
    var rectifiedNewValue = this.rectifyNewValue(newValue);
    if (rectifiedNewValue !== this.value){
      this.value = rectifiedNewValue;
      this.deltaValue = this.calculateDeltaValue(this.value, this.previousValue);
    } else {
      this.deltaValue = 0;
    }
    this.hasChanged = Boolean(this.deltaValue);
  }
}

//exports ----------------------------------------------------------------------

export class XCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  calculateDeltaValue(value2, value1){
    var deltaX = value2 - value1;
    if (deltaX < -WORLD_CIRCUMFERENCE / 2){
      return deltaX + WORLD_CIRCUMFERENCE;
    }
    if (deltaX > WORLD_CIRCUMFERENCE / 2){
      return deltaX - WORLD_CIRCUMFERENCE;
    }
    return deltaX;
  }
  rectifyNewValue(newValue){
    var newX = newValue % WORLD_CIRCUMFERENCE;
    return (newX < 0) ? (newX + WORLD_CIRCUMFERENCE) : newX;
  }
}

export class YCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  calculateDeltaValue(value2, value1){
    return (value2 - value1);
  }
  rectifyNewValue(newValue){
    return clamp(newValue, 0, WORLD_CIRCUMFERENCE);
  }
}

export class Scale extends Coord{
  constructor(initValue){
    super(initValue);
  }
  calculateDeltaValue(value2, value1){
    return (value2 - value1);
  }
  rectifyNewValue(newValue){
    return clamp(newValue, MIN_VIEWPOINT_SCALE_LEVEL, MAX_VIEWPOINT_SCALE_LEVEL);
  }
}
