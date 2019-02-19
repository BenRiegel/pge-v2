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
    addListener(prop, target, reaction, listener){
      props[prop].addListener(target, reaction, listener);
    },
    async set(propName, value){
      await props[propName].set(value);
    },
    setQuick(propName, value){
      props[propName].setQuick(value);
    },
    setOnChange(propName, cb){
      props[propName].onChange = cb;
    },
    setOnChangeQuick(propName, cb){
      props[propName].onChangeQuick = cb;
    },
    propHasChanged(propName){
      return props[propName].hasChanged;
    },
    propHasUpdated(propName){
      return props[propName].updateIsComplete;
    },
    getPropUpdatePromise(propName){
      return props[propName].updateCompletePromise;
    }
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
