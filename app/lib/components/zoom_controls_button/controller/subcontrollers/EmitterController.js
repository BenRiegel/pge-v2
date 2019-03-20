export default function ZoomControlsButtonEmitterController(emitter, view, buttonId){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var notifyPublic = function(){
    emitter.public.notify('click', buttonId);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = notifyPublic;

}
