export default function BasempLayerEmitterController(emitter, dispatcher){

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

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('public', 'mouseDown', onMouseDown);
  dispatcher.setListener('public', 'mouseUp', onMouseUp);
  dispatcher.setListener('public', 'mouseMove', onMouseMove);

}
