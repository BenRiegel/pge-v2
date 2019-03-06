//imports ----------------------------------------------------------------------

import ObservedVar from './ObservedVar.js';


//exports ----------------------------------------------------------------------

export default function ComponentState(obj){

  var keys = Object.keys(obj);

  var props = {};
  for (let key of keys){
    props[key] = new ObservedVar(obj[key]);
  }

  var state = {
    props,
    addListener(propName, listener){
      props[propName].addListener(listener);
    },
    addListenerByType(propName, type, listener){
      props[propName].addListenerByType(type, listener);
    },
    set(propName, value){
      return props[propName].set(value);
    },
    /*setOnChange(propName, cb){
      props[propName].onChange = cb;
    },*/
    /*propHasChanged(propName){
      return props[propName].hasChanged;
    },
    propHasUpdated(propName){
      return props[propName].updateIsComplete;
    },
    getPropUpdatePromise(propName){
      return props[propName].updateCompletePromise;
    },
    removeListeners(propName){
      props[propName].removeListeners();
    },*/
  };

  for (let key of keys){
    Object.defineProperty(state, key, {
      get: function() {
             return props[key].value;
           },
    });
  }

  return state;
}
