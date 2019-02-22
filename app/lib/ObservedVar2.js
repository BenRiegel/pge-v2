export default class ObservedVar{

  constructor(initValue){
    this.value = initValue;
    this.listenersList = [];
    this.listenersLookup = {};
  }

  addListener(reactionId, cb){
    this.listenersList.push(cb);
    var reactionListeners = this.listenersLookup[reactionId] || [];
    reactionListeners.push(cb);
    this.listenersLookup[reactionId] = reactionListeners;
  }

  removeListeners(){
    this.listeners = [];
  }

  async requestUpdateAllAsync(...args){
    var promises = [];
    for (var listener of this.listenersList){
      var p = listener(...args);
      promises.push(p);
    }
    await Promise.all(promises);
  }

  requestUpdateAll(...args){
    for (var listener of this.listenersList){
      listener(...args);
    }
  }

  async requestUpdateAsync(reactionId, ...args){
    var promises = [];
    var reactionListeners = this.listenersLookup[reactionId] || [];
    for (var listener of reactionListeners){
      var p = listener(...args);
      promises.push(p);
    }
    await Promise.all(promises);
  }

  requestUpdate(reactionId, ...args){
    var reactionListeners = this.listenersLookup[reactionId] || [];
    for (var listener of reactionListeners){
      listener(...args);
    }
  }

  onChange(currentValue, previousValue){
    this.requestUpdateAll(currentValue, previousValue);
  }

  async setAsync(newValue){
    if (newValue !== this.value){
      this.value = newValue;
      await this.onChange();
    }
  }

  set(newValue){
    if (newValue !== this.value){
      this.value = newValue;
      this.onChange();
    }
  }
}
