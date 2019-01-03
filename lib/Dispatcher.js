//exports ----------------------------------------------------------------------

export default function Dispatcher(){

  //private code block ---------------------------------------------------------
  var listeners = [];


  //public api -----------------------------------------------------------------

  this.broadcast = async function(target, request, ...args){
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
  };

  this.addListener = function(source, request, cb){
    listeners.push( {source, request, cb} );
  };

}
