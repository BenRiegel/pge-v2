//module code block ------------------------------------------------------------

var listeners = [];


//exports ----------------------------------------------------------------------

export default {
  broadcast: async function(target, request, ...args){
    var promises = [];
    for (var listener of listeners){
      if (target === 'all' || target === listener.source){
        if (request === listener.request){
          var p = listener.cb(...args);
          promises.push(p);
        }
      }
    }
    await Promise.all(promises);
  },
  addListener: function(source, request, cb){
    listeners.push( {source, request, cb} );
  },
}
