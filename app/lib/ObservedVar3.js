export default class ObservedVar{

  constructor(initValue){
    this.value = initValue;
    this.previousValue = null;
    this.hasChanged = false;
    this.listener = null;
  }

  async setAsync(newValue){
    this.hasChanged = false;
    this.previousValue = this.value;
    if (newValue !== this.previousValue){
      this.hasChanged = true;
      this.value = newValue;
      if (this.listener){
        await this.listener(this.value, this.previousValue);
      }
    }
  }

  set(newValue){
    this.hasChanged = false;
    this.previousValue = this.value;
    if (newValue !== this.previousValue){
      this.hasChanged = true;
      this.value = newValue;
      if (this.listener){
        this.listener(this.value, this.previousValue);
      }
    }
  }
}
