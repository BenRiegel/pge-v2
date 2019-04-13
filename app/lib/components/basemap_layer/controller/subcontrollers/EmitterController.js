export default function BasempLayerEmitterController(emitter){

  //define reactions -----------------------------------------------------------

  var onMouseDown = function(...args){
    emitter.notify('panStartRequest', ...args);
  };

  var onMouseUp = function(...args){
    emitter.notify('panEndRequest', ...args);
  };

  var onMouseMove = function(...args){
    emitter.notify('panRequest', ...args);
  };

}
