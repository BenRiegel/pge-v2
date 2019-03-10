export default function PopupReportEmitterController(emitter, view){

  var { subcomponents } = view;
  var { closeButton, contractButton } = subcomponents;

  //define reactions -----------------------------------------------------------

  var broadcastClose = function(){
    emitter.broadcast('close');
  };

  var broadcastContract = function(){
    emitter.broadcast('contract');
  }

  //load reactions -------------------------------------------------------------

  closeButton.addListener('click', broadcastClose);
  contractButton.addListener('click', broadcastContract);

}
