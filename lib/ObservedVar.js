export default class ObservedVar{
  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.hasChanged = undefined;
    this.listeners = [];
  }
  addListener(target, cb){
    this.listeners.push( {target, cb} );
  }
  async broadcast(currentValue, previousValue){
    var promises = [];
    for (var listener of this.listeners){
      var p = listener.cb(currentValue, previousValue);
      promises.push(p);
    }
    await Promise.all(promises);
  }
  async broadcastTo(target, currentValue, previousValue){
    var promises = [];
    for (var listener of this.listeners){
      if (listener.target === target){
        var p = listener.cb(currentValue, previousValue);
        promises.push(p);
      }
      await Promise.all(promises);
    }
  }
  async onChange(currentValue, previousValue){
    await this.broadcast(currentValue, previousValue);
  }
  async set(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.previousValue = this.value;
      this.value = newValue;
      await this.onChange(this.value, this.previousValue);
    }
  }

}


/*export default class State{
  constructor(...props){
    for (var prop of props){
      this[prop] = new StateProp();
    }
  }
}*/
