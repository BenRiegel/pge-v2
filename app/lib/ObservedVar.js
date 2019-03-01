export default class ObservedVar{

  constructor(initValue){
    this.value = initValue;
    this.hasChanged = false;
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
    this.listenersLookup = {};
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

  onChange(){
    this.requestUpdateAll();
  }

  async onChangeAsync(){
    await this.requestUpdateAllAsync();
  }

  async setAsync(newValue){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.value = newValue;
      await this.onChangeAsync();
    }
  }

  set(newValue, notify){
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.value = newValue;
      if (notify){
        this.onChange();
      }
    }
  }
}
