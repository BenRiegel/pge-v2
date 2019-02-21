//imports ----------------------------------------------------------------------

import * as webMercator from './WebMercator.js';
import * as webMapScale from './WebMapScale.js';
import { clamp } from './Utils.js';


//module code block ------------------------------------------------------------

const MIN_VIEWPOINT_SCALE_LEVEL = 2;
const MAX_VIEWPOINT_SCALE_LEVEL = 12;
const MAX_VIEWPOINT_SCALE = webMapScale.levelToValue(MIN_VIEWPOINT_SCALE_LEVEL);
const MIN_VIEWPOINT_SCALE = webMapScale.levelToValue(MAX_VIEWPOINT_SCALE_LEVEL);

class Coord{
  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.deltaValue = undefined;
    this.hasChanged = undefined;
  }
  calculateDeltaValue(value2, value1){
    return value2 - value1;
  }
  rectifyNewValue(newValue){
    return newValue;
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
  getChangeSummary(newValue){
    var previousValue = this.value;
    var rectifiedNewValue = this.rectifyNewValue(newValue);
    var deltaValue = this.calculateDeltaValue(rectifiedNewValue, previousValue);
    var hasChanged = Boolean(deltaValue);
    return {
      init: this.value,
      new: rectifiedNewValue,
      delta: deltaValue,
      hasChanged,
    }
  }
}

//exports ----------------------------------------------------------------------

export class XCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  calculateDeltaValue(value2, value1){
    return webMercator.calculateDeltaX(value2, value1);
  }
  rectifyNewValue(newValue){
    return webMercator.rectifyXCoord(newValue);
  }
}

export class YCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  rectifyNewValue(newValue){
    return webMercator.rectifyYCoord(newValue);
  }
}

export class Scale extends Coord{
  constructor(initValue){
    super(initValue);
  }
  rectifyNewValue(newValue){
    return clamp(newValue, MIN_VIEWPOINT_SCALE, MAX_VIEWPOINT_SCALE);
  }
  getChangeSummary(newValue){
    var previousValue = this.value;
    var rectifiedNewValue = this.rectifyNewValue(newValue);
    var deltaValue = this.calculateDeltaValue(rectifiedNewValue, previousValue);
    var previousLevel = webMapScale.valueToLevel(previousValue);
    var newLevel = webMapScale.valueToLevel(rectifiedNewValue);
    var hasChanged = Boolean(deltaValue);
    return {
      init: this.value,
      new: rectifiedNewValue,
      delta: deltaValue,
      deltaLevel: newLevel - previousLevel,
      hasChanged,
    }
  }
}
