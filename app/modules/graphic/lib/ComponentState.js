//exports ----------------------------------------------------------------------

export default function ComponentState(obj){

  var listeners = {};

  var keys = Object.keys(obj);

  var props = {};
  for (let key of keys){
    props[key] = obj[key];
  }

  var state = {
    setOnChange(propName, cb){
      listeners[propName] = cb;
    },
    set(propName, newValue, notify = true){
      var oldValue = props[propName];
      if (newValue !== oldValue){
        props[propName] = newValue;
        if (notify){
          var listener = listeners[propName];
          if (listener){
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
