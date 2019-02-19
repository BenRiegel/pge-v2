export default class ObservedVar{
  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.hasChanged = undefined;
    this.listeners = [];
  }
  addListener(source, propName, cb){
    this.listeners.push( {source, propName, cb} );
  }
  async requestUpdate(target, propName, ...args){
    var promises = [];
    for (var listener of this.listeners){
      if ( (target === 'all') || (target === listener.source && propName === listener.propName) ){
        var p = listener.cb(...args);
        promises.push(p);
      }
    }
    await Promise.all(promises);
  }
  requestUpdateQuick(target, propName, ...args){
    for (var listener of this.listeners){
      if ( (target === 'all') || (target === listener.source && propName === listener.propName) ){
        listener.cb(...args);
      }
    }
  }
  async onChange(currentValue, previousValue){
    await this.requestUpdate('all', 'all', currentValue, previousValue);
  }
  async onChangeQuick(currentValue, previousValue){
    this.requestUpdateQuick('all', 'all', currentValue, previousValue);
  }
  async set(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.previousValue = this.value;
      this.value = newValue;
      this.updateIsComplete = false;
      this.updateCompletePromise = this.onChange(this.value, this.previousValue);
      await this.updateCompletePromise;
      this.updateIsComplete = true;
    }
  }
  setQuick(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.previousValue = this.value;
      this.value = newValue;
      this.updateIsComplete = false;
      this.updateCompletePromise = this.onChangeQuick(this.value, this.previousValue);
      this.updateIsComplete = true;
    }
  }
}
