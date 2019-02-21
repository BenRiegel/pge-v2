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
    },
    setCenterTileIndices(newValue){
      var oldX = props.centerTileIndices.x;
      var oldY = props.centerTileIndices.y;
      if (newValue.x !== oldX || newValue.y !== oldY){
        props.centerTileIndices = newValue;
        var propListeners = listeners.centerTileIndices || [];
        for (var listener of propListeners){
          listener();
        }
      }
    },
    async setCenterTileIndicesAsync(newValue){
      var oldX = props.centerTileIndices.x;
      var oldY = props.centerTileIndices.y;
      if (newValue.x !== oldX || newValue.y !== oldY){
        props.centerTileIndices = newValue;
        var propListeners = listeners.centerTileIndices || [];
        var promises = [];
        for (var listener of propListeners){
          var p = listener();
          promises.push(p);
        }
        await Promise.all(promises)
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
