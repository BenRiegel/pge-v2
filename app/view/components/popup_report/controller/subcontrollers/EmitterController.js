export default function PopupReportEmitterController(emitter){

  //public api -----------------------------------------------------------------

  this.broadcastClose = function(){
    emitter.notify('closeRequest');
  };

  this.broadcastContract = function(){
    emitter.notify('contractRequest');
  };

}
