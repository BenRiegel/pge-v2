import ObservedVar from '../../../lib/ObservedVar.js';

export default class CenterTileIndices extends ObservedVar{

  constructor(initValue){
    super(initValue);
  }

  set(newValue){
    this.hasChanged = false;
    var oldX = this.value.x;
    var oldY = this.value.y;
    if (newValue.x !== oldX || newValue.y !== oldY){
      this.hasChanged = true;
      this.value = newValue;
      this.onChange();
    }
  }

}
