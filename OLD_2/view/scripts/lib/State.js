class StateProp{
  constructor(){
    this.value = undefined;
    this.previousValue = undefined;
    this.hasChanged = undefined;
    this.onChange = null;
  }
  async set(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.previousValue = this.value;
      this.value = newValue;
      if (this.onChange){
        await this.onChange(newValue, this.previousValue);
      }
    }
  }
}


export default class State{
  constructor(...props){
    for (var prop of props){
      this[prop] = new StateProp();
    }
  }
}
