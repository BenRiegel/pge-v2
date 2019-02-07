export default function Emitter(){

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
      var listeners = events.get(eventName) || [];
      listeners.push(cb);
      events.set(eventName, listeners);
    },
    removeListener: function(eventName, cb){
      var listeners = events.get(eventName) || [];
      listeners = listeners.filter( listener => listener !== cb );
      events.set(eventName, listeners);
    },
  };

};