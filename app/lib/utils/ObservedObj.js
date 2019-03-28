import ObservedVar from './ObservedVar.js';


export default class ObservedObj extends ObservedVar{
  constructor(initObj){
    super(initObj);
    this.value = initObj;
    this.hasChanged = false;
  }
  set(newObj){
    this.hasChanged = false;
    var keys = Object.keys(newObj);
    for (var key of keys){
      var initValue = this.value[key];
      var newValue = newObj[key];
      if (initValue !== newValue){
        this.value[key] = newValue;
        this.hasChanged = true;
      }
    }
  }
}
