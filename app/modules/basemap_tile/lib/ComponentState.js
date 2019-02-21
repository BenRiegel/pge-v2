//exports ----------------------------------------------------------------------

export default function ComponentState(obj){

  var listeners = {};

  var keys = Object.keys(obj);

  var props = {};
  for (let key of keys){
    props[key] = obj[key];
  }

  var state = {
    setUpdateFunction(propName, cb){
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
    },
    async setTileIndices(newValue){
      var oldX = props.tileIndices.x;
      var oldY = props.tileIndices.y;
      if (newValue.x !== oldX || newValue.y !== oldY){
        props.tileIndices = newValue;
        var listener = listeners.tileIndices;
        if (listener){
          await listener();
        }
      }
    },
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
