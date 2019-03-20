export default function Emitter(eventNames){

  //private code block ---------------------------------------------------------

  var events = new Map();

  //public api -----------------------------------------------------------------

  return {
    broadcast: function(eventName, ...args){
      var listeners = events.get(eventName) || [];
      for (var listener of listeners){
        listener(...args);
      }
    },
    asyncBroadcast: async function(eventName, ...args){
      var listeners = events.get(eventName) || [];
      var promises = [];
      for (var listener of listeners){
        var p = listener(...args);
        promises.push(p);
      }
      await Promise.all(promises);
    },
    addListener: function(eventName, cb){
      if (eventNames.includes(eventName)){
        var listeners = events.get(eventName) || [];
        listeners.push(cb);
        events.set(eventName, listeners);
      } else {
        throw new Error(eventName + ' is not a valid event name');
      }

    },
    removeListener: function(eventName, cb){
      var listeners = events.get(eventName) || [];
      listeners = listeners.filter( listener => listener !== cb );
      events.set(eventName, listeners);
    },
  };

};
