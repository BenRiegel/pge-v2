export default class Coord{
  constructor(initValue){
    this.value = this.rectifyNewValue(initValue);
    this.previousValue = undefined;
    this.deltaValue = undefined;
    this.hasChanged = undefined;
  }
  set(newValue){
    this.previousValue = this.value;
    var newRectifiedValue = this.rectifyNewValue(newValue);
    this.value = newRectifiedValue;
    this.deltaValue = this.calculateDeltaValue(this.value, this.previousValue);
    this.hasChanged = Boolean(this.deltaValue);
  }
  calculateDeltaValue(value2, value1){
    return (value2 - value1);
  }
}
