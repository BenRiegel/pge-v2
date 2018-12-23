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
    setOnChange(propName, cb){
      props[propName].onChange = cb;
    },
    propHasChanged(propName){
      return props[propName].hasChanged;
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
