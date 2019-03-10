export default function PopupButtonEmitterController(emitter, buttonId, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var broadcast = function(){
    emitter.broadcast('click', buttonId);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = broadcast;

}
