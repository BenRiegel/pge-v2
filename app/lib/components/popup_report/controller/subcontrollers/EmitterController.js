export default function PopupReportEmitterController(emitter, dispatcher){

  //define event reactions -----------------------------------------------------------

  var broadcastCloseRequest = function(){
    emitter.notify('closeRequest');
  }

  var broadcastContractRequest = function(){
    emitter.notify('contractRequest');
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('public', 'closeRequest', broadcastCloseRequest);
  dispatcher.setListener('public', 'contractRequest', broadcastContractRequest);

}
