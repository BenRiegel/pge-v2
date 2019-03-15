//imports ----------------------------------------------------------------------

import ObservedVar from './ObservedVar.js';


//exports ----------------------------------------------------------------------

export default function ObservedObj(obj){

  var isUpdating = false;

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
    removeListener(propName, listener){
      props[propName].removeListener(listener);
    },
    addListenerByType(propName, type, listener){
      props[propName].addListenerByType(type, listener);
    },
    set(propName, value){
      if (!isUpdating){
        props[propName].set(value);
      } else {
        //console.log('rejected assignment', propName, value);
      }
    },
    async setAsync(propName, value){
      if (!isUpdating){
        isUpdating = true;
        await props[propName].set(value);
        isUpdating = false;
      } else {
        //console.log('rejected assignment', propName, value);
      }
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
