//imports ----------------------------------------------------------------------

import * as webMercator from '../../lib/WebMercator.js';
import { clamp } from '../../lib/Utils.js';


//module code block ------------------------------------------------------------

class ViewpointVar{
  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.deltaValue = undefined;
    this.hasChanged = undefined;
  }
  rectifyValue(value){
    return value;
  }
  calculateDeltaValue(){
    return (this.value - this.previousValue);
  }
  set(newValue){
    var newRectifiedValue = this.rectifyValue(newValue);
    this.hasChanged = false;
    if (newRectifiedValue !== this.value){
      this.hasChanged = true;
      this.previousValue = this.value;
      this.value = newRectifiedValue;
      this.deltaValue = this.calculateDeltaValue();
    }
  }
}


//exports ----------------------------------------------------------------------

export class XCoord extends ViewpointVar{
  constructor(initValue){
    super(initValue);
  }
  rectifyValue(value){
    return webMercator.calculateNewX(value);
  }
  calculateDeltaValue(){
    return webMercator.calculateDeltaX(this.value - this.previousValue);
  }
}

export class YCoord extends ViewpointVar{
  constructor(initValue){
    super(initValue);
  }
  rectifyValue(value){
    return webMercator.calculateNewY(value);
  }
}

export class ZCoord extends ViewpointVar{
  constructor(initValue, minScaleLevel, maxScaleLevel){
    super(initValue);
    this.minScaleLevel = minScaleLevel;
    this.maxScaleLevel = maxScaleLevel;
  }
  rectifyValue(value){
    return clamp(value, this.minScaleLevel, this.maxScaleLevel);
  }
}
