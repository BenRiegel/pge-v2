export default function PopupSumaryEmitterController(emitter, view){

  var { subcomponents, nodes } = view;
  var { readMore } = nodes;
  var { closeButton } = subcomponents;

  //define reactions -----------------------------------------------------------

  var broadcastClose = function(){
    emitter.broadcast('close');
  };

  var broadcastExpand = function(){
    emitter.broadcast('expand');
  }

  //load reactions -------------------------------------------------------------

  closeButton.addListener('click', broadcastClose);
  readMore.onClick = broadcastExpand;

}
