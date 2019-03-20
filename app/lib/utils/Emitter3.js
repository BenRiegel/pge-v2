export default function Emitter(eventNames){

  var listeners = {};

  //public api -----------------------------------------------------------------

  return {
    addListener: function(eventName, cb){
      if (eventNames && !eventNames.includes(eventName)){
        throw new Error(eventName + ' is not a valid event name');
      } else {
        listeners[eventName] = cb;
      }
    },
    notify: function(eventName, ...args){
      var listener = listeners[eventName];
      if (listener){
        return listener(...args);
      }
    },
  };
}
