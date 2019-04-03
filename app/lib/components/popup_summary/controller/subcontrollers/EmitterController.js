export default function PopupSummaryEmitterController(emitter, dispatcher){

  //define reactions -----------------------------------------------------------

  var broadcastCloseRequest = function(){
    emitter.notify('closeRequest');
  }

  var broadcastReadMoreRequest = function(){
    emitter.notify('readMoreRequest');
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('emitter', 'closeRequest', broadcastCloseRequest);
  dispatcher.setListener('emitter', 'readMoreRequest', broadcastReadMoreRequest);

}
