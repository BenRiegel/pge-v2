export default class Coord{
  constructor(initValue){
    this.value = this.rectifyNewValue(initValue);
  }
  set(newValue){
    this.value = this.rectifyNewValue(newValue);
  }
  calculateDeltaValue(value2, value1){
    return (value2 - value1);
  }
  getChangeSummary(newValue){
    var initValue = this.value;
    var newValueRectified = this.rectifyNewValue(newValue);
    var deltaValue = this.calculateDeltaValue(newValueRectified, initValue);
    var hasChanged = Boolean(deltaValue);
    return { initValue, newValueRectified, deltaValue, hasChanged };
  }
}
