class StateProp{
  constructor(){
    this.value = undefined;
    this.onChange = null;
  }
  async set(newValue){
    if (newValue !== this.value){
      var oldValue = this.value;
      this.value = newValue;
      if (this.onChange){
        await this.onChange(newValue, oldValue);
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
