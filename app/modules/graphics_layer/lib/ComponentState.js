//exports ----------------------------------------------------------------------

export default function ComponentState(obj){

  var listeners = {};

  var keys = Object.keys(obj);

  var props = {};
  for (let key of keys){
    props[key] = obj[key];
  }

  var state = {
    addListener(propName, cb){
      var propListeners = listeners[propName] || [];
      propListeners.push(cb);
      listeners[propName] = propListeners;
    },
    removeListeners(propName){
      listeners[propName] = [];
    },
    set(propName, newValue, notify = true){
      var oldValue = props[propName];
      if (newValue !== oldValue){
        props[propName] = newValue;
        if (notify){
          var propListeners = listeners[propName] || [];
          for (var listener of propListeners){
            listener();
          }
        }
      }
    }
  };

  for (let key of keys){
    Object.defineProperty(state, key, {
      get: function() {
             return props[key];
           },
    });
  }

  return state;
}
