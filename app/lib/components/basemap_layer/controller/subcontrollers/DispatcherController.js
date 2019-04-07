export default function BasemapLayerDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { root } = nodes;

  //define event reactions -----------------------------------------------------

  var onMouseDown = function(x, y){
    dispatcher.newAction('mouseDown', x, y);
  }

  var onMouseUp = function(x, y){
    dispatcher.newAction('mouseUp', x, y);
  }

  var onMouseMove = function(x, y){
    dispatcher.newAction('mouseMove', x, y);
  }

  //load event reactions -------------------------------------------------------

  root.setEventListener('mousedown', onMouseDown);
  root.setEventListener('mousemove', onMouseMove);
  root.setEventListener('mouseup', onMouseUp);
  //root.setEventListener('mouseout', onMouseUp);

}
