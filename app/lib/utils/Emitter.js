export default function Emitter(eventNames){

  var listeners = {};

  //public api -----------------------------------------------------------------

  return {
    setListener: function(eventName, cb){
      if (eventNames && !eventNames.includes(eventName)){
        throw new Error('event name is invalid: ' + eventName);
      } else {
        listeners[eventName] = cb;
      }
    },
    notify: function(eventName, ...args){
      if (eventNames && !eventNames.includes(eventName)){
        throw new Error('event name is invalid: ' + eventName);
      } else {
        var listener = listeners[eventName];
        if (listener){
          return listener(...args);
        }
      };
    },
  };
}
