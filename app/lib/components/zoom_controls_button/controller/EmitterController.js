export default function ZoomControlsButtonEmitterController(emitter, view, buttonId){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var broadcast = function(){
    emitter.broadcast('click', buttonId);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = broadcast;

}
