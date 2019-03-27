export default class ObservedVar{

  constructor(initValue){
    this.value = initValue;
    this.hasChanged = false;
  }

  set(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.value = newValue;
    }
  }
}
