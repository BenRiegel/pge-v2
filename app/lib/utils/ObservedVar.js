export default class ObservedVar{

  constructor(initValue){
    this.value = initValue;
    this.previousValue = undefined;
    this.hasChanged = null;
    this.listenersList = [];
    this.listenersLookup = {};
  }

  addListener(listener){
    this.listenersList.push(listener);
  }

  removeListener(cb){
    this.listenersList = this.listenersList.filter( listener => listener !== cb );
  }

  addListenerByType(listenerType, listener){
    var typeListeners = this.listenersLookup[listenerType] || [];
    typeListeners.push(listener);
    this.listenersLookup[listenerType] = typeListeners;
  }

  updateAll(...args){
    for (var listener of this.listenersList){
      listener(...args);
    }
  }

  updateAllAsync(...args){
    var promises = [];
    for (var listener of this.listenersList){
      var p = listener(...args);
      promises.push(p);
    }
    return Promise.all(promises);
  }

  updateType(listenerType, ...args){
    var typeListeners = this.listenersLookup[listenerType] || [];
    for (var listener of typeListeners){
      listener(...args);
    }
  }

  updateTypeAsync(listenerType, ...args){
    var promises = [];
    var typeListeners = this.listenersLookup[listenerType] || [];
    for (var listener of typeListeners){
      var p = listener(...args);
      promises.push(p);
    }
    return Promise.all(promises);
  }

  onChange(currentValue, previousValue){
    this.updateAll(currentValue, previousValue);
  }

  set(newValue){
    this.previousValue = this.value;
    this.hasChanged = false;
    if (newValue !== this.value){
      this.hasChanged = true;
      this.value = newValue;
      return this.onChange(this.value, this.previousValue);
    }
  }
}
