export default function PopupEmitterController(emitter){

  //public api -----------------------------------------------------------------

  this.notifyOnClose = function(){
    emitter.notify('closed');
  };

}
