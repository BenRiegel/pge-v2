//imports ----------------------------------------------------------------------

import ObservedVar from './ObservedVar.js';


//exports ----------------------------------------------------------------------

export default function ComponentModel(obj){

  var keys = Object.keys(obj);

  var props = {};
  for (let key of keys){
    props[key] = new ObservedVar(obj[key]);
  }

  var state = {
    props,
    set(propName, value){
      props[propName].set(value);
    },
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
